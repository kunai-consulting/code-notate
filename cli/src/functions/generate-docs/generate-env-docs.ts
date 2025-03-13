import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import generateDocumentationWithAnthropic from "./generate-documentation-with-anthropic.js";

export default async function generateEnvDocs(promptPrefix: string, config: AutoApiConfig) {
  const prompt = `${promptPrefix}
  
          You are now writing the documentation specific to the environment of the component.
          
          STRICT RULES:
          1. If a feature was shown in previous sections:
           - Reference it: "As shown in the Basic Usage example above..."
           - Do not repeat the example
           - Only add environment-specific information
          2. Only document environment-specific features
          3. Do not repeat state, configuration, or form details
          4. Each environment feature should be documented once
          5. Skip this section entirely if no environment-specific features exist
          6. Do not create sections for basic usage patterns
      
          Focus ONLY on:
          - Server vs client rendering
          - Platform-specific behavior
          - Environmental dependencies
          - Special rendering cases
  
          Find and gather examples that are related to the environment of the component. 
          
          This is NOT related to the state of the component. (e.g. initial, reactive, disabled, etc.)
  
          ONLY write something if the environmental examples exist. If they don't exist, your output should be empty.
  
          Do not write about:
  
          - Accessibility (label, description, etc.)
          - State examples (initial, reactive, disabled, etc.)
          - Configuration examples (filter, loop, etc.)
          - Form examples (form, validation, etc.)
  
          Example:
  
          ### CSR
  
          Like every Qwik UI component, the Combobox component can be rendered server-side or client-side.
  
          <Showcase name="csr" />
  
          `;
  return generateDocumentationWithAnthropic(prompt, config);
}