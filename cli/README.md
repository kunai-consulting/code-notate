@kunai-consulting/auto-api-cli
=================

CLI tools for automatically documenting your code

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@kunai-consulting/auto-api-cli.svg)](https://npmjs.org/package/@kunai-consulting/auto-api-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@kunai-consulting/auto-api-cli.svg)](https://npmjs.org/package/@kunai-consulting/auto-api-cli)

<!-- toc -->
* [Installation](#installation)
* [Configuration](#configuration)
* [Commands](#commands)
<!-- tocstop -->
# Installation
<!-- usage -->
## Installation in a project
```sh-session
$ npm install @kunai-consulting/auto-api-cli
```
Add the `aac` command to your `package.json`:

```json
{
  "scripts": {
    "aac": "aac",
    "aac:gen-api": "aac gen-api",
    "aac:gen-docs": "aac gen-docs"
  }
}
```
Run `npm run aac gen-api` or `npm run aac:gen-api` or `npm run aac:gen-docs`.

Using a command-line argument to override the source folder in the `auto-api.config.js` config file: 

`run aac gen-api ../../libs/components/src/pagination`

## Global installation
```sh-session
$ npm install -g @kunai-consulting/auto-api-cli
$ aac --version
@kunai-consulting/auto-api-cli/0.0.0 darwin-arm64 node-v20.18.0
```
<!-- usagestop -->

# Configuration

Create an `auto-api.config.js` file in your project root where your `package.json` is located.:

```javascript
/** @type {import('@kunai-consulting/auto-api-cli').AutoApiConfig} */
export default {
  // The LLM model to use
  aiModel: "claude-3-5-sonnet-20241022",
  // The LLM provider. Currently only Anthropic is supported
  aiProvider: "anthropic",
  // The folder where API information and documentation is stored
  documentationFolder: "./docs",
  // Optional. The command to run to format the generated documentation
  formatCommand: "pnpm format",
  // Optional. The directory where the format command can be run
  formatDirectory: ".",
  // Optional. The name of the framework the code is written in
  framework: "Qwik",
  // The folder where the code resides, to be analyzed and documented. Can be overridden with a command-line argument.
  sourceFolder: "./src/components/grid",
};
```
If the config file is located elsewhere, you can use the `-c` flag to specify the path, for example: `aac gen-api -c ./config`

## Anthropic API key
If you are using the Anthropic API, you need to set the `ANTHROPIC_API_KEY` environment variable.

To accomplish this, you can add a `.env` file to your project root, or you can set the environment variable globally in your Node.js environment.

Example `.env` file:
```
ANTHROPIC_API_KEY=sk-1234567890123456789012345678901234567890
```

# Commands
<!-- commands -->
* [`aac gen-api`](#gen-api)
* [`aac gen-docs`](#gen-docs)
* [`aac help [COMMAND]`](#help-command)

## `gen-api`

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

_See code: [src/commands/gen-api/index.ts](https://github.com/kunai-consulting/auto-api/tree/main/src/commands/gen-api/index.ts)_

## `gen-docs`

Generate Docs

```
USAGE
  $ aac gen-docs [FOLDER] [-c <value>]

ARGUMENTS
  FOLDER  The folder where the code resides, where we want to analyze and generate the API documentation

FLAGS
  -c, --configPath=<value>  location of the auto-api.config.js file

DESCRIPTION
  Generate Docs

EXAMPLES
  $ aac gen-docs
```

_See code: [src/commands/gen-docs/index.ts](https://github.com/kunai-consulting/auto-api/tree/main/cli/src/commands/gen-docs/index.ts)_

## `help [COMMAND]`

Display help for an aac command.

```
USAGE
  $ aac help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for an aac command.
  
EXAMPLES
  $ aac help gen-api
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.26/src/commands/help.ts)_

<!-- commandsstop -->
