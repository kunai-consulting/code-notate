import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import generateDocumentationWithAnthropic from "./generate-documentation-with-anthropic.js";

export default async function generateStateDocs(promptPrefix: string, config: AutoApiConfig) {
  const prompt = `${promptPrefix}
  
          You are now writing the documentation specific to the state of the component.
  
          Find and gather the examples that belong to the state section.
  
          Write an h2 with the text "Component State"
  
          Document how to use the component's state features in this order:
          1. Using Component State
           - Show how to control component through props
           - Demonstrate state-related props usage
           - Reference existing examples instead of showing them again
      
          2. State Interactions
           - Show how to respond to state changes
           - Demonstrate event handling
           - Show common use cases
      
          STRICT RULES:
          1. DO NOT document internal implementation details
          2. DO NOT mention signals, context, or other internal mechanisms
          3. Focus ONLY on the public API that users will interact with
          4. When describing features that were shown in the Examples section:
             - Write "As shown in the [section name] example above..."
             - Reference the specific example by name
             - Add only new information about state management
             - DO NOT include the <Showcase /> component again
          5. Only show new examples that weren't covered in the Examples section
          6. Each feature should be documented exactly once
          
          Example of good documentation:
          ### Using Component State
          As shown in the Basic Usage example above, you can control the dropdown's state through the \`open\` prop.
          Here are additional ways to interact with the state:
          \`\`\`typescript
          // New example that wasn't shown before
          <Dropdown.Root open={isOpen}>
            <Dropdown.Trigger>Click me</Dropdown.Trigger>
            <Dropdown.Content>Content shows when open</Dropdown.Content>
          </Dropdown.Root>
          \`\`\`
          
          Example of bad documentation:
          ### Using Component State
          Control the dropdown's open state:
          <Showcase name="base" />  // Bad: This example was already shown

          Do not write about:
  
          - Accessibility (label, description, etc.)
          - Environment examples (CSR, SSR, etc.)
          - Configuration examples (filter, loop, etc.)
          - Behavioral examples (empty, inline, etc.)
          - Form examples (form, validation, etc.)
          - Examples you already wrote in this response
  
          For example:
  
          Initial values:
  
          Example:
  
          To set a default or initial value on page load, use the value prop on the <Accordion.Root /> component.
  
          Reactive values:
  
          Example:
  
          ### Reactive value
          
          Pass reactive state by using the bind:value prop on the <Accordion.Root /> component.
  
          <Showcase name="reactive" />
  
          Events:
  
          ### Handling selection changes
  
          <Showcase name="change" />
  
          Use the onChange$ prop to listen for changes in the selected value. It provides the new selected value as an argument.
  
          ### Disabled
  
          <Showcase name="disabled" />
  
          To disable the component, set the disabled prop to true on the <Accordion.Root /> component.
  
          You are then writing the documentation specific to the behavior of the component.
  
          Find and gather examples that are related to the behavior of the component. 
  
          Only write something if the behavioral examples exist.
  
          DO NOT write about anything that mentions or is relatively considered to be part of a component's state. (e.g. initial, reactive, disabled, etc.), this also cover's the exposed component state
  
          Do not repeat content from the previous sections!
  
          ### Empty UI
  
          By default, the popover automatically closes when there are no items to display.
  
          To show UI when there are no items in the popover, use the Combobox.Empty component.
  
          <Showcase name="empty" />
  
          ### Inline Mode (Command Palette)
  
          The Combobox supports an inline mode which allows for searching and selection from a list of options decoupled from the popover.
  
          To enable inline mode:
          - Add the mode="inline" prop to <Combobox.Root>
          - Use the Combobox.Inline component instead of <Combobox.Popover>.
  
          <Showcase name="inline" />
  
          Key Differences in Inline Mode:
          - Always Visible: The listbox remains visible at all times, even after item selection or pressing Escape
          - Initial State: The first option is automatically highlighted when the combobox renders
          - Selection Behavior:
            - Selecting an item does not close the listbox
            - The input value remains empty after selection
          - Focus Management:
            - Highlight state persists when filtering items
            - Highlight state is preserved when tabbing away and back to the input
  
          Inline mode is useful when you want users to quickly browse and select from a list while maintaining context of all available options.
          `;
  return generateDocumentationWithAnthropic(prompt, config);
}