import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <div className="text-xs tracking-[0.22em] text-white/50">PRIVACY</div>
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-white/70">
            This is a placeholder privacy policy page. Replace with your legal text before accepting payments.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3 text-sm text-white/70">
          <p>• We aim to minimize data collection and keep user trust first.</p>
          <p>• Do not include secrets in prompts. Treat AI as a tool, not a vault.</p>
          <p>• Before launch: add full policy covering data storage, cookies, analytics, retention, and deletion.</p>
          <p>• Contact: <a className="text-white underline" href="mailto:hi@shynvo.app">hi@shynvo.app</a></p>
        </section>

        <Link href="/" className="inline-flex rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
