import { resolve } from "node:path";

import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { DocsFilePaths } from "../../types/docs-file-paths.js";

export default async function getFilePaths(config: AutoApiConfig): Promise<DocsFilePaths> {
  const route = config.sourceFolder.split("/").pop()!;
  return {
    apiPath: resolve(process.cwd(), `${config.documentationFolder}/${route}/auto-api/api.ts`),
    componentPath: resolve(process.cwd(),config.sourceFolder),
    docFilePath: resolve(process.cwd(), `${config.documentationFolder}/${route}/index.mdx`),
    examplesPath: resolve(process.cwd(), `${config.documentationFolder}/${route}/examples`),
    logsPath: resolve(process.cwd(), `./.auto-api/${route}/log.mdx`),
    route
  };
}