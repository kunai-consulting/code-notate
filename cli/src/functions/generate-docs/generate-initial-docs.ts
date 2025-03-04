import fs from "node:fs";

import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { DocsFilePaths } from "../../types/docs-file-paths.js";
import generateDocumentationWithAnthropic from "./generate-documentation-with-anthropic.js";

export default async function generateInitialDocs(promptPrefix: string, paths: DocsFilePaths, config: AutoApiConfig) {
  const exampleFiles = fs
    .readdirSync(paths.examplesPath)
    .filter((file) => file.endsWith(".tsx") && !file.includes("-test"))
    .map((file) => file.replace(".tsx", ""));

  const heroExample = exampleFiles.includes("hero") ? "hero" : exampleFiles[0];

  const showcaseExample = `<Showcase name="${heroExample}" />\n`;

  const prompt = `${promptPrefix}
  
          Write the title of the component as an h1.
  
          Example:
  
          # Component Name
  
          Then write a brief sentence describing the component in a way that is generic and easy to understand for 15 year olds (maximum 15 words). 
          
          Do not repeat yourself.
          
          Do not mention the words "component" or the component name in the description.
  
          This description should be directly related to what the component does. Do not write about other components or libraries.
  
          After the description, add the hero showcase component with:
  
          ${showcaseExample}
          Then add the exact text:
  
          ## Features
  
          <Features api={api} />
  
          ## Anatomy
  
          <AnatomyTable api={api} />
          
          Then write the Examples section using these rules:

          ## Examples
  
          1. Basic Usage
           - Show the simplest implementation with core props
           - ONE example demonstrating basic setup
           - Explain what each prop does
  
          2. Visual Features (if applicable)
           - Show styling and customization options
           - ONE example per visual feature
           - Group related visual features together
           - Include overlay and color customization here
  
          3. Advanced Usage (if applicable)
           - Show complex scenarios (like multiple instances)
           - ONE example per advanced feature
           - Explain unique aspects
  
          STRICT RULES:
          1. Each example MUST appear only ONCE
          2. Choose the most appropriate section for each example
          3. When a feature has multiple aspects, document them all together
          4. Do not include state management or configuration details
          5. Use backticks for component and prop names
          6. Do not create additional sections for styling or overlays
          7. Group all visual customization under Visual Features
          8. Group all advanced usage patterns under Advanced Usage
  
          This is NOT related to anything to do with the component state (initial, reactive, uncontrolled, controlled, events, disabled, etc.)
          `;
  return generateDocumentationWithAnthropic(prompt, config);
}