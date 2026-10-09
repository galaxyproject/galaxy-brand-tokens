import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { themeToRoot } from "../scripts/generate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");

const source = read("src/theme.css");
const tokens = new Map(
  [...source.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
);

function resolve(name, seen = []) {
  if (seen.includes(name)) throw new Error(`cycle: ${[...seen, name].join(" -> ")}`);
  const value = tokens.get(name);
  if (value === undefined) throw new Error(`${[...seen, name].join(" -> ")} is not declared`);
  const reference = value.match(/^var\((--[\w-]+)\)$/);
  return reference ? resolve(reference[1], [...seen, name]) : value.toLowerCase();
}
const color = (name) => resolve(`--color-${name}`);

const SCALES = ["bay-of-many", "ebony-clay", "gold", "chicago", "hokey-pokey"];
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

test("dist/ matches what the generator builds from src/theme.css", () => {
  assert.equal(read("dist/theme.css"), source);
  assert.equal(read("dist/tokens.css"), themeToRoot(source));
});

test("every var() reference points at a declared token", () => {
  const dangling = [...tokens].flatMap(([name, value]) =>
    [...value.matchAll(/var\((--[\w-]+)\)/g)]
      .filter(([, reference]) => !tokens.has(reference))
      .map(([, reference]) => `${name} -> ${reference}`),
  );
  assert.deepEqual(dangling, []);
});

test("every color token resolves to a 6-digit hex", () => {
  for (const name of tokens.keys()) {
    if (name.startsWith("--color-")) assert.match(resolve(name), /^#[0-9a-f]{6}$/, name);
  }
});

test("every scale has the full Tailwind 50-950 range, darkening as the shade rises", () => {
  // Relative luminance (WCAG); a typo'd shade usually breaks the ordering.
  const luminance = (hex) =>
    [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
      .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
  for (const scale of SCALES) {
    const values = SHADES.map((shade) => color(`${scale}-${shade}`));
    for (let i = 1; i < values.length; i++) {
      assert.ok(
        luminance(values[i]) < luminance(values[i - 1]),
        `${scale}-${SHADES[i]} (${values[i]}) should be darker than ${scale}-${SHADES[i - 1]} (${values[i - 1]})`,
      );
    }
  }
});

test("the semantic aliases equal the scale shades the header comment and DESIGN.md name", () => {
  const mapping = {
    "galaxy-primary": "bay-of-many-900",
    "galaxy-dark": "ebony-clay-900",
    "galaxy-gold": "gold-500",
    "galaxy-gold-dark": "gold-600",
    "galaxy-grey": "chicago-600",
    "light-bg": "bay-of-many-100",
    "dark-bg": "ebony-clay-900",
    "medium-bg": "ebony-clay-800",
    "card-bg": "ebony-clay-600",
    highlight: "gold-500",
    "highlight-hover": "gold-400",
    "bay-of-many": "bay-of-many-900",
    "ebony-clay": "ebony-clay-900",
    gold: "gold-500",
    chicago: "chicago-600",
    "hokey-pokey": "hokey-pokey-500",
  };
  for (const [alias, shade] of Object.entries(mapping)) {
    assert.equal(color(alias), color(shade), `${alias} should equal ${shade}`);
  }
});

test("the deprecated accent pair stays a pure alias of highlight", () => {
  assert.equal(tokens.get("--color-accent"), "var(--color-highlight)");
  assert.equal(tokens.get("--color-accent-hover"), "var(--color-highlight-hover)");
});

test("hex values in DESIGN.md tables match the tokens they name", () => {
  const mismatches = [];
  for (const row of read("DESIGN.md").split("\n").filter((line) => line.startsWith("|"))) {
    const hex = row.match(/`(#[0-9a-fA-F]{6})`/)?.[1].toLowerCase();
    if (!hex) continue;
    for (const [, name] of row.matchAll(/`([a-z][a-z0-9-]*)`/g)) {
      if (tokens.has(`--color-${name}`) && color(name) !== hex) {
        mismatches.push(`${name}: DESIGN.md says ${hex}, theme.css has ${color(name)}`);
      }
    }
  }
  assert.deepEqual(mismatches, []);
});
