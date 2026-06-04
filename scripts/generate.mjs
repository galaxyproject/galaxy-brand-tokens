import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// The source is a single `@theme { ... }` block. Every inner declaration is a
// plain custom property, so the :root flavor is just a wrapper swap.
export function themeToRoot(css) {
  return css.replace(/@theme\s*\{/, ":root {");
}

function build() {
  const src = readFileSync(join(root, "src/theme.css"), "utf8");
  mkdirSync(join(root, "dist"), { recursive: true });
  writeFileSync(join(root, "dist/theme.css"), src);
  writeFileSync(join(root, "dist/tokens.css"), themeToRoot(src));
  console.log("Wrote dist/theme.css and dist/tokens.css");
}

// Only run the build when executed directly, not when imported by a test.
if (process.argv[1] === fileURLToPath(import.meta.url)) build();
