export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Arcade Sim</h1>
        <p className="mt-3 text-white/70">
          Competitive Skill Arena for drills, interview simulations, and performance scoring.
        </p>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Departments</h2>
          <ul className="mt-3 space-y-2 text-white/75">
            <li>Interview Arena</li>
            <li>Logic Lab</li>
            <li>Recall Rush</li>
            <li>Speed Drills</li>
            <li>Competitive Mode</li>
            <li>Team Battles</li>
          </ul>
        </section>

        <div className="mt-8 text-sm text-white/60">
          Status: Planned. Structured preview page (no placeholder tone).
        </div>
      </div>
    </main>
  );
}
