import { AutoApiConfig } from "../../src";

export const EXAMPLE_CONFIG: AutoApiConfig = {
  aiModel: "claude-3-5-sonnet-20241022",
  aiProvider: "anthropic",
  documentationFolder: "./docs",
  formatCommand: "pnpm format",
  formatDirectory: ".",
  framework: "Qwik",
  sourceFolder: "./src"
};