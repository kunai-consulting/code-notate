@kunai-consulting/auto-api-cli
=================

CLI tools for automatically documenting your code

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@kunai-consulting/auto-api-cli.svg)](https://npmjs.org/package/@kunai-consulting/auto-api-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@kunai-consulting/auto-api-cli.svg)](https://npmjs.org/package/@kunai-consulting/auto-api-cli)

<!-- toc -->
* [Usage](#usage)
* [Configuration](#configuration)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @kunai-consulting/auto-api-cli
$ aac COMMAND
running command...
$ aac (--version)
@kunai-consulting/auto-api-cli/0.0.0 darwin-arm64 node-v20.18.0
$ aac --help [COMMAND]
USAGE
  $ aac COMMAND
...
```
<!-- usagestop -->

# Configuration

Create an `auto-api.config.js` file in your project root:

```javascript
/** @type {import('@kunai-consulting/auto-api-cli').AutoApiConfig} */
export default {
    // The LLM model to use
    aiModel: "claude-3-5-sonnet-20241022",
    
    // The LLM provider. Currently only Anthropic is supported
    aiProvider: "anthropic",
    
    // The folder where API information and documentation is stored
    documentationFolder: "./docs",
    
    // The directory where the format command can be run
    formatDirectory: ".",
    
    // The folder where the code resides, to be analyzed and documented
    sourceFolder: "./src",
};
```

The JSDoc type annotation provides full TypeScript type checking and autocompletion in your editor.

# Commands
<!-- commands -->
* [`aac gen-api [FOLDER]`](#aac-gen-api-folder)
* [`aac help [COMMAND]`](#aac-help-command)

## `aac gen-api [FOLDER]`

Generate API

```
USAGE
  $ aac gen-api [FOLDER] [-c <value>]

ARGUMENTS
  FOLDER  The folder where the code resides, where we want to analyze and generate the API documentation

FLAGS
  -c, --configPath=<value>  location of the auto-api.config.js file

DESCRIPTION
  Generate API

EXAMPLES
  $ aac gen-api
```

_See code: [src/commands/gen-api/index.ts](https://github.com/kunai-consulting/auto-api/blob/v0.0.0/src/commands/gen-api/index.ts)_

## `aac help [COMMAND]`

Display help for aac.

```
USAGE
  $ aac help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for aac.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.26/src/commands/help.ts)_

<!-- commandsstop -->
