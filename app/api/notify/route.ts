import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CAMPUSES } from "@/lib/campuses";

// Server-only env vars (no NEXT_PUBLIC_ prefix) — never reach the browser.
const resendApiKey = process.env.RESEND_API_KEY;
// Fallback recipient — used for any campus whose own NOTIFY_EMAIL_* isn't
// configured yet, so nothing silently vanishes while officers are onboarded.
const fallbackEmail = process.env.NOTIFY_EMAIL;

function emailForCampus(campus: string | undefined): string | undefined {
  const match = CAMPUSES.find((c) => c.value === campus);
  const campusEmail = match ? process.env[match.envVar] : undefined;
  return campusEmail || fallbackEmail;
}

export async function POST(request: Request) {
  // The concern is already safely saved in Supabase by the time this runs —
  // this route only sends a heads-up email, so any failure here is quiet
  // and never affects what the student sees.
  try {
    if (!resendApiKey) {
      console.warn("Email alerts skipped: RESEND_API_KEY not set.");
      return NextResponse.json({ skipped: true });
    }

    const { category, message, campus, name, matricNumber } = await request.json();
    const notifyEmail = emailForCampus(campus);

    if (!notifyEmail) {
      console.warn(
        `Email alerts skipped: no NOTIFY_EMAIL configured for "${campus}" (and no fallback NOTIFY_EMAIL set).`
      );
      return NextResponse.json({ skipped: true });
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "CampusLine <alerts@notifications.quadrial-ameen.com>",
      to: notifyEmail,
      subject: `CampusLine — ${campus ?? "Unspecified campus"}: new concern (${category})`,
      text: `Campus: ${campus ?? "Not specified"}\nCategory: ${category}\nFrom: ${name || "Not given"} (${matricNumber || "no matric number given"})\n\n${message}`,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("CampusLine notify email failed:", error);
    // Still 200: this endpoint is fire-and-forget from the form's side.
    return NextResponse.json({ sent: false });
  }
}
