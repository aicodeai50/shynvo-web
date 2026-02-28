import { create } from "zustand";
import type { LogbookEntry } from "./types";

type LogbookState = {
  entries: LogbookEntry[];
  addEntry: (entry: LogbookEntry) => void;
  clear: () => void;
};

export const useLogbook = create<LogbookState>((set) => ({
  entries: [],
  addEntry: (entry) => set((s) => ({ entries: [entry, ...s.entries] })),
  clear: () => set({ entries: [] }),
}));