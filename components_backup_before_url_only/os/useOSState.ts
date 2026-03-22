"use client";

import { useMemo, useState } from "react";

export function useOSState() {
  const [log, setLog] = useState<string[]>([]);
  const addLog = (x: string) => setLog((v) => [...v, x]);

  return useMemo(() => ({ log, addLog }), [log]);
}
