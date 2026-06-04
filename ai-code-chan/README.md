# AI Code Chan - Telegram Coding Bot 🤖

Your personal AI code assistant on Telegram, powered by Claude.

## Features

- **`/code`** — Generate production-ready code dari natural language
- **`/debug`** — Analyze errors dan suggest fixes dengan penjelasan
- **`/review`** — Professional code review (quality, perf, security)
- **`/explain`** — Jelaskan code snippet dengan mudah dipahami
- **`/lang`** — Switch bahasa (Python, JavaScript, Go, Rust, dll)
- **`/clear`** — Reset session context

## Quick Start

### 1. Setup (First Time Only)

```bash
npm install
npm run setup
```

Wizard ini akan minta:
- **BOT_TOKEN** — dari @BotFather di Telegram
- **CLAUDE_API_KEY** — dari https://console.anthropic.com/account/keys

### 2. Test API Connection

```bash
npm test
```

### 3. Run Locally

```bash
npm start
```

Bot akan running di **polling mode** (menerima updates dari Telegram setiap detik). Buka Telegram, cari bot kamu, send `/start`.

## Getting API Keys

### Telegram BOT_TOKEN

1. Open Telegram → search `@BotFather`
2. Send `/newbot`
3. Follow prompts (nama bot, username)
4. Copy token yang di-generate

### Anthropic CLAUDE_API_KEY

1. Go to https://console.anthropic.com/account/keys
2. Login dengan akun Anthropic
3. Click "Create Key"
4. Copy key (save securely!)

## Environment Variables

| Variable | Required | Source |
|----------|----------|--------|
| `BOT_TOKEN` | ✅ | @BotFather |
| `CLAUDE_API_KEY` | ✅ | console.anthropic.com |
| `PORT` | ❌ | Default: 3000 |
| `WEBHOOK_URL` | ❌ | Auto-set di Railway |

## Deploy to Railway

Siap jalan di production dengan Railway (free tier available).

### Steps:

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-code-chan
git push -u origin main
```

2. **Connect Railway:**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `ai-code-chan` repository
   - Railway auto-detects Node.js

3. **Add Environment Variables:**
   - In Railway dashboard → Variables
   - Add `BOT_TOKEN` (dari @BotFather)
   - Add `CLAUDE_API_KEY` (dari Anthropic)
   - Add `WEBHOOK_URL = https://YOUR_RAILWAY_DOMAIN/webhook` (Railway will provide domain)

4. **Deploy:**
   - Railway auto-deploys on push
   - Bot switches to **webhook mode** automatically
   - Status: ✅ Running

**Why Railway?**
- Free tier (generous limits)
- Auto-deploys on git push
- Environment variables managed in UI
- 24/7 uptime (no polling needed)
- Instant scaling

## Commands Reference

| Command | Example | Output |
|---------|---------|--------|
| `/code` | `/code factorial function in Python` | Generated code |
| `/debug` | `/debug TypeError: undefined is not a function` | Root cause + fix |
| `/review` | `/review [paste code here]` | Issues + improvements |
| `/explain` | `/explain const x = arr.reduce((a,b) => a+b);` | Clear explanation |
| `/lang` | `/lang Python` | Switches language |
| `/clear` | `/clear` | Clears context |
| `/help` | `/help` | All commands |

## How It Works

### Local (Polling)

```
User sends /code  →  Bot polls Telegram API  →  Bot asks Claude  →  Claude responds  →  Bot replies
```

Simple, reliable, good for development.

### Railway (Webhook)

```
User sends /code  →  Telegram POSTs webhook  →  Railway routes to bot  →  Bot asks Claude  →  Claude responds  →  Bot replies
```

Faster, production-ready, scales automatically.

## Troubleshooting

### Bot tidak reply?
- ✅ Check `.env` punya `BOT_TOKEN` + `CLAUDE_API_KEY`
- ✅ Run `npm test` untuk verify API connection
- ✅ Check internet connection
- ✅ Restart bot: `npm start`

### API Key invalid?
- Verify keys di console.anthropic.com
- Re-run `npm run setup`
- Check `.env` file not corrupted

### Errors di Railway?
- Check Railway logs: Dashboard → Logs
- Verify env variables sudah set
- Check git push successful

## Project Structure

```
ai-code-chan/
├── bot.js          # Main bot + Claude integration
├── setup.js        # Interactive setup wizard
├── test-api.js     # API connection tester
├── .env            # Credentials (local only, gitignored)
├── .env.example    # Template
├── .gitignore      # Hide secrets
├── Procfile        # Heroku config
├── railway.toml    # Railway config
├── package.json    # Dependencies + scripts
└── README.md       # This file
```

## Development

Make changes → test locally → push to GitHub → auto-deploy to Railway.

```bash
# Local development
npm start

# Test API calls
npm test

# Setup new environment
npm run setup
```

## License

MIT — Free to use, modify, share.

## Next Steps

- [ ] Persist conversations (PostgreSQL)
- [ ] File upload support
- [ ] Multi-language expansion
- [ ] Advanced syntax highlighting
- [ ] Conversation history
- [ ] User preferences storage

---

**Questions?** Check Claude docs or Railway docs.

**Ready?** Run `npm run setup` then `npm start` 🚀
