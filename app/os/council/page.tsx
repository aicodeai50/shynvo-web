"use client";

import { useMemo, useState, useEffect } from "react";
import OSShell from "@/components/os/OSShell";
import OSSub from "@/components/os/OSSub";
import { useOSState } from "@/components/os/useOSState";

type Core = "Strategist" | "Engineer" | "Archivist" | "Diplomat";

type Msg = { role: "sys" | "user" | "core"; text: string };

const CORES: Array<{ key: Core; desc: string; specialty: string }> = [
  { key: "Strategist", desc: "Planning and roadmaps.", specialty: "plans" },
  { key: "Engineer", desc: "Code and systems.", specialty: "build" },
  { key: "Archivist", desc: "Knowledge and retrieval.", specialty: "search" },
  { key: "Diplomat", desc: "Language and communication.", specialty: "tone" },
];

const SEED: Msg[] = [
  { role: "sys", text: "AI Council online. Pick a core and ask a question." },
  { role: "core", text: "Try: 'Give me the next action for today' or 'Help me plan missions'." },
];

function canned(core: Core, q: string): string {
  const t = q.toLowerCase();
  if (core === "Strategist") {
    if (t.includes("next") || t.includes("plan"))
      return "Plan: define outcome, pick 3 weekly missions, choose one next action, run daily 45m focus block.";
    return "Strategy: simplify scope, set measurable milestones, protect a weekly cadence. Ship small slices.";
  }
  if (core === "Engineer") {
    if (t.includes("bug") || t.includes("error"))
      return "Debug loop: reproduce, isolate, reduce, log inputs, fix smallest cause, add guard and test.";
    return "Engineering: keep components small, keep props typed, avoid non-TSX text in pages, keep files ASCII safe.";
  }
  if (core === "Archivist") {
    if (t.includes("remember") || t.includes("notes"))
      return "Archive: store the plan in logbook, tag it, and pin one summary. Reduce friction by reusing templates.";
    return "Research: list unknowns, search one source, write 3 bullet summary, then decide next step.";
  }
  // Diplomat
  if (t.includes("email") || t.includes("message"))
    return "Draft: short context, clear ask, deadline, and a polite close. Keep it human.";
  return "Communication: lead with the win, then constraints, then the request. Keep tone calm and confident.";
}

export default function CouncilPage() {
  const [active, setActive] = useOSState<Core>("os.council.active", "Strategist");
  const [history, setHistory] = useOSState<Record<string, Msg[]>>("os.council.history", {});
  const [input, setInput] = useState("");

  // Ensure each core has a persisted seed (so it doesn't "re-seed" only in-memory)
  useEffect(() => {
    if (!history[active] || history[active].length === 0) {
      setHistory({ ...history, [active]: SEED });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const msgs: Msg[] = history[active] && history[active].length > 0 ? history[active] : SEED;

  const headerChip = useMemo(() => `core: ${active.toLowerCase()}`, [active]);

  function setMsgs(nextMsgs: Msg[]) {
    setHistory({ ...history, [active]: nextMsgs });
  }

  function push(m: Msg) {
    setMsgs([...msgs, m]);
  }

  function clearActive() {
    setMsgs(SEED);
  }

  function clearAll() {
    const next: Record<string, Msg[]> = {};
    CORES.forEach((c) => {
      next[c.key] = SEED;
    });
    setHistory(next);
  }

  function send() {
    const q = input.trim();
    if (!q) return;
    push({ role: "user", text: q });
    push({ role: "core", text: canned(active, q) });
    setInput("");
  }

  return (
    <OSShell
      title="AI Council"
      subtitle={
        <OSSub
          en="Multi-agent UI mock. Each core has a chat panel. Saved locally."
          i18n={{
            es: "UI multi-agente mock. Cada core tiene chat. Guardado localmente.",
            fr: "UI multi-agent mock. Chaque core a un chat. Sauvegarde locale.",
            pt: "UI multi-agente mock. Cada core tem chat. Salvo localmente.",
            de: "Multi-Agent UI Mock. Jeder Core hat Chat. Lokal gespeichert.",
            it: "UI multi-agente mock. Ogni core ha chat. Salvato localmente.",
            nl: "Multi-agent UI mock. Elke core heeft chat. Lokaal opgeslagen.",
            tr: "Cok ajanli UI mock. Her core sohbet. Yerelde kayitli.",
            ar: "UI muta addid al-wukala. kull core lahu chat. mahfuz mahalliyan.",
            hi: "Multi-agent UI mock. Har core ka chat. Local save.",
            zh: "Duo dai li UI mock. Mei ge core you chat. Ben di bao cun.",
            ja: "Multi-agent UI mock. core chat. rokaru hozon.",
            ko: "Multi-agent UI mock. core chat. Local save.",
          }}
        />
      }
      chips={["online", "module: council", headerChip, "sync: local"]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Core cards */}
        <div className="lg:col-span-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-white/60">Cores</div>

            <div className="flex gap-2">
              <button
                onClick={clearActive}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 hover:bg-white/10"
                title="Clear this core chat"
              >
                Clear core
              </button>
              <button
                onClick={clearAll}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 hover:bg-white/10"
                title="Clear all cores"
              >
                Clear all
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {CORES.map((c) => {
              const on = c.key === active;
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={[
                    "w-full rounded-xl border p-4 text-left transition",
                    on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-base text-white/90">{c.key}</div>
                    <span className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/70">
                      {c.specialty}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-white/70">{c.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            Later: each core can call a different backend route or same route with different mode.
          </div>
        </div>

        {/* Chat panel */}
        <div className="lg:col-span-8 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-white/60">Chat panel</div>
            <div className="text-xs text-white/50">active: {active}</div>
          </div>

          <div className="mt-3 h-[360px] overflow-auto rounded-lg border border-white/10 bg-black/50 p-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={[
                  "mb-2 whitespace-pre-wrap rounded-lg border px-3 py-2 text-sm",
                  m.role === "user"
                    ? "border-white/15 bg-white/10 text-white/90"
                    : m.role === "core"
                    ? "border-white/10 bg-white/5 text-white/80"
                    : "border-white/10 bg-black/40 text-white/60",
                ].join(" ")}
              >
                <div className="mb-1 text-[10px] uppercase tracking-widest text-white/50">
                  {m.role === "sys" ? "system" : m.role}
                </div>
                {m.text}
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the active core... (Enter to send, Shift+Enter for newline)"
              className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button
              onClick={send}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Send
            </button>
          </div>

          <div className="mt-2 text-xs text-white/55">Saved locally for demo continuity.</div>
        </div>
      </div>
    </OSShell>
  );
}