import Link from "next/link";

export default function ProDashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 text-white">
      <h1 className="text-3xl font-bold">Professional Dashboard</h1>
      <p className="mt-2 text-neutral-400">
        Skill-gap analysis + certification prep + interview readiness.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Panel title="Skill-gap snapshot (mock)">
          <ul className="mt-2 list-disc pl-5 text-sm text-neutral-400">
            <li>React: 68%</li>
            <li>Backend: 55%</li>
            <li>System Design: 42%</li>
          </ul>
        </Panel>

        <Panel title="Interview readiness (mock)">
          <div className="mt-2 text-sm text-neutral-400">
            Next: run an interview simulation and get scoring feedback.
          </div>
          <div className="mt-4">
            <Link
              href="/robot"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Start interview via Robot →
            </Link>
          </div>
        </Panel>

        <Panel title="Certification plan (mock)">
          <div className="mt-2 text-sm text-neutral-400">
            Choose a path:
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>AWS Cloud</Badge>
              <Badge>React</Badge>
              <Badge>Node.js</Badge>
              <Badge>Data</Badge>
            </div>
          </div>
        </Panel>

        <Panel title="Resume / portfolio (mock)">
          <div className="mt-2 text-sm text-neutral-400">
            Next: generate bullet points from your projects and tailor to job
            roles.
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}