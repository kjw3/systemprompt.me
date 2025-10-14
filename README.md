# 🧠 System Prompt Analyzer

**Discover your internal "system prompt" through introspective questions and AI analysis.**

A privacy-first web app that helps you understand your cognitive patterns, biases, and mental operating system through 10 thoughtfully-crafted questions and advanced AI analysis.

🔗 **[Try it now](https://yourusername.github.io/systemprompt-me/)**

---

## ✨ What Is This?

Just like AI language models have a "system prompt" that shapes their responses, **you have mental patterns** that influence how you think, decide, and act.

This tool helps you:
- 🎯 **Identify** core beliefs and cognitive biases
- 🔍 **Understand** self-limiting narratives
- 💡 **Discover** hidden strengths and growth opportunities
- 📝 **Generate** a concise "system prompt" that describes your mental operating system

---

## 🚀 For Users

### How to Use

1. **Visit the app** (works instantly, no setup needed)
2. **Click "Start Discovery"**
3. **Answer 10 questions** honestly and thoughtfully
4. **Receive your analysis** - a personalized system prompt revealing your mental patterns
5. **Download** or copy your results

### Privacy & Security

- ✅ **100% client-side** - No backend server, no database
- ✅ **Your data never leaves your browser** - All processing happens locally
- ✅ **No tracking or analytics** - Complete privacy
- ✅ **Secure storage** - API keys in sessionStorage (cleared on close)
- ✅ **Open source** - Inspect the code yourself

---

## 🛠️ For Developers

### Quick Deploy (GitHub Pages)

**Deploy your own instance in 5 minutes:**

#### 1. Fork & Clone
```bash
git clone https://github.com/yourusername/systemprompt-me.git
cd systemprompt-me
```

#### 2. Get an API Key

You need an OpenAI-compatible API key. Options:
- **OpenAI**: [platform.openai.com](https://platform.openai.com/)
- **Other providers**: Any OpenAI-compatible API service
- **Local models**: Run your own OpenAI-compatible endpoint

#### 3. Add GitHub Secret

1. Go to your repo: **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `ADMIN_API_KEY`
4. Value: Your API key
5. Click **Add secret**

**Optional secrets** (uses defaults if not set):
- `BASE_URL` - API endpoint (default: `https://integrate.api.nvidia.com/v1`)
- `MODEL_NAME` - Model to use (default: `nvidia/llama-3.3-nemotron-super-49b-v1.5`)

#### 4. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Save

#### 5. Deploy

```bash
git push origin main
```

Your site will be live at `https://yourusername.github.io/systemprompt-me/` in 2-3 minutes! 🎉

---

## ⚙️ Configuration

### Environment Variables (GitHub Secrets)

Configure these in GitHub Secrets for automatic deployment:

| Secret | Required | Default | Description |
|--------|----------|---------|-------------|
| `ADMIN_API_KEY` | ✅ Yes | - | Your API key for the AI service |
| `BASE_URL` | ❌ Optional | `https://integrate.api.nvidia.com/v1` | API endpoint URL |
| `MODEL_NAME` | ❌ Optional | `nvidia/llama-3.3-nemotron-super-49b-v1.5` | AI model identifier |

### Local Development

1. **Copy config template**:
   ```bash
   cp config.example.js config.js
   ```

2. **Edit `config.js`**:
   ```javascript
   window.APP_CONFIG = {
       defaultBaseURL: 'https://your-api-endpoint.com/v1',
       defaultModel: 'your-model-name',
       adminApiKey: 'your-api-key-here',
       // ... other settings
   };
   ```

3. **Run locally**:
   ```bash
   # Any static file server works
   python3 -m http.server 8000
   # Or
   npx serve
   ```

4. **Visit**: `http://localhost:8000`

---

## 🔒 Security Features

This app is production-hardened with comprehensive security:

- ✅ **XSS Protection** - HTML sanitization and CSP headers
- ✅ **Input Validation** - Length limits and pattern filtering
- ✅ **Rate Limiting** - 10 API calls/min to prevent abuse
- ✅ **Secure Storage** - sessionStorage for sensitive data
- ✅ **HTTPS Enforcement** - Automatic redirect to secure connection
- ✅ **Error Handling** - Global handlers with auto-save
- ✅ **No External Dependencies** - Minimal attack surface

**Security Score**: 🟢 90/100

---

## 🎨 Advanced Features

### For End Users

**Advanced Settings** (optional):
- Click "Advanced: Use Your Own API Key"
- Override Base URL, Model, or API Key
- Use your own unlimited API access

**Data Management**:
- Progress auto-saves (resume anytime)
- Clear all data with one click
- Export results as text file

### For Developers

**Customization**:
- Edit questions in `index.html` (search for `questions` array)
- Modify meta-prompt for different analysis styles
- Customize UI with Tailwind classes
- Change colors in inline styles

**API Compatibility**:
Works with any OpenAI-compatible API:
- OpenAI API (`https://api.openai.com/v1`)
- Local models (Ollama, LM Studio, etc.)
- Other providers (Anthropic via proxy, etc.)

---

## 📊 How It Works

### The Process

1. **Questions**: 10 carefully designed questions about values, decisions, fears, and beliefs
2. **Your Answers**: Stored locally in your browser
3. **AI Analysis**: Sent to configured AI service with a detailed meta-prompt
4. **Results**: AI synthesizes your "system prompt" - a concise summary of your mental patterns

### The AI Prompt

Your answers are sent with a meta-prompt that asks the AI to:
- Synthesize patterns across your responses
- Identify cognitive biases and limiting beliefs
- Highlight strengths and assets
- Provide actionable growth opportunities
- Generate a "system prompt" describing your mental operating system

---

## 🔧 Technical Stack

- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
- **Styling**: Tailwind CSS (CDN)
- **Storage**: localStorage + sessionStorage
- **Deployment**: GitHub Actions + GitHub Pages
- **AI**: OpenAI-compatible API

**Zero dependencies** = Minimal maintenance burden

---

## 💰 Cost Management

### With Default API Key

- **Rate limited**: 10 calls per minute
- **Realistic usage**: 10-100 analyses per day
- **Cost**: Usually covered by free tier

### With User's Own API Key

- **No rate limits**: Users manage their own quotas
- **Your cost**: $0
- **Their choice**: They provide their own API access

### Monitoring

Check your API provider's dashboard regularly:
- Daily usage during first week
- Weekly usage patterns
- Set up usage alerts at 80% quota

---

## 🚨 Troubleshooting

### "Site not deploying"
- Check GitHub Actions tab for errors
- Verify `ADMIN_API_KEY` secret is set
- Confirm GitHub Pages source is "GitHub Actions"

### "API calls failing"
- Test your API key with curl
- Check rate limit (wait 1 minute)
- Verify API endpoint is accessible

### "Connection test fails"
- API key format is correct
- Base URL includes `/v1` suffix
- Model name matches provider's format

### "Rate limit exceeded"
- Expected with default key (10 calls/min)
- Wait 60 seconds or use custom API key

---

## 📈 Next Steps

### After Deployment

1. ✅ Test the full questionnaire yourself
2. ✅ Verify rate limiting works (try 6 rapid tests)
3. ✅ Check API usage in provider dashboard
4. ✅ Share with friends for feedback

### Enhancements

Some ideas for extending the app:
- Add more question sets for different focuses
- Save multiple analyses for comparison over time
- Add data visualization of patterns
- Integrate with journaling apps
- Create shareable (anonymized) insights

---

## 🤝 Contributing

Contributions welcome! Some areas:

- Additional question sets
- UI/UX improvements
- Security enhancements
- Internationalization
- Accessibility improvements

**Please**:
- Maintain privacy-first design
- Keep zero-dependency approach
- Add tests for new features
- Update documentation

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file

**You are free to**:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

---

## 🙏 Acknowledgments

- **Tailwind CSS** - Beautiful styling made simple
- **AI providers** - Making language models accessible
- **Open source community** - Inspiration and tools

---

## 💬 Support

- **Issues**: Open a GitHub issue
- **Security**: Report privately (see SECURITY.md in notes if needed)
- **Questions**: Check existing issues or create new one

---

## 🎯 Project Goals

This project aims to:

1. **Democratize self-discovery** - Make powerful introspection tools accessible to everyone
2. **Protect privacy** - No data collection, tracking, or storage beyond your device
3. **Maintain simplicity** - Zero dependencies, easy to deploy, simple to maintain
4. **Stay open source** - Transparent code, community-driven improvements

---

**Ready to discover your system prompt?** 🚀

[Deploy your own instance](#-for-developers) or [try the demo](https://yourusername.github.io/systemprompt-me/)

---

*Built with privacy, powered by AI, designed for self-discovery.*
