import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const source = join(root, "public/logo.png");
const appDir = join(root, "app");
const publicDir = join(root, "public");

mkdirSync(appDir, { recursive: true });

async function writePng(size, dest) {
  await sharp(source)
    .resize(size, size, { fit: "contain", background: { r: 29, g: 29, b: 29, alpha: 1 } })
    .png()
    .toFile(dest);
  console.log(`wrote ${dest} (${size}x${size})`);
}

await writePng(48, join(publicDir, "icon-48.png"));
await writePng(192, join(publicDir, "icon-192.png"));
await writePng(512, join(publicDir, "icon-512.png"));
await writePng(32, join(appDir, "icon.png"));
await writePng(180, join(appDir, "apple-icon.png"));

// Keep a conventional favicon.ico-sized PNG at /favicon.ico path via copy of 48px for crawlers.
copyFileSync(join(publicDir, "icon-48.png"), join(publicDir, "favicon-48.png"));
console.log("SEO icons ready");
