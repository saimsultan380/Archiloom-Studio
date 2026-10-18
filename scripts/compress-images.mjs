import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "fs";
import { extname, join, relative } from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const sources = [
  { from: join(root, "public/images"), stage: join(root, "public/.images-compressed") },
  { from: join(root, "public/team"), stage: join(root, "public/.team-compressed") },
];

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 78;
const JPEG_QUALITY = 82;

function formatBytes(n) {
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function optimize(filePath, ext) {
  const animated = ext === ".gif";
  // Do not rotate/resize animated sources — sharp can flatten them to one frame.
  let img = sharp(filePath, {
    animated,
    limitInputPixels: false,
  });
  if (!animated) {
    img = img.rotate();
    const meta = await img.metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
  }

  if (ext === ".gif") {
    return { buffer: await img.webp({ quality: 80, effort: 4 }).toBuffer(), outExt: ".webp" };
  }

  // Skip re-encoding already-animated webp (would risk flattening).
  if (ext === ".webp") {
    const meta = await sharp(filePath, { animated: true, limitInputPixels: false }).metadata();
    if (meta.pages && meta.pages > 1) {
      return null;
    }
    return {
      buffer: await img.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer(),
      outExt: ".webp",
    };
  }

  if (ext === ".png") {
    return { buffer: await img.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer(), outExt: ".webp" };
  }
  if (ext === ".jpg" || ext === ".jpeg") {
    return {
      buffer: await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer(),
      outExt: ext,
    };
  }
  return null;
}

async function compressDir(fromDir, stageDir) {
  rmSync(stageDir, { recursive: true, force: true });
  mkdirSync(stageDir, { recursive: true });

  const names = readdirSync(fromDir).filter((name) => {
    const ext = extname(name).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
  });

  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of names.sort()) {
    const src = join(fromDir, name);
    const ext = extname(name).toLowerCase();
    const before = statSync(src).size;

    // Prefer already-converted webp over leftover gif/png with same stem.
    if (ext === ".gif" || ext === ".png") {
      const webpSibling = join(fromDir, name.replace(/\.(gif|png)$/i, ".webp"));
      try {
        if (statSync(webpSibling).size > 0) {
          console.log(`[skip-dup] ${relative(root, src)} (webp already exists)`);
          continue;
        }
      } catch {
        /* no sibling */
      }
    }

    try {
      const result = await optimize(src, ext);
      const outName = name.replace(/\.(gif|png)$/i, ".webp");
      const outPath = join(stageDir, outName);

      if (!result) {
        // Keep animated webps / unsupported outputs untouched.
        copyFileSync(src, join(stageDir, name));
        totalBefore += before;
        totalAfter += before;
        console.log(`[keep] ${relative(root, src)}`);
        continue;
      }

      const shouldReplace =
        result.outExt !== ext ||
        result.buffer.length < before ||
        ext === ".gif" ||
        ext === ".png";

      if (shouldReplace) {
        writeFileSync(outPath, result.buffer);
      } else {
        copyFileSync(src, outPath);
      }

      const after = statSync(outPath).size;
      totalBefore += before;
      totalAfter += after;
      const pct = Math.round((1 - after / before) * 100);
      console.log(
        `[ok] ${relative(root, src)} → ${relative(root, outPath)}  ${formatBytes(before)} → ${formatBytes(after)} (${pct}%)`,
      );
    } catch (error) {
      console.error(`[fail] ${relative(root, src)}: ${error.message}`);
      copyFileSync(src, join(stageDir, name));
      totalBefore += before;
      totalAfter += before;
      console.log(`[copy] ${relative(root, src)} (kept original)`);
    }
  }

  return { totalBefore, totalAfter };
}

function publishStaged(liveDir, stageDir) {
  // Robocopy can replace locked files on Windows more reliably than rename/unlink.
  const result = spawnSync(
    "robocopy",
    [stageDir, liveDir, "/E", "/IS", "/IT", "/R:2", "/W:1"],
    { encoding: "utf8" },
  );
  // Robocopy exit codes 0–7 are success.
  if (result.status != null && result.status >= 8) {
    throw new Error(`robocopy failed with code ${result.status}\n${result.stdout}\n${result.stderr}`);
  }
  rmSync(stageDir, { recursive: true, force: true });
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const { from, stage } of sources) {
    console.log(`\nCompressing ${relative(root, from)} ...`);
    const stats = await compressDir(from, stage);
    totalBefore += stats.totalBefore;
    totalAfter += stats.totalAfter;
    publishStaged(from, stage);
    console.log(`Published ${relative(root, from)}`);
  }

  console.log(
    `\nTotal: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (saved ${formatBytes(totalBefore - totalAfter)})`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
