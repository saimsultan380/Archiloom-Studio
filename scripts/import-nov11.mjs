import { mkdirSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const pack = join(root, "public/11-NOV-26-editis");

function walk(dir, match) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full, match));
    else if (match.test(name)) out.push(full);
  }
  return out.sort((a, b) => a.localeCompare(b));
}

async function still(src, dest) {
  await sharp(src)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(dest);
}

async function stills(files, prefix) {
  let n = 1;
  for (const file of files) {
    const id = String(n).padStart(2, "0");
    await still(file, join(root, "public/images", `${prefix}-${id}.webp`));
    n += 1;
    console.log(prefix, id);
  }
  return files.length;
}

async function loop(src, dest) {
  await sharp(src, { animated: true, pages: -1 }).webp({ quality: 72, effort: 4 }).toFile(dest);
  console.log("loop", dest);
}

function punch(data, mode) {
  if (mode === "keep") return;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (mode === "knockout-black" && lum < 42 && sat < 36) data[i + 3] = 0;
  }
}

async function logo(src, id, mode) {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .trim({ threshold: 12 })
    .resize({ width: 720, height: 360, fit: "inside", withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.from(data);
  punch(rgba, mode);
  let visible = 0;
  for (let i = 3; i < rgba.length; i += 4) if (rgba[i] > 20) visible += 1;
  if (visible < 80) {
    console.warn("skip faint", id);
    return false;
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(join(root, "public/clients", `${id}.webp`));
  console.log("logo", id);
  return true;
}

async function portrait(src, id) {
  await sharp(src)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(root, "public/team", `${id}.webp`));
  console.log("team", id);
}

async function run() {
  mkdirSync(join(root, "public/images"), { recursive: true });
  mkdirSync(join(root, "public/clients"), { recursive: true });
  mkdirSync(join(root, "public/team"), { recursive: true });

  const services = [
    ["Architecture Design Services.png", "service-architecture.webp"],
    ["Interior Design Services.png", "service-interior.webp"],
    ["3D Rendering and Visualization Services.png", "service-rendering.webp"],
    ["Revit Drafting image.png", "service-revit.webp"],
    ["construction permits image.png", "service-permits.webp"],
  ];
  for (const [file, dest] of services) {
    await still(join(pack, file), join(root, "public/images", dest));
    console.log("service", dest);
  }

  const logos = join(pack, "new logos for clients");
  const logoJobs = [
    ["pressed_juicery_transparent.png", "pressed-juicery", "keep"],
    ["JANJUDAN TEA.png", "jenjudan", "keep"],
    ["AFO-01.png", "kinetic-design", "keep"],
    ["AFO-02.png", "intelligent-horizon", "knockout-black"],
    ["AFO-04.png", "efreez", "keep"],
    ["AFO-05.png", "merchant-architecture", "keep"],
    ["AFO-08.png", "knoll-miller", "keep"],
    ["images (1).png", "boardwalk-billys", "keep"],
    ["LOGO.JPG", "tech-station", "keep"],
    ["ATA_wordmark_black.png", "ata", "knockout-black"],
    ["AFO-06.png", "afo-06", "knockout-black"],
    ["AFO-07.png", "afo-07", "knockout-black"],
  ];
  for (const [file, id, mode] of logoJobs) {
    await logo(join(logos, file), id, mode);
  }

  const teamDir = join(pack, "modified Team pictures");
  await portrait(join(teamDir, "Zahid Naveed.png"), "zahid-naveed");
  await portrait(join(teamDir, "Umair akram.png"), "umair-akram");
  await portrait(join(teamDir, "Hamza ali .png"), "hamza-ali");
  await portrait(join(teamDir, "Zaigham Ali.png"), "zaigham-ali");
  await portrait(join(teamDir, "Aqeel Faisal Kiani.png"), "aqeel-faisal");

  const wejdn = walk(join(pack, "WEJDAN SALON -RIYADH - KSA - (mm)"), /\.(png|jpe?g)$/i);
  const naache = walk(join(pack, "NAACHE COMMONS  SITE  - CANADA - (ft-mm)"), /\.(png|jpe?g)$/i);
  const flav = walk(join(pack, "FLAVOURSREST RESTAURANT EXTERIOR - CANADA- (ft-mm)"), /\.(png|jpe?g)$/i);
  const rich = walk(join(pack, "RICHARDS RESIDENCE -OKLAND,CA - USA"), /\.(png|jpe?g)$/i);
  const flavOrdered = [
    ...flav.filter((file) => !/\\D\d\.png$/i.test(file)),
    ...flav.filter((file) => /\\D\d\.png$/i.test(file)),
  ];

  console.log("counts", {
    wejdn: await stills(wejdn, "wejdan"),
    naache: await stills(naache, "naache"),
    flavours: await stills(flavOrdered, "flavoursrest"),
    richards: await stills(rich, "richards-residence"),
  });

  const gifs = walk(join(pack, "WEJDAN SALON -RIYADH - KSA - (mm)"), /\.gif$/i);
  if (gifs[0]) await loop(gifs[0], join(root, "public/images/wejdan-completion.webp"));
  const richGif = walk(join(pack, "RICHARDS RESIDENCE -OKLAND,CA - USA"), /\.gif$/i);
  if (richGif[0]) await loop(richGif[0], join(root, "public/images/richards-residence-completion.webp"));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
