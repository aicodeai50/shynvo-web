"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OsNav() {
  const router = useRouter();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/enterprise/os");
  }

  function handleForward() {
    if (typeof window !== "undefined") {
      window.history.forward();
    }
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleBack}
          className="rounded-xl border border-emerald-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleForward}
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
          href="/enterprise/os"
          className="rounded-xl border border-cyan-300/15 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-50 transition hover:bg-cyan-400/15"
        >
          Enterprise OS Core
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
