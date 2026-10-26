/**
 * Pulls the best stills/gifs/videos from public/<project folders>
 * into compressed public/images/{slug}-NN.webp (and optional media).
 *
 * Usage: node scripts/import-client-projects.mjs
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "fs";
import { basename, extname, join, relative } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const outDir = join(root, "public/images");
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 78;
const MAX_STILLS = 12;

/** @type {{ slug: string, dir: string, max?: number, gifs?: boolean, videos?: string[] }[]} */
const jobs = [
  { slug: "masala", dir: "MASALA PIZZA -5 - SCHAUMBURG, IL, USA - (ft)", gifs: true },
  { slug: "masala-chicago", dir: "MASALA PIZZA -1 -  CHICAGO - USA- (ft)" },
  { slug: "finish-line", dir: "FINISH LINE HAIRCUT - USA- (ft)" },
  { slug: "cinnabon", dir: "CHINNABON - LAH- PK - (ft)" },
  { slug: "bin-yaber", dir: "BIN YABER DRIVING -01 - UAE - (mm)" },
  { slug: "bin-yaber-02", dir: "BIN YABER DRIVING -02 - UAE - (mm)" },
  { slug: "seven-leaves", dir: "7-LEAVES CAFE-SAN FRANCISCO, CA - USA- (mm)" },
  { slug: "barrett-jackson", dir: "BARRETT JACKSON STORE - USA- (ft)" },
  { slug: "chaos-karts", dir: "CHAOSKARTS - DUBAI - UAE" },
  { slug: "cutbox", dir: "CUTBOX STORE - LONDON - UK- (mm)" },
  { slug: "e-outdoors", dir: "E - OUTDOOR STORE - CANADA- (ft)", gifs: true },
  { slug: "flavoursrest", dir: "FLAVOURSREST RESTAURANT EXTERIOR - CANADA- (ft-mm)" },
  { slug: "lamborghini", dir: "LAMBORGINI SHOP -TOKYO - JAPAN- (mm)" },
  { slug: "nouveau", dir: "NOUVEAU RESTURANT & BAR  - TEXAS - USA - (ft)", gifs: true },
  { slug: "logipoint", dir: "OFFICE - LOGIPOINT INTERIOR - KSA- (mm)" },
  { slug: "pressed", dir: "PRESSED -01- USA- (ft)" },
  { slug: "ramsar", dir: "RAMSAR SALOON - HONGKONG- (mm)" },
  { slug: "tacotarian", dir: "TACOTARIAN  CAFE - USA- (ft)" },
  {
    slug: "tech-station",
    dir: "TECH STATION STORE - RIYADH - KSA- (mm)",
    videos: ["OPENING DAY.mp4"],
  },
  { slug: "naache", dir: "NAACHE COMMONS  SITE  - CANADA - (ft-mm)" },
  {
    slug: "richards-residence",
    dir: "RICHARDS RESIDENCE -OKLAND,CA - USA/RICHARDS RESIDENCE -OKLAND,CA - USA",
    gifs: true,
  },
];

function listFiles(dir) {
  const abs = join(root, "public", dir);
  if (!existsSync(abs)) {
    console.warn(`[missing] ${dir}`);
    return [];
  }
  const out = [];
  for (const name of readdirSync(abs)) {
    const full = join(abs, name);
    if (!statSync(full).isFile()) continue;
    out.push({ name, full, size: statSync(full).size, ext: extname(name).toLowerCase() });
  }
  return out;
}

function pickStills(files, max) {
  const stills = files.filter((f) => [".png", ".jpg", ".jpeg", ".webp"].includes(f.ext));
  // Prefer 4k renders over _sd / WhatsApp snaps when both exist.
  const ranked = stills
    .filter((f) => !/whatsapp/i.test(f.name))
    .sort((a, b) => {
      const aSd = /_sd\./i.test(a.name) ? 1 : 0;
      const bSd = /_sd\./i.test(b.name) ? 1 : 0;
      if (aSd !== bSd) return aSd - bSd;
      return b.size - a.size;
    });

  // Deduplicate near-identical scene keys (same prefix before last hash-ish token).
  const chosen = [];
  const seen = new Set();
  for (const file of ranked) {
    const key = file.name
      .replace(/_[a-z0-9]{6,}_?4k/gi, "")
      .replace(/_sd/gi, "")
      .replace(/\.(png|jpe?g|webp)$/i, "")
      .toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    chosen.push(file);
    if (chosen.length >= max) break;
  }
  return chosen;
}

async function writeWebp(src, dest) {
  const img = sharp(src, { limitInputPixels: false, animated: false }).rotate();
  const meta = await img.metadata();
  let pipeline = img;
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  const buffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer();
  writeFileSync(dest, buffer);
  return buffer.length;
}

async function writeAnimatedWebp(src, dest) {
  const buffer = await sharp(src, { animated: true, limitInputPixels: false })
    .webp({ quality: 80, effort: 4 })
    .toBuffer();
  writeFileSync(dest, buffer);
  return buffer.length;
}

function publishViaRobocopy(stage, live) {
  const result = spawnSync("robocopy", [stage, live, "/E", "/IS", "/IT", "/R:2", "/W:1"], {
    encoding: "utf8",
  });
  if (result.status != null && result.status >= 8) {
    throw new Error(`robocopy failed: ${result.status}\n${result.stdout}`);
  }
}

async function processJob(job) {
  const files = listFiles(job.dir);
  if (!files.length) return null;

  const stage = join(root, "public", `.import-${job.slug}`);
  mkdirSync(stage, { recursive: true });

  const stills = pickStills(files, job.max ?? MAX_STILLS);
  const manifest = { slug: job.slug, dir: job.dir, stills: [], gif: null, video: null };

  for (let i = 0; i < stills.length; i += 1) {
    const n = String(i + 1).padStart(2, "0");
    const destName = `${job.slug}-${n}.webp`;
    const dest = join(stage, destName);
    const before = stills[i].size;
    const after = await writeWebp(stills[i].full, dest);
    console.log(
      `  [still] ${stills[i].name} → ${destName}  ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(2)}MB`,
    );
    manifest.stills.push(`/images/${destName}`);
  }

  if (job.gifs) {
    const gifs = files
      .filter((f) => f.ext === ".gif")
      .sort((a, b) => b.size - a.size);
    if (gifs[0]) {
      const destName = `${job.slug}-completion.webp`;
      const after = await writeAnimatedWebp(gifs[0].full, join(stage, destName));
      console.log(
        `  [gif] ${gifs[0].name} → ${destName}  ${(gifs[0].size / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(2)}MB`,
      );
      manifest.gif = `/images/${destName}`;
    }
  }

  if (job.videos?.length) {
    for (const videoName of job.videos) {
      const match = files.find((f) => f.name === videoName);
      if (!match) continue;
      // Skip huge films (>25MB) — keep stills only.
      if (match.size > 25 * 1024 * 1024) {
        console.log(`  [skip-video] ${match.name} (${(match.size / 1e6).toFixed(0)}MB too large)`);
        continue;
      }
      const destName = `${job.slug}-video${extname(match.name).toLowerCase()}`;
      copyFileSync(match.full, join(stage, destName));
      console.log(`  [video] ${match.name} → ${destName}`);
      manifest.video = `/images/${destName}`;
    }
  }

  publishViaRobocopy(stage, outDir);
  // cleanup stage
  try {
    const { rmSync } = await import("fs");
    rmSync(stage, { recursive: true, force: true });
  } catch {
    /* ignore */
  }

  return manifest;
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const manifests = [];
  for (const job of jobs) {
    console.log(`\n=== ${job.slug} ===`);
    const manifest = await processJob(job);
    if (manifest?.stills?.length) manifests.push(manifest);
  }
  writeFileSync(join(root, "scripts/.import-manifest.json"), JSON.stringify(manifests, null, 2));
  console.log(`\nWrote ${manifests.length} project manifests → scripts/.import-manifest.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
