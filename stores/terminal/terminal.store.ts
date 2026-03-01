"use client";

import { create } from "zustand";

export type TerminalLineType = "in" | "out" | "system" | "error";

export type TerminalLine = {
  id: string;
  type: TerminalLineType;
  text: string;
  ts: number;
};

type TerminalState = {
  // UI
  isOpen: boolean;
  input: string;

  // Data
  lines: TerminalLine[];

  // Actions
  setOpen: (open: boolean) => void;
  toggle: () => void;

  setInput: (value: string) => void;

  push: (type: TerminalLineType, text: string) => void;
  clear: () => void;

  runCommand: (cmd: string) => Promise<void>;

  // Internal helpers
  hydrate: () => void;
};

const STORAGE_KEY = "os.terminal.zustand.v1";
const MAX_LINES = 400;

function uid() {
  return typeof crypto !== "undefined" && (crypto as any).randomUUID
    ? (crypto as any).randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowStamp() {
  return new Date().toLocaleString();
}

function bootLines(): TerminalLine[] {
  const ts = Date.now();
  return [
    { id: uid(), type: "system", text: "Shynvo OS Terminal (persistent overlay).", ts },
    { id: uid(), type: "out", text: "Type 'help' for commands. Try: routes, time, open /os/timeline, ai <prompt>", ts },
    { id: uid(), type: "out", text: `Boot: ${nowStamp()}`, ts },
  ];
}

function safeParse(raw: string | null): Partial<TerminalState> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as Partial<TerminalState>;
  } catch {
    return null;
  }
}

function persist(state: Pick<TerminalState, "isOpen" | "lines">) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isOpen: state.isOpen,
        lines: state.lines,
      })
    );
  } catch {
    // ignore storage errors
  }
}

const ROUTES = [
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
];

export const useTerminalStore = create<TerminalState>((set, get) => ({
  isOpen: true,
  lines: bootLines(),
  input: "",

  hydrate: () => {
    if (typeof window === "undefined") return;

    const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY));
    if (!parsed) return;

    const nextOpen = typeof parsed.isOpen === "boolean" ? parsed.isOpen : get().isOpen;
    const nextLines = Array.isArray(parsed.lines) && parsed.lines.length ? (parsed.lines as TerminalLine[]) : get().lines;

    set({
      isOpen: nextOpen,
      lines: nextLines.slice(-MAX_LINES),
    });
  },

  setOpen: (open) =>
    set((s) => {
      const next = { ...s, isOpen: open };
      if (typeof window !== "undefined") persist({ isOpen: next.isOpen, lines: next.lines });
      return next;
    }),

  toggle: () =>
    set((s) => {
      const next = { ...s, isOpen: !s.isOpen };
      if (typeof window !== "undefined") persist({ isOpen: next.isOpen, lines: next.lines });
      return next;
    }),

  setInput: (value) => set({ input: value }),

  push: (type, text) =>
    set((s) => {
      const nextLines = [
        ...s.lines,
        { id: uid(), type, text: String(text ?? ""), ts: Date.now() },
      ].slice(-MAX_LINES);

      const next = { ...s, lines: nextLines };
      if (typeof window !== "undefined") persist({ isOpen: next.isOpen, lines: next.lines });
      return next;
    }),

  clear: () =>
    set((s) => {
      const next = { ...s, lines: bootLines() };
      if (typeof window !== "undefined") persist({ isOpen: next.isOpen, lines: next.lines });
      return next;
    }),

  runCommand: async (cmd) => {
    const clean = (cmd || "").trim();
    if (!clean) return;

    const { push, clear } = get();
    push("in", `> ${clean}`);

    const lower = clean.toLowerCase();

    // help
    if (lower === "help") {
      push(
        "out",
        [
          "Commands:",
          "- help",
          "- status",
          "- routes",
          "- open /path",
          "- clear",
          "- echo <text>",
          "- time",
          "- ai <prompt>",
          "",
          "Hotkeys:",
          "- ` (backtick) toggles terminal (host)",
          "- Esc closes terminal (host)",
        ].join("\n")
      );
      return;
    }

    // status
    if (lower === "status") {
      push("out", ["OS: online", "Sync: local", "Proxy: /api/public/chat", `Time: ${nowStamp()}`].join("\n"));
      return;
    }

    // routes
    if (lower === "routes") {
      push("out", ROUTES.join("\n"));
      return;
    }

    // clear
    if (lower === "clear") {
      clear();
      return;
    }

    // echo
    if (lower.startsWith("echo ")) {
      push("out", clean.slice(5));
      return;
    }

    // time
    if (lower === "time") {
      push("out", nowStamp());
      return;
    }

    // open /path
    if (lower.startsWith("open ")) {
      const path = clean.slice(5).trim();
      if (!path.startsWith("/")) {
        push("error", "Usage: open /path");
        return;
      }
      // Host listens for this string and navigates
      push("out", `-> open: ${path}`);
      return;
    }

    // ai <prompt>
    if (lower.startsWith("ai ")) {
      const prompt = clean.slice(3).trim();
      if (!prompt) {
        push("error", "Usage: ai <prompt>");
        return;
      }

      push("out", "AI: sending…");

      try {
        const res = await fetch("/api/public/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "system", content: "You are Shynvo OS Terminal. Be concise, helpful, and slightly cinematic." },
              { role: "user", content: prompt },
            ],
          }),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          push("error", `AI error: HTTP ${res.status}${text ? ` • ${text}` : ""}`);
          return;
        }

        const data = (await res.json().catch(() => null)) as any;
        const content =
          data?.reply ??
          data?.message ??
          data?.choices?.[0]?.message?.content ??
          data?.choices?.[0]?.text ??
          "";

        push("out", content || "(no reply)");
        return;
      } catch (e: any) {
        push("error", `AI error: ${e?.message ?? "unknown"}`);
        return;
      }
    }

    push("error", `Unknown command: ${clean} (type 'help')`);
  },
}));