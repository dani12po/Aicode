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

  console.log("\n📌 Pilih API Provider:");
  console.log("  1. Anthropic Direct (console.anthropic.com)");
  console.log("  2. Agent-router (agent router service)");
  const providerChoice = await question("Pilih [1 atau 2, default: 1]: ") || "1";

  let claudeKey, apiBaseUrl = "";

  if (providerChoice === "2") {
    claudeKey = await question("2️⃣  Agent-router API Key (sk-...): ");
    apiBaseUrl = await question("3️⃣  Agent-router Base URL [default: https://api.agentrouter.ai/v1]: ");
    if (!apiBaseUrl) apiBaseUrl = "https://api.agentrouter.ai/v1";
  } else {
    claudeKey = await question("2️⃣  Anthropic API Key (dari console.anthropic.com): ");
  }

  if (!botToken || !claudeKey) {
    console.error("❌ BOT_TOKEN dan CLAUDE_API_KEY wajib!");
    process.exit(1);
  }

  let envContent = `# Telegram Bot Token dari @BotFather
BOT_TOKEN=${botToken}

# Claude API Key
CLAUDE_API_KEY=${claudeKey}`;

  if (apiBaseUrl) {
    envContent += `\n\n# Agent-router Base URL
API_BASE_URL=${apiBaseUrl}`;
  }

  envContent += `\n\n# Port untuk development (Railway auto-override)
PORT=3000

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
