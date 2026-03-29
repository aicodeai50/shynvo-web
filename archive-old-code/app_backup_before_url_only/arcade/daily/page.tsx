import Link from "next/link";

const tasks = [
  { title: "Complete 3 logic drills", reward: "+60 XP" },
  { title: "Finish 1 interview quest", reward: "+40 XP" },
  { title: "Maintain today streak", reward: "+1 streak" },
  { title: "Reach 80% score or higher", reward: "+20 bonus XP" },
];

export default function DailyChallengePage() {
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
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Daily Challenge</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Return every day for bonus XP, streak growth, and rotating challenge rewards.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Today reward pack</div>
        <div className="mt-2 text-white/70">Complete all tasks to unlock +150 XP and a Daily Winner badge.</div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <div key={task.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-white font-semibold">{task.title}</div>
              <div className="mt-2 text-sm text-pink-200">{task.reward}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
