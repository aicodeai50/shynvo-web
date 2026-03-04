import Link from "next/link";
export default function ExamLab() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Exam Lab</h1>
            <p className="mt-2 text-white/70">Past questions, mock exams, timed practice.</p>
          </div>
          <Link href="/university" className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
            Back to Hub
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "ExamPack", desc: "Question sets by syllabus." },
            { title: "PracticeRun", desc: "Timed attempt storage." },
            { title: "Report", desc: "Feedback + what to study next." },
          ].map((x) => (
            <div key={x.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-semibold">{x.title}</div>
              <div className="mt-2 text-sm text-white/65">{x.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
