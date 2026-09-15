import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "dist");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const files = [
  "index.html",
  "styles.css",
  "script.js",
  "ornament.svg",
  "ornament-flipped.svg",
  "wedding-crest.svg",
  "corner-floral.svg"
];

for (const file of files) {
  fs.copyFileSync(path.join(__dirname, file), path.join(dist, file));
}

fs.cpSync(path.join(__dirname, "fonts"), path.join(dist, "fonts"), { recursive: true });

console.log(`Build complete: ${path.relative(__dirname, dist)}`);
