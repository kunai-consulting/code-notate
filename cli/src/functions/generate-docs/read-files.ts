import fs from "node:fs";
import { resolve } from "node:path";

export default async function readFiles(path: string) {
  try {
    const stats = fs.statSync(path);

    if (stats.isDirectory()) {
      const files = fs.readdirSync(path);
      const contents = files
        .filter((file: string) => file.endsWith(".ts") || file.endsWith(".tsx"))
        .map((file: string) => fs.readFileSync(resolve(path, file), "utf8"))
        .join("\n");
      return contents;
    }
    return fs.readFileSync(path, "utf8");
  } catch (error) {
    console.warn(`Could not read from ${path}:`, error);
    return "";
  }
}