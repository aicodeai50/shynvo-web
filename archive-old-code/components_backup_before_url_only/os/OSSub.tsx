"use client";

import Link from "next/link";

export default function OSSub({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-xs text-white/60">Shynvo OS</div>
      </div>
      {backHref ? (
        <Link
          href={backHref}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          Back
        </Link>
      ) : null}
    </div>
  );
}
