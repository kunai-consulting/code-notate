import {Args, Command, Flags} from '@oclif/core'
import * as dotenv from 'dotenv';

import { generateDocs } from "../../functions/generate-docs/generate-docs.js";
import { loadConfig } from "../../functions/load-config.js";

export default class GenDocs extends Command {
  protected get ctor(): typeof Command {
    dotenv.config();
    return super.ctor;
  }

  static args = {
    folder: Args.string({description: 'The folder where the code resides, where we want to analyze and generate the API documentation', required: false}),
  }
  static description = 'Generate Docs'
  static examples = [
    `<%= config.bin %> <%= command.id %>`
  ]
  static flags = {
    configPath: Flags.string({char: 'c', description: 'location of the auto-api.config.js file', required: false}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(GenDocs);
    const config = await loadConfig(args, flags);

    await generateDocs(this, config);
  }
}
