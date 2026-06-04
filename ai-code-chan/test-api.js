#!/usr/bin/env node
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.CLAUDE_API_KEY;
const API_BASE_URL = process.env.API_BASE_URL || "https://openrouter.io/api/v1";
const MODEL = process.env.MODEL || "deepseek/deepseek-chat";

console.log("☤ Testing LLM API Connection...\n");

if (!API_KEY) {
  console.error("❌ CLAUDE_API_KEY not set!");
  console.log("Set it in .env file or: export CLAUDE_API_KEY=sk-...");
  process.exit(1);
}

console.log(`API Endpoint: ${API_BASE_URL}`);
console.log(`Model: ${MODEL}`);
console.log(`API Key: ${API_KEY.slice(0, 20)}...${API_KEY.slice(-4)}\n`);

async function testConnection() {
  try {
    console.log("Sending request...");
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://localhost:3000",
        "X-Title": "AI Code Chan Bot"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 100,
        messages: [
          { role: "user", content: "Say hello in one word" }
        ]
      })
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    const data = await response.text();
    console.log(`Response body:\n${data.substring(0, 500)}\n`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = JSON.parse(data);
    const text = json.choices?.[0]?.message?.content || "No response";
    console.log(`✅ Success! Response:\n${text}\n`);
    console.log("🚀 Bot ready! Start with: npm start");

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);

    console.log("\n💡 Troubleshooting tips:");
    console.log("1. Check API_BASE_URL is correct for your provider");
    console.log("2. Check API_KEY is valid and not expired");
    console.log("3. Try different endpoints:");
    console.log("   - OpenRouter: https://openrouter.io/api/v1");
    console.log("   - DeepSeek: https://api.deepseek.com/v1");
    console.log("   - Local: http://localhost:8000/v1");
    process.exit(1);
  }
}

testConnection();
