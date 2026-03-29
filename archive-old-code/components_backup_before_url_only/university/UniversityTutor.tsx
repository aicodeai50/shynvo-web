"use client";

import { useMemo, useState } from "react";
import { extractReply } from "@/lib/university/extractReply";
import { renderAssistantHtml } from "@/lib/sh-assistant/render";

type FacultyId =
  | "stem-it"
  | "business"
  | "medicine"
  | "law-social"
  | "arts-humanities"
  | "education"
  | "custom";

type ArenaId = "study-lab" | "exam-arena" | "concept-forge" | "career-launchpad";

const FACULTIES: Record<FacultyId, { name: string; accent: string; examples: string[] }> = {
  "stem-it": {
    name: "STEM & IT",
    accent: "#22D3EE",
    examples: ["OSI model", "SQL joins", "Big-O analysis", "Operating systems"],
  },
  business: {
    name: "Business & Economics",
    accent: "#A3E635",
    examples: ["Supply & demand", "DCF valuation", "Game theory", "Marketing funnels"],
  },
  medicine: {
    name: "Medicine & Health",
    accent: "#FB7185",
    examples: ["Cardiac cycle", "Pharmacology", "Pathways", "Symptoms → diagnosis"],
  },
  "law-social": {
    name: "Law & Social Sciences",
    accent: "#B48CFF",
    examples: ["Issue spotting", "Case briefs", "Theories", "Argument structure"],
  },
  "arts-humanities": {
    name: "Arts & Humanities",
    accent: "#38BDF8",
    examples: ["Text analysis", "Critical theory", "Historical timelines", "Language practice"],
  },
  education: {
    name: "Education",
    accent: "#34D399",
    examples: ["Lesson planning", "Assessment design", "Learning science", "Classroom scenarios"],
  },
  custom: {
    name: "Custom / Interdisciplinary",
    accent: "#F59E0B",
    examples: ["Combine disciplines", "Cross-domain synthesis", "Project-based learning", "Research mapping"],
  },
};

function getQueryParam(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const p = new URLSearchParams(window.location.search);
  return p.get(key) || fallback;
}

type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

export default function UniversityTutor(props: {
  arenaId: ArenaId;
  title: string;
  subtitle: string;
}) {
  const [facultyId, setFacultyId] = useState<FacultyId>(() => {
    const f = getQueryParam("faculty", "stem-it") as FacultyId;
    return (FACULTIES as any)[f] ? f : "stem-it";
  });

  const faculty = FACULTIES[facultyId];

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMsg[]>(() => {
    return [
      {
        role: "assistant",
        content: `Hi — I’m your ${faculty.name} tutor for ${props.title}. Tell me what you’re working on.`,
      },
    ];
  });

  const examples = useMemo(() => faculty.examples, [facultyId]);

  function arenaHint(arenaId: ArenaId) {
    switch (arenaId) {
      case "study-lab":
        return "Explain → examples → drills → recall → mastery.";
      case "exam-arena":
        return "Timed practice + grading. Improve speed, accuracy, and exam performance.";
      case "concept-forge":
        return "Map concepts visually. Understand dependencies and systems.";
      case "career-launchpad":
        return "Interview prep + plans + role readiness.";
    }
  }

  function buildSystemPrompt() {
    return `
You are Shynvo University Hub Tutor.

Arena: ${props.title} (${props.arenaId})
Faculty: ${faculty.name}

Rules:
- Be structured, concise, and helpful.
- If the user asks for quizzes, produce numbered questions and then answers separately.
- If user asks for study plan, provide steps and schedule.
- Never include debug fields or metadata in your response.
`.trim();
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setLoading(true);
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const system = buildSystemPrompt();

      const payload = {
        messages: [
          { role: "system", content: system },
          ...messages
            .filter((m) => m.role !== "system")
            .map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: text },
        ],
      };

      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      const raw = contentType.includes("application/json") ? await res.json() : await res.text();

      const reply = extractReply(raw);

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${e?.message ?? "Request failed"}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1000px circle at 18% 18%, ${faculty.accent}33, transparent 55%),
              radial-gradient(900px circle at 82% 24%, rgba(255,255,255,0.08), transparent 55%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">UNIVERSITY HUB</div>
            <div className="mt-2 text-3xl font-semibold">{props.title}</div>
            <div className="mt-2 text-sm text-white/70">{props.subtitle}</div>
            <div className="mt-2 text-xs text-white/50">{arenaHint(props.arenaId)}</div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/university"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Back to Hub →
            </a>
            <a
              href="/"
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Home →
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-white/80">
              Faculty:{" "}
              <span style={{ color: faculty.accent }} className="font-semibold">
                {faculty.name}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(Object.keys(FACULTIES) as FacultyId[]).map((id) => {
                const f = FACULTIES[id];
                const active = id === facultyId;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFacultyId(id);
                      setMessages([
                        {
                          role: "assistant",
                          content: `Hi — I’m your ${f.name} tutor for ${props.title}. Tell me what you’re working on.`,
                        },
                      ]);
                    }}
                    className={[
                      "rounded-full border px-3 py-1 text-xs transition",
                      active
                        ? "border-white/25 bg-white/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
                    ].join(" ")}
                    style={active ? { boxShadow: `0 0 24px ${f.accent}2A` } : undefined}
                  >
                    {f.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">TUTOR</div>
              <div className="mt-2 text-lg font-semibold">{props.title} Tutor</div>
              <div className="mt-1 text-sm text-white/70">
                Ask anything: paste lecture notes, questions, exam problems, or topics.
              </div>

              <div className="mt-4 text-xs text-white/55">
                Suggestions:{" "}
                {examples.map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="mr-2 underline decoration-white/20 hover:decoration-white/60"
                    onClick={() => setInput(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-xs tracking-widest text-white/60">CHAT</div>

              <div className="mt-3 max-h-[320px] overflow-auto space-y-3 pr-1">
                {messages.map((m, i) => (
                  <div key={i} className="text-sm">
                    <div className="text-[11px] tracking-widest text-white/50">
                      {m.role.toUpperCase()}
                    </div>
                    <div className="mt-1 whitespace-pre-wrap text-white/85">
                      {m.role === "user" ? (
                        <div className="whitespace-pre-wrap">{m.content}</div>
                      ) : (
                        <div
                          className="assistant-html"
                          dangerouslySetInnerHTML={{
                            __html: renderAssistantHtml(m.content),
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything... (paste notes, questions, exam problems)"
                  className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                  onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
                />
                <button
                  onClick={send}
                  disabled={loading}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15 disabled:opacity-50"
                  type="button"
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>

              <div className="mt-3 text-xs text-white/50">
                This tutor adapts to faculty + arena. Ask for quizzes, explanations, feedback, or plans.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/45">
          University Hub = school-like academic support across faculties and arenas.
        </div>
      </div>
    </div>
  );
}
