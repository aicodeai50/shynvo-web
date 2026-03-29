"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChatMessage,
  loadChat,
  loadTheme,
  saveChat,
  saveTheme,
  ThemeMode,
} from "@/lib/sh-assistant/storage";
import { renderAssistantHtml } from "@/lib/sh-assistant/render";
import { useLogbook } from "@/stores/logbook/logbook.store";

const API_URL = "/api/public/chat";
const STORAGE_KEY = "sh_assistant_chat_v2";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function AssistantPanel() {
  const { addEntry } = useLogbook();

  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);

  // Load persisted state
  useEffect(() => {
    setTheme(loadTheme());
    setMessages(loadChat());
  }, []);

  // Apply theme
  useEffect(() => {
    if (theme === "light")
      document.documentElement.setAttribute("data-sh-theme", "light");
    else document.documentElement.removeAttribute("data-sh-theme");
    saveTheme(theme);
  }, [theme]);

  // Persist chat
  useEffect(() => {
    saveChat(messages);
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  }, [messages]);

  const canSend = useMemo(
    () => text.trim().length > 0 && !busy,
    [text, busy]
  );

  function log(type: "user" | "assistant", content: string) {
    addEntry({
      id: uid(),
      type,
      title: "Shynvo SH Assistant AI",
      content,
      timestamp: Date.now(),
    });
  }

  function clearChat() {
    setMessages([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  async function send() {
    const msg = text.trim();
    if (!msg || busy) return;

    setBusy(true);
    setText("");

    const userMessage: ChatMessage = {
      id: uid(),
      role: "user",
      content: msg,
      ts: Date.now(),
    };

    const thinkingMessage: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: "_Thinking…_",
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    log("user", msg);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json().catch(() => ({}));
      const reply =
        data.reply || data.message || data.error || "No response returned.";

      setMessages((prev) =>
        prev.map((m) =>
          m.content === "_Thinking…_"
            ? { ...m, content: String(reply) }
            : m
        )
      );

      log("assistant", String(reply));
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.content === "_Thinking…_"
            ? { ...m, content: "❌ Network error contacting backend." }
            : m
        )
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={cx(
        "w-full max-w-[560px] h-[min(860px,92dvh)]",
        "rounded-2xl border border-white/10 bg-white/5 shadow-2xl overflow-hidden",
        "flex flex-col"
      )}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-white/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl grid place-items-center font-black text-white bg-gradient-to-br from-violet-600 to-pink-600">
            SH
          </div>
          <div>
            <div className="font-extrabold leading-tight">
              Shynvo SH Assistant AI
            </div>
            <div className="text-xs text-white/60 -mt-0.5">
              secure • calm • clean
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-xl border border-white/10 bg-black/30 text-sm font-semibold hover:bg-white/5"
            onClick={() =>
              setTheme((t) => (t === "dark" ? "light" : "dark"))
            }
            type="button"
          >
            Theme
          </button>

          <button
            className="px-3 py-2 rounded-xl border border-white/10 bg-black/30 text-sm font-semibold hover:bg-white/5"
            onClick={clearChat}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Chat */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-4 py-4 bg-black/30"
      >
        {messages.length === 0 && (
          <div className="text-sm text-white/60">
            Say hello to{" "}
            <span className="font-semibold text-white/80">
              Shynvo SH Assistant AI
            </span>
            .
          </div>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={cx(
                  "flex gap-3",
                  isUser ? "justify-end" : "justify-start"
                )}
              >
                {!isUser && (
                  <div className="h-9 w-9 rounded-2xl grid place-items-center font-black border border-white/10 bg-white/5">
                    SH
                  </div>
                )}

                <div
                  className={cx(
                    "max-w-[92%] rounded-2xl border border-white/10 px-4 py-3 text-[0.95rem] leading-relaxed",
                    isUser ? "bg-violet-500/10" : "bg-white/5"
                  )}
                >
                  <div className="text-xs font-extrabold text-white/60 mb-1">
                    {isUser ? "You" : "Shynvo SH Assistant AI"}
                  </div>

                  {isUser ? (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  ) : (
                    <div
                      className="assistant-html"
                      dangerouslySetInnerHTML={{
                        __html: renderAssistantHtml(m.content),
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Composer */}
      <div className="flex gap-2 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          placeholder="Message Shynvo SH Assistant AI… (Enter to send • Shift+Enter new line)"
          className="flex-1 resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (canSend) send();
            }
          }}
        />
        <button
          type="button"
          onClick={send}
          disabled={!canSend}
          className={cx(
            "rounded-2xl px-4 py-3 text-sm font-extrabold",
            "bg-gradient-to-br from-violet-600 to-pink-600 text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Send
        </button>
      </div>
    </div>
  );
}