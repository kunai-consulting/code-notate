import { Command } from "@oclif/core";

import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { PromptPrefixInput } from "../../types/prompt-prefix-input.js";
import generateConfigDocs from "./generate-config-docs.js";
import generateEnvDocs from "./generate-env-docs.js";
import generateFormDocs from "./generate-form-docs.js";
import generateInitialDocs from "./generate-initial-docs.js";
import generateStateDocs from "./generate-state-docs.js";
import getExampleFiles from "./get-example-files.js";
import getFilePaths from "./get-file-paths.js";
import getPromptPrefix from "./get-prompt-prefix.js";
import readFiles from "./read-files.js";
import validateShowcase from "./validate-showcase.js";
import writeDocs from "./write-docs.js";
import writeLogFile from "./write-log-file.js";

export async function generateDocs(command: Command, config: AutoApiConfig) {
  command.log("Let's generate the Docs");
  try {
    const paths = await getFilePaths(config);
    console.log("paths", paths);

    const exampleFiles = await getExampleFiles(paths.examplesPath);
    command.log("Reading component files...");
    const [formattedExamples, formattedComponents, formattedAPI] =
      await Promise.all([
        readFiles(paths.examplesPath),
        readFiles(paths.componentPath),
        readFiles(paths.apiPath)
      ]);
    
    let currentDocs = "";

    const promptPrefixInput: PromptPrefixInput = {
      currentDocs,
      exampleFiles,
      formattedExamples,
      formattedComponents,
      formattedAPI
    };
    let promptPrefix = getPromptPrefix(promptPrefixInput);

    command.log("Generating initial documentation...");
    const initialResponse = await generateInitialDocs(promptPrefix, paths, config);
    const initialDocs = validateShowcase(initialResponse, exampleFiles);
    currentDocs += initialDocs;
    promptPrefixInput.currentDocs = currentDocs;
    promptPrefix = getPromptPrefix(promptPrefixInput);

    command.log("Generating state documentation...");
    const stateResponse = await generateStateDocs(promptPrefix, config);
    const stateDocs = validateShowcase(stateResponse, exampleFiles);
    currentDocs += stateDocs;
    promptPrefixInput.currentDocs = currentDocs;
    promptPrefix = getPromptPrefix(promptPrefixInput);

    command.log("Generating config documentation...");
    const configResponse = await generateConfigDocs(promptPrefix, config);
    const configDocs = validateShowcase(configResponse, exampleFiles);
    currentDocs += configDocs;
    promptPrefixInput.currentDocs = currentDocs;
    promptPrefix = getPromptPrefix(promptPrefixInput);

    command.log("Generating form documentation...");
    const formResponse = await generateFormDocs(promptPrefix, config);
    const formDocs = validateShowcase(formResponse, exampleFiles);
    currentDocs += formDocs;
    promptPrefixInput.currentDocs = currentDocs;
    promptPrefix = getPromptPrefix(promptPrefixInput);

    command.log("Generating environment documentation...");
    const envResponse = await generateEnvDocs(promptPrefix, config);
    const envDocs = validateShowcase(envResponse, exampleFiles);
    currentDocs += envDocs;

    const logResults = await writeDocs(currentDocs, paths.docFilePath);
    command.log(logResults);
    writeLogFile(paths.logsPath, currentDocs);

    command.log("Evaluating documentation...");

    const mdxContent = [
      'import { api } from "./auto-api/api";',
      initialDocs,
      stateDocs,
      configDocs.includes("##") ? configDocs : "",
      formDocs.includes("##") ? formDocs : "",
      // Only add the environment documentation if it exists
      envDocs.includes("##") ? envDocs : "",
      "<APITable api={api} />"
    ].join("\n\n");

    command.log("Saving documentation...");
    const result = await writeDocs(mdxContent, paths.docFilePath);
    command.log(result);
  } catch (error) {
    console.error("Error generating docs:", error);
    command.error(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
  }
}