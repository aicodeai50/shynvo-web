import Link from "next/link";

const FACULTY_NAME: Record<string, string> = {
  "bsc-science-tech": "BSc – Science & Technology",
  "ba-arts-humanities": "BA – Arts & Humanities",
  "bba-business": "BBA – Business & Management",
  "engineering": "Engineering",
  "health-sciences": "Health Sciences",
  "law-governance": "Law & Governance",
  "education": "Education",
  "creative-arts": "Creative Arts",
};

export default function FacultyDashboard({ params }: { params: { slug: string } }) {
  const title = FACULTY_NAME[params.slug] ?? params.slug;

  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.22em] text-white/50">FACULTY DASHBOARD</div>
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="mt-2 text-white/70 max-w-3xl">
              Program selector + course dashboard + advisor. Everything here is filtered to this faculty.
            </p>
          </div>
          <Link
            href="/university"
            className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
          >
            Back to Hub
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-3">
            <div className="text-sm font-semibold text-white/85">Program selector</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Year 1", "Year 2", "Year 3"].map((y) => (
                <span key={y} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75">
                  {title} — {y}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                <div className="text-sm font-semibold">Courses this term</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li>• Intro (demo)</li>
                  <li>• Core module (demo)</li>
                  <li>• Applied project (demo)</li>
                </ul>
                <Link className="mt-4 inline-block text-sm text-white/85 underline" href="/university/courses-deck">
                  Open Courses Deck →
                </Link>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                <div className="text-sm font-semibold">Important dates</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li>• Midterm window (demo)</li>
                  <li>• Project deadline (demo)</li>
                  <li>• Final exam (demo)</li>
                </ul>
                <Link className="mt-4 inline-block text-sm text-white/85 underline" href="/university/exam-lab">
                  Open Exam Lab →
                </Link>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                <div className="text-sm font-semibold">Recommended missions</div>
                <div className="mt-3 space-y-2">
                  <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" href="/university/advisor-office">
                    Create weekly plan
                  </Link>
                  <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" href="/university/exam-lab">
                    Run practice test
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Faculty AI Advisor</div>
              <div className="text-xs text-white/50">tuned</div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-3 text-sm text-white/70">
              “Tell me your exam date and available hours per day — I’ll build a plan.”
            </div>

            <form className="mt-3 space-y-2">
              <textarea
                className="w-full min-h-[120px] rounded-2xl border border-white/10 bg-black/30 p-3 text-sm outline-none focus:border-white/20"
                placeholder="Type here (this should work now)…"
              />
              <button
                type="button"
                className="w-full rounded-2xl border border-white/10 bg-white/10 py-2 text-sm hover:bg-white/15 transition"
              >
                Send (demo)
              </button>
            </form>

            <div className="mt-2 text-xs text-white/50">Next: connect to backend + store plan files.</div>
          </section>
        </div>
      </div>
    </main>
  );
}
