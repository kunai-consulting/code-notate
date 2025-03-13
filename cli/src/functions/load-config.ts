import { resolve } from "node:path";

import { AI_PROVIDERS, DEFAULT_CONFIG_PATH } from "../constants.js";
import { AutoApiConfig } from "../interfaces/auto-api-config.js";
import { GenArgs } from "../interfaces/gen-args.js";
import { GenFlags } from "../interfaces/gen-flags.js";
import getConfigFromFile from "./get-config-from-file.js";

export default async function loadConfig(args: GenArgs, flags: GenFlags): Promise<AutoApiConfig> {
  const { configPath } = flags;
  const configFilePath = configPath ? resolve(process.cwd(), configPath, DEFAULT_CONFIG_PATH) : resolve(process.cwd(), DEFAULT_CONFIG_PATH);
  const config = await getConfigFromFile(configFilePath);

  if(!AI_PROVIDERS.includes(config.aiProvider)){
    throw new Error('Unsupported AI provider: ' + config.aiProvider);
  }

  // If folder is provided as an argument, override the sourceFolder from the config file
  const { folder } = args;
  if(folder) {
    config.sourceFolder = folder;
  }

  return config;
}