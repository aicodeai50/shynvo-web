"use client";

import { useState } from "react";
import OsNav from "@/components/os/OsNav";

export default function RobotsPage() {
  const [selected, setSelected] = useState("StudyBot");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("No robot task yet.");

  const bots = ["StudyBot", "CodeBot", "StrategyBot", "ResearchBot"];

  function runBot(name?: string) {
    const bot = name ?? selected;
    const text = prompt.trim() || "No prompt entered.";
    setSelected(bot);
    setOutput(`${bot} received task:\n${text}`);
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Robots
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Robots are specialized AI agents inside the OS. They support execution with research,
        planning, coding, writing, and decision support.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {bots.map((bot) => (
          <button
            key={bot}
            type="button"
            onClick={() => runBot(bot)}
            className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 text-left transition hover:bg-white/10"
          >
            <div className="text-2xl font-semibold text-white">{bot}</div>
            <div className="mt-3 text-sm text-white/70">Available in the OS execution layer</div>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Robot Task Input</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write what you want the selected robot to help with..."
            className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button
            type="button"
            onClick={() => runBot()}
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Run {selected}
          </button>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Robot Output</div>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
            {output}
          </pre>
        </div>
      </div>
    </section>
  );
}
