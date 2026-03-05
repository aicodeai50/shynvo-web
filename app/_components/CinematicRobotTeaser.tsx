"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Lang = { code: string; label: string };

const LANGS: Lang[] = [
  { code: "en", label: "English" },
  { code: "no", label: "Norwegian" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "pt", label: "Portuguese" },
  { code: "nl", label: "Dutch" },
  { code: "sv", label: "Swedish" },
  { code: "da", label: "Danish" },
  { code: "fi", label: "Finnish" },
  { code: "pl", label: "Polish" },
  { code: "tr", label: "Turkish" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "th", label: "Thai" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "zh", label: "Chinese" },
];

type Msg = { role: "user" | "robot"; text: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function CinematicRobotTeaser() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<string>("en");
  const [voiceOn, setVoiceOn] = useState(true);

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "robot", text: "Robot online. Ask anything. Choose language and I will respond." },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [open, msgs.length]);

  // --- TTS (speaking) ---
  function pickVoiceForLang(code: string) {
    if (typeof window === "undefined") return null;
    const synth = window.speechSynthesis;
    if (!synth?.getVoices) return null;

    const voices = synth.getVoices();
    const exact = voices.find((v) => v.lang?.toLowerCase() === code.toLowerCase());
    if (exact) return exact;
    const prefix = voices.find((v) => v.lang?.toLowerCase().startsWith(code.toLowerCase()));
    return prefix || null;
  }

  function speak(text: string) {
    if (!voiceOn) return;
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoiceForLang(lang);
      if (v) u.voice = v;
      u.lang = lang;
      u.rate = 1.0;
      u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    } catch {
      // fail silently
    }
  }

  // Make sure voices load on some browsers
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    const handle = () => {
      // triggers voices initialization in some browsers
      window.speechSynthesis.getVoices();
    };
    handle();
    window.speechSynthesis.onvoiceschanged = handle;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // --- Robot brain (endpoint if provided) ---
  async function robotReply(userText: string) {
    // If set, call your endpoint:
    // POST { message, language } -> { reply }
    const url = process.env.NEXT_PUBLIC_ROBOT_CHAT_URL;

    if (!url) {
      // Local fallback so the robot works immediately
      const langLabel = LANGS.find((l) => l.code === lang)?.label ?? lang;
      return `Language: ${langLabel}. I can respond in any language you choose. Connect NEXT_PUBLIC_ROBOT_CHAT_URL to enable full long-form answers.`;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText, language: lang }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Robot endpoint error (${res.status})`);
    }

    const data = (await res.json()) as { reply?: string };
    return data.reply ?? "No reply received.";
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);

    try {
      const reply = await robotReply(text);
      setMsgs((m) => [...m, { role: "robot", text: reply }]);
      speak(reply);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Robot error.";
      setMsgs((m) => [...m, { role: "robot", text: `Error: ${msg}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Cinematic Video Card */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cx(
          "relative w-full overflow-hidden rounded-3xl border border-white/10 text-left",
          "bg-[#0B0F14]/70",
          "transition hover:bg-[#0B0F14]/60 focus:outline-none focus:ring-2 focus:ring-white/20"
        )}
        aria-label="Open cinematic robot"
      >
        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-220px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />
          <div className="absolute right-[-160px] bottom-[-180px] h-[460px] w-[460px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_320px_at_50%_10%,rgba(255,255,255,0.12),transparent_60%)]" />
        </div>

        <div className="relative grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Left text */}
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Cinematic Robot
            </div>

            <div className="mt-2 text-2xl font-semibold text-white">
              Presence online
            </div>

            <p className="mt-2 text-sm text-white/70">
              A live-action cinematic robot. Click to activate and speak in any language.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
                Activate
              </span>
              <span className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15">
                Multilingual voice
              </span>
            </div>

            <div className="mt-3 text-xs text-white/50">
              Real video • cinematic overlays • voice output
            </div>
          </div>

          {/* Right: Video chamber */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30">
            <div className="aspect-[4/3] w-full">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/robot/robot-loop.mp4" type="video/mp4" />
              </video>

              {/* cinematic overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(900px_260px_at_50%_12%,rgba(255,255,255,0.14),transparent_62%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(680px_240px_at_72%_62%,rgba(56,189,248,0.16),transparent_58%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(620px_240px_at_22%_68%,rgba(167,139,250,0.12),transparent_62%)]" />

              {/* moving sweep */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="sh-sweep absolute -left-[40%] top-0 h-full w-[60%] bg-white/12 blur-2xl" />
              </div>

              {/* scanlines */}
              <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay">
                <div className="sh-scan h-full w-full" />
              </div>

              {/* bottom label */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <div className="text-xs font-semibold text-white/85">Live feed</div>
                  <div className="text-[11px] text-white/55">Click to open console</div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                  <ArrowRightIcon />
                </span>
              </div>

              <style jsx>{`
                .sh-sweep {
                  transform: skewX(-18deg) translateX(0);
                  animation: sweep 2.6s linear infinite;
                }
                @keyframes sweep {
                  0% {
                    transform: skewX(-18deg) translateX(-40%);
                    opacity: 0.35;
                  }
                  35% {
                    opacity: 0.6;
                  }
                  100% {
                    transform: skewX(-18deg) translateX(220%);
                    opacity: 0.25;
                  }
                }
                .sh-scan {
                  background: repeating-linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.22),
                    rgba(255, 255, 255, 0.22) 1px,
                    transparent 1px,
                    transparent 6px
                  );
                  animation: scan 3.2s linear infinite;
                }
                @keyframes scan {
                  0% {
                    transform: translateY(0);
                    opacity: 0.1;
                  }
                  50% {
                    opacity: 0.16;
                  }
                  100% {
                    transform: translateY(24px);
                    opacity: 0.1;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </button>

      {/* Robot Console Modal */}
      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />

          <div
            className="absolute right-0 top-0 h-full w-full border-l border-white/10 bg-[#0B0F14] sm:w-[560px]"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div>
                <div className="text-sm font-semibold">Robot Console</div>
                <div className="text-xs text-white/60">Language + voice enabled.</div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
                aria-label="Close robot console"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60">Language</span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
                >
                  {LANGS.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-white/60">Voice</span>
                <button
                  type="button"
                  onClick={() => setVoiceOn((v) => !v)}
                  className={cx(
                    "rounded-xl px-3 py-2 text-sm ring-1 ring-white/15",
                    voiceOn ? "bg-white text-[#0B0F14]" : "bg-white/5 text-white"
                  )}
                >
                  {voiceOn ? "On" : "Off"}
                </button>
              </div>
            </div>

            <div ref={listRef} className="h-[calc(100%-210px)] overflow-auto p-4">
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
                {busy ? (
                  <div className="max-w-[92%] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                    Thinking…
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                  placeholder="Ask the robot…"
                />
                <button
                  onClick={send}
                  className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
                >
                  Send
                </button>
              </div>

              <div className="mt-2 text-[11px] text-white/50">
                Set <span className="text-white/70">NEXT_PUBLIC_ROBOT_CHAT_URL</span> to connect real long answers.
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/* Icons */
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 7 15 12 10 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}