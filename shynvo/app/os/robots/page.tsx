export default function Robots() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Robots</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">AI Hangar</h1>
          <p className="mt-2 text-sm text-white/70">
            Scoped agents with defined roles. (Module scaffold)
          </p>
        </div>
        <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
          Cockpit
        </a>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Available Robots</h2>
        <ul className="mt-3 space-y-2 text-white/75">
          <li>Study Robot — exam prep and drills</li>
          <li>Code Robot — implementation assistant</li>
          <li>Strategy Robot — planning and tradeoffs</li>
          <li>Operations Robot — execution checklists</li>
        </ul>
        <div className="mt-6 text-sm text-white/60">
          Next: allow robots to “claim” mission steps and provide scoped suggestions.
        </div>
      </div>
    </main>
  );
}
