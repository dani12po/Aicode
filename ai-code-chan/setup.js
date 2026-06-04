#!/usr/bin/env node
import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log("\n☤ AI Code Chan - Setup Wizard\n");
  console.log("Gue bantu setup API keys dan konfigurasi.\n");

  const botToken = await question(
    '1️⃣  Telegram BOT_TOKEN (dari @BotFather): '
  );
  const claudeKey = await question(
    '2️⃣  Anthropic CLAUDE_API_KEY (dari console.anthropic.com): '
  );
  const port = await question("3️⃣  PORT (default: 3000): ") || "3000";

  if (!botToken || !claudeKey) {
    console.error("❌ BOT_TOKEN dan CLAUDE_API_KEY wajib!");
    process.exit(1);
  }

  const envContent = `# Telegram Bot Token dari @BotFather
BOT_TOKEN=${botToken}

# Anthropic API Key dari https://console.anthropic.com/account/keys
CLAUDE_API_KEY=${claudeKey}

# Port untuk development (Railway auto-override)
PORT=${port}

# Webhook URL (auto-set saat deploy Railway)
WEBHOOK_URL=

# Environment
NODE_ENV=development
`;

  fs.writeFileSync(".env", envContent);
  console.log("\n✅ .env file created!\n");

  console.log("📦 Install dependencies:");
  console.log("   npm install\n");

  console.log("🚀 Start bot (local polling):");
  console.log("   npm start\n");

  console.log(
    "🚢 Deploy ke Railway: https://railway.app → New project → Import from GitHub\n"
  );

  rl.close();
}

main().catch(console.error);
