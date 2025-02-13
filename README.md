# Auto API

Automatic API documentation for UI and design systems, powered by TypeScript and LLMs.

## Overview

Auto API analyzes your TypeScript codebase to generate comprehensive API documentation by:

- Parsing TypeScript comments and type definitions
- Building relationships between components and types
- Using LLMs to generate high-quality documentation with codebase context
- Focusing specifically on UI components and design system patterns

## Features

- 🔍 **Intelligent TypeScript Parsing**
  - Extracts comments, types, and component relationships
  - Understands component props, variants, and patterns
  - Maps dependencies and usage examples

- 🤖 **LLM-Enhanced Documentation**
  - Generates missing documentation using codebase context
  - Improves existing comments for clarity and completeness
  - Maintains consistent documentation style

- 🎨 **Design System Focused**
  - Specialized for UI component libraries
  - Documents theming and styling patterns
  - Captures component variants and compositions

## Installation

```bash
npm install @kunai-consulting/auto-api
# or
pnpm add @kunai-consulting/auto-api
```

## Usage

### As a Vite Plugin

```ts
// vite.config.ts
import { autoAPI } from '@kunai-consulting/auto-api';

export default defineConfig({
  plugins: [
    autoAPI({
      include: ['src/components/**/*.tsx'],
      exclude: ['**/*.test.tsx'],
      outputDir: './docs',
      llm: {
        provider: 'openai',
        model: 'gpt-4',
        systemPrompts: {
          componentAnalysis: "Custom prompt for analyzing components...",
          relationshipMapping: "Custom prompt for mapping relationships..."
        }
      }
    })
  ]
});
```

### Programmatic Usage

```ts
import { AutoAPI } from '@kunai-consulting/auto-api';

const autoAPI = new AutoAPI({
  srcDir: './src',
  outputDir: './docs',
  include: ['components/**/*.tsx'],
  exclude: ['**/*.test.tsx'],
  llm: {
    provider: 'openai',
    model: 'o1',
    systemPrompts: {
      componentAnalysis: "Custom prompt for analyzing components...",
      relationshipMapping: "Custom prompt for mapping relationships..."
    }
  }
});

await autoAPI.generate();
```

## Configuration

```ts
interface AutoAPIConfig {
  srcDir?: string;         // Source directory to analyze
  outputDir: string;       // Output directory for docs
  include?: string[];      // Glob patterns to include
  exclude?: string[];      // Glob patterns to exclude
  llm?: {
    provider: 'openai';    // LLM provider (currently only OpenAI)
    model: string;         // Model to use (e.g., 'gpt-4')
    systemPrompts?: {      // Override default system prompts
      componentAnalysis?: string;
      relationshipMapping?: string;
      docGeneration?: string;
    }
  }
}
```

## License

MIT © [Kunai Consulting]
