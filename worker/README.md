# Cloudflare Worker - System Prompt API Proxy

This Cloudflare Worker acts as a secure proxy between your frontend and the AI API, keeping your API key secret.

## Features

- 🔒 **Secure**: API key stored server-side, never exposed
- ⚡ **Fast**: Edge computing, low latency worldwide
- 🛡️ **Rate Limited**: 10 requests per minute per IP
- 🆓 **Free**: Cloudflare free tier (100k requests/day)
- 📊 **Observable**: Logs and metrics in Cloudflare dashboard

## Setup Instructions

### Prerequisites

1. Cloudflare account (free)
2. Your domain (`systemprompt.me`) already in Cloudflare ✅
3. Node.js installed (for Wrangler CLI)

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This opens a browser to authenticate with Cloudflare.

### Step 3: Configure the Worker

Edit `wrangler.toml` if needed:
- Update `zone_name` to match your Cloudflare zone
- Update `pattern` to match your desired API route
- Update `API_BASE_URL` and `API_MODEL` if using different provider

### Step 4: Set Your API Key (SECRET)

```bash
cd worker
wrangler secret put API_KEY
```

When prompted, paste your **new** NVIDIA API key (after revoking the exposed one).

This stores the key securely in Cloudflare - it's never in your code or Git.

### Step 5: Deploy the Worker

```bash
wrangler deploy
```

The worker will be deployed to: `https://systemprompt.me/api/`

### Step 6: Test the Worker

```bash
curl -X POST https://systemprompt.me/api/ \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
  }'
```

Should return a response from the AI.

## Configuration

### Environment Variables (wrangler.toml)

- `API_BASE_URL`: The AI API endpoint (default: NVIDIA)
- `API_MODEL`: The model to use (default: Nemotron Super)

### Secrets (set via CLI)

- `API_KEY`: Your AI API key (stored securely by Cloudflare)

## Rate Limiting

**Current limits:**
- 10 requests per minute per IP address
- Enforced at the edge
- Returns 429 status when exceeded

**To adjust:**
Edit `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW` in `systemprompt-proxy.js`

## Monitoring

View logs and metrics:
```bash
wrangler tail
```

Or in Cloudflare Dashboard:
- Workers & Pages → Your Worker → Metrics

## Cost

**Cloudflare Free Tier:**
- ✅ 100,000 requests per day
- ✅ More than enough for personal use

If you exceed free tier:
- $0.50 per million requests

## Security Features

1. **API Key Protection**: Never exposed to clients
2. **Rate Limiting**: Per-IP protection against abuse
3. **CORS**: Configured to only allow your domain
4. **Input Validation**: Checks request format
5. **Error Handling**: Doesn't leak sensitive info

## Troubleshooting

### "API_KEY not configured"
Run: `wrangler secret put API_KEY`

### "Method not allowed"
Only POST requests are accepted

### "Rate limit exceeded"
Wait 60 seconds and try again

### Worker not deploying
Check: `wrangler whoami` to verify authentication

## Local Development

Test locally before deploying:

```bash
wrangler dev
```

This runs the worker at `http://localhost:8787`

## Updating

To deploy changes:

```bash
cd worker
wrangler deploy
```

To rotate API key:

```bash
wrangler secret put API_KEY
# Enter new key when prompted
```

## Support

- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/

