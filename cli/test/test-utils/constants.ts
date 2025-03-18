import { CodeNotateConfig } from "../../src";

export const EXAMPLE_CONFIG: CodeNotateConfig = {
  aiModel: "claude-3-5-sonnet-20241022",
  aiProvider: "anthropic",
  documentationFolder: "./docs",
  formatCommand: "pnpm format",
  formatDirectory: ".",
  framework: "Qwik",
  sourceFolder: "./src"
};