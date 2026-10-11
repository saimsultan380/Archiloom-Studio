import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
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

  // Stub only. This draft validates the enquiry and does not store or email it.
  return NextResponse.json({ ok: true });
}
