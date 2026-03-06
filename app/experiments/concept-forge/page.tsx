import Link from "next/link";

export default function ExperimentsConceptForgePage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Concept Forge
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Concept Forge is where rough thoughts become structured ideas. Users can turn
        vague concepts into clearer direction, value, audience, and next steps.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Raw Idea Input</div>
          <textarea
            rows={7}
            placeholder="Example: I want to build an AI app that helps students stay focused and actually complete their goals."
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Expected Output</div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Core concept
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Target user + problem
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Value proposition + next steps
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
