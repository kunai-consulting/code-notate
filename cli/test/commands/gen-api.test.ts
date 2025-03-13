import {runCommand} from '@oclif/test';
import { describe, expect, it, vi } from 'vitest';

import { EXAMPLE_CONFIG } from "../test-utils/constants";

vi.mock("../../src/functions/load-config", () => ({
  default: vi.fn(async () => EXAMPLE_CONFIG)}));

vi.mock("../../src/functions/generate-api/generate-api", () => ({
  default: vi.fn()
}));

describe('gen-api', () => {
  it('runs', async () => {
    const {stdout} = await runCommand('gen-api');
    expect(stdout).toBeDefined();
  })
});