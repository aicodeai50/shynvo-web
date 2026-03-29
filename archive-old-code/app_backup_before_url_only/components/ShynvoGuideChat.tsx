"use client";

import { useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

type IntentReply = {
  reply: string;
  href?: string;
  label?: string;
};

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function detectReply(input: string): IntentReply {
  const q = normalize(input);

  if (!q) {
    return {
      reply: "Ask me about Shynvo, pricing, contact, accounts, or any environment.",
    };
  }

  if (
    hasAny(q, [
      "what is shynvo",
      "what does shynvo do",
      "about shynvo",
      "shynvo platform",
    ]) ||
    q === "shynvo"
  ) {
    return {
      reply: "Shynvo is a structured intelligence platform with environments for learning, execution, strategy, and exploration.",
      href: "/docs",
      label: "Learn More",
    };
  }

  if (
    hasAny(q, [
      "environment",
      "environments",
      "platform environment",
      "what environments",
      "which environments",
      "how is the environment",
      "how are the environments",
      "what is in shynvo",
      "what do you have",
      "platform sections",
    ])
  ) {
    return {
      reply: "Shynvo includes Robot, University Hub, Shynvo Academy, Enterprise Suite, Shynvo OS, Experiments, Frontier Lab, and Arcade Sim.",
      href: "/docs",
      label: "Open Docs",
    };
  }

  if (
    hasAny(q, [
      "price",
      "pricing",
      "plan",
      "plans",
      "cost",
      "subscription",
      "upgrade",
      "payment",
      "pay",
      "pro plan",
    ])
  ) {
    return {
      reply: "Shynvo has pricing plans for different levels of access. Open Pricing to compare them.",
      href: "/pricing",
      label: "Open Pricing",
    };
  }

  if (
    hasAny(q, [
      "contact",
      "support",
      "email",
      "help desk",
      "business",
      "reach you",
      "reach shynvo",
    ])
  ) {
    return {
      reply: "You can contact Shynvo through the Contact page or by email at hi@shynvo.app.",
      href: "/contact",
      label: "Open Contact",
    };
  }

  if (
    hasAny(q, [
      "docs",
      "documentation",
      "guide",
      "platform guide",
      "read docs",
    ])
  ) {
    return {
      reply: "The Docs page gives you a route map to the main Shynvo environments and sections.",
      href: "/docs",
      label: "Open Docs",
    };
  }

  if (
    hasAny(q, [
      "robot",
      "chat ai",
      "assistant",
      "main ai",
    ])
  ) {
    return {
      reply: "Shynvo Robot is the conversational environment for asking questions and getting guidance across the platform.",
      href: "/robot",
      label: "Open Robot",
    };
  }

  if (
    hasAny(q, [
      "university",
      "computer science",
      "medicine",
      "law",
      "engineering",
      "faculty",
      "higher education",
      "department",
    ])
  ) {
    return {
      reply: "University Hub is for structured higher education with departments, teacher roles, tutors, and assistants.",
      href: "/university",
      label: "Open University Hub",
    };
  }

  if (
    hasAny(q, [
      "academy",
      "school",
      "student",
      "subject",
      "classroom",
    ])
  ) {
    return {
      reply: "Shynvo Academy is the school learning environment for junior and senior students across subjects.",
      href: "/academy",
      label: "Open Academy",
    };
  }

  if (
    hasAny(q, [
      "enterprise",
      "leadership",
      "strategy",
      "operations",
      "organization",
      "business tools",
    ])
  ) {
    return {
      reply: "Enterprise Suite is for business thinking, strategy, leadership, operations, and organizational systems.",
      href: "/enterprise",
      label: "Open Enterprise Suite",
    };
  }

  if (
    hasAny(q, [
      "os",
      "productivity",
      "tasks",
      "focus",
      "mission",
      "planning",
    ])
  ) {
    return {
      reply: "Shynvo OS is the personal execution environment for planning, focus, tasks, and progress.",
      href: "/os",
      label: "Open Shynvo OS",
    };
  }

  if (
    hasAny(q, [
      "experiment",
      "experiments",
      "simulation",
      "creative",
      "concept",
    ])
  ) {
    return {
      reply: "Experiments is where users explore simulations, test ideas, and interact with experimental systems.",
      href: "/experiments",
      label: "Open Experiments",
    };
  }

  if (
    hasAny(q, [
      "arcade",
      "game",
      "games",
      "challenge",
      "drill",
    ])
  ) {
    return {
      reply: "Arcade Sim is the interactive skill arena for game-based drills, challenges, and practice.",
      href: "/arcade",
      label: "Open Arcade Sim",
    };
  }

  if (
    hasAny(q, [
      "frontier",
      "coding",
      "programming",
      "build",
      "engineer",
      "code",
    ])
  ) {
    return {
      reply: "Frontier Lab is the engineering district for code, systems, logic, and build-focused practice.",
      href: "/frontier",
      label: "Open Frontier Lab",
    };
  }

  if (
    hasAny(q, [
      "account",
      "profile",
      "login",
      "log in",
      "sign in",
      "sign up",
      "create account",
      "register",
      "logout",
      "log out",
    ])
  ) {
    return {
      reply: "You can create an account, sign in, sign out, and manage your profile from the Shynvo account pages.",
      href: "/sign-in",
      label: "Open Sign In",
    };
  }

  return {
    reply: "I help with Shynvo platform questions only. Ask about pricing, contact, docs, accounts, or any Shynvo environment.",
  };
}

export default function ShynvoGuideChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi — I’m the Shynvo guide. Ask me about pricing, environments, accounts, docs, or contact.",
    },
  ]);

  const lastReply = useMemo(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    return lastUser ? detectReply(lastUser.text) : null;
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const reply = detectReply(text);

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "bot", text: reply.reply },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      {open ? (
        <div className="w-[340px] overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F14]/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-white">Shynvo Guide</div>
              <div className="text-xs text-white/55">Short platform answers</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl px-2 py-1 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={[
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6",
                  msg.role === "user"
                    ? "ml-auto bg-white text-[#0B0F14]"
                    : "bg-white/5 text-white/85",
                ].join(" ")}
              >
                {msg.text}
              </div>
            ))}

            {lastReply?.href && messages[messages.length - 1]?.role === "bot" ? (
              <a
                href={lastReply.href}
                className="inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                {lastReply.label || "Open"}
              </a>
            ) : null}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Ask about Shynvo..."
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] shadow-xl hover:bg-white/90"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Shynvo Guide
        </button>
      )}
    </div>
  );
}
