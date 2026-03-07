"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import TrialGate from "@/components/TrialGate";

type Msg = { role: "user" | "robot"; text: string };

export default function RobotPage() {
  return (
    <TrialGate>
      <RobotEnvironment />
    </TrialGate>
  );
}

function RobotEnvironment() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "robot",
      text: "Welcome to Shynvo Robot. I can help with learning, planning, ideas, and direction. Ask me something to begin.",
    },
    {
      role: "robot",
      text: "You can use me in many languages. I’ll keep my replies clear and useful.",
    },
  ]);

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    setBusy(true);
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);

    try {
      const res = await fetch("/api/robot-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await res.json().catch(() => ({}));
      const reply = data.reply || data.error || "Robot could not respond.";

      setMessages((m) => [...m, { role: "robot", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "robot", text: "Network error. Try again." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-screen py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            ← Back to Home
          </Link>

          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
          >
            Docs →
          </Link>
        </div>

        <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Robot Environment
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
          Cinematic Robot
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          This is the live Shynvo robot section. When users open this page, the robot is already active
          and ready with a visible introduction message.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <video
              src="/robot.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5">
            <div className="border-b border-white/10 p-4">
              <div className="text-sm font-semibold">Cinematic Robot</div>
              <div className="text-xs text-white/60">Multilingual AI assistant</div>
            </div>

            <div
              ref={listRef}
              className="h-[500px] overflow-auto space-y-3 p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white"
                      : "max-w-[85%] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85"
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  placeholder="Ask the robot..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                />

                <button
                  onClick={send}
                  disabled={busy}
                  className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
                >
                  {busy ? "..." : "Send"}
                </button>
              </div>

              <div className="mt-2 text-[11px] text-white/50">
                Tip: Ask in your own language and the robot should follow your language.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
