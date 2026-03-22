"use client";

import React, { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Role = "teacher" | "tutor" | "assistant";
type HelpMode = "teaching" | "exam" | "explanation" | "assignment" | "revision";
type Msg = { role: "user" | "ai"; text: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ROLE_INFO: Record<
  Role,
  {
    title: string;
    subtitle: string;
    responsibilities: string[];
    starterPrompts: { label: string; prompt: string }[];
  }
> = {
  teacher: {
    title: "Teacher",
    subtitle: "Teaches the subject patiently and step by step for school students.",
    responsibilities: [
      "Breaks topics into simple steps",
      "Uses patient and clear explanations",
      "Gives examples before harder questions",
      "Teaches at school level only",
    ],
    starterPrompts: [
      { label: "Teach simply", prompt: "Please teach this topic simply like I am learning it for the first time." },
      { label: "Break it down", prompt: "Break this topic down into small easy steps for me." },
      { label: "Explain with examples", prompt: "Explain this topic with easy examples first." },
    ],
  },
  tutor: {
    title: "Tutor",
    subtitle: "Helps students practice, revise, and prepare for tests and exams.",
    responsibilities: [
      "Gives practice questions",
      "Supports homework and classwork",
      "Reviews mistakes patiently",
      "Prepares students for tests and exams",
    ],
    starterPrompts: [
      { label: "Practice questions", prompt: "Give me practice questions for this subject." },
      { label: "Help my homework", prompt: "Help me solve this homework step by step." },
      { label: "Test me", prompt: "Quiz me on the important parts of this subject." },
    ],
  },
  assistant: {
    title: "Assistant",
    subtitle: "Provides quick support, summaries, revision help, and study structure.",
    responsibilities: [
      "Summarizes difficult topics",
      "Creates revision checklists",
      "Helps students stay organized",
      "Gives quick clarifications patiently",
    ],
    starterPrompts: [
      { label: "Make summary notes", prompt: "Summarize this topic into simple study notes." },
      { label: "Make revision plan", prompt: "Create a simple revision plan for this subject." },
      { label: "Quick explanation", prompt: "Give me a short and easy explanation of this topic." },
    ],
  },
};

function buildSystemPrompt(
  levelTitle: string,
  subjectTitle: string,
  redirectLabel: string,
  role: Role,
  helpMode: HelpMode
) {
  const roleBehavior =
    role === "teacher"
      ? "Teach patiently, clearly, and step by step for school students."
      : role === "tutor"
      ? "Guide school students through practice, homework, correction, and exam preparation patiently."
      : "Support school students with quick summaries, simple revision notes, and study planning.";

  const modeBehavior =
    helpMode === "teaching"
      ? "Focus on school teaching and understanding."
      : helpMode === "exam"
      ? "Focus on tests, likely questions, and exam preparation."
      : helpMode === "explanation"
      ? "Focus on simple and patient explanation."
      : helpMode === "assignment"
      ? "Focus on school homework, assignments, and guided steps."
      : "Focus on revision, summaries, memory cues, and easy review.";

  return `
You are inside Shynvo Academy.

Current level: ${levelTitle}
Current subject: ${subjectTitle}

Rules:
1. Only answer questions related to school-level learning for this subject.
2. Do NOT answer university-level questions in detail.
3. If the user asks about unrelated university topics, politely redirect them to ${redirectLabel}.
4. Always be patient, encouraging, and simple.
5. Break things down for students carefully.
6. Always answer in the same language the user writes in.
7. Keep the content appropriate for school students.

Role behavior:
${roleBehavior}

Support mode:
${modeBehavior}
  `.trim();
}

export default function AcademyRoomClient({
  levelTitle,
  subjectTitle,
  redirectLabel,
}: {
  levelTitle: string;
  subjectTitle: string;
  redirectLabel: string;
}) {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as Role) || "teacher";

  const [selectedRole, setSelectedRole] = useState<Role>(
    initialRole === "teacher" || initialRole === "tutor" || initialRole === "assistant"
      ? initialRole
      : "teacher"
  );
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [helpMode, setHelpMode] = useState<HelpMode>("teaching");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: `Welcome to ${subjectTitle}. I will help patiently at school level only. Choose Teacher, Tutor, or Assistant, then ask your question.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const roleInfo = useMemo(() => ROLE_INFO[selectedRole], [selectedRole]);

  async function playVoice(text: string) {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: text }),
      });

      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (!audioRef.current) return;
      audioRef.current.src = url;
      await audioRef.current.play();
    } catch {
      // ignore
    }
  }

  async function sendMessage(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const systemPrompt = buildSystemPrompt(
        levelTitle,
        subjectTitle,
        redirectLabel,
        selectedRole,
        helpMode
      );

      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: text,
          systemPrompt,
          messages: nextMessages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await res.json().catch(() => null);

      const answer =
        data?.answer ||
        data?.reply ||
        data?.message ||
        `I could not respond right now. Please ask again about ${subjectTitle}.`;

      setMessages((prev) => [...prev, { role: "ai", text: answer }]);

      if (mode === "voice") {
        await playVoice(answer);
      }

      setTimeout(() => {
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-3xl border border-fuchsia-300/20 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/70">
          Selected Role
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          {roleInfo.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/70">
          {roleInfo.subtitle}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(["teacher", "tutor", "assistant"] as Role[]).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={cx(
                "rounded-xl px-3 py-2 text-sm font-semibold transition",
                selectedRole === role
                  ? "bg-white text-[#0B0F14]"
                  : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
              )}
            >
              {ROLE_INFO[role].title}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["text", "voice"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cx(
                "rounded-xl px-3 py-2 text-sm font-semibold transition",
                mode === m
                  ? "bg-white text-[#0B0F14]"
                  : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
              )}
            >
              {m === "text" ? "Text" : "Voice"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/70">
            Help Mode
          </div>

          <div className="flex flex-wrap gap-2">
            {(["teaching", "exam", "explanation", "assignment", "revision"] as HelpMode[]).map((item) => (
              <button
                key={item}
                onClick={() => setHelpMode(item)}
                className={cx(
                  "rounded-full px-3 py-2 text-sm font-semibold transition",
                  helpMode === item
                    ? "bg-fuchsia-100 text-[#0B0F14]"
                    : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                )}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {roleInfo.responsibilities.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-white/80">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-sm font-semibold text-white">Academy rule</div>
          <div className="mt-2 text-sm leading-6 text-white/70">
            This room only supports school-level learning for {subjectTitle}. If a student asks
            for university-level support, redirect them to {redirectLabel}.
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-white">Quick starts</div>

          <div className="mt-3 grid gap-3">
            {roleInfo.starterPrompts.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => sendMessage(item.prompt)}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left transition hover:bg-white/7"
              >
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <div className="mt-1 text-sm text-white/60">{item.prompt}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-fuchsia-300/20 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-white">Live subject channel</div>
            <div className="text-xs text-white/60">
              School level • Patient guidance • {mode === "text" ? "Text mode" : "Voice mode"} • {helpMode}
            </div>
          </div>

          <div className="text-xs text-white/60">
            {loading ? "Thinking..." : "Ready"}
          </div>
        </div>

        <div
          ref={listRef}
          className="mt-5 h-[420px] overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cx(
                  "max-w-[90%] rounded-2xl border px-4 py-3 text-sm leading-6",
                  m.role === "user"
                    ? "ml-auto border-white/10 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white/85"
                )}
              >
                {m.text}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder={`Ask the ${roleInfo.title} about ${subjectTitle}...`}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>

        {mode === "voice" ? <audio ref={audioRef} className="hidden" /> : null}

        <div className="mt-3 text-xs text-white/50">
          Tip: choose Voice mode if you want spoken answers.
        </div>
      </div>
    </section>
  );
}
