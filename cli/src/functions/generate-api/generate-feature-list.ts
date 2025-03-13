import { AutoApiConfig } from "../../interfaces/auto-api-config.js";
import { FeatureList } from "../../types/feature-list.js";
import { FileWithContent } from "../../types/file-with-content.js";
import getFilesListAsMultilineString from "../get-files-list-as-multiline-string.js";
import generateWithClaude from "./generate-with-claude.js";

export default function generateFeatureList(files: FileWithContent[], config: AutoApiConfig): Promise<FeatureList> {
  const prompt = `You are a JSON-only API. Your response must be PURE JSON with no other text.
      Required output format: { "features": ["Feature 1", "Feature 2", ...] }

      Analyze the component implementation and return a list of features.
      
      Combobox example features:
      - "WAI ARIA Combobox design pattern"
      - "Single and multiple selection"
      - "Reactive and initial value changes"
      - "Disabled items"
      - "Tab key focus management"
      - "Grouped items"
      - "Looping"
      - "Custom scroll behavior"
      - "Popover UI above all"
      - "Custom positioning (Popover)"
      - "Typeahead item selection and focus"
      - "Arrow key navigation and focus management"
      - "Open/Close popover by typing, focus, or manually"
      - "Custom filter function"
      - "Closes on no matching items"

      Modal example features:
      - "WAI ARIA Dialog design pattern"
      - "Focus trap within modal"
      - "Return focus on close"
      - "Escape to close"
      - "Click outside to dismiss"
      - "Prevents background scrolling"
      - "Animated transitions"
      - "Custom positioning"
      - "Nested modal support"
      - "Accessible descriptions"
      - "Custom close triggers"
      - "Backdrop customization"
      - "Multiple modal stacking"
      - "Responsive sizing"
      - "Keyboard navigation"
      
      Rules:
      - Minimum 5 features
      - Focus on meaningful functionality that users care about
      - Exclude obvious implementation details
      - Don't list basic features that every component would have

      Files to analyze: ${getFilesListAsMultilineString(files)}`;

  return generateWithClaude(prompt, config);
}
