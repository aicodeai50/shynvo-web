"use client";

import { Component, ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTerminalStore } from "@/stores/terminal/terminal.store";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

class TerminalErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: unknown) {
    console.error("TerminalHost error:", err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-4 right-4 z-[90] w-[min(520px,calc(100vw-2rem))]">
          <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur p-4 text-white">
            <div className="text-xs uppercase tracking-widest text-red-300">Diagnostics offline</div>
            <div className="mt-2 text-sm text-white/80">
              Terminal UI crashed — fallback engaged. Refresh to restore.
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function OSTerminalHost() {
  const router = useRouter();

  // Zustand selectors (matches your store)
  const isOpen = useTerminalStore((s) => s.isOpen);
  const lines = useTerminalStore((s) => s.lines);
  const input = useTerminalStore((s) => s.input);
  const setInput = useTerminalStore((s) => s.setInput);
  const toggle = useTerminalStore((s) => s.toggle);
  const setOpen = useTerminalStore((s) => s.setOpen);
  const clear = useTerminalStore((s) => s.clear);
  const runCommand = useTerminalStore((s) => s.runCommand);
  const hydrate = useTerminalStore((s) => s.hydrate);

  const listRef = useRef<HTMLDivElement | null>(null);

  // hydrate persisted state once
  useEffect(() => {
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hotkeys: ` toggles, Esc closes (ignore typing fields)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      const typing = tag === "input" || tag === "textarea" || tag === "select";

      if (e.key === "`" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (typing) return;
        e.preventDefault();
        toggle();
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle, isOpen, setOpen]);

  // auto-scroll
  useEffect(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, [lines.length, isOpen]);

  // navigate when store prints "-> open: /path"
  useEffect(() => {
    const tail = lines.slice(-3).map((l) => l.text).join("\n");
    const match = tail.match(/-> open:\s*(\/\S+)/);
    if (match?.[1]) router.push(match[1]);
  }, [lines, router]);

  return (
    <TerminalErrorBoundary>
      {/* always-available toggle pill */}
      <button
        type="button"
        onClick={toggle}
        className={cx(
          "fixed z-[80] bottom-4 right-4",
          "rounded-full border border-white/10 bg-black/40 backdrop-blur-md",
          "px-3 py-2 text-xs text-white/75 hover:bg-white/10"
        )}
        title="Toggle Terminal (`)"
      >
        Terminal <span className="text-white/45">`</span>
      </button>

      {/* overlay */}
      <div className={cx("fixed inset-0 z-[90]", isOpen ? "pointer-events-auto" : "pointer-events-none")}>
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={cx("absolute inset-0 bg-black/40 transition-opacity", isOpen ? "opacity-100" : "opacity-0")}
        />

        {/* panel */}
        <div
          className={cx(
            "absolute bottom-4 right-4 w-[min(520px,calc(100vw-2rem))]",
            "rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl overflow-hidden",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div>
              <div className="text-sm font-extrabold text-white">Terminal</div>
              <div className="text-[11px] text-white/60">persistent • local • proxy-safe</div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={clear}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold text-white/80 hover:bg-white/10"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold text-white/80 hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>

          <div ref={listRef} className="max-h-[320px] overflow-y-auto px-4 py-3 font-mono text-xs text-white/80">
            {lines.map((l) => (
              <div
                key={l.id}
                className={cx(
                  "whitespace-pre-wrap mb-1",
                  l.type === "system" && "text-white/60",
                  l.type === "in" && "text-white/85",
                  l.type === "out" && "text-white/75",
                  l.type === "error" && "text-rose-200/90"
                )}
              >
                {l.text}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-3 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  runCommand(input);
                  setInput("");
                }
              }}
              placeholder="help • routes • open /os/timeline • ai <prompt>"
              className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none"
            />
          </div>
        </div>
      </div>
    </TerminalErrorBoundary>
  );
}