#!/usr/bin/env node
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

const testCases = [
  {
    name: "Code generation",
    system: "You are a code expert.",
    prompt:
      'Write a Python function to check if a string is a palindrome. Return only the code.',
  },
  {
    name: "Error debugging",
    system: "You are a debugging expert.",
    prompt:
      "I have this error: TypeError: Cannot read property 'map' of undefined. What causes this and how to fix?",
  },
  {
    name: "Code review",
    system: "You are a code reviewer.",
    prompt:
      'Review this code for issues:\n```javascript\nfunction add(a, b) {\n  return a + b;\n}\n```',
  },
  {
    name: "Code explanation",
    system: "You are a code educator.",
    prompt:
      "Explain this briefly:\n```const arr = [1,2,3].map(x => x * 2);```",
  },
];

async function runTests() {
  console.log("☤ Testing Claude API Connection...\n");

  if (!process.env.CLAUDE_API_KEY) {
    console.error("❌ CLAUDE_API_KEY not set!");
    console.log("Set it in .env file or: export CLAUDE_API_KEY=sk-...");
    process.exit(1);
  }

  for (const test of testCases) {
    try {
      console.log(`Testing: ${test.name}...`);
      const response = await client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 200,
        system: test.system,
        messages: [{ role: "user", content: test.prompt }],
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";
      console.log(`✅ Response (${text.length} chars):\n${text.substring(0, 100)}...\n`);
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
      process.exit(1);
    }
  }

  console.log("✅ All tests passed! Bot is ready to use.");
  console.log("\n🚀 Start bot with: npm start\n");
}

runTests();
