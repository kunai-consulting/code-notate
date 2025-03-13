import fs from "node:fs";

export default async function writeDocs(mdxContent: string, docFilePath: string) {
  try {
    fs.writeFileSync(docFilePath, mdxContent);
    return "Documentation updated successfully!";
  } catch (error) {
    console.error("Error writing docs:", error);
    throw new Error(
      `Failed to write documentation: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}