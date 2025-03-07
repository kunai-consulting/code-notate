import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { FileWithContent } from "../../types/file-with-content.js";
import { KeyInteractionComment } from "../../types/key-interaction-comment.js";
import getFilesListAsMultilineString from "../get-files-list-as-multiline-string.js";
import generateWithClaude from "./generate-with-claude.js";

export default function generateKeyboardDocs(files: FileWithContent[], config: AutoApiConfig): Promise<KeyInteractionComment[]> {
  const prompt = `You are a JSON-only API. Your response must be PURE JSON with no other text.
      Required output format: [
        { "key": "Enter", "comment": "When focus is on the input, selects the focused item" }
        { "key": "Space", "comment": "When focus is on the input, selects the focused item" },
        { "key": "ArrowDown", "comment": "When the combobox is closed, opens the combobox. When the combobox is open, moves focus to the next item" },
        { "key": "ArrowUp", "comment": "When the combobox is closed, opens the combobox. When the combobox is open, moves focus to the previous item" },
        { "key": "Home", "comment": "When the combobox is open, moves focus to the first item" },
        { "key": "End", "comment": "When the combobox is open, moves focus to the last item" },
        { "key": "Escape", "comment": "Closes the combobox" },
        { "key": "Tab", "comment": "When the combobox is open, closes the combobox" },
        { "key": "Any", "comment": "When the combobox is open and focus is on the input, types the character into the input" }
      ]

      Analyze the component files and provide keyboard interaction documentation.
      Be specific about which part of the component is being interacted with.
      
      Files to analyze: ${getFilesListAsMultilineString(files)}`;

  return generateWithClaude(prompt, config);
}
