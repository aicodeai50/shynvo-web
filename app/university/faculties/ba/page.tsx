export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-3xl font-semibold">ba</h1>
        <p className="text-white/70">
          This faculty covers all relevant courses and structured academic workflows.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <a href="/university/tutors" className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
            <div className="text-lg font-semibold">Open Student Tutor</div>
            <div className="mt-2 text-sm text-white/65">Get help for any course in this faculty.</div>
          </a>

          <a href="/university/teacher-helper" className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
            <div className="text-lg font-semibold">Open Teacher Helper</div>
            <div className="mt-2 text-sm text-white/65">Generate lessons and exams.</div>
          </a>
        </div>

        <a className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black" href="/university">
          Back to University Hub
        </a>
      </div>
    </main>
  );
}
