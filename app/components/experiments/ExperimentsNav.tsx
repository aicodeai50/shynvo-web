"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExperimentsNav() {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-cyan-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          ← Back
        </button>

        <Link
          href="/"
          className="rounded-xl border border-cyan-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>

        <Link
          href="/experiments"
          className="rounded-xl border border-cyan-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Experiments
        </Link>
      </div>

      <div className="rounded-xl border border-cyan-300/15 bg-cyan-400/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/80">
        Experiment Layer
      </div>
    </div>
  );
}
