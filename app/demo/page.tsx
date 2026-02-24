export default function DemoPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-bold">Live Demo</h1>
      <p className="mt-2 text-neutral-700">
        Preview how Shynvo helps users learn, upskill, and prepare for interviews using AI.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <DemoCard
          title="AI Quiz Generator"
          description="Generate adaptive quizzes based on your topic or skill level."
          output="Example: JavaScript fundamentals quiz with instant feedback."
        />

        <DemoCard
          title="Interview Simulator"
          description="Practice technical and behavioral interviews with AI."
          output="Example: Frontend interview questions with scoring and tips."
        />

        <DemoCard
          title="Company Upskilling"
          description="Preview team skill matrices and AI-driven upskilling plans."
          output="Example: Skill gaps visualized for a frontend engineering team."
        />
      </div>

      <div className="mt-12 rounded-xl border p-6 bg-neutral-900 text-neutral-100">
        <h2 className="text-xl font-semibold">Note</h2>
        <p className="mt-2 text-neutral-300">
          This demo represents the product experience and feature direction.
          Full interactive functionality is currently under active development.
        </p>
      </div>

      <a className="mt-10 inline-block underline" href="/">
        ← Back to home
      </a>
    </main>
  );
}

function DemoCard({
  title,
  description,
  output,
}: {
  title: string;
  description: string;
  output: string;
}) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-700">{description}</p>

      <div className="mt-4 rounded-lg bg-neutral-100 p-3 text-sm text-neutral-800">
        {output}
      </div>
    </div>
  );
}