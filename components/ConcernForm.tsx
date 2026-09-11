"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CAMPUSES } from "@/lib/campuses";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [sentCampus, setSentCampus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = String(formData.get("message") ?? "").trim();
    const campus = String(formData.get("campus") ?? "");

    if (!message) {
      setStatus("error");
      setErrorMessage("Add a few words about what's going on before sending.");
      return;
    }

    const { error } = await supabase.from("concerns").insert({
      campus,
      category: formData.get("category"),
      message,
      name: String(formData.get("name") ?? "").trim(),
      matric_number: String(formData.get("matric_number") ?? "").trim(),
      is_anonymous: false,
    });

    if (error) {
      setStatus("error");
      setErrorMessage("That didn't go through. Check your connection and send again.");
      return;
    }

    setSentCampus(campus);
    setStatus("sent");
    form.reset();

    // The concern is already saved — this is just a heads-up email, so we
    // don't wait for it or let it affect what the student sees.
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campus,
        category: formData.get("category"),
        message,
        name: String(formData.get("name") ?? "").trim(),
        matricNumber: String(formData.get("matric_number") ?? "").trim(),
      }),
    }).catch(() => {
      // Silently ignored — the concern itself is safe in Supabase either way.
    });
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
          This goes straight to the {sentCampus || "campus"} Welfare Office —
          it's also saved so patterns across campuses can be tracked.
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
            Campus
          </span>
          <select
            name="campus"
            required
            defaultValue={CAMPUSES[0].value}
            className="rounded-ticket border border-ink/15 bg-paper px-4 py-3 font-body text-sm text-ink"
          >
            {CAMPUSES.map((campus) => (
              <option key={campus.value} value={campus.value}>
                {campus.label}
              </option>
            ))}
          </select>
        </label>

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

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            className="rounded-ticket border border-ink/15 bg-paper px-4 py-3 font-body text-sm text-ink"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Matric number
          </span>
          <input
            type="text"
            name="matric_number"
            required
            className="rounded-ticket border border-ink/15 bg-paper px-4 py-3 font-body text-sm text-ink"
          />
        </label>
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
