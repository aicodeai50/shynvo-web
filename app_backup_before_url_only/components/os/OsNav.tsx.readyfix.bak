"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OsNav() {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-emerald-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={() => window.history.forward()}
          className="rounded-xl border border-emerald-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Forward →
        </button>

        <Link
          href="/"
          className="rounded-xl border border-emerald-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>

        <Link
          href="/os"
          className="rounded-xl border border-emerald-300/15 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-50 transition hover:bg-emerald-400/15"
        >
          Orbital Nexus
        </Link>
      </div>

      <div className="rounded-xl border border-emerald-300/15 bg-emerald-400/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/80">
        Operating System
      </div>
    </div>
  );
}
