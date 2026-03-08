import Link from "next/link";

const badges = [
  { title: "Logic Rookie", desc: "Complete 10 drill rounds.", state: "Unlocked" },
  { title: "Speed Thinker", desc: "Finish a speed drill in under 5 seconds.", state: "Unlocked" },
  { title: "Interview Hero", desc: "Complete 20 interview quest rounds.", state: "In progress" },
  { title: "Arcade Veteran", desc: "Reach Level 15 in Arcade Sim.", state: "Locked" },
  { title: "Streak Builder", desc: "Maintain a 7-day challenge streak.", state: "In progress" },
  { title: "Diamond Path", desc: "Climb to Diamond rank.", state: "Locked" },
];

export default function AchievementsHallPage() {
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
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Achievements Hall</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Unlock badges, milestones, and visible proof of your growth.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {badges.map((badge) => (
          <div key={badge.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold text-white">{badge.title}</div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {badge.state}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">{badge.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
