# MEMORY.md — Hermes Long-Term Memory

Curated memories dari conversations dengan Dani. Ini adalah konteks persistent yang inform setiap interaction.

## User Profile

- **Name:** Dani (Dani.xyz / Dani12po)
- **Timezone:** Asia/Jakarta (GMT+7)
- **Preferences:** Kasual, professional, always to-the-point. No unnecessary words.
- **Communication:** Indonesian sebagai default, direct dan action-oriented

## Ongoing Projects & Context

- **Agent identity:** Hermes — self-improving agent (setup 2026-06-04)
- **Repository references:** 
  - https://github.com/nousresearch/hermes-agent (Hermes agent reference)
  - https://github.com/dhimaszs/How-To-Make-Create-Your-AI-Agent-Smart (smart agent guide applied)

## AI Code Chan - Telegram Bot (2026-06-04)

**Status:** ✅ **ACTIVE in production** — Migrated to DeepSeek API (fallback), Telegram bot live + responding

**Location:** `ai-code-chan/` — complete Telegram bot with Claude integration (fallback: DeepSeek-V4-Flash)

**Features:**
- `/code` — Generate code dari natural language
- `/debug` — Analyze errors + suggest fixes
- `/review` — Professional code review
- `/explain` — Explain code snippets
- `/lang` — Switch preferred language

**Setup (One-time):**
```bash
cd ai-code-chan
npm run setup        # Interactive wizard for API keys
npm test             # Verify Claude API connection
npm start            # Local polling mode
```

**Deployment:**
- **Local:** `npm start` → polling mode (1-3 sec response)
- **Railway:** Push to GitHub → auto-deploy → webhook mode (<100ms response)
- **DEPLOYMENT.md:** Complete step-by-step guide included

**Scripts:**
- `npm run setup` — Interactive API key wizard
- `npm test` — Test Claude API connection
- `npm start` — Run bot locally
- `npm run dev` — Same as start

**Files:**
- `bot.js` — Main bot logic (Telegraf + Claude API)
- `setup.js` — Interactive setup wizard
- `test-api.js` — API connection tester
- `.env.example` — Template with instructions
- `DEPLOYMENT.md` — Complete local + Railway guide
- `railway.toml` + `Procfile` — Deployment config

**Railway Deployment Checklist:**
- [ ] Get `BOT_TOKEN` from @BotFather
- [ ] Get `CLAUDE_API_KEY` from console.anthropic.com
- [ ] Run `npm run setup` locally to test
- [ ] Push to GitHub
- [ ] Go to railway.app → New Project → Deploy from GitHub
- [ ] Add env vars in Railway dashboard
- [ ] Deploy button → automatic build + deploy
- [ ] Bot switches to webhook mode automatically

**Dependencies:**
- telegraf 4.16 — Telegram bot framework
- @anthropic-ai/sdk 0.28 — Claude API client
- express 4.21 — Webhook server for Railway
- dotenv 16.4 — Environment variable management

**Commits:** 
- 25099e3 — "🤖 AI Code Chan - Complete Telegram coding bot"
- 0d86093 — "🔄 Migrate AI Code Chan bot to DeepSeek API fallback"
- bf0de65 — "📸 Add CLI environment screenshots"

**Live Bot Handle:** @aicodechan_bot (Telegram) — active, responding to /code, /debug, /review, /explain commands

## Learned Preferences

- Direct application preferred — skip planning, just execute
- Indonesian casual language (gue/lo) sebagai default
- Preference untuk automation dan parallelization
- Interest di crypto/Web3 (meme coins, DeFi)

## Active Skills & Systems

- Self-improving loop: remember → explore → create → delegate → schedule → reflect
- Operational rails for security (no key logging, user-funds-only, etc.)
- Cross-session memory persistence
- Subagent parallelization untuk complex tasks

## Solana Devnet Trading Practice

- **Wallet:** `8YbQfaX4iZJo6qy2Nwbv3WM9mECD895YR4yCQfgU61ud` (devnet)
- **Setup:** 2026-06-04 — created solana-setup.js + devnet-trader.js
- **Purpose:** Practice trading on testnet (zero risk, real Solana mechanics)
- **Tools:** simulated trading with buy/sell/P&L tracking
- **Status:** Ready for practice; awaiting devnet SOL faucet

## Autonomous Infrastructure (2026-06-04)

**Deployed Systems:**
- `.env` — environment variables template (API keys, credentials)
- `.gitignore` — secure secrets management (never commit keys)
- `self-improvement-loop.js` — main autonomous loop (trading → analysis → learning → GitHub commit)
- `self-monitoring.js` — continuous health checks & metrics collection
- `autonomy-config.js` — strategy versioning, skill creation, learning management
- `setup-api-keys.js` — interactive API key setup wizard

**Cron Automation (via OpenClaw):**
1. **hermes-auto-trading-session** — every 2h (0 */2 * * * Asia/Jakarta)
   - Execute trading session with strategy testing
   - Analyze performance & record learnings
   - Commit results to GitHub
   
2. **hermes-health-check** — every 30m (*/30 * * * * Asia/Jakarta)
   - Collect system metrics (memory, uptime, performance)
   - Log to `memory/metrics.json`
   
3. **hermes-daily-summary** — daily 20:00 (0 20 * * * Asia/Jakarta)
   - Generate trading statistics & cumulative P&L
   - Update MEMORY.md with insights
   - Report to Telegram

**API Keys (Free Tier):**
- ✅ CoinGecko — public API (no key needed)
- ⏳ GitHub — for commit logs & automation
- ⏳ Supabase — PostgreSQL for trading history persistence
- ⏳ Sentry — error tracking & monitoring
- ⏳ NewsAPI — market sentiment & monitoring

**Memory System:**
- `memory/session_YYYY-MM-DD.md` — daily session logs
- `memory/learnings.json` — recorded insights (auto-generated from trading analysis)
- `memory/metrics.json` — performance metrics (1000 data points rolling)
- `memory/autonomy-config.json` — strategy versions & learning config

**Learning Loop:**
1. Trading session executes (real strategy testing, risk management)
2. Performance analyzed (P&L %, win rate, token correlation)
3. Insights recorded (pattern recognition, strategy adjustments)
4. Results committed to GitHub (durable record of improvement)
5. Health metrics collected (uptime, resource usage, performance trends)
6. Daily summary updates MEMORY.md (curated learnings)

## Kintara.gg Automation Suite (2026-06-04)

**Location:** `D:\utils` — complete farming + trading bot by DANIXYZ

**Status:** Production-ready, tested on 24+ accounts

**Core Components:**
- `bot.mjs` — Multi-account farming bot (concurrent login, farming rotation)
- `farming.mjs` — Backpack management, inventory, action execution
- `trade.mjs` — Auto-sell + merchant pipeline (cook → gold)
- `leveling.mjs` — Skill XP tracking, auto-leveling system
- `browser-bot.mjs` — Playwright browser automation (fishing & combat XP)
- `api.mjs` — HTTP API wrapper (Solana auth, game endpoints)

**Revenue Model:**
- **Farming:** ~700 gold per 15-min cycle (wood/stone/coal selling)
- **Merchant:** 25 cooked_fish + resources → 1 gold + cooking XP
- **Daily quests:** ~300 gold per account daily + 450 XP
- **Estimated daily:** 24 accounts × ~1,440 gold = ~34,560 gold/day

**Deployment:**
```bash
npm run bot &          # Main farming
npm run fish &         # Browser bot (fishing XP)
```

**Configuration (from .env):**
- `SWING_DELAY_MS=600` — Resource gathering delay
- `FARM_ROTATION_SIZE=20` — Items per resource before rotation
- `TARGET_SKILL_LEVEL=20` — Auto-level target
- `AUTO_QUEST=true` — Auto-gather quests
- `GOLD_PIPELINE=true` — Cook & trade automation
- `LOGIN_CONCURRENCY=5` — Max concurrent accounts
- `GOLD_PIPELINE_MS=30000` — Pipeline check frequency
