import { Anthropic } from "@anthropic-ai/sdk";

import { CodeNotateConfig } from "../../interfaces/code-notate-config.js";

export default async function generateWithClaude(prompt: string, config: CodeNotateConfig) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  try {
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
  } catch (error) {
    if(error instanceof Error && error.message.includes("Could not resolve authentication method")) {
      throw new Error("Please set ANTHROPIC_API_KEY environment variable");
    }
    throw error;
  }
};