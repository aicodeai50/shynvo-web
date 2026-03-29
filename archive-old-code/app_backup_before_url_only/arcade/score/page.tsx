import Link from "next/link";

const stats = [
  { label: "Logic Score", value: "84/100" },
  { label: "Focus Streak", value: "12 rounds" },
  { label: "Interview Level", value: "7" },
  { label: "Challenge Rank", value: "Silver" },
];

export default function ScoreChamberPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_15%_10%,rgba(244,114,182,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_85%_18%,rgba(168,85,247,0.12),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/arcade" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">← Back</Link>
        <Link href="/" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">Home</Link>
        <span className="inline-flex items-center rounded-xl border border-pink-400/20 bg-pink-400/10 px-3 py-2 text-sm text-pink-100">Arcade Sim</span>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-200/70">Arcade Sim</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Score Chamber</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Track levels, challenge performance, streaks, XP growth, and progress across Arcade Sim.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">{item.label}</div>
            <div className="mt-3 text-3xl font-semibold text-white">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">XP Progress</div>
            <div className="mt-1 text-sm text-white/60">Level 7 progress toward Level 8</div>
          </div>
          <div className="text-sm text-white/70">840 / 1000 XP</div>
        </div>

        <div className="mt-4 h-4 rounded-full bg-white/10">
          <div className="h-4 w-[84%] rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400" />
        </div>
      </div>
    </section>
  );
}
