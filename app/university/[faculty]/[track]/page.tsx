"use client";

import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import { ROLE_LABELS, type UniRole } from "@/_lib/university/data";

type Msg = { role: "user" | "ai"; text: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function TrackRoomPage({ params }: { params: { faculty: string; track: string } }) {
  const facultyKey = params.faculty;
  const trackKey = params.track;

  const [role, setRole] = useState<UniRole>("teacher");
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text:
        "Welcome. I’m your faculty-locked channel. Ask in any language. If your question is unrelated to this faculty/field, I will redirect you to the correct department.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const roleInfo = useMemo(() => ROLE_LABELS[role], [role]);

  async function speak(text: string) {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
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

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/university-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          facultyKey,
          trackKey,
          role,
          message: text,
          history: msgs.slice(-10), // lightweight context
        }),
      });

      const data = await res.json().catch(() => null);
      const answer = (data?.answer as string) || "I couldn’t answer that right now. Please try again.";

      setMsgs((m) => [...m, { role: "ai", text: answer }]);

      if (mode === "voice") {
        await speak(answer);
      }
    } catch {
      setMsgs((m) => [...m, { role: "ai", text: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 50);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href={`/university/${facultyKey}`} className="text-sm text-white/70 hover:text-white">
            ← Back to Faculty
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Faculty Room: <span className="text-white/85">{facultyKey}</span> / <span className="text-white/85">{trackKey}</span>
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Choose a channel. Teacher teaches full material, Tutor helps assignments/exams, Assistant helps study workflows. Multilingual.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-1">
            {(["teacher", "tutor", "assistant"] as UniRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  r === role ? "bg-white text-[#0B0F14]" : "text-white/80 hover:bg-white/5"
                )}
              >
                {ROLE_LABELS[r].title}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-1">
            {(["text", "voice"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  m === mode ? "bg-white text-[#0B0F14]" : "text-white/80 hover:bg-white/5"
                )}
              >
                {m === "text" ? "Text" : "Voice"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Role card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Channel</div>
          <div className="mt-2 text-xl font-semibold text-white">{roleInfo.title}</div>
          <div className="mt-1 text-sm text-white/70">{roleInfo.subtitle}</div>

          <div className="mt-4 space-y-2">
            {roleInfo.responsibilities.map((x) => (
              <div key={x} className="flex gap-2 text-sm text-white/75">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/55" />
                <span>{x}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            <div className="font-semibold text-white/85">Faculty lock</div>
            <div className="mt-1">
              If you ask something unrelated, this channel will refuse and redirect you to the correct faculty.
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white">Live Session</div>
              <div className="text-xs text-white/60">Multilingual • Faculty-locked • Professional tone</div>
            </div>
            <div className={cx("text-xs", loading ? "text-white/70" : "text-white/50")}>
              {loading ? "Thinking..." : "Ready"}
            </div>
          </div>

          <div
            ref={listRef}
            className="mt-4 h-[420px] overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="space-y-3">
              {msgs.map((m, idx) => (
                <div
                  key={idx}
                  className={cx(
                    "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-6",
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

          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
              placeholder="Ask in any language…"
            />
            <button
              onClick={send}
              className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Send
            </button>
          </div>

          <audio ref={audioRef} className="hidden" />
          <div className="mt-2 text-[11px] text-white/50">
            Tip: switch to Voice to hear spoken answers.
          </div>
        </div>
      </div>
    </section>
  );
}
