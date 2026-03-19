"use client";

import React, { useMemo, useRef, useState } from "react";
import UpgradeModal from "@/components/UpgradeModal";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { renderAssistantHtml } from "@/lib/sh-assistant/render";

type UniRole = "teacher" | "tutor" | "assistant";
type HelpMode = "teaching" | "exam" | "explanation" | "assignment" | "revision";
type Msg = { role: "user" | "ai"; text: string };

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ROLE_INFO: Record<
  UniRole,
  {
    title: string;
    subtitle: string;
    responsibilities: string[];
    starterPrompts: { label: string; prompt: string }[];
  }
> = {
  teacher: {
    title: "Teacher",
    subtitle: "Teaches the full course material in a structured professional way.",
    responsibilities: [
      "Explains concepts from foundation to advanced level",
      "Teaches the complete learning flow step by step",
      "Uses examples, lessons, and concept breakdowns",
      "Keeps the teaching academic and professional",
    ],
    starterPrompts: [
      { label: "Explain the basics", prompt: "Explain the core foundations of this course." },
      { label: "Create a lesson", prompt: "Teach this topic step by step like a university lecturer." },
      { label: "Give examples", prompt: "Explain this topic with simple examples first, then advanced examples." },
    ],
  },
  tutor: {
    title: "Tutor",
    subtitle: "Helps with assignments, exam practice, and problem-solving.",
    responsibilities: [
      "Guides assignment work and reasoning",
      "Prepares the student for quizzes and exams",
      "Reviews mistakes and improves understanding",
      "Supports targeted practice in the course",
    ],
    starterPrompts: [
      { label: "Exam practice", prompt: "Give me exam-style practice questions for this course." },
      { label: "Solve a problem", prompt: "Help me solve a course problem step by step." },
      { label: "Check my understanding", prompt: "Quiz me on the important topics in this course." },
    ],
  },
  assistant: {
    title: "Assistant",
    subtitle: "Fast helper for summaries, notes, revision, and study planning.",
    responsibilities: [
      "Summarizes notes and key concepts",
      "Creates revision plans and checklists",
      "Helps with quick course-related clarifications",
      "Supports daily study workflow and organization",
    ],
    starterPrompts: [
      { label: "Summarize course", prompt: "Summarize the most important ideas in this course." },
      { label: "Make a study plan", prompt: "Create a 7-day study plan for this course." },
      { label: "Create revision notes", prompt: "Turn this course into quick revision notes and checklists." },
    ],
  },
};

function buildSystemPrompt(
  facultyTitle: string,
  redirectLabel: string,
  trackTitle: string,
  role: UniRole,
  helpMode: HelpMode
) {
  const roleLabel = ROLE_INFO[role].title;

  const roleBehavior =
    role === "teacher"
      ? "Teach like a professional university teacher. Explain step by step, clearly and academically."
      : role === "tutor"
      ? "Act like a university tutor. Focus on assignments, exam practice, feedback, and guided reasoning."
      : "Act like a university assistant. Be concise, practical, organized, and helpful with study planning and summaries.";

  const modeBehavior =
    helpMode === "teaching"
      ? "Focus on structured teaching."
      : helpMode === "exam"
      ? "Focus on exam preparation, likely questions, recall points, and practice."
      : helpMode === "explanation"
      ? "Focus on simple explanation, clarity, and breaking difficult things down."
      : helpMode === "assignment"
      ? "Focus on assignment guidance, reasoning, structure, and solution steps."
      : "Focus on revision, summaries, memory cues, and quick review.";

  return `
You are a ${roleLabel} inside Shynvo University.

Current faculty: ${facultyTitle}
Current course: ${trackTitle}

Rules:
1. Only answer questions related to this faculty and this course.
2. If the user asks about another faculty or unrelated topic, do NOT answer it in detail.
3. Politely say this room is restricted to ${facultyTitle} and this course.
4. If the user asks for another faculty such as medicine while inside IT, direct them to the correct faculty. The current redirect target is: ${redirectLabel}.
5. Always answer in the same language the user writes in.
6. Be professional, educational, and clear.
7. If the user asks nonsense, spam, or irrelevant things, say:
"I’m not permitted to answer that here. Please ask a relevant academic question for this course or go to ${redirectLabel}."

Role behavior:
${roleBehavior}

Support mode:
${modeBehavior}
  `.trim();
}

export default function TrackPageClient({
  facultyTitle,
  redirectLabel,
  trackTitle,
}: {
  facultyTitle: string;
  redirectLabel: string;
  trackTitle: string;
}) {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as UniRole) || "teacher";

  const [selectedRole, setSelectedRole] = useState<UniRole>(
    initialRole === "teacher" || initialRole === "tutor" || initialRole === "assistant"
      ? initialRole
      : "teacher"
  );
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [helpMode, setHelpMode] = useState<HelpMode>("teaching");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: `Welcome. Choose Teacher, Tutor, or Assistant. Ask in any language. This room only answers questions related to ${trackTitle} inside ${facultyTitle}.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  function startVoiceInput() {
    try {
      const SpeechRecognition =
        typeof window !== "undefined"
          ? window.SpeechRecognition || window.webkitSpeechRecognition
          : null;

      if (!SpeechRecognition) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "Voice input is not supported in this browser. Try Chrome or Edge, or use text mode.",
          },
        ]);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0]?.transcript || "")
          .join(" ")
          .trim();

        setInput(transcript);
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setListening(false);
    }
  }

  function stopVoiceInput() {
    try {
      recognitionRef.current?.stop();
    } catch {}
    setListening(false);
  }

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
        facultyTitle,
        redirectLabel,
        trackTitle,
        selectedRole,
        helpMode
      );

      const supabase = getSupabaseClient();
      const session = supabase
        ? await supabase.auth.getSession()
        : { data: { session: null } };
      const token = session.data.session?.access_token || "";

      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
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

      if (data?.upgradeUrl) {
        setShowUpgrade(true);
      }

      const answer =
        data?.answer ||
        data?.reply ||
        data?.message ||
        `I could not respond right now. Please ask again about ${trackTitle} in ${facultyTitle}.`;

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
      <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
          Selected Role
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          {roleInfo.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/70">
          {roleInfo.subtitle}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(["teacher", "tutor", "assistant"] as UniRole[]).map((role) => (
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

        {mode === "voice" ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Voice input</div>
            <div className="mt-2 text-sm leading-6 text-white/70">
              Speak your question, review the text, then send it to the selected academic role.
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={listening ? stopVoiceInput : startVoiceInput}
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  listening
                    ? "bg-red-500 text-white hover:bg-red-400"
                    : "bg-white text-[#0B0F14] hover:bg-white/90"
                )}
              >
                {listening ? "Stop listening" : "Start voice input"}
              </button>

              {input ? (
                <button
                  onClick={() => setInput("")}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
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
                    ? "bg-cyan-100 text-[#0B0F14]"
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
          <div className="text-sm font-semibold text-white">Faculty rule</div>
          <div className="mt-2 text-sm leading-6 text-white/70">
            This role only works inside {facultyTitle}. If a user asks about another field,
            redirect them to the correct faculty such as {redirectLabel}.
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

      <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-white">Live course channel</div>
            <div className="text-xs text-white/60">
              Multilingual • Faculty-locked • {mode === "text" ? "Text mode" : "Voice mode"} • {helpMode}
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
            placeholder={`Ask the ${roleInfo.title} about ${trackTitle}...`}
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
      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />

        <div className="mt-3 text-xs text-white/50">
          Tip: choose Voice mode if you want spoken answers.
        </div>
      </div>
    </section>
  );
}
