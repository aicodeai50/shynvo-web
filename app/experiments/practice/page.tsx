import Link from "next/link";

export default function ExperimentsPracticePage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Practice Arena
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Practice Arena helps users rehearse real situations with AI feedback. It can
        be used for interviews, oral exams, presentations, pitches, and difficult conversations.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Interview</div>
          <div className="mt-2 text-sm text-white/70">Practice job and internship interviews</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Oral Exam</div>
          <div className="mt-2 text-sm text-white/70">Rehearse academic response under pressure</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Presentation</div>
          <div className="mt-2 text-sm text-white/70">Practice clear speaking and delivery</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Difficult Conversation</div>
          <div className="mt-2 text-sm text-white/70">Rehearse important personal or team discussions</div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Practice Prompt</div>
        <textarea
          rows={6}
          placeholder="Example: Act as an interviewer for a junior frontend developer role and ask me one question at a time."
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />
      </div>
    </section>
  );
}
