import { Anthropic } from "@anthropic-ai/sdk";

import { CodeNotateConfig } from "../../interfaces/code-notate-config.js";
import getResponseText from "./get-response-text.js";

export default async function generateDocumentationWithAnthropic(prompt: string, config: CodeNotateConfig) {
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
    model: config.aiModel,
    temperature: 0
  });
  return getResponseText(response);
};