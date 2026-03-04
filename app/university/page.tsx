import Link from "next/link";

const FACULTIES = [
  { slug: "bsc-science-tech", title: "BSc – Science & Technology", desc: "CS, IT, Data, AI, Cybersecurity, Math, Physics." },
  { slug: "ba-arts-humanities", title: "BA – Arts & Humanities", desc: "Psychology, Sociology, History, Literature, Philosophy." },
  { slug: "bba-business", title: "BBA – Business & Management", desc: "Business, Marketing, Finance, HR, Entrepreneurship." },
  { slug: "engineering", title: "Engineering", desc: "Electrical, Mechanical, Civil, Software, Systems." },
  { slug: "health-sciences", title: "Health Sciences", desc: "Nursing, Public Health, Biomedical, Healthcare." },
  { slug: "law-governance", title: "Law & Governance", desc: "Law basics, constitutional law, governance systems." },
  { slug: "education", title: "Education", desc: "Teaching methods, curriculum, pedagogy." },
  { slug: "creative-arts", title: "Creative Arts", desc: "Design, Media, Film, Music, Fine Arts." },
];

const SYSTEMS = [
  { href: "/university/courses-deck", title: "Courses Deck", desc: "Subjects with AI syllabi and weekly plans.", types: ["Course", "Module", "Lesson"] },
  { href: "/university/exam-lab", title: "Exam Lab", desc: "Past questions, mock exams, timed practice.", types: ["ExamPack", "PracticeRun", "Report"] },
  { href: "/university/advisor-office", title: "Advisor Office", desc: "Academic Advisor agent to build study plans.", types: ["Plan", "Check-in"] },
];

function Card({ href, title, desc, footer }: { href: string; title: string; desc: string; footer?: string }) {
  return (
    <Link href={href} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/65">{desc}</div>
      {footer ? <div className="mt-4 text-sm text-white/80">{footer}</div> : null}
    </Link>
  );
}

export default function UniversityHub() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <div className="relative">
        {/* calm campus vibe */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_50%_0%,rgba(120,180,160,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_25%,transparent_80%,rgba(255,255,255,0.03))]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-10 space-y-10">
          <header className="space-y-3">
            <div className="text-xs tracking-[0.22em] text-white/50">UNIVERSITY HUB</div>
            <h1 className="text-3xl font-semibold">Structured Academic Campus</h1>
            <p className="text-white/70 max-w-3xl">
              Calm, structured learning building for students and educators. Choose a faculty, then use campus systems that adapt to your program.
            </p>
          </header>

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Faculties</h2>
              <div className="text-xs text-white/50">Each faculty opens a dashboard</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FACULTIES.map((f) => (
                <Card
                  key={f.slug}
                  href={`/university/faculty/${f.slug}`}
                  title={f.title}
                  desc={f.desc}
                  footer="Open dashboard →"
                />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Academic Systems</h2>
              <div className="text-xs text-white/50">Core engines (adapt per faculty)</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SYSTEMS.map((s) => (
                <Link key={s.href} href={s.href} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
                  <div className="text-lg font-semibold">{s.title}</div>
                  <div className="mt-2 text-sm text-white/65">{s.desc}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.types.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <footer className="text-xs text-white/45">
            Next: Study Lab + Exam Arena + Tutor + Teacher Helper will connect to faculty dashboard and course context.
          </footer>
        </div>
      </div>
    </main>
  );
}
