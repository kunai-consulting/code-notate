import { Anthropic } from "@anthropic-ai/sdk";

import { AutoApiConfig } from "../../interfaces/auto-api-config.js";

export default async function generateWithClaude(prompt: string, config: AutoApiConfig) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await anthropic.messages.create({
    // eslint-disable-next-line camelcase
    max_tokens: 8192,
    messages: [
      {
        content: prompt,
        role: "user"
      }
    ],
    model: config.aiModel
  });
  return response.content[0]?.type === "text" ? JSON.parse(response.content[0].text) : [];
};