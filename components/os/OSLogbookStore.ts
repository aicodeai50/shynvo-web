"use client";

import { useCallback, useMemo } from "react";
import { useOSState } from "@/components/os/useOSState";

export type LogbookEntry = {
  id: string;
  ts: number;
  kind: "system" | "user" | "event";
  title: string;
  body?: string;
  tag?: string;
  href?: string;
};

type LogbookState = {
  entries: LogbookEntry[];
};

const KEY = "os.logbook.v1";

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatTs(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function seed(): LogbookState {
  const now = Date.now();
  return {
    entries: [
      {
        id: uid(),
        ts: now - 1000 * 60 * 18,
        kind: "system",
        title: "Boot sequence complete",
        body: "Cockpit modules online. Signal grid stable.",
        tag: "sys",
        href: "/os",
      },
      {
        id: uid(),
        ts: now - 1000 * 60 * 9,
        kind: "event",
        title: "Cognitive Core ping",
        body: "Energy / friction protocols ready.",
        tag: "cog",
        href: "/os/cognitive",
      },
      {
        id: uid(),
        ts: now - 1000 * 60 * 3,
        kind: "user",
        title: "Mission intent logged",
        body: "Build demo-grade OS flow. Frontend-first.",
        tag: "you",
        href: "/os/trajectory",
      },
    ],
  };
}

export function useLogbook() {
  const [state, setState] = useOSState<LogbookState>(KEY, seed());

  const entries = useMemo(() => state.entries ?? [], [state.entries]);

  const add = useCallback(
    (entry: Omit<LogbookEntry, "id" | "ts"> & { ts?: number }) => {
      const next: LogbookEntry = {
        id: uid(),
        ts: typeof entry.ts === "number" ? entry.ts : Date.now(),
        kind: entry.kind,
        title: entry.title,
        body: entry.body,
        tag: entry.tag,
        href: entry.href,
      };

      setState((prev) => ({
        entries: [next, ...(prev?.entries ?? [])].slice(0, 60),
      }));
    },
    [setState]
  );

  const clear = useCallback(() => {
    setState({ entries: [] });
  }, [setState]);

  const remove = useCallback(
    (id: string) => {
      setState((prev) => ({
        entries: (prev?.entries ?? []).filter((e) => e.id !== id),
      }));
    },
    [setState]
  );

  return {
    entries,
    add,
    remove,
    clear,
  };
}
