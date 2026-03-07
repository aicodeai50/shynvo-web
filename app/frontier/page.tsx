import Link from "next/link";

export default function FrontierPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          ← Back to Home
        </Link>

        <Link href="/docs" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          Docs →
        </Link>
      </div>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Frontier Lab
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        High-Reliability Decision Environment
      </h1>

      <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Frontier Lab is the environment for high-stakes judgment, pressure simulation, crisis drills,
        protocol learning, and resilience training.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Scenario Room</div>
          <div className="mt-3 text-sm text-white/70">Practice difficult situations before they happen.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Protocol Drills</div>
          <div className="mt-3 text-sm text-white/70">Step-by-step response systems for critical situations.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Decision Grid</div>
          <div className="mt-3 text-sm text-white/70">Compare risks, actions, timing, and likely consequences.</div>
        </div>
      </div>
    </section>
  );
}
