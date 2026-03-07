import Link from "next/link";

export default function ArcadePage() {
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
        Arcade Sim
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Competitive Skill Arena
      </h1>

      <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Arcade Sim is the gamified environment for skill-building. It will include quiz battles,
        interview challenges, badges, performance scoring, and fast practice rounds.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Quiz Battle</div>
          <div className="mt-3 text-sm text-white/70">Fast subject challenges with score and streak systems.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Interview Arena</div>
          <div className="mt-3 text-sm text-white/70">Practice interviews and earn feedback-based ratings.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Badge Room</div>
          <div className="mt-3 text-sm text-white/70">Unlock badges, ranks, and progression milestones.</div>
        </div>
      </div>
    </section>
  );
}
