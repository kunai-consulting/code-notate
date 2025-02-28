import { resolve } from "node:path";

import { AI_PROVIDERS, DEFAULT_CONFIG_PATH } from "../constants.js";
import { GenApiArgs } from "../interfaces/gen-api-args.js";
import { GenApiFlags } from "../interfaces/gen-api-flags.js";

export async function loadConfig(args: GenApiArgs, flags: GenApiFlags) {
  let { configPath } = flags;
  if(!configPath) {
    configPath = resolve(process.cwd(), DEFAULT_CONFIG_PATH);
  }

  let module;
  try {
    module = await import(configPath);
  } catch (error_) {
    throw(error_ instanceof Error && error_.toString().includes('Cannot find module') ? new Error(`Could not find config file at ${configPath}`) : error_);
  }
  // const module = await import(configPath);
  const config = module.default || module;
  if (typeof config !== 'object' || config === null || Array.isArray(config)) {
    throw new Error('Config must be a plain object');
  }
  if(!AI_PROVIDERS.includes(config.aiProvider)){
    throw new Error('Unsupported AI provider');
  }

  // If folder is provided as an argument, override the sourceFolder from the config file
  const { folder } = args;
  if(folder) {
    config.sourceFolder = folder;
  }

  return config;
}