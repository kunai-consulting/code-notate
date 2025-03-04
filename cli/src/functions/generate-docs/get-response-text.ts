import { Anthropic } from "@anthropic-ai/sdk";

export default function getResponseText(response: Anthropic.Messages.Message) {
  const content = response.content[0];
  return content?.type === "text" ? content.text : "";
}