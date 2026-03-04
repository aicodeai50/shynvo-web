import Link from "next/link";

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <div className="text-xs tracking-[0.22em] text-white/50">RESEARCH</div>
          <h1 className="text-4xl font-semibold">Research & Systems</h1>
          <p className="text-white/70">
            Shynvo is built as a universe of structured AI environments, not a single tool.
          </p>
        </header>

        <section className="space-y-4">
          {[
            { title: "Building architecture", desc: "Each building has unique departments and workflows — no repetition." },
            { title: "AI VM concept", desc: "OS sectors behave like virtual machines with their own logic and state." },
            { title: "Learning systems", desc: "Structured study, exams, tutoring, teacher tools, and career transitions." },
            { title: "Cross-building layer", desc: "Long-term goal: connect missions, memory, analytics across buildings." },
          ].map((x) => (
            <div key={x.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">{x.title}</div>
              <div className="mt-2 text-sm text-white/65">{x.desc}</div>
            </div>
          ))}
        </section>

        <Link href="/" className="inline-flex rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
