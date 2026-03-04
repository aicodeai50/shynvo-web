import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="text-xs tracking-widest text-white/50">ACADEMIC SYSTEM</div>
        <h1 className="text-3xl font-semibold">Study Lab</h1>
        <p className="text-white/70">Turn a topic or chapter into a guided study session (warm-up → learn → check).</p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          This page is active (no 404). Next: we build the full learning flow UI + connect backend.
        </div>

        <div className="flex gap-2">
          <Link className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black" href="/university">
            Back to University Hub
          </Link>
          <Link className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white" href="/university/faculty/bsc-science-tech">
            Open a Faculty Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
