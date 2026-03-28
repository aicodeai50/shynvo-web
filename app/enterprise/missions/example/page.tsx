"use client";

import Link from "next/link";

export default function EnterpriseMissionExamplePage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/missions" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Missions
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Mission</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Example Mission</h1>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold">Launch Product v1</div>
        <ul className="mt-4 space-y-2 text-sm text-white/75">
          <li>• Planning and scope alignment</li>
          <li>• Build phase with engineering ownership</li>
          <li>• Testing and release preparation</li>
          <li>• Launch, review, and post-release corrections</li>
        </ul>
      </div>
    </section>
  );
}
