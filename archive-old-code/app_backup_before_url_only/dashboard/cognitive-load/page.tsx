import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function CognitiveLoadPage() {
  const status = "Balanced";
  const friction = "Low";
  const energy = "Stable";

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo OS • Signal
            </p>
            <h1 className="mt-4 text-4xl font-bold">Cognitive Load</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Cognitive Load helps prevent burnout by guiding you toward the right
              difficulty at the right time.
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
          <Metric title="Load status" value={status} sub="Difficulty fit" />
          <Metric title="Friction" value={friction} sub="How hard it feels" />
          <Metric title="Energy" value={energy} sub="Recovery capacity" />
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-neutral-950 p-8">
          <h2 className="text-xl font-bold">Auto-adjust rules (2050 mode)</h2>
          <p className="mt-2 text-white/70">
            The OS shifts your plan automatically based on what your brain can handle.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Rule title="If friction spikes →">
              Switch to flashcards + simpler recall (maintain streak).
            </Rule>
            <Rule title="If energy is stable →">
              Insert one hard prompt (growth happens here).
            </Rule>
            <Rule title="If load is high for 2 days →">
              Auto-schedule recovery day: short drills only.
            </Rule>
            <Rule title="If you’re stuck →">
              Suggest a “bridge topic” (small step, same goal).
            </Rule>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
            >
              Try it in demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Upgrade for insights →
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

function Rule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/60">{children}</div>
    </div>
  );
}