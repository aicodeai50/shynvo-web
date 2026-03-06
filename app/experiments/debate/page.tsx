import Link from "next/link";

export default function ExperimentsDebatePage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Debate Lab
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Test both sides of a decision, argument, or belief. This lab is designed to
        help users see strong counterpoints, hidden assumptions, and clearer conclusions.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Debate Input</div>
          <textarea
            rows={7}
            placeholder="Example: Should I focus on exam preparation first or on building my startup project?"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15">
              Balanced
            </button>
            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
              Critical
            </button>
            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
              Aggressive
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Expected Output</div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Strongest side A
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Strongest side B
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Blind spots and suggested conclusion
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
