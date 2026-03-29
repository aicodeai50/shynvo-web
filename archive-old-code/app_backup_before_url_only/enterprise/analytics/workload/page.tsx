"use client";

import Link from "next/link";
import { useState } from "react";

const CARDS = [
  {
    title: "Engineering Load",
    body: "Moderate workload across active execution blocks.",
  },
  {
    title: "Marketing Load",
    body: "Stable capacity for campaign and messaging work.",
  },
  {
    title: "Product Load",
    body: "Focused on prioritization and decision flow.",
  },
];

export default function EnterpriseAnalyticsWorkloadPage() {
  const [team, setTeam] = useState("Engineering");
  const [message, setMessage] = useState("");

  function handleCheck() {
    setMessage(`${team} workload check prepared. Use this view to rebalance assignments and reduce overload.`);
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
        Workload Balance
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
        <div className="text-lg font-semibold text-white">Run workload check</div>

        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
        >
          <option>Engineering</option>
          <option>Marketing</option>
          <option>Product</option>
        </select>

        <button
          type="button"
          onClick={handleCheck}
          className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
        >
          Check balance
        </button>

        {message ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
            {message}
          </div>
        ) : null}
      </div>
    </section>
  );
}
