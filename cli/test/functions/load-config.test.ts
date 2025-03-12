import { resolve } from "node:path";
import { describe, expect, it, Mock, vi } from "vitest";

import { DEFAULT_CONFIG_PATH } from "../../src/constants";
import getConfigFromFile from "../../src/functions/get-config-from-file";
import loadConfig from "../../src/functions/load-config";
import { EXAMPLE_CONFIG } from "../test-utils/constants";

vi.mock("../../src/functions/get-config-from-file", () => ({
  default: vi.fn()
}));

describe("loadConfig", () => {
  it("should load config", async () => {
    (getConfigFromFile as Mock).mockResolvedValue(EXAMPLE_CONFIG);

    const result = await loadConfig({}, {});

    expect(getConfigFromFile).toHaveBeenCalledWith(resolve(process.cwd(), DEFAULT_CONFIG_PATH));
    expect(result).toEqual(EXAMPLE_CONFIG);
  });

  it("should return the config from the location specified in the configPath", async () => {
    (getConfigFromFile as Mock).mockResolvedValue(EXAMPLE_CONFIG);

    const configPath = "./test/config";
    const result = await loadConfig({}, {configPath});

    expect(getConfigFromFile).toHaveBeenCalledWith(resolve(process.cwd(), configPath, DEFAULT_CONFIG_PATH));
    expect(result).toEqual(EXAMPLE_CONFIG);
  });

  it("should thrown an error if the AI provider is not supported", async () => {
    const unsupportedProvider = "openai";
    const config = {
      ... EXAMPLE_CONFIG,
      aiProvider: unsupportedProvider
    };

    (getConfigFromFile as Mock).mockResolvedValue(config);

    await expect(loadConfig({}, {})).rejects.toThrow(`Unsupported AI provider: ${unsupportedProvider}`);
  });

  it("should override the sourceFolder from the config file if folder is provided as an argument", async () => {
    (getConfigFromFile as Mock).mockResolvedValue(EXAMPLE_CONFIG);
    const folder = "./test/folder";

    const result = await loadConfig({folder}, {});

    expect(result.sourceFolder).toEqual(folder);
  });
});