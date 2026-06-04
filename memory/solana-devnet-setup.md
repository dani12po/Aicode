---
name: solana-devnet-wallet
description: Solana devnet wallet setup for trading practice and experimentation
metadata:
  type: project
---

## Solana Devnet Setup — Trading Practice Environment

**Setup Date:** 2026-06-04
**Status:** Active & Ready

### Wallet Details

- **Public Address:** `8YbQfaX4iZJo6qy2Nwbv3WM9mECD895YR4yCQfgU61ud`
- **Network:** Devnet (testnet)
- **RPC Endpoint:** https://api.devnet.solana.com
- **Secret Key Location:** `.solana/devnet-wallet.json` (git-ignored, local only)

### Current Balance

- Started with 0 SOL
- Faucet airdrop failed (rate limit) — will retry later or use alternative faucet

### Tools Created

1. **solana-setup.js** — Wallet creation & faucet management
   - Auto-creates keypair if missing
   - Stores secret key locally with 0600 permissions
   - Attempts devnet airdrop (2 SOL)

2. **devnet-trader.js** — Simulated trading practice
   - Simulates buy/sell trades on meme coins (BONK, WIF, MOG)
   - Calculates P&L with realistic price fluctuations
   - Generates trade history & reports
   - No real transactions (100% safe practice)

### Next Steps

1. **Get devnet SOL:**
   - Retry faucet airdrop after cooldown
   - Or use: https://solana.fm/tools/airdrop (alternative faucet)
   - Or visit: https://faucet.orca.so/

2. **Practice trades:**
   - Run `node devnet-trader.js` for simulated trading
   - Learn order mechanics, slippage, P&L calculation
   - No risk — devnet SOL is worthless

3. **Next level:**
   - Integrate with Marinade/Raydium swap interfaces
   - Build arbitrage bot for practice
   - Monitor real meme coin pairs (reference only)

### Security

- Secret key stored locally with restricted permissions
- Never commit `.solana/` directory to git
- Wallet info saved in `.solana/wallet-info.json`
- All devnet transactions = zero risk

**Why:** Learning environment to practice Solana trading patterns without risking real funds. Once proficient on devnet, can migrate to mainnet with real strategy.
