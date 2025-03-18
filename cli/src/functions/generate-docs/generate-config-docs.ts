import { CodeNotateConfig } from "../../interfaces/code-notate-config.js";
import generateDocumentationWithAnthropic from "./generate-documentation-with-anthropic.js";

export default async function generateConfigDocs(promptPrefix: string, config: CodeNotateConfig) {
  const prompt =`${promptPrefix}
  
          You are now writing the documentation specific to the configuration of the component.
  
          Write about configuration in this order:
          1. Core Configuration
           - Document essential settings and their values
           - Explain technical constraints and limitations
           - Describe default behaviors
           - ALWAYS reference examples instead of showing them again 

          2. Advanced Configuration (if applicable)
           - Document complex configuration options
           - Explain technical implications
           - Describe any limitations or constraints
           - Add new technical information not covered in Examples or State
        
          STRICT RULES:
          1. DO NOT use code blocks for examples that were shown before
          2. ALWAYS write "As shown in the X example above, ..." when referencing examples
          3. Use code blocks ONLY for:
           - New configuration options not shown in examples
           - Technical specifications
           - Type definitions
          4. DO NOT repeat information from:
           - Examples section
           - State section
           - Visual customization
          5. Focus ONLY on:
           - Technical configuration details
           - Default values and constraints
           - Performance considerations
           - Browser support requirements
  
          Do not write about:
  
          - Accessibility (label, description, etc.)
          - Environment examples (CSR, SSR, etc.)
          - State examples (initial, reactive, disabled, etc.)
          - Behavioral examples (empty, inline, etc.)
          - Form examples (form, validation, etc.)
  
          Determine the h2's and h3's that should be used to organize the examples.
  
          Only write something if the configuration examples exist.
          
          Skip this section entirely if all configuration options were already covered.
  
          Below are some configuration examples from a headless Combobox component:
  
          ## Menu behavior
  
          ### Custom Filter
  
          By default, the Combobox filters items based on user input. To disable this, set the filter prop to false.
  
          <Showcase name="filter" />
  
          You can use any filtering library. In the example above, we use match-sorter.
  
          > The filter prop is true by default, using the includes method to filter items.
  
          ### Looping
  
          To loop through items, use the loop prop on <Combobox.Root />.
  
          <Showcase name="loop" />
  
          - Pressing the down arrow key moves focus to the first enabled item.
          - Pressing the up arrow key moves focus to the last enabled item.
          `;
  return generateDocumentationWithAnthropic(prompt, config);
}