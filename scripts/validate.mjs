import fs from "node:fs";

import imageManifest from "../src/data/images.js";

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("src/styles/main.css", "utf8");
const mainScript = fs.readFileSync("src/main.js", "utf8");
const imageData = fs.readFileSync("src/data/images.js", "utf8");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const manifest = imageManifest;
const requiredFields = ["src", "alt", "credit", "section", "type", "fallback"];
const failures = [];

if (!Array.isArray(manifest)) {
  failures.push("Image manifest module did not export an array.");
} else {
  if (manifest.length < 35 || manifest.length > 50) {
    failures.push(`Expected 35-50 visual slots, found ${manifest.length}.`);
  }

  const ids = new Set();
  for (const item of manifest) {
    if (!item.id) failures.push("Manifest item missing id.");
    if (ids.has(item.id)) failures.push(`Duplicate image id: ${item.id}`);
    ids.add(item.id);

    for (const field of requiredFields) {
      if (!(field in item)) failures.push(`${item.id || "unknown"} missing ${field}.`);
    }

    if (!/[\u4e00-\u9fff]/.test(item.alt || "")) {
      failures.push(`${item.id} alt text should be Chinese.`);
    }

    if (!item.fallback || !item.fallback.motif || !item.fallback.title) {
      failures.push(`${item.id} fallback needs motif and title.`);
    }
  }

  const sections = new Set(manifest.map((item) => item.section));
  for (const section of ["hero", "characters", "timeline", "objects", "relationships", "quotes", "finale"]) {
    if (!sections.has(section)) failures.push(`Missing section images: ${section}.`);
  }
}

if (!html.includes("含全剧剧透")) {
  failures.push("Spoiler warning text is missing from index.html.");
}

if (html.includes("clip-grid") || mainScript.includes("youtube-nocookie.com/embed") || mainScript.includes("<iframe")) {
  failures.push("Video clip section or iframe embed should not be present.");
}

if (/letter-spacing:\s*-[^;]+/.test(css)) {
  failures.push("CSS contains negative letter-spacing.");
}

if (/static\.tvmaze\.com\/uploads\/images\/medium_/.test(imageData)) {
  failures.push("TVMaze image URLs should use original_untouched, not medium_*.");
}

if (/overflow-x:\s*scroll/.test(css)) {
  failures.push("CSS explicitly enables horizontal scrolling.");
}

if (/@import\s+url\(/.test(css)) {
  failures.push("CSS should not use @import for fonts; use HTML preconnect + stylesheet links.");
}

if (!html.includes('rel="preconnect" href="https://fonts.gstatic.com" crossorigin')) {
  failures.push("Font preconnect is missing from index.html.");
}

if (!html.includes('rel="dns-prefetch" href="//static.tvmaze.com"')) {
  failures.push("TVMaze DNS prefetch is missing from index.html.");
}

if (!pkg.scripts?.validate || !pkg.scripts?.start) {
  failures.push("package.json should expose validate and start scripts.");
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${manifest.length} visual slots with required manifest fields and Chinese alt text.`);
