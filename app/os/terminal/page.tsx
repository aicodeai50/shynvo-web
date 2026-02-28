"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";
import OSSub from "@/components/os/OSSub";

type Line = { t: "sys" | "user" | "out"; v: string };

const COMMANDS = ["help", "os", "planet", "cognitive", "focus", "momentum", "trajectory", "status", "routes", "clear"];

export default function OSTerminalPage() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { t: "sys", v: "Shynvo OS Terminal - deck preview" },
    { t: "out", v: "Type 'help' to see commands. Try: status, routes, planet" },
  ]);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  function push(line: Line) {
    setLines((l) => [...l, line]);
  }

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    push({ t: "user", v: `> ${cmd}` });

    const { reply, nav } = handle(cmd);
    if (reply) push({ t: "out", v: reply });
    if (nav) push({ t: "out", v: `-> open: ${nav}` });

    setInput("");
  }

  function handle(cmd: string): { reply: string; nav?: string } {
    const c = cmd.toLowerCase();

    if (c === "clear") {
      setLines([
        { t: "sys", v: "Shynvo OS Terminal - deck preview" },
        { t: "out", v: "Cleared. Type 'help' to see commands." },
      ]);
      return { reply: "" };
    }

    switch (c) {
      case "help":
        return { reply: ["Commands:", "- status", "- routes", "- planet", "- os", "- cognitive", "- focus", "- momentum", "- trajectory", "- clear"].join("\n") };
      case "status":
        return { reply: ["OS: online", "Signal: stable", "Sync: idle", "Mode: demo"].join("\n") };
      case "routes":
        return { reply: ["/os", "/os/planet", "/os/cognitive", "/os/focus", "/os/momentum", "/os/trajectory"].join("\n") };
      case "os":
        return { reply: "Opening OS Home...", nav: "/os" };
      case "planet":
        return { reply: "Opening Orbital Nexus...", nav: "/os/planet" };
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
    return "text-white/75";
  };

  return (
    <OSShell
      zone="terminal"
  title="OS Terminal"
      subtitle={
        <OSSub
          en="Diagnostics and route launcher (frontend-only)."
          i18n={{
            es: "Diagnostico y lanzador de rutas (solo frontend).",
            fr: "Diagnostics et lanceur de routes (frontend uniquement).",
            pt: "Diagnostico e iniciador de rotas (somente frontend).",
            de: "Diagnose und Routenstarter (nur Frontend).",
            it: "Diagnostica e avvio route (solo frontend).",
            nl: "Diagnose en route-launcher (alleen frontend).",
            tr: "Teshis ve rota baslatici (yalnizca frontend).",
            ar: "Tashkhis wa itlaq al-masar (frontend faqat).",
            hi: "Diagnostics aur route launcher (sirf frontend).",
            zh: "Zhen duan yu lu jing qi dong (jin xian frontend).",
            ja: "Shindan to rooto raanchaa (frontend nomi).",
            ko: "Jindan gwa route launcher (frontend man).",
          }}
        />
      }
      chips={["online", "module: terminal", "access: local", "sync: idle"]}
    >
      <BackRow href="/os" label="Back to OS Home" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Console</div>

          <div ref={boxRef} className="mt-3 h-[360px] overflow-auto rounded-lg border border-white/10 bg-black/50 p-3 font-mono text-sm">
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
              placeholder="Type a command (help, status, routes, planet)..."
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
              list="terminal-commands"
            />
            <datalist id="terminal-commands">
              {COMMANDS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>

            <button type="submit" className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
              Run
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Quick links</div>
          <div className="mt-3 flex flex-col gap-2">
            <Link className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10" href="/os/planet">
              Orbital Nexus
            </Link>
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
        </div>
      </div>
    </OSShell>
  );
}
