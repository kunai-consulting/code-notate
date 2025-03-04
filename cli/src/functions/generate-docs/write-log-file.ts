import fs from "node:fs";
import { dirname } from "node:path";

export default function writeLogFile(logsPath: string, content: string) {
  try {
    console.log("Writing log to:", logsPath);
    // If the directory doesn't exist, create it
    if (!fs.existsSync(dirname(logsPath))) {
      fs.mkdirSync(dirname(logsPath), { recursive: true });
    }
    // If the file doesn't exist, create it
    if (!fs.existsSync(logsPath)) {
      fs.writeFileSync(logsPath, "", "utf8");
    }
    fs.appendFileSync(logsPath, `${content}\n\n---\n\n`, "utf8");
    return "Log updated successfully!";
  } catch (error) {
    console.error("Error writing log:", error);
    throw new Error(
      `Failed to write log: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}