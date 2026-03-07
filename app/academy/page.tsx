import Link from "next/link";

export default function AcademyPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          ← Back to Home
        </Link>

        <Link href="/docs" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          Docs →
        </Link>
      </div>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Shynvo Academy
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        School Learning World
      </h1>

      <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Shynvo Academy is the learning environment for junior and senior high school students.
        It will include global school subjects, multilingual tutors, quizzes, badges, exam preparation,
        and friendly academic support.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Subjects</div>
          <div className="mt-3 text-sm text-white/70">Math, science, languages, literature, religion, social studies, and more.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Tutor Support</div>
          <div className="mt-3 text-sm text-white/70">Friendly and patient teaching, homework help, and exam guidance.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Badges + Progress</div>
          <div className="mt-3 text-sm text-white/70">Quizzes, reward systems, streaks, and achievement badges.</div>
        </div>
      </div>
    </section>
  );
}
