import { AutoApiConfig } from "../interfaces/auto-api-config.js";

export default async function getConfigFromFile(filePath: string): Promise<AutoApiConfig> {
  let module;
  try {
    module = await import(filePath);
  } catch (error) {
    throw(error instanceof Error && error.toString().includes('Cannot find module') ? new Error(`Could not find config file at ${filePath}`) : error);
  }
  const config: AutoApiConfig = module.default || module;
  if (typeof config !== 'object' || config === null || Array.isArray(config)) {
    throw new Error('Config must be a plain object');
  }
  return config;
}