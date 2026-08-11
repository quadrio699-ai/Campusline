export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            Built by a concerned LASU student
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl md:text-6xl">
            Skip the queue.
            <br />
            Say what&apos;s actually wrong.
          </h1>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink-muted md:text-lg">
            CampusLine is an independent tool built by a concerned LASU
            student — registration season tips, and a direct line to raise
            what isn&apos;t working. No login, no queue.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#concern"
              className="rounded-ticket bg-stamp px-6 py-3 font-body text-sm font-semibold text-paper-raised transition-colors hover:bg-stamp-dark"
            >
              Raise a concern
            </a>
            <a
              href="#tips"
              className="rounded-ticket border border-ink/20 px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40"
            >
              Registration tips
            </a>
          </div>
        </div>

        {/* Signature element: a tear-off ticket stub */}
        <div className="mx-auto w-full max-w-xs -rotate-2 md:rotate-[-3deg]">
          <div className="perf-edge rounded-ticket bg-paper-raised px-6 py-7 shadow-[0_18px_40px_-18px_rgba(28,36,56,0.35)]">
            <div className="flex items-start justify-between">
              <span className="finder h-3.5 w-3.5 text-stamp" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.25em] text-ink-muted">
                NO. 001
              </span>
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
              Admit one voice
            </p>
            <p className="mt-2 font-display text-2xl text-ink">CampusLine</p>

            <div className="my-6 border-t border-dashed border-perf" />

            <dl className="space-y-2 font-mono text-[11px] text-ink-muted">
              <div className="flex justify-between">
                <dt>ISSUED TO</dt>
                <dd className="text-ink">Every LASU student</dd>
              </div>
              <div className="flex justify-between">
                <dt>VALID</dt>
                <dd className="text-ink">Every semester</dd>
              </div>
              <div className="flex justify-between">
                <dt>COST</dt>
                <dd className="text-ink">Free</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
