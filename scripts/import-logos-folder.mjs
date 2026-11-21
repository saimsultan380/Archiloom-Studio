import { mkdirSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const srcDir = join(root, "public/logos");
const outDir = join(root, "public/clients");

/** Every file in /public/logos — none skipped. */
export const logoJobs = [
  { id: "baby-cafe", file: "5.JPG", mode: "keep", name: "Baby Café" },
  { id: "baby-cafe-mark", file: "Attachment_1578978366.jpeg", mode: "keep", name: "Baby Café" },
  { id: "bologna", file: "bologna logo.png", mode: "keep", name: "Bologna Fresh Pasta" },
  { id: "z-outdoors", file: "Capture.JPG", mode: "black", name: "Z Outdoors" },
  { id: "finish-line-icon", file: "ICON.png", mode: "knockout-black", name: "Finish Line" },
  { id: "boardwalk-billys", file: "images (1).png", mode: "keep", name: "Boardwalk Billys" },
  { id: "violet-and-ivvy", file: "images.jpg", mode: "knockout-black", name: "Violet and Ivvy" },
  { id: "pressed-juicery", file: "pressed.png", mode: "knockout-white", name: "Pressed Juicery" },
  { id: "recovapro", file: "logo-01.PNG", mode: "black", name: "Recova Pro" },
  { id: "edgewater", file: "LOGO-1-RGB.jpg", mode: "keep", name: "Edgewater Ice Cream" },
  { id: "edgewater-dark", file: "LOGO-2-RGB.png", mode: "knockout-black", name: "Edgewater Ice Cream" },
  { id: "finish-line", file: "LOGO.JPG", mode: "knockout-black", name: "Finish Line" },
  { id: "finish-line-wide", file: "LOGO.png", mode: "knockout-black", name: "Finish Line" },
  { id: "maryland-chicken", file: "logo3.jpg", mode: "keep", name: "Maryland Chicken" },
  { id: "pro-corner-dark", file: "Main Logotransparent black.png", mode: "invert-dark", name: "Pro Corner" },
  { id: "pro-corner", file: "Main Logotransparent reversed.png", mode: "knockout-black", name: "Pro Corner" },
  { id: "yoe-nails", file: "NAILS _ BEAUTY HOUSE.png", mode: "knockout-black", name: "YOE Nails & Beauty House" },
  { id: "rosatis", file: "Original Rosati’s Logo (2).png", mode: "keep", name: "Rosati's Chicago Pizza" },
  { id: "recovapro-wordmark", file: "recovapro -01.PNG", mode: "black", name: "Recova Pro" },
  { id: "recovapro-mark", file: "recovapro-02.PNG", mode: "black", name: "Recova Pro" },
  { id: "take-mark", file: "Screenshot 2025-09-04 120425.jpg", mode: "black", name: "Take Burger" },
  { id: "take-burger", file: "Screenshot 2025-09-07 150507.jpg", mode: "black", name: "Take Burger" },
  { id: "jenjudan", file: "JANJUDAN TEA.png", mode: "keep", name: "Jenjudan Bubble Tea" },
  { id: "cutbox", file: "Screenshot 2026-10-24 135140.png", mode: "black", name: "Cutbox" },
  { id: "violet-and-ivvy-wordmark", file: "Screenshot 2026-10-24 140835.png", mode: "black", name: "Violet and Ivvy" },
  { id: "dei-coltelli", file: "Untitled-2.jpg", mode: "keep", name: "dei Coltelli" },
  { id: "yuri-essence", file: "YE Short.png", mode: "knockout-black", name: "Yuri Essence" },
];

function processRgba(data, mode) {
  if (mode === "keep") return;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (mode === "knockout-black") {
      if (lum < 42 && sat < 36) data[i + 3] = 0;
      continue;
    }

    if (mode === "knockout-white") {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      const alpha = Math.round(255 - lum);
      data[i + 3] = alpha < 4 ? 0 : alpha;
      continue;
    }

    if (mode === "invert-dark") {
      // Black-on-black assets: lift near-black marks to charcoal, clear pure bg.
      if (lum < 18) {
        data[i + 3] = 0;
      } else if (lum < 70 && sat < 30) {
        data[i] = 29;
        data[i + 1] = 29;
        data[i + 2] = 29;
        data[i + 3] = 255;
      }
      continue;
    }

    if (lum < 28 && sat < 22) data[i + 3] = 0;
  }
}

async function run() {
  mkdirSync(outDir, { recursive: true });
  let ok = 0;

  for (const logo of logoJobs) {
    const src = join(srcDir, logo.file);
    if (!existsSync(src)) {
      console.warn(`missing ${logo.id} → ${logo.file}`);
      continue;
    }

    const { data, info } = await sharp(src)
      .ensureAlpha()
      .trim({ threshold: 8 })
      .resize({ width: 720, height: 360, fit: "inside", withoutEnlargement: true })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rgba = Buffer.from(data);
    processRgba(rgba, logo.mode);

    await sharp(rgba, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(join(outDir, `${logo.id}.webp`));

    ok += 1;
    console.log(`ok ${logo.id}`);
  }

  console.log(`done ${ok}/${logoJobs.length}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
