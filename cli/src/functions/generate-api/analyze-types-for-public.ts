import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { FileWithContent } from "../../types/file-with-content.js";
import getFilesListAsMultilineString from "../get-files-list-as-multiline-string.js";
import generateWithClaude from "./generate-with-claude.js";

export default function analyzeTypesForPublic(files: FileWithContent[], config: AutoApiConfig) {
  const prompt = `You are a JSON-only API. Your response must be PURE JSON with no other text.
      Required output format: [{ 
        "filename": "component.tsx", 
        "comments": [{ 
          "targetLine": "export type ButtonProps", 
          "shouldBePublic": true, 
          "reason": "Used as component props type",
          "dependencies": ["ButtonState", "ButtonVariant"]
        }] 
      }]
      
      IMPORTANT: 
      - Return a direct array, not an object with a 'files' property
      - IGNORE any types that already start with "Public" prefix
      - Include ALL dependent types that should also be made public

      Specifically for Qwik components, a type MUST be made public if:
      1. It's used in component$<Type> definition
      2. It's a props interface/type that extends PropsOf
      3. It's used in exported component props
      4. It's used in PropFunction types for callbacks
      5. It's used across multiple components through imports
      6. It's part of the component's public event system
      
      Examples of types that MUST be public:
      - type Props = PropsOf<"div"> & { /* ... */ }
      - interface ComponentProps { /* ... */ }
      - export const Component = component$<Props>((props) => {})
      - onEvent$?: PropFunction<(param: EventType) => void>
      
      Types should stay private if:
      1. They're only used inside component implementation
      2. They're used for internal state management
      3. They're marked with @internal
      4. They're prefixed with underscore
      5. They're only used in event handlers or callbacks
      
      For each identified public type:
      1. Find all types it depends on or references
      2. Check if those types are used in public API
      3. Include both the main type and its public dependencies

      Files to analyze: ${getFilesListAsMultilineString(files)}`;
  return generateWithClaude(prompt, config);
}
