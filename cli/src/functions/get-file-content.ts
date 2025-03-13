import fs from "node:fs";

export default function getFileContent(filePath: string, createIfNotExists: boolean = false): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    if (createIfNotExists && (error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("Requested file not found. Creating it: " + filePath);
      fs.writeFileSync(filePath, "", "utf8");
      return "";
    }
    throw error;
  }
}