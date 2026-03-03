export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold">Exam Arena</h1>
        <p className="mt-3 text-white/70">Timed exams, scoring, weak-area detection, and exam readiness.</p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/75">
          Modules: Mock Exams • Scoring • Mistake Review • Readiness Index
        </div>
      </div>
    </main>
  );
}
