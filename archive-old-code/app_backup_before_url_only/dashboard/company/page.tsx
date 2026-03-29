import Link from "next/link";

export default function CompanyDashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 text-white">
      <h1 className="text-3xl font-bold">Company Dashboard</h1>
      <p className="mt-2 text-neutral-400">
        Team seats, skill matrix, upskill plans, analytics. (UI now — connect
        backend next.)
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Panel title="Team overview (mock)">
          <ul className="mt-2 list-disc pl-5 text-sm text-neutral-400">
            <li>Seats: 3</li>
            <li>Members: 1 admin + 2 employees</li>
            <li>Plan: Team</li>
          </ul>
        </Panel>

        <Panel title="Skill matrix (mock)">
          <div className="mt-2 text-sm text-neutral-400">
            Next: render a heatmap from your backend endpoint.
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <MiniStat label="React" value="2.8/5" />
            <MiniStat label="Backend" value="2.1/5" />
            <MiniStat label="DevOps" value="1.7/5" />
          </div>
        </Panel>

        <Panel title="Upskill plan (mock)">
          <div className="mt-2 text-sm text-neutral-400">
            Week 1: Fundamentals + quizzes
            <br />
            Week 2: Projects + review
            <br />
            Week 3: Interview drills
          </div>
        </Panel>

        <Panel title="Admin actions">
          <div className="mt-2 text-sm text-neutral-400">
            Coming next: manage members, seats, and org settings.
          </div>
          <div className="mt-4">
            <Link
              href="/robot"
              className="rounded-xl border border-neutral-800 bg-black px-4 py-2 text-sm text-neutral-200 hover:border-neutral-600"
            >
              Ask Robot for plan →
            </Link>
          </div>
        </Panel>
      </div>

      <div className="mt-10 flex gap-3">
        <Link
          href="/dashboard"
          className="rounded-xl border border-neutral-800 bg-black px-4 py-2 text-neutral-200 hover:border-neutral-600"
        >
          ← Back to Dashboard
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-neutral-800 bg-black px-4 py-2 text-neutral-200 hover:border-neutral-600"
        >
          Home
        </Link>
      </div>
    </main>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-black p-3">
      <div className="text-neutral-400">{label}</div>
      <div className="mt-1 font-semibold text-neutral-100">{value}</div>
    </div>
  );
}