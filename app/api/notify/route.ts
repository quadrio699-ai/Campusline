import { NextResponse } from "next/server";
import { Resend } from "resend";

// Server-only env vars (no NEXT_PUBLIC_ prefix) — never reach the browser.
const resendApiKey = process.env.RESEND_API_KEY;
const notifyEmail = process.env.NOTIFY_EMAIL;

export async function POST(request: Request) {
  // The concern is already safely saved in Supabase by the time this runs —
  // this route only sends a heads-up email, so any failure here is quiet
  // and never affects what the student sees.
  try {
    if (!resendApiKey || !notifyEmail) {
      console.warn(
        "Email alerts skipped: RESEND_API_KEY or NOTIFY_EMAIL not set."
      );
      return NextResponse.json({ skipped: true });
    }

    const { category, message, isAnonymous } = await request.json();
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "CampusLine <onboarding@resend.dev>",
      to: notifyEmail,
      subject: `CampusLine: new concern — ${category}`,
      text: `Category: ${category}\nAnonymous: ${isAnonymous ? "Yes" : "No"}\n\n${message}\n\n— View full details, and any name/matric number given, in Supabase's Table Editor.`,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("CampusLine notify email failed:", error);
    // Still 200: this endpoint is fire-and-forget from the form's side.
    return NextResponse.json({ sent: false });
  }
}
