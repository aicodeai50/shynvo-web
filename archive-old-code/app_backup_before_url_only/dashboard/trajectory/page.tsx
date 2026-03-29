import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const missions = [
  { title: "Week 1–2: Foundation", desc: "Stabilize routine + baseline skill map." },
  { title: "Week 3–4: Acceleration", desc: "Increase difficulty + interview simulation." },
  { title: "Week 5–8: Specialization", desc: "Pick a track + build portfolio signals." },
  { title: "Week 9–12: Outcome", desc: "Mock interviews + measurable readiness score." },
];

export default function TrajectoryPage() {
  const arc = "Builder → Founder";
  const horizon = "90 days";
  const confidence = "Upward";

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo OS • Signal
            </p>
            <h1 className="mt-4 text-4xl font-bold">Trajectory</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Trajectory turns goals into “missions.” Instead of random learning,
              you follow a map.
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
          <Metric title="Arc" value={arc} sub="Role evolution" />
          <Metric title="Horizon" value={horizon} sub="Timeframe" />
          <Metric title="Confidence" value={confidence} sub="Signal direction" />
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-neutral-950 p-8">
          <h2 className="text-xl font-bold">Mission map</h2>
          <p className="mt-2 text-white/70">
            A fictional roadmap (for now) that shows how Shynvo will guide users.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {missions.map((m) => (
              <div key={m.title} className="rounded-3xl border border-white/10 bg-black p-6">
                <div className="font-semibold">{m.title}</div>
                <div className="mt-2 text-sm text-white/60">{m.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
            >
              See demo flow
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Upgrade for planning →
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