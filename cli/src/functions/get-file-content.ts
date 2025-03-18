import fs from "node:fs";
import { dirname } from "node:path";

export default function getFileContent(filePath: string, createIfNotExists: boolean = false): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    if (createIfNotExists && (error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("Requested file not found. Creating it: " + filePath);
      if (!fs.existsSync(dirname(filePath))) {
        fs.mkdirSync(dirname(filePath), { recursive: true });
      }
      fs.writeFileSync(filePath, "", "utf8");
      return "";
    }
    throw error;
  }
}