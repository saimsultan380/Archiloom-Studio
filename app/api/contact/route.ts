import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

const allowedFileTypes = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/zip",
  "application/x-zip-compressed",
]);

const maxFileBytes = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let payload: unknown;
  let file: File | null = null;

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      payload = JSON.parse(String(form.get("payload") ?? ""));
      const attached = form.get("file");
      file = attached instanceof File && attached.size > 0 ? attached : null;
    } else {
      payload = await request.json();
    }
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (file) {
    if (file.size > maxFileBytes) {
      return NextResponse.json(
        { ok: false, message: "Attachment must be 8 MB or smaller." },
        { status: 400 },
      );
    }
    if (file.type && !allowedFileTypes.has(file.type)) {
      return NextResponse.json(
        { ok: false, message: "Attach a PDF, image, or ZIP." },
        { status: 400 },
      );
    }
  }

  // Stub only. This draft validates the enquiry and does not store or email it.
  return NextResponse.json({ ok: true });
}
