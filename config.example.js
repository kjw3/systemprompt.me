// Configuration defaults - EXAMPLE FILE
// Copy this to config.js and customize for your deployment

window.APP_CONFIG = {
    // ============================================================================
    // BACKEND PROXY CONFIGURATION
    // ============================================================================
    // The app uses a Cloudflare Worker to proxy API requests securely
    // Your API key is stored server-side and never exposed to clients
    
    // Backend API Proxy URL
    // This should point to your Cloudflare Worker endpoint
    defaultBaseURL: 'https://systemprompt.me/api',
    
    // Model is configured in the Worker (wrangler.toml)
    // Users can still override in Advanced Settings if using their own key
    defaultModel: 'nvidia/llama-3.3-nemotron-super-49b-v1.5',
    
    // No API key needed for default configuration
    // The Worker handles authentication server-side
    defaultApiKey: '',
    adminApiKey: '', // Not used with backend proxy
    
    // ============================================================================
    // FOR USERS WITH THEIR OWN API KEYS
    // ============================================================================
    // Advanced users can still bypass the proxy by:
    // 1. Opening Advanced Settings
    // 2. Entering their own Base URL (e.g., https://integrate.api.nvidia.com/v1)
    // 3. Entering their own API key
    // 4. This gives them unlimited usage with their own quota
    
    // CORS proxy for localhost development
    corsProxyURL: 'https://corsproxy.io/?',
    
    // Auto-detect localhost and use CORS proxy
    autoDetectLocalhost: true
};

