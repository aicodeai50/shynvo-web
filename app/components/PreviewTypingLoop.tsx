"use client";

import { useEffect, useMemo, useState } from "react";

export default function PreviewTypingLoop({ lines }: { lines: string[] }) {
  const safeLines = useMemo(() => (lines && lines.length ? lines : ["System ready..."]), [lines]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const current = safeLines[lineIndex % safeLines.length];

    if (charIndex < current.length) {
      const speed = 18 + Math.floor(Math.random() * 22);
      const t = setTimeout(() => {
        setDisplay(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDisplay("");
      setCharIndex(0);
      setLineIndex((i) => (i + 1) % safeLines.length);
    }, 1500);

    return () => clearTimeout(t);
  }, [charIndex, lineIndex, safeLines]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 px-3 py-2">
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.18),transparent)] animate-[pulse_2.4s_ease-in-out_infinite]" />
      <div className="relative font-mono text-xs leading-6 text-lime-300/90 whitespace-pre-wrap tracking-[0.03em] min-h-[72px]">
        {display}
        <span className="animate-pulse text-lime-200">▌</span>
      </div>
    </div>
  );
}
