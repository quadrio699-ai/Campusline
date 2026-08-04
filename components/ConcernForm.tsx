"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

const CATEGORIES = [
  "Registration / portal",
  "Hostel / accommodation",
  "Academic",
  "Fees / finance",
  "Safety / security",
  "Other",
];

type Status = "idle" | "submitting" | "sent" | "error";

export default function ConcernForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [anonymous, setAnonymous] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = String(formData.get("message") ?? "").trim();

    if (!message) {
      setStatus("error");
      setErrorMessage("Add a few words about what's going on before sending.");
      return;
    }

    const { error } = await supabase.from("concerns").insert({
      category: formData.get("category"),
      message,
      name: anonymous ? null : String(formData.get("name") ?? "").trim() || null,
      matric_number: anonymous
        ? null
        : String(formData.get("matric_number") ?? "").trim() || null,
      is_anonymous: anonymous,
    });

    if (error) {
      setStatus("error");
      setErrorMessage("That didn't go through. Check your connection and send again.");
      return;
    }

    setStatus("sent");
    form.reset();
  }

  if (status === "sent") {
    return (
      <div className="perf-edge rounded-ticket bg-paper-raised p-8 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-stamp">
          Received
        </span>
        <p className="mt-3 font-display text-2xl text-ink">
          Got it — thank you.
        </p>
        <p className="mx-auto mt-2 max-w-sm font-body text-sm text-ink-muted">
          This goes straight to Marvellous, not the school administration.
          Every concern here shapes what he'd actually push for.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-body text-sm font-semibold text-stamp underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="perf-edge rounded-ticket bg-paper-raised p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Category
          </span>
          <select
            name="category"
            required
            defaultValue={CATEGORIES[0]}
            className="rounded-ticket border border-ink/15 bg-paper px-4 py-3 font-body text-sm text-ink"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            What&apos;s going on
          </span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Describe what's happening — be as specific as you can."
            className="rounded-ticket border border-ink/15 bg-paper px-4 py-3 font-body text-sm text-ink placeholder:text-ink-muted/70"
          />
        </label>

        <label className="flex items-center gap-2 sm:col-span-2">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(event) => setAnonymous(event.target.checked)}
            className="h-4 w-4 rounded border-ink/30 text-stamp focus:ring-stamp"
          />
          <span className="font-body text-sm text-ink-muted">
            I&apos;d rather stay anonymous
          </span>
        </label>

        {!anonymous && (
          <>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Name (optional)
              </span>
              <input
                type="text"
                name="name"
                className="rounded-ticket border border-ink/15 bg-paper px-4 py-3 font-body text-sm text-ink"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Matric number (optional)
              </span>
              <input
                type="text"
                name="matric_number"
                className="rounded-ticket border border-ink/15 bg-paper px-4 py-3 font-body text-sm text-ink"
              />
            </label>
          </>
        )}
      </div>

      {status === "error" && (
        <p className="mt-4 font-body text-sm text-stamp">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-ticket bg-stamp px-6 py-3 font-body text-sm font-semibold text-paper-raised transition-colors hover:bg-stamp-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send it in"}
      </button>
    </form>
  );
}
