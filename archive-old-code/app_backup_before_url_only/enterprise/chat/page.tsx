"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

type Msg = { role: "user" | "system"; text: string };

export default function EnterpriseChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "system", text: "Enterprise Chat online. Use this as the company communication layer." },
  ]);

  function send() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "system", text: `Message recorded: ${text}` },
    ]);
    setInput("");
  }

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" label="Company Chat" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo Enterprise
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Company Chat
      </h1>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
        Chat acts as the lightweight communication layer inside Shynvo Enterprise for updates, coordination, and fast internal messaging.
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-auto max-w-[85%] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white"
                  : "max-w-[85%] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
              }
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="Write a company message..."
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button
            type="button"
            onClick={send}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
