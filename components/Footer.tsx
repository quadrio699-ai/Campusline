export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 text-center font-body text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>
          Built by{" "}
          <span className="text-ink">A Quadri Marvellous Initiative project.</span>, a concerned
          LASU student.
        </p>
        <p>
          <a
            href="mailto:Quadrio699@gmail.com"
            className="text-ink underline underline-offset-4"
          >
            Quadrio699@gmail.com
          </a>
        </p>
      </div>
      <p className="mx-auto mt-4 max-w-5xl text-center font-body text-[11px] text-ink-muted/80 sm:text-left">
        CampusLine is an independent student initiative project.
      </p>
    </footer>
  );
}
