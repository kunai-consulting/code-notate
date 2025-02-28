import { getSourceFile, transformPublicTypes } from "@kunai-consulting/auto-api-core";
import { Command } from "@oclif/core";
import { execSync } from "node:child_process";
import fs from "node:fs";
import { resolve } from "node:path";

import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { FileWithContent } from "../../types/file-with-content.js";
import analyzeTypesForPublic from "./analyze-types-for-public.js";
import generateComponentDocs from "./generate-component-docs.js";
import generateDataAttributeDocs from "./generate-data-attribute-docs.js";
import generateFeatureList from "./generate-feature-list.js";
import generateKeyboardDocs from "./generate-keyboard-docs.js";
import generateTypeDocs from "./generate-type-docs.js";

export async function generateApi(command: Command, config: AutoApiConfig): Promise<void> {
  command.log("Let's generate the API")
  try {
    const componentPath = resolve(process.cwd(), config.sourceFolder);

    command.log("Reading files...");
    const files = fs
      .readdirSync(componentPath)
      .filter(
        (f: string) =>
          (f.endsWith(".tsx") || f.endsWith(".ts")) &&
          !["context", "test", "driver", "index"].some((ignore) => f.includes(ignore))
      );
    command.log("Found", files.length, "files");
    if(files.length === 0) {
      throw new Error("No files found in the source folder. Make sure the source folder is correct and try again.");
    }
    const fileContents: FileWithContent[] = files.map((file: string) => ({
      content: fs.readFileSync(resolve(componentPath, file), "utf8"),
      name: file
    }));

    command.log("Analyzing with Claude...");
    // Get existing metadata if it exists
    const metadataPath = resolve(componentPath, "metadata.json");
    // let existingMetadata = {};
    // if (fs.existsSync(metadataPath)) {
    //   existingMetadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    // }

    // Analyze with Claude and merge with existing metadata
    const [
      componentComments,
      typeComments,
      dataAttributeComments,
      publicTypeAnalysis,
      keyboardDocs,
      featureList
    ] = await Promise.all([
      generateComponentDocs(fileContents, config),
      generateTypeDocs(fileContents, config),
      generateDataAttributeDocs(fileContents, config),
      analyzeTypesForPublic(fileContents, config),
      generateKeyboardDocs(fileContents, config),
      generateFeatureList(fileContents, config)
    ]);

    // Update metadata.json with fresh data only
    const metadata = {
      features: featureList.features,
      keyboard: keyboardDocs
    };
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    console.log("componentComments", componentComments);
    console.log("typeComments", typeComments);
    console.log("dataAttributeComments", dataAttributeComments);
    console.log("keyboardDocs", keyboardDocs);
    console.log("featureList", featureList);

    // Split the updates into two parts

    // 1. Handle type transformations and comments
    command.log("Adding comments and transforming types...");
    const allComments = [
      ...componentComments,
      ...typeComments,
      ...dataAttributeComments
    ];
    let diffReport = "";

    // Handle comments
    for (const block of allComments) {
      const filePath = resolve(componentPath, block.filename);
      const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

      for (const { comment, targetLine } of block.comments) {
        const lineIndex = fileContent.findIndex((l: string) => l.includes(targetLine));
        if (lineIndex !== -1) {
          // Check if there's already a comment above this line
          const hasPreviousComment =
            lineIndex > 0 &&
            (fileContent[lineIndex - 1].includes("/*") ||
              fileContent[lineIndex - 1].includes("//"));

          // Only add comment if there isn't one already
          if (!hasPreviousComment) {
            fileContent.splice(lineIndex, 0, ...comment);
            diffReport += `\nAdded comment to ${block.filename} at line ${lineIndex + 1}\n`;
          }
        }
      }

      fs.writeFileSync(filePath, fileContent.join("\n"), "utf8");
    }

    // Handle public type transformations
    for (const block of publicTypeAnalysis) {
      const filePath = resolve(componentPath, block.filename);
      const sourceFile = getSourceFile(filePath);
      const transformedCode = transformPublicTypes(sourceFile, block.comments);
      fs.writeFileSync(filePath, transformedCode, "utf8");
      diffReport += `\nTransformed types in ${block.filename}\n`;
    }

    // 2. Handle keyboard interactions separately
    // command.log("Updating API with keyboard interactions...");
    // const apiPath = resolve(process.cwd(), `src/routes/${route}/auto-api/api.ts`);
    //
    // const apiContent = fs.readFileSync(apiPath, "utf8");
    // const apiMatch = apiContent.match(/export const api = ({[\s\S]*});/);
    // if (apiMatch) {
    //   const api = JSON.parse(apiMatch[1]);
    //   // Only update keyboard interactions, don't touch types
    //   api.keyboardInteractions = keyboardDocs;
    //   api.features = featureList.features;
    //   fs.writeFileSync(
    //     apiPath,
    //     `export const api = ${JSON.stringify(api, null, 2)};`,
    //     "utf8"
    //   );
    // }

    // Perform formatting if specified
    if(config.formatCommand) {
      command.log("Formatting files...");
      const formatDir = config.formatDirectory ?? ".";
      execSync(config.formatCommand, {
        cwd: resolve(process.cwd(), formatDir)
      });
    }

    if(diffReport) {
      command.log("\nDiff report:");
      command.log(diffReport);
    }
  } catch (error) {
    command.error(error as Error | string);
  }
}