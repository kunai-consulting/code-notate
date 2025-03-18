import { resolve } from "node:path";

import { CodeNotateConfig } from "../../interfaces/code-notate-config.js";
import { DocsFilePaths } from "../../types/docs-file-paths.js";

export default async function getFilePaths(config: CodeNotateConfig): Promise<DocsFilePaths> {
  const route = config.sourceFolder.split("/").pop()!;
  return {
    apiPath: resolve(process.cwd(), `${config.documentationFolder}/${route}/code-notate/api.json`),
    componentPath: resolve(process.cwd(),config.sourceFolder),
    docFilePath: resolve(process.cwd(), `${config.documentationFolder}/${route}/index.mdx`),
    examplesPath: resolve(process.cwd(), `${config.documentationFolder}/${route}/examples`),
    logsPath: resolve(process.cwd(), `./.code-notate/${route}/log.mdx`),
    route
  };
}