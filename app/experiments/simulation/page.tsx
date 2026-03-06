import Link from "next/link";

export default function ExperimentsSimulationPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Simulation Lab
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Run what-if scenarios before taking action. This lab helps users think through
        possible outcomes, risks, and best moves across study, career, product, and life.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Scenario Input</div>
          <textarea
            rows={7}
            placeholder="Example: If I study 2 hours every day for 6 weeks, can I realistically pass my exam and still work on my project?"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15">
              Academic
            </button>
            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
              Career
            </button>
            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
              Product
            </button>
            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
              Life
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Expected Output</div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Likely path A
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Likely path B
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Risk level and suggested next move
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
