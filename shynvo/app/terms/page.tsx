import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <div className="text-xs tracking-[0.22em] text-white/50">TERMS</div>
          <h1 className="text-4xl font-semibold">Terms of Service</h1>
          <p className="text-white/70">
            This is a placeholder terms page. Replace with your legal text before accepting payments.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3 text-sm text-white/70">
          <p>• Shynvo is provided “as-is” during development.</p>
          <p>• Users are responsible for decisions made using generated outputs.</p>
          <p>• Before launch: add full terms covering billing, refunds, acceptable use, and liability.</p>
          <p>• Contact: <a className="text-white underline" href="mailto:hi@shynvo.app">hi@shynvo.app</a></p>
        </section>

        <Link href="/" className="inline-flex rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
