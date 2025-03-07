import fs from "node:fs";

export default async function getExampleFiles(examplesPath: string) {
  return fs
    .readdirSync(examplesPath)
    .filter((file) => file.endsWith(".tsx") && !file.includes("-test"))
    .map((file) => file.replace(".tsx", ""));
}