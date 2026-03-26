"use client";

import { useEffect, useState } from "react";

export default function PreviewTypingLoop({ lines }: { lines: string[] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!lines.length) return;

    const current = lines[lineIndex];

    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplay(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDisplay("");
      setCharIndex(0);
      setLineIndex((i) => (i + 1) % lines.length);
    }, 1400);

    return () => clearTimeout(t);
  }, [charIndex, lineIndex, lines]);

  return (
    <div className="font-mono text-xs leading-6 text-lime-300/90 whitespace-pre-wrap">
      {display}
      <span className="animate-pulse text-lime-200">▌</span>
    </div>
  );
}
