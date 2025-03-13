import { FileWithContent } from "../types/file-with-content.js";

export default function getFilesListAsMultilineString(files: FileWithContent[]): string {
  return files.map((f) => `\n--- ${f.name} ---\n${f.content}`).join("\n");
}