"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";
import OSSub from "@/components/os/OSSub";
import { useOSState } from "@/components/os/useOSState";

type Line = { t: "sys" | "user" | "out" | "err"; v: string };

const STORAGE_KEY = "os.terminal.lines.v1";

const COMMANDS = [
  "help",
  "clear",
  "time",
  "echo <text>",
  "ai <prompt>",
  "status",
  "routes",
  "os",
  "planet",
  "timeline",
  "council",
  "settings",
  "assistant",
  "cognitive",
  "focus",
  "momentum",
  "trajectory",
  "whoami",
];

const BOOT: Line[] = [
  { t: "sys", v: "Shynvo OS Terminal - deck preview" },
  { t: "out", v: "Type 'help' to see commands. Try: status, routes, planet, timeline, ai <prompt>" },
];

function nowStamp() {
  // human-friendly local stamp
  const d = new Date();
  return d.toLocaleString();
}

export default function OSTerminalPage() {
  // Keep one small “operator handle” in sync with Settings if it exists
  const [handle] = useOSState<string>("os.profile.handle", "Cadet");

  // Load persisted lines from localStorage (if any) and keep them updated
  const [lines, setLines] = useState<Line[]>(() => {
    if (typeof window === "undefined") return BOOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return BOOT;
      const parsed = JSON.parse(raw) as Line[];
      return Array.isArray(parsed) && parsed.length ? parsed : BOOT;
    } catch {
      return BOOT;
    }
  });

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    // persist on change
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore storage failures
    }
  }, [lines]);

  const routesList = useMemo(
    () =>
      [
        "/os",
        "/os/planet",
        "/os/timeline",
        "/os/council",
        "/os/settings",
        "/os/terminal",
        "/assistant",
        "/os/cognitive",
        "/os/focus",
        "/os/momentum",
        "/os/trajectory",
      ].join("\n"),
    []
  );

  function push(line: Line) {
    setLines((l) => [...l, line]);
  }

  function setBoot() {
    setLines([
      ...BOOT,
      { t: "out", v: `Operator: ${String(handle || "Cadet").trim() || "Cadet"}` },
      { t: "out", v: `Boot: ${nowStamp()}` },
    ]);
  }

  function clear() {
    setBoot();
  }

  async function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    push({ t: "user", v: `> ${cmd}` });

    const { reply, nav, asyncOp } = handleCommand(cmd);

    if (reply) push({ t: "out", v: reply });
    if (nav) push({ t: "out", v: `-> open: ${nav}` });

    setInput("");

    if (asyncOp) {
      try {
        setBusy(true);
        await asyncOp();
      } finally {
        setBusy(false);
      }
    }
  }

  function handleCommand(cmd: string): {
    reply?: string;
    nav?: string;
    asyncOp?: () => Promise<void>;
  } {
    const raw = cmd;
    const c = cmd.toLowerCase();

    // clear resets immediately
    if (c === "clear") {
      clear();
      return { reply: "" };
    }

    // time
    if (c === "time") {
      return { reply: nowStamp() };
    }

    // whoami
    if (c === "whoami") {
      return { reply: `operator: ${String(handle || "Cadet").trim() || "Cadet"}` };
    }

    // echo <text>
    if (c.startsWith("echo ")) {
      const txt = raw.slice(5).trim();
      return { reply: txt || "(empty)" };
    }

    // ai <prompt>  (safe: calls Vercel route /api/public/chat)
    if (c.startsWith("ai ")) {
      const prompt = raw.slice(3).trim();
      if (!prompt) return { reply: "Usage: ai <prompt>" };

      return {
        reply: "AI: sending…",
        asyncOp: async () => {
          try {
            const res = await fetch("/api/public/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                messages: [
                  { role: "system", content: "You are Shynvo OS Terminal. Be concise, helpful, and a bit cinematic." },
                  { role: "user", content: prompt },
                ],
              }),
            });

            if (!res.ok) {
              const text = await res.text().catch(() => "");
              push({ t: "err", v: `AI error: HTTP ${res.status} ${text ? `• ${text}` : ""}`.trim() });
              return;
            }

            const data = (await res.json().catch(() => null)) as any;
            // Accept a few common shapes safely:
            const content =
              data?.reply ??
              data?.message ??
              data?.choices?.[0]?.message?.content ??
              data?.choices?.[0]?.text ??
              "";

            push({ t: "out", v: content || "(no reply)" });
          } catch (e: any) {
            push({ t: "err", v: `AI error: ${e?.message ?? "unknown"}` });
          }
        },
      };
    }

    switch (c) {
      case "help":
        return {
          reply: ["Commands:", ...COMMANDS.map((x) => `- ${x}`)].join("\n"),
        };
      case "status":
        return {
          reply: ["OS: online", "Signal: stable", "Sync: local", busy ? "AI: busy" : "AI: idle", `Operator: ${handle}`].join(
            "\n"
          ),
        };
      case "routes":
        return { reply: routesList };

      // Launchers
      case "os":
        return { reply: "Opening OS Home...", nav: "/os" };
      case "planet":
        return { reply: "Opening Orbital Nexus...", nav: "/os/planet" };
      case "timeline":
        return { reply: "Opening Chronochart...", nav: "/os/timeline" };
      case "council":
        return { reply: "Opening AI Council...", nav: "/os/council" };
      case "settings":
        return { reply: "Opening Settings...", nav: "/os/settings" };
      case "assistant":
        return { reply: "Opening SH Assistant...", nav: "/assistant" };
      case "cognitive":
        return { reply: "Opening Cognitive hub...", nav: "/os/cognitive" };
      case "focus":
        return { reply: "Opening Focus module...", nav: "/os/focus" };
      case "momentum":
        return { reply: "Opening Momentum module...", nav: "/os/momentum" };
      case "trajectory":
        return { reply: "Opening Trajectory...", nav: "/os/trajectory" };

      default:
        return { reply: `Unknown command: '${cmd}'. Type 'help'.` };
    }
  }

  const colorFor = (t: Line["t"]) => {
    if (t === "sys") return "text-white/60";
    if (t === "user") return "text-white/85";
    if (t === "err") return "text-rose-200/90";
    return "text-white/75";
  };

  return (
    <OSShell
      zone="terminal"
      title="OS Terminal"
      subtitle={
        <OSSub
          en="Diagnostics, launcher, and AI relay (frontend-only → /api/public/chat)."
          i18n={{
            es: "Diagnóstico, lanzador y relé de IA (solo frontend → /api/public/chat).",
            fr: "Diagnostics, lanceur et relais IA (frontend uniquement → /api/public/chat).",
            pt: "Diagnóstico, iniciador e relé de IA (somente frontend → /api/public/chat).",
            de: "Diagnose, Starter und KI-Relay (nur Frontend → /api/public/chat).",
            it: "Diagnostica, launcher e relay IA (solo frontend → /api/public/chat).",
            nl: "Diagnose, launcher en AI-relay (alleen frontend → /api/public/chat).",
            tr: "Teşhis, başlatıcı ve AI aktarımı (yalnızca frontend → /api/public/chat).",
            ar: "Tashkhis wa itlaq wa tarhil AI (frontend faqat → /api/public/chat).",
            hi: "Diagnostics, launcher aur AI relay (sirf frontend → /api/public/chat).",
            zh: "诊断/启动器/AI中继（仅前端 → /api/public/chat）。",
            ja: "診断・ランチャー・AIリレー（frontendのみ → /api/public/chat）。",
            ko: "진단/런처/AI 릴레이(프론트엔드만 → /api/public/chat).",
          }}
        />
      }
      chips={["online", "module: terminal", "access: local", busy ? "ai: busy" : "ai: idle", "sync: local"]}
      rightSlot={
        <button
          onClick={clear}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
          title="Clear terminal"
        >
          Clear
        </button>
      }
    >
      <BackRow href="/os" label="Back to OS Home" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-white/60">Console</div>
            <div className="text-xs text-white/50">operator: {String(handle || "Cadet").trim() || "Cadet"}</div>
          </div>

          <div
            ref={boxRef}
            className="mt-3 h-[360px] overflow-auto rounded-lg border border-white/10 bg-black/50 p-3 font-mono text-sm"
          >
            {lines.map((line, idx) => (
              <div key={idx} className={["whitespace-pre-wrap", colorFor(line.t)].join(" ")}>
                {line.v}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
            }}
            className="mt-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command (help, status, routes, ai <prompt>)…"
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
              list="terminal-commands"
              disabled={busy}
            />
            <datalist id="terminal-commands">
              {COMMANDS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>

            <button
              type="submit"
              disabled={busy}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 disabled:opacity-50"
            >
              Run
            </button>
          </form>

          <div className="mt-2 text-xs text-white/55">
            Tip: <span className="font-mono text-[11px] text-white/65">ai summarize my next task</span>
            {" · "}
            Shift to Phase C soon: terminal becomes a persistent overlay host mounted in OSShell.
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Quick links</div>
          <div className="mt-3 flex flex-col gap-2">
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/planet">
              Orbital Nexus
            </Link>
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/timeline">
              Timeline
            </Link>
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/council">
              Council
            </Link>
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/settings">
              Settings
            </Link>
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/assistant">
              Assistant
            </Link>

            <div className="mt-2 h-px bg-white/10" />

            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/cognitive">
              Cognitive
            </Link>
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/focus">
              Focus
            </Link>
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/momentum">
              Momentum
            </Link>
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/trajectory">
              Trajectory
            </Link>
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            This page is the “route alive” guarantee for /os/terminal.
            <div className="mt-1 text-[11px] text-white/45">
              Phase C: persistent overlay host so terminal never vanishes across OS pages.
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}