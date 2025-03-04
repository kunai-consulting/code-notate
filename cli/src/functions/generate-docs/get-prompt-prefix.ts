export default function getPromptPrefix(currentDocs: string, exampleFiles: string[], formattedExamples: string, formattedComponents: string, formattedAPI: string): string {
  return `
            ${currentDocs === "" ? "" : `Documentation written for this component so far: ${currentDocs}`}
            
            Available examples: ${exampleFiles.join(", ")}
            
            IMPORTANT: Only use examples from this list. Do not reference any examples that are not in this list.
          
            Act as a professional documentation writer for a design system that uses Qwik.

            You will be given a component implementation and examples. Each new component or example is separated by ---NEW COMPONENT--- or ---NEW EXAMPLE---.

            You will also be given an object that contains API's found.

            Component implementation:
            ${formattedComponents.split("\n\n").join("\n\n---NEW COMPONENT---\n\n")}

            Examples:
            ${formattedExamples.split("\n\n").join("\n\n---NEW EXAMPLE---\n\n")}

            API's:
            ${formattedAPI}

            When adding examples, make sure to use the <Showcase name="example-file-name" /> component.

            For each example, explain the highlighted API's that are used in the example.

            Example:
            We can select an initial uncontrolled value by passing the open prop to the <Collapsible.Root /> component.

            <Showcase name="initial" /> (initial is the file name)

            When mentioning an API or component surround it with backticks.

            Only output production ready documentation.
          `;
}