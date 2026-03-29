import Link from "next/link";

export default function StudentDashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 text-white">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <p className="mt-2 text-neutral-400">
        Quizzes + flashcards + study plan. (UI now — connect backend next.)
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Panel title="Quick actions">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/demo"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Try demo
            </Link>
            <Link
              href="/robot"
              className="rounded-xl border border-neutral-800 bg-black px-4 py-2 text-sm text-neutral-200 hover:border-neutral-600"
            >
              Ask robot
            </Link>
          </div>
        </Panel>

        <Panel title="Your progress (mock)">
          <ul className="mt-2 list-disc pl-5 text-sm text-neutral-400">
            <li>Streak: 3 days</li>
            <li>Quizzes completed: 7</li>
            <li>Flashcards reviewed: 40</li>
          </ul>
        </Panel>

        <Panel title="Study plan (mock)">
          <div className="mt-2 text-sm text-neutral-400">
            Week 1: JavaScript fundamentals
            <br />
            Week 2: React basics
            <br />
            Week 3: APIs + backend intro
          </div>
        </Panel>

        <Panel title="Next recommended">
          <div className="mt-2 text-sm text-neutral-400">
            Generate a quiz from any topic and track your improvement over time.
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