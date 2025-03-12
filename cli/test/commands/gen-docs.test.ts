import {runCommand} from '@oclif/test';
import { describe, expect, it, vi } from 'vitest';

import { EXAMPLE_CONFIG } from "../test-utils/constants";

vi.mock("../../src/functions/load-config", () => ({
  default: vi.fn(async () => EXAMPLE_CONFIG)}));

vi.mock("../../src/functions/generate-docs/generate-docs", () => ({
  default: vi.fn()
}));

describe('gen-docs', () => {
  it('runs', async () => {
    const {stdout} = await runCommand('gen-docs');
    expect(stdout).toBeDefined();
  })
});