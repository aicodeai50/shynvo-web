"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Msg = { role: "assistant" | "user"; text: string };

function nowString() {
  try {
    return new Date().toLocaleString();
  } catch {
    return String(Date.now());
  }
}

export default function SHAssistantOverlay({ open, onClose }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      role: "assistant",
      text:
        "Welcome to Shynvo OS.\n" +
        "Tell me what you want to do (navigate, plan, focus, study, build a mission).",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const backend = useMemo(() => {
    return process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "";
  }, []);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" }), 50);
  }, [open, msgs.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function send() {
    const t = input.trim();
    if (!t) return;
    setInput("");
    setMsgs((prev) => [...prev, { role: "user", text: t }, { role: "assistant", text: "…" }]);

    if (!backend) {
      setMsgs((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          text: "Backend missing. Add NEXT_PUBLIC_BACKEND_URL to .env.local",
        },
      ]);
      return;
    }

    try {
      const res = await fetch(`${backend}/api/public/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: t }),
      });

      const data = await res.json().catch(() => ({}));
      const reply =
        (typeof data === "string" ? data : data?.reply) ||
        data?.message ||
        data?.output ||
        "No reply received.";

      setMsgs((prev) => [...prev.slice(0, -1), { role: "assistant", text: String(reply) }]);
    } catch (e: any) {
      setMsgs((prev) => [...prev.slice(0, -1), { role: "assistant", text: e?.message || "Request failed." }]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[85]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-[4%] top-[10%] w-[min(520px,92vw)] overflow-hidden rounded-3xl border border-white/15 bg-black/70 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="text-sm text-white/85">
            SH Assistant <span className="text-white/40">• navigator • tutor • operator</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90 hover:bg-white/15"
          >
            Close
          </button>
        </div>

        <div ref={scrollRef} className="max-h-[52vh] overflow-auto px-5 py-4">
          <div className="mb-3 text-[11px] text-white/40">Session: {nowString()}</div>
          {msgs.map((m, i) => (
            <div
              key={i}
              className={[
                "mb-3 rounded-2xl border px-3 py-2 text-sm leading-5",
                m.role === "user"
                  ? "ml-auto w-[92%] border-white/15 bg-white/10 text-white/90"
                  : "mr-auto w-[92%] border-white/10 bg-white/5 text-white/80",
              ].join(" ")}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
              placeholder="Ask anything… (navigate, plan, study, focus)"
              className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              autoFocus
            />
            <button
              type="button"
              onClick={send}
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 hover:bg-white/15"
            >
              Send
            </button>
          </div>
          <div className="mt-2 text-[11px] text-white/40">
            Tip: Ask “open /os/missions” in Terminal, or tell me your goal and I’ll guide you.
          </div>
        </div>
      </div>
    </div>
  );
}
