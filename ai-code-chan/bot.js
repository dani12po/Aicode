#!/usr/bin/env node
import Anthropic from "@anthropic-ai/sdk";
import { Telegraf, session } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL;

if (!BOT_TOKEN) {
  console.error("Missing BOT_TOKEN");
  process.exit(1);
}

if (!CLAUDE_API_KEY) {
  console.error("Missing CLAUDE_API_KEY");
  process.exit(1);
}

console.log(`[DEBUG] Bot Token: ${BOT_TOKEN.slice(0, 20)}...`);
console.log(`[DEBUG] API Key: ${CLAUDE_API_KEY.slice(0, 20)}...`);
if (API_BASE_URL) console.log(`[DEBUG] API Base URL: ${API_BASE_URL}`);

const bot = new Telegraf(BOT_TOKEN);

// Support both Anthropic direct + agent-router
let client;
const isAgentRouter = CLAUDE_API_KEY?.startsWith("sk-") && API_BASE_URL;
if (isAgentRouter) {
  // Agent-router mode
  client = new Anthropic({
    apiKey: CLAUDE_API_KEY,
    baseURL: API_BASE_URL,
    defaultHeaders: { "anthropic-version": "2023-06-01" }
  });
} else {
  // Anthropic direct
  client = new Anthropic({ apiKey: CLAUDE_API_KEY });
}

// Session middleware untuk track context per user
bot.use(session());

// Helper: Chat dengan Claude
async function askClaude(prompt, systemPrompt) {
  try {
    const message = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    });
    return message.content[0].type === "text" ? message.content[0].text : "";
  } catch (error) {
    console.error(`[API Error] ${error.message}`);
    if (error.status === 401) {
      console.warn("[FALLBACK] Using mock response - API key may be invalid");
      return `[Mock Response - API Key Issue]\n\nYour API key appears to be invalid (401 Unauthorized).\n\nPlease:\n1. Check your CLAUDE_API_KEY in .env\n2. Get a valid key from: https://console.anthropic.com/account/keys\n3. Restart the bot with: npm start`;
    }
    throw error;
  }
}

// /start
bot.start((ctx) => {
  ctx.reply(`✨ **AI Code Chan** — Coding Assistant with Claude\n\n` +
    `Available commands:\n` +
    `/code - Generate code dari description\n` +
    `/debug - Analyze dan fix error\n` +
    `/review - Code review\n` +
    `/explain - Jelaskan code snippet\n` +
    `/help - Detail semua commands\n`,
    { parse_mode: "Markdown" }
  );
});

// /help
bot.command("help", (ctx) => {
  ctx.reply(
    `**📚 AI Code Chan Commands**\n\n` +
    `**/code** <description>\n` +
    `Generate code dari natural language description.\n` +
    `Contoh: /code create function untuk check palindrome\n\n` +
    `**/debug** <error message>\n` +
    `Analyze error dan suggest fix.\n` +
    `Bisa paste code + error message.\n\n` +
    `**/review** <code>\n` +
    `Code review — quality, perf, security.\n\n` +
    `**/explain** <code>\n` +
    `Jelaskan code snippet.\n\n` +
    `**/lang** <language>\n` +
    `Set preferred language (Python, JS, Go, etc).\n\n` +
    `**/clear**\n` +
    `Clear session context.`,
    { parse_mode: "Markdown" }
  );
});

// Initialize user session
function ensureSession(ctx) {
  if (!ctx.session) ctx.session = {};
  if (!ctx.session.language) ctx.session.language = "JavaScript";
  if (!ctx.session.context) ctx.session.context = [];
}

// /lang
bot.command("lang", (ctx) => {
  ensureSession(ctx);
  const lang = ctx.message.text.replace("/lang", "").trim();
  if (!lang) {
    ctx.reply("Current language: " + ctx.session.language);
    return;
  }
  ctx.session.language = lang;
  ctx.reply(`Language set to: ${lang}`);
});

// /clear
bot.command("clear", (ctx) => {
  ensureSession(ctx);
  ctx.session.context = [];
  ctx.reply("Session cleared ✓");
});

// /code - Generate code
bot.command("code", async (ctx) => {
  ensureSession(ctx);
  const description = ctx.message.text.replace("/code", "").trim();
  if (!description) {
    ctx.reply("Usage: /code <description>");
    return;
  }

  await ctx.sendChatAction("typing");

  const prompt = `Generate clean, production-ready code based on:\n\n${description}\n\nLanguage: ${ctx.session.language}\n\nProvide only the code, no explanation.`;
  const systemPrompt = `You are a code generation expert. Generate clean, efficient code. Language: ${ctx.session.language}`;

  try {
    const code = await askClaude(prompt, systemPrompt);
    ctx.reply(`\`\`\`${ctx.session.language.toLowerCase()}\n${code}\n\`\`\``, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    ctx.reply(`❌ Error: ${error.message}`);
  }
});

// /debug - Debug code
bot.command("debug", async (ctx) => {
  ensureSession(ctx);
  const input = ctx.message.text.replace("/debug", "").trim();
  if (!input) {
    ctx.reply("Usage: /debug <error message or code + error>");
    return;
  }

  await ctx.sendChatAction("typing");

  const prompt = `Analyze this error and provide fix:\n\n${input}\n\nProvide:\n1. Root cause\n2. Solution\n3. Fixed code\n\nLanguage: ${ctx.session.language}`;
  const systemPrompt = `You are a debugging expert. Help fix errors step-by-step.`;

  try {
    const response = await askClaude(prompt, systemPrompt);
    ctx.reply(response);
  } catch (error) {
    ctx.reply(`❌ Error: ${error.message}`);
  }
});

// /review - Code review
bot.command("review", async (ctx) => {
  ensureSession(ctx);
  const code = ctx.message.text.replace("/review", "").trim();
  if (!code) {
    ctx.reply("Usage: /review <code snippet>");
    return;
  }

  await ctx.sendChatAction("typing");

  const prompt = `Review this code for quality, performance, and security:\n\n\`\`\`\n${code}\n\`\`\`\n\nProvide:\n1. Issues found\n2. Improvements\n3. Performance tips\n4. Security concerns`;
  const systemPrompt = `You are a senior code reviewer. Be constructive and specific.`;

  try {
    const review = await askClaude(prompt, systemPrompt);
    ctx.reply(review);
  } catch (error) {
    ctx.reply(`❌ Error: ${error.message}`);
  }
});

// /explain - Explain code
bot.command("explain", async (ctx) => {
  ensureSession(ctx);
  const code = ctx.message.text.replace("/explain", "").trim();
  if (!code) {
    ctx.reply("Usage: /explain <code snippet>");
    return;
  }

  await ctx.sendChatAction("typing");

  const prompt = `Explain this code clearly:\n\n\`\`\`\n${code}\n\`\`\`\n\nExplain:\n1. What it does\n2. Key functions/concepts\n3. How to use it`;
  const systemPrompt = `You are a clear code educator. Explain technical concepts simply.`;

  try {
    const explanation = await askClaude(prompt, systemPrompt);
    ctx.reply(explanation);
  } catch (error) {
    ctx.reply(`❌ Error: ${error.message}`);
  }
});

// Text handler — auto-detect intent
bot.on("text", async (ctx) => {
  ensureSession(ctx);
  const text = ctx.message.text;

  // Auto-detect command-like patterns
  if (text.includes("error") || text.includes("Error")) {
    ctx.reply("🔍 Looks like debugging. Use `/debug <error>` for direct help.");
  } else if (
    text.includes("review") ||
    text.includes("check this code")
  ) {
    ctx.reply(
      "👀 For code review, use `/review <code>` command."
    );
  } else if (text.includes("explain")) {
    ctx.reply("📖 For explanation, use `/explain <code>` command.");
  } else {
    ctx.reply(
      "💬 Use commands:\n/code, /debug, /review, /explain, /help"
    );
  }
});

// Error handler
bot.catch((err) => {
  console.error("Bot error:", err);
});

// Start bot
async function main() {
  if (WEBHOOK_URL) {
    // Railway: webhook mode
    await bot.telegram.setWebhook(WEBHOOK_URL);
    const express = (await import("express")).default;
    const app = express();
    app.use(bot.webhookCallback("/webhook"));
    app.listen(PORT, () => console.log(`🚀 Bot running on port ${PORT}`));
  } else {
    // Local: polling mode
    console.log("🤖 AI Code Chan starting (polling mode)...");
    bot.launch();
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
  }
}

main().catch(console.error);
