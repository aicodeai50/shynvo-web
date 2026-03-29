"use client";

import Link from "next/link";
import { useState } from "react";

export default function EnterpriseMissionCreatePage() {
  const [goal, setGoal] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  function handleCreate() {
    if (!goal.trim()) return;
    setOutput(`Mission created from goal: ${goal.trim()}`);
  }

  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/missions" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Missions
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Mission Action</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Create Mission</h1>

      <div className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={6}
          placeholder="Example: Launch the new company landing page and onboard the first 20 users."
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
        />
        <button
          type="button"
          onClick={handleCreate}
          className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
        >
          Create Mission
        </button>

        {output ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            {output}
          </div>
        ) : null}
      </div>
    </section>
  );
}
