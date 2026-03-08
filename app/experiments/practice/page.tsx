"use client";

import { useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";

type PracticeType = "Interview" | "Oral Exam" | "Presentation" | "Difficult Conversation";

export default function PracticePage() {
  const [selected, setSelected] = useState<PracticeType>("Interview");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("Waiting for practice...");

  function startPractice() {
    const text = prompt.trim();
    if (!text) return;

    setOutput(`${selected} mode started.\n\nPractice task:\n${text}\n\nFeedback direction:\nBe clear, structured, calm, and measurable.`);
  }

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
        Experiments
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Practice Arena
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Practice Arena helps users rehearse real situations with AI feedback. It can be used for
        interviews, oral exams, presentations, pitches, and difficult conversations.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["Interview", "Oral Exam", "Presentation", "Difficult Conversation"] as PracticeType[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSelected(item)}
            className={`rounded-3xl border px-5 py-5 text-left transition ${
              selected === item
                ? "border-white bg-white text-[#0B0F14]"
                : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
            }`}
          >
            <div className="text-lg font-semibold">{item}</div>
            <div className="mt-1 text-sm opacity-80">
              {item === "Interview" && "Practice job and internship interviews"}
              {item === "Oral Exam" && "Rehearse academic response under pressure"}
              {item === "Presentation" && "Practice clear speaking and delivery"}
              {item === "Difficult Conversation" && "Rehearse important personal or team discussions"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Practice Prompt</div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Act as an interviewer for a junior frontend developer role and ask me one question at a time."
          className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={startPractice}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Start Practice
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Practice Output</div>
        <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
          {output}
        </pre>
      </div>
    </section>
  );
}
