import Link from "next/link";

const quickStats = [
  { label: "Level", value: "7" },
  { label: "XP", value: "840 / 1000" },
  { label: "Rank", value: "Silver" },
  { label: "Streak", value: "12 rounds" },
];

const zones = [
  {
    href: "/arcade/drill",
    title: "Drill Arena",
    desc: "Fast challenge rounds for focus, reflex, logic, and performance training.",
    tags: ["Drills", "Speed", "Practice"],
  },
  {
    href: "/arcade/interview",
    title: "Interview Quest",
    desc: "Gamified interview and oral-response practice with progress-style challenge flow.",
    tags: ["Interview", "Questions", "Progress"],
  },
  {
    href: "/arcade/score",
    title: "Score Chamber",
    desc: "Track performance, streaks, levels, and challenge scores across Arcade Sim.",
    tags: ["Scores", "Levels", "Ranking"],
  },
  {
    href: "/arcade/achievements",
    title: "Achievements Hall",
    desc: "Unlock badges, milestones, trophies, and visible player progress.",
    tags: ["Badges", "Milestones", "XP"],
  },
  {
    href: "/arcade/ranks",
    title: "Rank Ladder",
    desc: "See your current rank, climb the ladder, and compare challenge progress.",
    tags: ["Bronze", "Silver", "Gold"],
  },
  {
    href: "/arcade/daily",
    title: "Daily Challenge",
    desc: "Complete rotating daily quests for bonus XP, streak growth, and reward boosts.",
    tags: ["Daily", "Bonus", "Rewards"],
  },
];

export default function ArcadeSimPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_15%_10%,rgba(244,114,182,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_85%_14%,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_540px_at_50%_100%,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          ← Back
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>
        <span className="inline-flex items-center rounded-xl border border-pink-400/20 bg-pink-400/10 px-3 py-2 text-sm text-pink-100">
          Arcade Sim
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-200/70">
            Competitive Skill Arena
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Arcade Sim
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Arcade Sim turns practice into challenge mode. Users train skills through drills,
            interview quests, score systems, ranks, achievements, and daily reward loops.
          </p>
        </div>

        <div className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-100">
          Game Layer: Active
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Progress Core
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Level up through skill-based repetition
            </h2>
          </div>

          <div className="min-w-[220px]">
            <div className="mb-2 flex items-center justify-between text-sm text-white/70">
              <span>XP Progress</span>
              <span>840 / 1000</span>
            </div>
            <div className="h-3 rounded-full bg-white/10">
              <div className="h-3 w-[84%] rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">{item.label}</div>
              <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {zones.map((zone) => (
          <Link
            key={zone.href}
            href={zone.href}
            className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <div className="text-xl font-semibold text-white">{zone.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/70">{zone.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {zone.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
              Enter →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
