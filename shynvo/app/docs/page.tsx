import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <div className="text-xs tracking-[0.22em] text-white/50">DOCS</div>
          <h1 className="text-4xl font-semibold">Shynvo Documentation</h1>
          <p className="text-white/70">
            Learn how Shynvo’s buildings work and how to move through the ecosystem.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Getting started", desc: "Understand the buildings, navigation, and core flows." },
            { title: "University Hub", desc: "Faculties, Courses Deck, Exam Lab, Advisor Office." },
            { title: "Shynvo OS", desc: "VM sectors, missions, timeline, focus loops." },
            { title: "Experiments (BETA)", desc: "Standalone AI universes with independent logic." },
          ].map((x) => (
            <div key={x.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">{x.title}</div>
              <div className="mt-2 text-sm text-white/65">{x.desc}</div>
            </div>
          ))}
        </section>

        <div className="flex gap-3">
          <Link href="/" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
            Back to Home
          </Link>
          <Link href="/university" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
            Open University Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
