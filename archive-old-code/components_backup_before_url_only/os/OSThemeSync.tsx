"use client";

import { useEffect } from "react";
import { useOSState } from "@/components/os/useOSState";

export type OSTheme = "nebula" | "tokyo" | "onyx";

export default function OSThemeSync() {
  const [theme] = useOSState<OSTheme>("os.theme", "nebula");

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-os-theme", theme);
  }, [theme]);

  return null;
}
