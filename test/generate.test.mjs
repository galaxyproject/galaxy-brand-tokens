import { test } from "node:test";
import assert from "node:assert/strict";
import { themeToRoot } from "../scripts/generate.mjs";

test("swaps the leading @theme wrapper for :root", () => {
  const input = "@theme {\n  --color-galaxy-primary: #25537b;\n}\n";
  const expected = ":root {\n  --color-galaxy-primary: #25537b;\n}\n";
  assert.equal(themeToRoot(input), expected);
});

test("preserves comments and every declaration", () => {
  const input = "@theme {\n  /* palette */\n  --a: 1;\n  --b: 2;\n}\n";
  const expected = ":root {\n  /* palette */\n  --a: 1;\n  --b: 2;\n}\n";
  assert.equal(themeToRoot(input), expected);
});

test("only the @theme keyword changes, declarations are untouched", () => {
  const input = "@theme {\n  --font-sans: 'Atkinson Hyperlegible', sans-serif;\n}\n";
  assert.ok(themeToRoot(input).includes("--font-sans: 'Atkinson Hyperlegible', sans-serif;"));
  assert.ok(themeToRoot(input).startsWith(":root {"));
});
