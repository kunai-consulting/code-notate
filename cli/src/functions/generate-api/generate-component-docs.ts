import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { CommentAndTargetLine } from "../../types/comment-and-target-line.js";
import { CommentsInFile } from "../../types/comments-in-file.js";
import { FileWithContent } from "../../types/file-with-content.js";
import getFilesListAsMultilineString from "../get-files-list-as-multiline-string.js";
import generateWithClaude from "./generate-with-claude.js";

export default async function generateComponentDocs(files: FileWithContent[], config: AutoApiConfig):
  Promise<CommentsInFile<CommentAndTargetLine>[]> {
  const prompt = `You are a JSON-only API. Your response must be PURE JSON with no other text.
      Required output format: [{ "filename": "component.tsx", "comments": [{ "targetLine": "export const Button = component$", "comment": ["/** A button component */"] }] }]

      IMPORTANT: Return a direct array, not an object with a 'files' property.
      
      Only analyze component definitions (anything with component$ call). Example:
      // The button that opens the popover panel when clicked
      export const PopoverTrigger = component$((props: PropsOf<"button">) => {
        return <button onClick$={...} {...props} />;
      });

      Files to analyze: ${getFilesListAsMultilineString(files)}`;
  return generateWithClaude(prompt, config);
}