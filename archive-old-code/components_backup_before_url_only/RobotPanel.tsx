"use client";

import { renderAssistantHtml } from "@/lib/sh-assistant/render";

import { useMemo, useRef, useState } from "react";
import type { RobotMode } from "@/components/RobotModePicker";

type Msg = { role: "user" | "assistant"; content: string };

function modeSystem(mode: RobotMode) {
  // Frontend-only system routing. Backend can later use mode directly.
  switch (mode) {
    case "Tutor":
      return "You are Shynvo Robot in Tutor mode. Teach clearly, give examples, then a short check-for-understanding.";
    case "Analyst":
      return "You are Shynvo Robot in Analyst mode. Be structured, use bullets, identify gaps, propose next actions.";
    case "Builder":
      return "You are Shynvo Robot in Builder mode. Produce actionable steps, code scaffolds, file lists, and checklists.";
    case "Support":
      return "You are Shynvo Robot in Support mode. Be friendly, concise, and focused on user success and troubleshooting.";
    case "Interviewer":
      return "You are Shynvo Robot in Interviewer mode. Ask one question at a time, wait for the answer, then score and continue.";
    default:
      return "You are Shynvo Robot. Be concise and useful.";
  }
}

function extractReply(data: any): string {
  return (
    data?.reply ??
    data?.message ??
    data?.output ??
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    ""
  );
}

async function callPublicChat(args: {
  prompt: string;
  mode: RobotMode;
  history: Msg[];
  signal?: AbortSignal;
}) {
  const { prompt, mode, history, signal } = args;

  // Build OpenAI-like messages array (works with many proxy backends)
  const sys = modeSystem(mode);
  const messages = [
    { role: "system", content: sys },
    // keep short history (avoid huge payload)
    ...history.slice(-12).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: prompt },
  ];

  // Send BOTH shapes for compatibility:
  // - message (simple)
  // - messages (structured)
  const res = await fetch("/api/public/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      mode,
      message: prompt,
      messages,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || data?.details || data?.message || "Request failed");
  }

  return extractReply(data);
}

export default function RobotPanel({ enabled, mode }: { enabled: boolean; mode: RobotMode }) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "I’m your Shynvo Robot. Pick a mode + give me a goal (quiz, flashcards, interview prep, research) and I’ll generate a result.",
    },
  ]);

  const abortRef = useRef<AbortController | null>(null);

  const quicks = useMemo(() => {
    const common = [
      { label: "Research Summary", prompt: "Summarize best practices for Node.js authentication (JWT)." },
      { label: "Build Checklist", prompt: "Give me a checklist to ship a feature safely (dev → staging → prod)." },
    ];

    if (mode === "Tutor") {
      return [
        { label: "Explain Concept", prompt: "Explain JavaScript closures with a simple example." },
        { label: "Mini Quiz", prompt: "Create a short JavaScript fundamentals quiz with answers." },
        ...common,
      ];
    }

    if (mode === "Interviewer") {
      return [
        { label: "Frontend Interview", prompt: "Run a frontend interview: ask me 5 questions one by one and score my answers." },
        { label: "Backend Interview", prompt: "Run a backend interview: ask me 5 questions one by one and score my answers." },
        ...common,
      ];
    }

    if (mode === "Analyst") {
      return [
        { label: "Skill Gaps", prompt: "Create a skill-gap checklist for a junior-to-mid React developer and suggested next steps." },
        { label: "Study Plan", prompt: "Create an 8-week upskilling plan for fullstack JavaScript." },
        ...common,
      ];
    }

    if (mode === "Builder") {
      return [
        { label: "Project Plan", prompt: "Create a 7-day execution plan to ship a SaaS landing page + auth + payments." },
        { label: "Tech Stack", prompt: "Suggest a practical stack for Next.js frontend + Node backend + payments + deploy plan." },
        ...common,
      ];
    }

    // Support
    return [
      { label: "Onboarding Help", prompt: "Explain how a new user should start using Shynvo in 3 steps." },
      { label: "Pricing FAQ", prompt: "Write an FAQ for Free vs Pro vs Team plans." },
      ...common,
    ];
  }, [mode]);

  function clearChat() {
    setError(null);
    setInput("");
    setMessages([
      {
        role: "assistant",
        content:
          "Cleared. I’m your Shynvo Robot — pick a mode + give me a goal and I’ll generate a result.",
      },
    ]);
  }

  async function send(text: string) {
    if (!enabled) return;

    const prompt = text.trim();
    if (!prompt) return;

    setError(null);
    setBusy(true);

    // cancel any in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const nextHistory = [...messages, { role: "user", content: prompt }] as Msg[];
    setMessages(nextHistory);
    setInput("");

    try {
      const reply = await callPublicChat({
        prompt,
        mode,
        history: nextHistory,
        signal: abortRef.current.signal,
      });

      setMessages((m) => [...m, { role: "assistant", content: String(reply || "(no reply)") }]);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setError(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  const disabled = !enabled || busy;

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-5 text-neutral-100">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Robot Commands</h2>
          <div className="text-xs text-neutral-500">Mode: {mode}</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">Backend: /api/public/chat</span>
          <button
            type="button"
            onClick={clearChat}
            className="rounded-xl border border-neutral-800 bg-black px-3 py-2 text-xs text-neutral-200 hover:border-neutral-600"
          >
            Clear
          </button>
        </div>
      </div>

      {!enabled && (
        <div className="mt-4 rounded-2xl border border-neutral-800 bg-black p-4 text-sm text-neutral-400">
          Robot is OFF. Turn it ON to use commands.
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {quicks.map((q) => (
          <Quick key={q.label} label={q.label} onClick={() => send(q.prompt)} disabled={disabled} />
        ))}
      </div>

      <div className="mt-4 h-[260px] overflow-auto rounded-2xl border border-neutral-800 bg-black p-4">
        {messages.map((m, i) => (
          <div key={i} className="mb-3">
            <div className="text-xs uppercase tracking-wide text-neutral-500">
              {m.role === "user" ? "You" : "Robot"}
            </div>
            {m.role === "user" ? (
              <div className="whitespace-pre-wrap text-sm text-neutral-200">{m.content}</div>
            ) : (
              <div
                className="assistant-html text-sm text-neutral-200"
                dangerouslySetInnerHTML={{
                  __html: renderAssistantHtml(m.content),
                }}
              />
            )}
          </div>
        ))}
        {busy && <div className="text-sm text-neutral-400">Thinking…</div>}
      </div>

      {error && (
        <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          className="flex-1 rounded-xl border border-neutral-800 bg-black p-3 text-sm text-neutral-100 placeholder:text-neutral-600"
          placeholder={enabled ? "Type a command… (e.g., 'Make me a quiz on SQL joins')" : "Robot is OFF"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled || !enabled}
        />
        <button
          className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-60"
          disabled={disabled || !input.trim() || !enabled}
        >
          Send
        </button>
      </form>

      <p className="mt-3 text-xs text-neutral-500">
        Note: This uses the Shynvo proxy endpoint <code>/api/public/chat</code>. No public keys are stored in the browser.
      </p>
    </div>
  );
}

function Quick({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-neutral-800 bg-black px-3 py-2 text-sm text-neutral-200 hover:border-neutral-600 disabled:opacity-60"
    >
      {label}
    </button>
  );
}