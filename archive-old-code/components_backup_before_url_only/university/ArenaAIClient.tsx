"use client";

import { useMemo, useState } from "react";

export default function ArenaAIClient({
  facultyLabel,
  arenaLabel,
  accent,
}: {
  facultyLabel: string;
  arenaLabel: string;
  accent: string;
}) {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string>("");

  const placeholder = useMemo(() => {
    if (arenaLabel === "Exam Arena") return "Example: 'Microeconomics demand elasticity' or 'TCP/IP model'";
    if (arenaLabel === "Concept Forge") return "Example: 'Explain recursion with a visual mental model'";
    if (arenaLabel === "Career Launchpad") return "Example: 'Interview questions for junior data analyst'";
    return "Example: 'Summarize week 3 topic and generate flashcards'";
  }, [arenaLabel]);

  async function run() {
    const t = topic.trim();
    if (!t) return;

    setLoading(true);
    setError(null);
    setOutput("");

    const system = `
You are Shynvo University AI.
Faculty: ${facultyLabel}
Arena: ${arenaLabel}
Level: ${level}

Return clean, structured, helpful output.
Avoid filler. Use bullets and sections when helpful.
`.trim();

    const user = (() => {
      if (arenaLabel === "Study Lab") {
        return `Topic: "${t}"
Create:
1) a short summary
2) 8 flashcards (Q/A)
3) 6 quiz questions (mix difficulty)
`;
      }
      if (arenaLabel === "Exam Arena") {
        return `Topic: "${t}"
Create:
1) a timed mini exam (10 questions)
2) marking guide / ideal answers
3) 5 weak-spot diagnostics tips
`;
      }
      if (arenaLabel === "Concept Forge") {
        return `Topic: "${t}"
Create:
1) a concept explanation (simple → deep)
2) 3 analogies
3) a mini concept-map as indented outline
`;
      }
      return `Goal: "${t}"
Create:
1) a role-specific prep plan
2) 10 interview questions + strong answer hints
3) a mini project idea to prove skill
`;
    })();

    try {
      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || `Request failed: ${res.status}`);
      }

      setOutput(text);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs tracking-widest text-white/70">AI TOOL</div>
          <div className="mt-1 text-lg font-semibold text-white">
            Generate using AI
          </div>
          <div className="mt-1 text-sm text-white/70">
            This calls <code>/api/public/chat</code>.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-white/60">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="advanced">advanced</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
        />

        <button
          onClick={run}
          disabled={loading || !topic.trim()}
          className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 hover:bg-white/15 disabled:opacity-50"
          style={{
            boxShadow: `0 0 0 1px ${accent}20 inset`,
          }}
        >
          {loading ? "Generating..." : "Generate →"}
        </button>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        {output ? (
          <div className="rounded-2xl border border-white/15 bg-black/50 p-4">
            <div className="text-xs tracking-widest text-white/60">OUTPUT</div>
            <pre className="mt-3 whitespace-pre-wrap text-sm text-white/80">
              {output}
            </pre>
          </div>
        ) : (
          <div className="text-xs text-white/50">
            Tip: Start with a specific topic (course + chapter + goal).
          </div>
        )}
      </div>
    </div>
  );
}
