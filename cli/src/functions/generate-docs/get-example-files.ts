import fs from "node:fs";

export default async function getExampleFiles(examplesPath: string) {
  try {
    return fs
      .readdirSync(examplesPath)
      .filter((file) => file.endsWith(".tsx") && !file.includes("-test"))
      .map((file) => file.replace(".tsx", ""));
  }
  catch (error) {
    console.error(error);
    throw new Error(`Documentation generation relies on the presence of example files. Please ensure the documentationFolder configuration is correct and that one or more example files exist in the examples folder at ${examplesPath}`);
  }
}