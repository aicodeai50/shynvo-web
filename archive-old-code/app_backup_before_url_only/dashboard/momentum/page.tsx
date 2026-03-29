import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function MomentumPage() {
  const streak = 11;
  const velocity = 7.4; // sessions/week (fictional)
  const trend = "Rising";

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo OS • Signal
            </p>
            <h1 className="mt-4 text-4xl font-bold">Skill Momentum</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Momentum is your learning “engine.” It combines streaks, repetition,
              and challenge progression into one signal.
            </p>
          </div>

          <Link
            href="/os"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            ← Back to OS
          </Link>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <Metric title="Streak" value={`${streak} days`} sub="Consistency engine" />
          <Metric title="Velocity" value={`${velocity}/wk`} sub="Practice frequency" />
          <Metric title="Trend" value={trend} sub="Current direction" />
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-neutral-950 p-8">
          <h2 className="text-xl font-bold">Recommended mission (today)</h2>
          <p className="mt-2 text-white/70">
            Do a 10-minute drill + one “hard” prompt to push your curve upward.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="10-min Drill">
              Rapid flashcards + recall. Keep it fast.
            </Card>
            <Card title="Hard Prompt">
              One interview-style question with scoring.
            </Card>
            <Card title="Reflection">
              Note what felt slow → becomes tomorrow’s drill.
            </Card>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
            >
              Open demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Upgrade for scoring →
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Metric({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="text-sm text-white/60">{title}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      <div className="mt-2 text-sm text-white/60">{sub}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/60">{children}</div>
    </div>
  );
}