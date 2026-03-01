import Link from "next/link";

export default function DebateMatrixPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(244,114,182,0.22), transparent 55%),
              radial-gradient(1000px circle at 82% 22%, rgba(99,102,241,0.22), transparent 55%),
              radial-gradient(900px circle at 40% 90%, rgba(34,211,238,0.10), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-14">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">Experiment</div>
            <h1 className="mt-2 text-3xl font-bold">Debate Matrix</h1>
            <p className="mt-3 text-white/70">
              Coming soon. This experiment will run multi-agent debates to break echo chambers.
            </p>
          </div>

          <Link
            href="/experiments"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Back to Hub →
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur">
          <div className="text-sm text-white/60">Planned features</div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
            <li>Belief/question input</li>
            <li>Arguments for & against</li>
            <li>Confidence + evidence mapping</li>
            <li>Shareable debate snapshots</li>
          </ul>
        </div>
      </div>
    </div>
  );
}