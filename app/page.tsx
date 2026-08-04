import Hero from "@/components/Hero";
import RegistrationHelp from "@/components/RegistrationHelp";
import ConcernForm from "@/components/ConcernForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <RegistrationHelp />
      <section id="concern" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            What&apos;s not working for you
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink md:text-4xl">
            Say it here. It goes straight to Marvellous, not the admin.
          </h2>
          <p className="mt-3 font-body text-sm text-ink-muted">
            Stay anonymous if you'd rather — either way, it's read.
          </p>
          <div className="mt-9">
            <ConcernForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
