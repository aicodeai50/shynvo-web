export default function Cognitive() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Cognitive</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Energy + Recovery</h1>
          <p className="mt-2 text-sm text-white/70">
            Recovery rules, rhythm design, and burnout protection. (Module scaffold)
          </p>
        </div>
        <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
          Cockpit
        </a>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Departments</h2>
        <ul className="mt-3 space-y-2 text-white/75">
          <li>Energy Rhythm Planner</li>
          <li>Break Protocol Engine</li>
          <li>Burnout Risk Monitor</li>
          <li>Recovery Mode Presets</li>
        </ul>
        <div className="mt-6 text-sm text-white/60">
          Next: connect Cognitive signals to Focus and Momentum pacing.
        </div>
      </div>
    </main>
  );
}
