"use client";

import Link from "next/link";
import { useState } from "react";

const CARDS = [
  {
    title: "Delivery Rate",
    body: "Output is improving across recent mission cycles.",
  },
  {
    title: "Execution Quality",
    body: "Completion quality is stable with fewer missed steps.",
  },
  {
    title: "Improvement Focus",
    body: "Increase consistency and shorten review loops.",
  },
];

export default function EnterpriseAnalyticsOutputPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  function handleGenerate() {
    if (!prompt.trim()) return;
    setResponse(`Summary for output review: "${prompt.trim()}". Focus on quality, speed, and consistency across teams.`);
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
        Team Output
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
        <div className="text-lg font-semibold text-white">Generate output summary</div>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Review the last sprint output"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
        />
        <button
          type="button"
          onClick={handleGenerate}
          className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
        >
          Generate summary
        </button>

        {response ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            {response}
          </div>
        ) : null}
      </div>
    </section>
  );
}
