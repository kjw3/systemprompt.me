// Configuration defaults - EXAMPLE FILE
// Copy this to config.js and customize for your deployment

window.APP_CONFIG = {
    // ============================================================================
    // DEPLOYMENT CONFIGURATION - Set via GitHub Secrets
    // ============================================================================
    // These should be configured as GitHub Secrets for production deployment
    // Users can override any of these in Advanced Settings
    
    // API Base URL - Your LLM API endpoint
    // GitHub Secret: BASE_URL (optional, uses default if not set)
    defaultBaseURL: 'https://integrate.api.nvidia.com/v1',
    
    // AI Model - The model to use for analysis
    // GitHub Secret: MODEL_NAME (optional, uses default if not set)
    defaultModel: 'nvidia/llama-3.3-nemotron-super-49b-v1.5',
    
    // Admin API Key - For seamless user experience
    // GitHub Secret: ADMIN_API_KEY (required for auto-start feature)
    // Rate limiting (10 calls/min) protects your quota
    defaultApiKey: '', // Deprecated - use adminApiKey
    adminApiKey: '', // Set via GitHub Secret
    
    // ============================================================================
    // GITHUB SECRETS SETUP (Recommended for Production)
    // ============================================================================
    // Go to: Repository → Settings → Secrets and variables → Actions
    // Add these secrets:
    //
    // 1. ADMIN_API_KEY (Required)
    //    Your API key for the LLM service
    //
    // 2. BASE_URL (Optional)
    //    Your API endpoint URL
    //    Only set if using custom endpoint
    //
    // 3. MODEL_NAME (Optional)
    //    The model identifier
    //    Only set if using different model
    //
    // GitHub Actions will automatically inject these on deployment
    
    // CORS proxy for localhost development
    corsProxyURL: 'https://corsproxy.io/?',
    
    // Auto-detect localhost and use CORS proxy
    autoDetectLocalhost: true
};

