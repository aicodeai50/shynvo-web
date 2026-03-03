export default function UniversityHub() {
  const faculties = [
    { href: '/university/faculties/bsc', title: 'BSc – Science & Technology', desc: 'Computer Science, IT, Data, AI, Cybersecurity, Mathematics, Physics.' },
    { href: '/university/faculties/ba', title: 'BA – Arts & Humanities', desc: 'Psychology, Sociology, History, Literature, Philosophy, Political Science.' },
    { href: '/university/faculties/bba', title: 'BBA – Business & Management', desc: 'Business, Marketing, Finance, HR, Entrepreneurship.' },
    { href: '/university/faculties/engineering', title: 'Engineering', desc: 'Electrical, Mechanical, Civil, Software, Systems.' },
    { href: '/university/faculties/health-sciences', title: 'Health Sciences', desc: 'Nursing, Public Health, Biomedical, Healthcare Management.' },
    { href: '/university/faculties/law', title: 'Law & Governance', desc: 'Law fundamentals, constitutional law, governance systems.' },
    { href: '/university/faculties/education', title: 'Education', desc: 'Teaching methods, curriculum design, pedagogy.' },
    { href: '/university/faculties/creative-arts', title: 'Creative Arts', desc: 'Design, Media, Film, Music, Fine Arts.' },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold">University Hub</h1>
          <p className="text-white/70">
            A complete academic building covering BSc, BA, Business, Engineering, Health, Law, Education, and Creative Arts.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Faculties</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {faculties.map((x) => (
              <a
                key={x.href}
                href={x.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
              >
                <div className="text-lg font-semibold">{x.title}</div>
                <div className="mt-2 text-sm text-white/65">{x.desc}</div>
                <div className="mt-4 text-sm text-white/80">Enter Faculty →</div>
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Academic Systems</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a href="/university/study-lab" className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
              <div className="text-lg font-semibold">Study Lab</div>
              <div className="mt-2 text-sm text-white/65">Structured learning sessions.</div>
            </a>

            <a href="/university/exam-arena" className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
              <div className="text-lg font-semibold">Exam Arena</div>
              <div className="mt-2 text-sm text-white/65">Timed tests and scoring.</div>
            </a>

            <a href="/university/tutors" className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
              <div className="text-lg font-semibold">Student Tutor</div>
              <div className="mt-2 text-sm text-white/65">Faculty-aware AI tutor.</div>
            </a>

            <a href="/university/teacher-helper" className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
              <div className="text-lg font-semibold">Teacher Helper</div>
              <div className="mt-2 text-sm text-white/65">Lesson plans, quizzes, rubrics.</div>
            </a>

            <a href="/university/career-launchpad" className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
              <div className="text-lg font-semibold">Career Launchpad</div>
              <div className="mt-2 text-sm text-white/65">CV, portfolio, interviews.</div>
            </a>

            <a href="/university/visual-concept-forge" className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
              <div className="text-lg font-semibold">Visual Concept Forge</div>
              <div className="mt-2 text-sm text-white/65">Turn complex topics into visuals.</div>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
