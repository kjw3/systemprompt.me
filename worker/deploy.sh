#!/bin/bash

# Deploy script for Cloudflare Worker
# This script must be run from the worker/ directory

cd "$(dirname "$0")"

echo "📍 Current directory: $(pwd)"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Install it with: npm install -g wrangler"
    exit 1
fi

echo "✅ Wrangler found"
echo ""

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not logged in to Cloudflare. Run: wrangler login"
    exit 1
fi

echo "✅ Logged in to Cloudflare"
echo ""

# Prompt for API key setup if needed
echo "📋 Deployment Steps:"
echo ""
echo "1. Set your API key (if not already set):"
echo "   wrangler secret put API_KEY"
echo ""
echo "2. Deploy the worker:"
echo "   wrangler deploy"
echo ""
echo "3. Test the endpoint:"
echo "   curl -X POST https://systemprompt.me/api/ \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}], \"max_tokens\": 20}'"
echo ""

read -p "Do you want to set/update the API key now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    wrangler secret put API_KEY
fi

echo ""
read -p "Do you want to deploy the worker now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    wrangler deploy
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Worker deployed successfully!"
        echo ""
        echo "🧪 Test it with:"
        echo "curl -X POST https://systemprompt.me/api/ -H 'Content-Type: application/json' -d '{\"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}], \"max_tokens\": 20}'"
    else
        echo ""
        echo "❌ Deployment failed. Check the error above."
        exit 1
    fi
fi

