import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function FocusPage() {
  const remaining = 42; // minutes (fictional)
  const mode = "Deep Work";
  const shield = "Enabled";

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo OS • Signal
            </p>
            <h1 className="mt-4 text-4xl font-bold">Focus Window</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Focus Window is your “attention budget.” It helps you plan short,
              high-impact sessions instead of endless scrolling.
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
          <Metric title="Time remaining" value={`${remaining} min`} sub="Optimal window" />
          <Metric title="Mode" value={mode} sub="Highest ROI state" />
          <Metric title="Distraction shield" value={shield} sub="Optional OS layer" />
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-neutral-950 p-8">
          <h2 className="text-xl font-bold">Session blueprint</h2>
          <p className="mt-2 text-white/70">
            A simple 3-step loop designed for real-life energy levels.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Step n="1" title="Warm-up (3 min)">
              10 flashcards → wake recall.
            </Step>
            <Step n="2" title="Work (30 min)">
              One topic drill or interview simulation.
            </Step>
            <Step n="3" title="Lock-in (9 min)">
              Summarize + one follow-up question.
            </Step>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
            >
              Start a demo session
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Upgrade for analytics →
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

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold">
          {n}
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-sm text-white/60">{children}</div>
    </div>
  );
}