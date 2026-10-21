import { mkdirSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const assets =
  "C:/Users/saims/.cursor/projects/d-ARCHILOOM-STUDIO/assets";
const outDir = join(root, "public/clients");

/** Prefer Cursor asset drops; fall back to any leftover public root files. */
const logos = [
  {
    id: "finish-line",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_finishline-logo-7434b249-10ba-4458-b84d-4da1fe59af98.png",
    mode: "black",
  },
  {
    id: "tonino-lamborghini",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_latin_lamorbergini-5a109cf2-1e76-4112-9f01-d60c04ed2e3e.png",
    mode: "black-invert-white",
  },
  {
    id: "hardrock",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_hardrock-9abeaef3-113a-4c26-9f38-a770118d3c89.png",
    mode: "black-invert-white",
  },
  {
    id: "cinnabon",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_cin-brand-logo-desktop-4c77f14b-9d7d-4143-ad3f-fd5599c86884.png",
    mode: "black",
  },
  {
    id: "logipoint",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_logonew-db223bc4-afd0-4c75-a99b-bf4164ff8892.png",
    mode: "black",
  },
  {
    id: "boardwalk-billys",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_boardwalk-729c5ad7-c2ff-485c-9b1d-53596dda0e6c.png",
    mode: "black",
  },
  {
    id: "masala-pizza",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_mazala-pizze-b7fccd16-e364-45a0-8d61-a70db069e511.png",
    mode: "black",
  },
  {
    id: "chaos-karts",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_chaos-d8cbabac-db88-408b-bc36-7fceccfc2e1d.png",
    mode: "black",
  },
  {
    id: "seven-leaves",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_7leaves-7396aff1-66a6-42cb-a1f4-041f1eccd283.png",
    mode: "black",
  },
  {
    id: "bin-yaber",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_bin-yaber-2303c242-dfff-4342-a08d-b84926785f76.png",
    mode: "keep",
  },
  {
    id: "barrett-jackson",
    asset:
      "c__Users_saims_AppData_Roaming_Cursor_User_workspaceStorage_6e26dfe0d86ff0ed2aea146d7339fc94_images_barrett-jackson_logo-2a4625d0-b2b5-48f1-8f71-ff44772048ad.png",
    mode: "black",
  },
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

    // Knock out near-black / dark gray studio backgrounds.
    if (lum < 36 && sat < 28) {
      data[i + 3] = 0;
      continue;
    }

    if (mode === "black-invert-white" && min > 210 && sat < 20) {
      data[i] = 29;
      data[i + 1] = 29;
      data[i + 2] = 29;
    }
  }
}

async function run() {
  mkdirSync(outDir, { recursive: true });

  for (const logo of logos) {
    const src = join(assets, logo.asset);
    if (!existsSync(src)) {
      console.warn(`missing ${logo.id}`);
      continue;
    }

    const { data, info } = await sharp(src)
      .ensureAlpha()
      .resize({ width: 720, withoutEnlargement: true })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rgba = Buffer.from(data);
    processRgba(rgba, logo.mode);

    await sharp(rgba, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(join(outDir, `${logo.id}.webp`));

    console.log(`ok ${logo.id}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
