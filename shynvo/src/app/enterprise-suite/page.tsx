export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Enterprise Suite</h1>
        <p className="mt-3 text-white/70">
          Organizational Intelligence System for teams, performance, and structured growth.
        </p>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Departments</h2>
          <ul className="mt-3 space-y-2 text-white/75">
            <li>Admin Console</li>
            <li>Skill Matrix</li>
            <li>Team Missions</li>
            <li>OKR Engine</li>
            <li>Analytics Dashboard</li>
            <li>Performance Reports</li>
          </ul>
        </section>

        <div className="mt-8 text-sm text-white/60">
          Status: Planned. This page is a structured preview (no placeholder tone).
        </div>
      </div>
    </main>
  );
}
