import { CodeNotateConfig } from "../../interfaces/code-notate-config.js";
import { CommentAndTargetLine } from "../../types/comment-and-target-line.js";
import { CommentsInFile } from "../../types/comments-in-file.js";
import { FileWithContent } from "../../types/file-with-content.js";
import getFilesListAsMultilineString from "../get-files-list-as-multiline-string.js";
import generateWithClaude from "./generate-with-claude.js";

export default function generateTypeDocs(files: FileWithContent[], config: CodeNotateConfig): Promise<CommentsInFile<CommentAndTargetLine>[]> {
  const prompt = `You are a JSON-only API. Your response must be PURE JSON with no other text.
      Required output format: [{ "filename": "component.tsx", "comments": [{ "targetLine": "gap?: number;", "comment": ["/** The gap between slides */"] }] }]
      
      IMPORTANT: Return a direct array, not an object with a 'files' property.
      
      Only analyze properties within types/interfaces. Example:
      export type PublicCarouselRootProps = PropsOf<'div'> & {
        /** The gap between slides */
        gap?: number;
      };

      Documentation rules:
      - bind:x properties = "Reactive value that can be controlled via signal. Describe what passing their signal does for this bind property"
      - if a property is x, with bind: removed, it is an initial value to set when the page loads
      - regular properties = describe what the property does
      - on$ properties = "Event handler for [event] events"

      Files to analyze: ${getFilesListAsMultilineString(files)}`;

  return generateWithClaude(prompt, config);
}
