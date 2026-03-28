"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PathTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    try {
      localStorage.setItem("shynvo_last_path", pathname);
    } catch {}
  }, [pathname]);

  return null;
}
