"use client";

import { useEffect, useRef } from "react";

type Line = {
  type: "system" | "user" | "output";
  text: string;
};

export default function OSTerminal({ initialLines = [] }: { initialLines?: Line[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialLines]);

  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-black p-5 font-mono text-sm text-white/80">
      {initialLines.map((l, i) => (
        <div key={i} className="mb-2">
          {l.type === "system" && <span className="text-emerald-400">[system]</span>}
          {l.type === "user" && <span className="text-sky-400">[you]</span>}
          {l.type === "output" && <span className="text-white/60">[output]</span>}
          <span className="ml-2">{l.text}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}