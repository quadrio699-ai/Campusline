const tips = [
  {
    label: "FORM A",
    title: "Clear your fees before registration morning",
    body: "Most portal blocks trace back to fees that haven't been confirmed yet, not the portal itself. Sort this first, days before, not the same morning.",
  },
  {
    label: "FORM B",
    title: "Register in week one, not the deadline day",
    body: "The portal slows to a crawl right before the cutoff — and that's also when most wrong-course-code mistakes happen, because everyone's rushing.",
  },
  {
    label: "FORM C",
    title: "Check your course codes against your department's list",
    body: "One wrong digit and you can end up marked absent all semester for a course you never actually sat in.",
  },
  {
    label: "FORM D",
    title: "Screenshot your confirmation page",
    body: "If the portal glitches right after you submit, this is your proof it went through — keep it until results are out.",
  },
];

export default function RegistrationHelp() {
  return (
    <section id="tips" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
          Before you get to the portal
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-medium text-ink md:text-4xl">
          The mistakes that cost people the most time, semester after
          semester.
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {tips.map((tip) => (
            <div
              key={tip.label}
              className="rounded-ticket border border-ink/10 bg-paper-raised p-6"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink-muted">
                {tip.label}
              </span>
              <h3 className="mt-3 font-body text-lg font-semibold text-ink">
                {tip.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                {tip.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-body text-xs text-ink-muted">
          General guidance based on patterns most students run into — always
          confirm exact dates and requirements with your department or the
          ICT centre&apos;s official notice.
        </p>
      </div>
    </section>
  );
}
