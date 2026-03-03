export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Frontier Lab</h1>
        <p className="mt-3 text-white/70">
          High-Reliability Decision Environment for drills, crisis simulation, and disciplined execution.
        </p>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Departments</h2>
          <ul className="mt-3 space-y-2 text-white/75">
            <li>Decision Drills</li>
            <li>Crisis Simulation</li>
            <li>Incident Timeline</li>
            <li>Protocol Systems</li>
            <li>Resilience Training</li>
            <li>Strategic Wargames</li>
          </ul>
        </section>

        <div className="mt-8 text-sm text-white/60">
          Status: Planned. Structured preview page (no 404, no internal terms).
        </div>
      </div>
    </main>
  );
}
