import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { CommentsInFile } from "../../types/comments-in-file.js";
import { FileWithContent } from "../../types/file-with-content.js";
import getFilesListAsMultilineString from "../get-files-list-as-multiline-string.js";
import generateWithClaude from "./generate-with-claude.js";

export default async function generateDataAttributeDocs(files: FileWithContent[], config: AutoApiConfig): Promise<CommentsInFile[]> {
  const prompt = `You are a JSON-only API. Your response must be PURE JSON with no other text.
      Required output format: [{ "filename": "component.tsx", "comments": [{ "targetLine": "data-qui-carousel-scroller", "comment": ["// The identifier for the container that enables scrolling and dragging in a carousel"] }] }]
      
      IMPORTANT: 
      - Return a direct array, not an object with a 'files' property
      - Each data-* attribute must have its own comment
      - Comment should be placed directly above the line containing the data attribute
      
      Only analyze data attributes (format: "data-*"). Example:
        return <div {...props}
          // Indicates whether the element is currently disabled
          data-disabled={isDisabled ? '' : undefined}
          // Indicates whether the element is currently checked
          data-checked={isChecked ? '' : undefined}
          // Indicates whether the element is in an indeterminate state
          data-mixed={isMixed ? '' : undefined} />;

      Files to analyze: ${getFilesListAsMultilineString(files)}`;

  return generateWithClaude(prompt, config);
}