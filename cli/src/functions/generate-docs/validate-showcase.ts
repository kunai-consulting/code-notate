export default function validateShowcase(content: string, availableExamples: string[]): string {
  const lines = content.split("\n");
  const validatedLines: string[] = [];
  let skipUntilNextHeader = false;
  let prevLevel = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const showcaseMatch = line.match(/<Showcase name="([^"]+)"/);

    if (showcaseMatch) {
      const exampleName = showcaseMatch[1];

      if (availableExamples.includes(exampleName)) {
        validatedLines.push(line);
        skipUntilNextHeader = false;
      } else {
        skipUntilNextHeader = true;
      }
    } else if (line.startsWith("#")) {
      const headerMatch = line.match(/^#{1,6}/);
      if (headerMatch) {
        const level = headerMatch[0].length;
        if (level > prevLevel + 1) {
          validatedLines.push("#".repeat(prevLevel + 1) + line.slice(level));
        } else {
          validatedLines.push(line);
          prevLevel = level;
        }
      }
      skipUntilNextHeader = false;
    } else if (!skipUntilNextHeader && line.trim()) {
      validatedLines.push(line);
    }
  }

  const result = validatedLines.join("\n");
  return result.replace(/\n{2,}/g, "\n\n");
}