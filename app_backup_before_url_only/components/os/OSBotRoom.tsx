"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

type UiMessage = {
  role: "user" | "ai";
  text: string;
};

type ChatApiResponse = {
  answer?: string;
  reply?: string;
  message?: string;
  error?: string;
  details?: string;
};

type OSBotRoomProps = {
  name: string;
  badge: string;
  description: string;
  placeholder: string;
  backHref?: string;
  systemPrompt: string;
  starters: string[];
  capabilities: string[];
  accentClassName?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

async function fetchBotReply(
  input: string,
  history: UiMessage[],
  systemPrompt: string
): Promise<string> {
  const payload = {
    message: input,
    systemPrompt,
    messages: history.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    })),
  };

  const supabase = getSupabaseClient();

  let token = "";
  if (supabase) {
    const sessionResult = await supabase.auth.getSession();
    token = sessionResult.data.session?.access_token || "";

    if (!token) {
      const refreshed = await supabase.auth.refreshSession();
      token = refreshed.data.session?.access_token || "";
    }
  }

  let res = await fetch("/api/public/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401 && supabase) {
    const refreshed = await supabase.auth.refreshSession();
    const retryToken = refreshed.data.session?.access_token || "";

    res = await fetch("/api/public/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(retryToken ? { authorization: `Bearer ${retryToken}` } : {}),
      },
      body: JSON.stringify(payload),
    });
  }

  const raw = await res.text();

  let data: ChatApiResponse | null = null;
  try {
    data = JSON.parse(raw) as ChatApiResponse;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      data?.error ||
      data?.details ||
      raw ||
      "The AI could not answer right now.";
    throw new Error(message);
  }

  return (
    data?.answer ||
    data?.reply ||
    data?.message ||
    raw ||
    "The AI could not answer right now."
  );
}

export default function OSBotRoom({
  name,
  badge,
  description,
  placeholder,
  backHref = "/os/robots",
  systemPrompt,
  starters,
  capabilities,
  accentClassName = "text-cyan-100 border-cyan-300/20 bg-cyan-400/10",
}: OSBotRoomProps) {
  const initialMessage = useMemo<UiMessage>(
    () => ({
      role: "ai",
      text: `${name} online. ${description}`,
    }),
    [name, description]
  );

  const [messages, setMessages] = useState<UiMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    const nextMessages: UiMessage[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const answer = await fetchBotReply(text, nextMessages, systemPrompt);
      setMessages((prev) => [...prev, { role: "ai", text: answer }]);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : `${name} could not respond right now. Please try again.`;

      setMessages((prev) => [...prev, { role: "ai", text: message }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_10%,rgba(59,130,246,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(168,85,247,0.08),transparent_58%)]" />
      </div>

      <Link
        href={backHref}
        className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
      >
        ← Back to Robots
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
            Shynvo OS
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {name}
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            {description}
          </p>
        </div>

        <div
          className={cx(
            "rounded-full border px-4 py-2 text-sm",
            accentClassName
          )}
        >
          {badge}
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">
            What {name} helps with
          </div>

          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {capabilities.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>

          <div className="mt-6">
            <div className="text-sm font-semibold text-white">Try a starter</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {starters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => sendMessage(item)}
                  disabled={loading}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/10 disabled:opacity-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Live Chat
          </div>

          <div
            ref={listRef}
            className="mt-4 h-[460px] overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[88%] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white"
                      : "max-w-[88%] rounded-2xl border border-cyan-300/10 bg-cyan-400/10 px-4 py-3 text-sm text-white/90"
                  }
                >
                  <div className="whitespace-pre-wrap leading-6">{m.text}</div>
                </div>
              ))}

              {loading ? (
                <div className="max-w-[88%] rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70">
                  {name} is thinking...
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={placeholder}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
