"use client";

import { useMemo, useState } from "react";
import { Faculty } from "@/lib/university/faculties";
import { renderAssistantHtml } from "@/lib/sh-assistant/render";

type ArenaId = "study-lab" | "exam-arena" | "concept-forge" | "career-launchpad";

const ARENA_META: Record<ArenaId, { title: string; goal: string; quick: string[] }> = {
  "study-lab": {
    title: "Study Lab Tutor",
    goal: "Teach clearly, step-by-step. Turn notes into understanding + drills + recall.",
    quick: ["Explain this topic simply", "Give examples", "Make flashcards", "Make a short quiz"],
  },
  "exam-arena": {
    title: "Exam Arena Tutor",
    goal: "Test the user. Generate exam-style questions, grade answers, and show improvements.",
    quick: ["Create 10 exam questions", "Make it timed practice", "Grade my answer", "Show weak areas"],
  },
  "concept-forge": {
    title: "Concept Forge Tutor",
    goal: "Build clarity. Map concepts, dependencies, cause-effect, and relationships.",
    quick: ["Create a concept map in bullets", "Show dependencies", "Compare A vs B", "Find misconceptions"],
  },
  "career-launchpad": {
    title: "Career Launchpad Tutor",
    goal: "Connect learning to outcomes. Interview practice, CV bullets, role plans, feedback.",
    quick: ["Mock interview", "Role roadmap", "CV bullets", "Portfolio checklist"],
  },
};

type Msg = { role: "system" | "user" | "assistant"; content: string };

export default function ArenaTutor({
  faculty,
  arena,
}: {
  faculty: Faculty;
  arena: ArenaId;
}) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content: `Hi — I'm your ${faculty.name} tutor for ${ARENA_META[arena].title}. Tell me what you're working on.`,
    },
  ]);

  const system = useMemo(() => {
    return `
You are Shynvo University Tutor.
Faculty: ${faculty.name}
Faculty tagline: ${faculty.tagline}
Arena: ${ARENA_META[arena].title}
Arena goal: ${ARENA_META[arena].goal}

Rules:
- Be clear and structured.
- Ask 1–2 clarifying questions if needed.
- Give actionable next steps.
- When useful, include:
  - Examples
  - Short drills
  - A mini-quiz
- Keep it practical for a student.
`.trim();
  }, [faculty, arena]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;

    setBusy(true);
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");

    try {
      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: system },
            ...messages.filter((x) => x.role !== "system"),
            { role: "user", content: q },
          ],
        }),
      });

      const t = await res.text();
      if (!res.ok) {
        setMessages((m) => [...m, { role: "assistant", content: `Error (${res.status}): ${t.slice(0, 200)}` }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: t }]);
      }
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: `Request failed: ${String(e?.message ?? e)}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs tracking-widest text-white/60">TUTOR</div>
          <div className="mt-1 text-lg font-semibold text-white">{ARENA_META[arena].title}</div>
          <div className="mt-1 text-sm text-white/70">
            Faculty: <span style={{ color: faculty.accent }} className="font-semibold">{faculty.name}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {ARENA_META[arena].quick.map((q) => (
            <button
              key={q}
              type="button"
              disabled={busy}
              onClick={() => send(`${q}. Topic: ${faculty.examples[0]}`)}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 max-h-[360px] overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-sm">
        {messages.map((m, i) => (
          <div key={i} className="mb-3">
            <div className="text-xs text-white/50">{m.role.toUpperCase()}</div>
            {m.role === "user" ? (
              <div className="whitespace-pre-wrap text-white/85">{m.content}</div>
            ) : (
              <div
                className="assistant-html text-white/85"
                dangerouslySetInnerHTML={{
                  __html: renderAssistantHtml(m.content),
                }}
              />
            )}
          </div>
        ))}
        {busy && <div className="text-white/60">Thinking…</div>}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? send(input) : null)}
          placeholder="Ask anything… (paste lecture notes, questions, exam problems)"
          className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />
        <button
          onClick={() => send(input)}
          disabled={busy}
          className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15 disabled:opacity-50"
          type="button"
        >
          Send
        </button>
      </div>

      <div className="mt-3 text-xs text-white/50">
        This tutor adapts to faculty + arena. Ask for quizzes, explanations, feedback, or plans.
      </div>
    </div>
  );
}
