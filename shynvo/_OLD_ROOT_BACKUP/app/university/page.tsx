export default function UniversityHub() {
  const cards = [
    { name: 'Study Lab', desc: 'Structured tutoring + study workflows.', href: '/university/study-lab' },
    { name: 'Exam Arena', desc: 'Exam simulations, scoring, and prep systems.', href: '/university/exam-arena' },
    { name: 'Career Launchpad', desc: 'CV, portfolio, interview, job strategy.', href: '/university/career-launchpad' },
    { name: 'Visual Concept Forge', desc: 'Concept maps and visual learning.', href: '/university/visual-concept-forge' },
    { name: 'Faculties', desc: 'Choose your academic track.', href: '/university/faculties' },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">University Hub</div>
        <h1 className="mt-2 text-3xl font-semibold">Academic Building</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          A structured campus for learning, exam preparation, and academic growth — with clear departments.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.name}
              href={c.href}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
            >
              <div className="text-base font-semibold">{c.name}</div>
              <div className="mt-2 text-sm text-white/70">{c.desc}</div>
              <div className="mt-4 text-sm font-semibold text-white/85">Enter</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
