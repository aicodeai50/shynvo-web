"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Line = { who: "ai" | "you"; text: string };

function cleanReply(raw: string) {
  try {
    const j = JSON.parse(raw);
    if (j?.reply) return j.reply;
    if (j?.content) return j.content;
    delete j.build;
    return JSON.stringify(j, null, 2);
  } catch {
    return raw;
  }
}

export default function AssistantPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLines([
      {
        who: "ai",
        text:
          "Welcome to Shynvo OS. I’m your SH Assistant. Tell me your goal (study, planning, strategy), and I’ll guide you.",
      },
    ]);
  }, []);

  async function send() {
    const q = input.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    setLines((p) => [...p, { who: "you", text: q }]);

    try {
      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are SH Assistant inside Shynvo OS. Be professional. No build metadata." },
            { role: "user", content: q },
          ],
        }),
      });

      const text = await res.text();
      setLines((p) => [...p, { who: "ai", text: cleanReply(text) }]);
    } catch (e: any) {
      setLines((p) => [...p, { who: "ai", text: "Network error." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">SH Assistant</h1>
          <Link href="/os" className="text-sm underline">Back to OS</Link>
        </div>

        <div className="mt-6 rounded-3xl border border-white/15 bg-black/60 p-5">
          <div className="max-h-[55vh] overflow-auto space-y-4">
            {lines.map((l, i) => (
              <div key={i}>
                <div className="text-xs text-white/50">{l.who === "ai" ? "SH Assistant" : "You"}</div>
                <div className="text-sm text-white/85 whitespace-pre-wrap">{l.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask anything…"
              className="flex-1 rounded-2xl bg-black/50 border border-white/15 px-4 py-3 text-white"
            />
            <button
              onClick={send}
              disabled={busy}
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3"
            >
              {busy ? "…" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
