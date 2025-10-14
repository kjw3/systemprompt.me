/**
 * Cloudflare Worker - System Prompt API Proxy
 * 
 * This worker proxies requests to the AI API while keeping the API key secure.
 * The key is stored as a Worker secret, never exposed to the client.
 */

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = 10;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

// Simple in-memory rate limiter (resets on worker restart)
const rateLimits = new Map();

function getRateLimitKey(request) {
  // Use CF-Connecting-IP header for the client's real IP
  return request.headers.get('CF-Connecting-IP') || 'unknown';
}

function checkRateLimit(clientKey) {
  const now = Date.now();
  const clientData = rateLimits.get(clientKey) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  
  // Reset if window has passed
  if (now > clientData.resetTime) {
    clientData.count = 0;
    clientData.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  // Check limit
  if (clientData.count >= RATE_LIMIT_REQUESTS) {
    const resetIn = Math.ceil((clientData.resetTime - now) / 1000);
    return { allowed: false, resetIn };
  }
  
  // Increment and allow
  clientData.count++;
  rateLimits.set(clientKey, clientData);
  
  return { allowed: true, remaining: RATE_LIMIT_REQUESTS - clientData.count };
}

function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, data] of rateLimits.entries()) {
    if (now > data.resetTime + RATE_LIMIT_WINDOW) {
      rateLimits.delete(key);
    }
  }
}

export default {
  async fetch(request, env) {
    // Allowed origins for requests
    const ALLOWED_ORIGINS = [
      'https://systemprompt.me',
      'https://www.systemprompt.me',
      'https://kjw3.github.io',
      'http://localhost:8080',
      'http://localhost:3000',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:3000'
    ];

    // Get origin from request
    const origin = request.headers.get('Origin');
    const referer = request.headers.get('Referer');
    
    // Validate origin
    let isValidOrigin = false;
    if (origin) {
      isValidOrigin = ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
    } else if (referer) {
      // Fallback to referer check if no origin header
      isValidOrigin = ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed));
    }

    // CORS headers - set specific origin if valid
    const corsHeaders = {
      'Access-Control-Allow-Origin': isValidOrigin && origin ? origin : 'https://systemprompt.me',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Block requests from invalid origins
    if (!isValidOrigin) {
      console.warn('Blocked request from invalid origin:', origin || referer || 'unknown');
      return new Response(JSON.stringify({ 
        error: 'Forbidden',
        message: 'Requests are only allowed from systemprompt.me'
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      // Check rate limit
      const clientKey = getRateLimitKey(request);
      const rateLimit = checkRateLimit(clientKey);
      
      if (!rateLimit.allowed) {
        return new Response(JSON.stringify({
          error: 'Rate limit exceeded',
          message: `Too many requests. Please try again in ${rateLimit.resetIn} seconds.`,
          retryAfter: rateLimit.resetIn
        }), {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': rateLimit.resetIn.toString()
          }
        });
      }

      // Clean up old rate limit entries periodically
      if (Math.random() < 0.01) { // 1% chance per request
        cleanupRateLimits();
      }

      // Get request body
      const body = await request.json();

      // Validate request
      if (!body.messages || !Array.isArray(body.messages)) {
        return new Response(JSON.stringify({ error: 'Invalid request: messages array required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Check for API key in environment
      if (!env.API_KEY) {
        console.error('API_KEY not configured in worker environment');
        return new Response(JSON.stringify({ error: 'Service configuration error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Prepare API request
      const apiUrl = env.API_BASE_URL || 'https://integrate.api.nvidia.com/v1';
      const model = env.API_MODEL || 'nvidia/llama-3.3-nemotron-super-49b-v1.5';

      const apiRequest = {
        model: model,
        messages: body.messages,
        temperature: body.temperature || 0.7,
        max_tokens: body.max_tokens || 2000,
        top_p: body.top_p || 0.9,
        stream: body.stream !== false // Default to streaming unless explicitly disabled
      };

      // Forward request to AI API
      const apiResponse = await fetch(`${apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.API_KEY}`
        },
        body: JSON.stringify(apiRequest)
      });

      // Check for errors before streaming
      if (!apiResponse.ok) {
        const apiData = await apiResponse.json();
        console.error('API error:', apiResponse.status, apiData);
        return new Response(JSON.stringify({
          error: 'AI API error',
          message: apiData.error?.message || 'Unknown error',
          status: apiResponse.status
        }), {
          status: apiResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // If streaming, pass through the stream directly
      if (body.stream !== false) {
        return new Response(apiResponse.body, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-RateLimit-Limit': RATE_LIMIT_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString()
          }
        });
      } else {
        // Non-streaming mode - buffer and return JSON
        const apiData = await apiResponse.json();
        return new Response(JSON.stringify(apiData), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': RATE_LIMIT_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString()
          }
        });
      }

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({
        error: 'Proxy error',
        message: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

