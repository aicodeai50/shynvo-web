import Link from "next/link";

const ranks = [
  { name: "Bronze Learner", xp: "0 - 499 XP", active: false },
  { name: "Silver Engineer", xp: "500 - 1499 XP", active: true },
  { name: "Gold Strategist", xp: "1500 - 2999 XP", active: false },
  { name: "Platinum Architect", xp: "3000 - 5999 XP", active: false },
  { name: "Diamond Master", xp: "6000+ XP", active: false },
];

export default function RankLadderPage() {
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
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Rank Ladder</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Climb visible ranks through XP, consistency, and challenge performance.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {ranks.map((rank) => (
          <div
            key={rank.name}
            className={`rounded-3xl border p-5 ${
              rank.active
                ? "border-pink-300/30 bg-pink-400/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xl font-semibold text-white">{rank.name}</div>
              <div className="text-sm text-white/70">{rank.xp}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
