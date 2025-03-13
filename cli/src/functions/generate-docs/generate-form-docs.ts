import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import generateDocumentationWithAnthropic from "./generate-documentation-with-anthropic.js";

export default async function generateFormDocs(promptPrefix: string, config: AutoApiConfig) {
  const prompt = `${promptPrefix}
  
          You are now writing the documentation specific to the configuration of the component.
          
          STRICT RULES:
          1. If a feature was shown in previous sections:
           - Reference it: "As shown in the Basic Usage example above..."
           - Do not repeat the example
           - Only add form-specific information
          2. Only document form-specific features
          3. Do not repeat state or configuration details
          4. Each form feature should be documented once
          5. Group related form features together
          6. Skip this section if no form features exist
      
          Focus ONLY on:
          - Form integration
          - Form validation
          - Form submission
          - Form state handling
          
          Find and gather examples that are related to the configuration of the component. 
          
          This is NOT related to the state of the component. (e.g. initial, reactive, disabled, etc.)
  
          Only write something if the form examples exist.
  
          Do not write about:
  
          - Accessibility (label, description, etc.)
          - Environment examples (CSR, SSR, etc.)
          - State examples (initial, reactive, disabled, etc.)
          - Configuration examples (filter, loop, etc.)
          - Behavioral examples (empty, inline, etc.)
  
          Below is an example of how the form section works in a headless Combobox component:
  
          ## Forms
  
          To use the combobox in a form, a visually hidden native select element is provided inside of <Combobox.HiddenNativeSelect>.
  
          <Showcase name="form" />
  
          The name prop on the Combobox.Root component is used to name the Combobox form field.
  
          ## Validation
  
          Form libaries like Modular Forms can be used to validate the combobox form field.
  
          <Showcase name="validation" />
  
          When the <Combobox.ErrorMessage> component is rendered, the component is in an invalid state.
  
          This allows you to use Qwik UI with any form validation library.`;
  return generateDocumentationWithAnthropic(prompt, config);
}