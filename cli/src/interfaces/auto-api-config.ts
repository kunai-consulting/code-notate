import { AIProvider } from "../types/ai-provider.js";

export interface AutoApiConfig {
  /** The LLM model to use */
  aiModel: string;
  /** The LLM provider. Currently only Anthropic is supported */
  aiProvider: AIProvider;
  /** The folder where API information and documentation is stored */
  documentationFolder: string;
  /** The command to use to format the code.
   * Helps ensure that any code the tool touches is formatted correctly. */
  formatCommand?: string;
  /** The directory where the format command can be run */
  formatDirectory?: string;
  /** The folder where the code resides, to be analyzed and documented */
  sourceFolder: string;
}