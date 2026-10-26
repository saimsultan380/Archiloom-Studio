import { existsSync, mkdirSync, readdirSync, renameSync, statSync, unlinkSync, writeFileSync } from "fs";
import { extname, join } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const srcDir = join(
  root,
  "public",
  "RICHARDS RESIDENCE -OKLAND,CA - USA",
  "RICHARDS RESIDENCE -OKLAND,CA - USA",
);
const outDir = join(root, "public/images");
const stage = join(root, "public/.import-richards");
const slug = "richards-residence";
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 78;

function listFiles() {
  return readdirSync(srcDir)
    .map((name) => {
      const full = join(srcDir, name);
      return { name, full, size: statSync(full).size, ext: extname(name).toLowerCase() };
    })
    .filter((f) => statSync(f.full).isFile());
}

async function toWebp(src, dest, animated = false) {
  let img = sharp(src, { animated, limitInputPixels: false });
  if (!animated) {
    img = img.rotate();
    const meta = await img.metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
  }
  const buffer = await img.webp({ quality: animated ? 80 : WEBP_QUALITY, effort: 4 }).toBuffer();
  writeFileSync(dest, buffer);
  return buffer.length;
}

const files = listFiles();
const stills = files
  .filter((f) => [".png", ".jpg", ".jpeg", ".webp"].includes(f.ext))
  .sort((a, b) => b.size - a.size);
const gif = files.filter((f) => f.ext === ".gif").sort((a, b) => b.size - a.size)[0];

mkdirSync(stage, { recursive: true });
mkdirSync(outDir, { recursive: true });

console.log(`Found ${stills.length} stills` + (gif ? " + gif" : ""));

for (let i = 0; i < stills.length; i += 1) {
  const n = String(i + 1).padStart(2, "0");
  const dest = join(stage, `${slug}-${n}.webp`);
  const after = await toWebp(stills[i].full, dest, false);
  console.log(
    `[still] ${stills[i].name} → ${slug}-${n}.webp  ${(stills[i].size / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(2)}MB`,
  );
}

if (gif) {
  const dest = join(stage, `${slug}-completion.webp`);
  const after = await toWebp(gif.full, dest, true);
  console.log(
    `[gif] ${gif.name} → ${slug}-completion.webp  ${(gif.size / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(2)}MB`,
  );
}

const result = spawnSync("robocopy", [stage, outDir, "/E", "/IS", "/IT", "/R:2", "/W:1"], {
  encoding: "utf8",
});
if (result.status != null && result.status >= 8) {
  throw new Error(`robocopy failed: ${result.status}`);
}

// cleanup stage
for (const name of readdirSync(stage)) {
  unlinkSync(join(stage, name));
}
try {
  const { rmSync } = await import("fs");
  rmSync(stage, { recursive: true, force: true });
} catch {
  /* ignore */
}

console.log(`\nImported ${stills.length} stills` + (gif ? " + completion loop" : "") + ` as ${slug}-*.webp`);
console.log(JSON.stringify({ slug, stillCount: stills.length, hasGif: Boolean(gif) }));
