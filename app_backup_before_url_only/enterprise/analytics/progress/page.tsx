"use client";

import Link from "next/link";
import { useState } from "react";

const CARDS = [
  {
    title: "Delivery Confidence",
    body: "Current missions are progressing on schedule with acceptable confidence.",
  },
  {
    title: "Risk Level",
    body: "No major delivery block is currently flagged.",
  },
  {
    title: "Next Review",
    body: "Review open milestones and confirm ownership for the next phase.",
  },
];

export default function EnterpriseAnalyticsProgressPage() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState("");

  function handleSave() {
    if (!note.trim()) return;
    setSaved(note.trim());
  }

  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/analytics" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Analytics
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Analytics
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Mission Progress
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {CARDS.map((card) => (
          <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xl font-semibold text-white">{card.title}</div>
            <div className="mt-3 text-sm text-white/75">{card.body}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold text-white">Add progress note</div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={5}
          placeholder="Write a short mission progress note..."
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
        />
        <button
          type="button"
          onClick={handleSave}
          className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
        >
          Save note
        </button>

        {saved ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            Saved note: {saved}
          </div>
        ) : null}
      </div>
    </section>
  );
}
