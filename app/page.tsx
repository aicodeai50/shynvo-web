"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackgroundVideo from "@/components/home/BackgroundVideo";

type Building = {
  name: string;
  label: string;
  desc: string;
  tags: string[];
  href: string;
  accent?: "neutral" | "os" | "university" | "experiments" | "enterprise" | "frontier" | "arcade";
};

type PricingPlan = {
  name: string;
  subtitle: string;
  bullets: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};

type GuideQA = {
  match: (q: string) => boolean;
  answer: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HomePage() {
  const router = useRouter();
  const [guideOpen, setGuideOpen] = useState(false);

  const buildings: Building[] = [
    {
      name: "University Hub",
      label: "Structured Academic Campus",
      desc: "Guided study systems, exam preparation, and faculty-based learning environments.",
      tags: ["Study", "Exams", "Career"],
      href: "/university",
      accent: "university",
    },
    {
      name: "Shynvo Academy",
      label: "School Learning World",
      desc: "Junior and senior high school learning, quizzes, tutor support, and badges.",
      tags: ["School", "Quizzes", "Badges"],
      href: "/academy",
      accent: "university",
    },
    {
      name: "Shynvo OS",
      label: "Dimensional Execution Cockpit",
      desc: "Missions, focus systems, AI agents, and strategic orchestration in one cockpit.",
      tags: ["Missions", "Focus", "Terminal"],
      href: "/os",
      accent: "os",
    },
    {
      name: "Experiments",
      label: "AI Exploration Worlds",
      desc: "Standalone worlds for thinking, debate, simulation, and concept development.",
      tags: ["Debate", "Simulation", "Concepts"],
      href: "/experiments",
      accent: "experiments",
    },
    {
      name: "Enterprise Suite",
      label: "Organizational Intelligence System",
      desc: "Admin tools, skill matrices, team missions, and analytics for organizations.",
      tags: ["Teams", "OKRs", "Analytics"],
      href: "/enterprise",
      accent: "enterprise",
    },
    {
      name: "Frontier Lab",
      label: "High-Reliability Decision Environment",
      desc: "Decision drills, crisis simulation, protocols, and resilience systems.",
      tags: ["Tactical", "Crisis", "Protocols"],
      href: "/frontier",
      accent: "frontier",
    },
    {
      name: "Arcade Sim",
      label: "Competitive Skill Arena",
      desc: "Gamified drills, interview simulations, and performance scoring modes.",
      tags: ["Drills", "Interviews", "Scoring"],
      href: "/arcade",
      accent: "arcade",
    },
  ];

  const plans: PricingPlan[] = [
    {
      name: "Starter — 7 Day Free Trial",
      subtitle: "Full access for 7 days. Upgrade required after trial.",
      bullets: [
        "Full access for 7 days",
        "Learn + build your workflow baseline",
        "Robot experience included during trial",
        "Support via hi@shynvo.app",
      ],
      cta: "Create account",
      href: "/signup",
    },
    {
      name: "Pro — 30 USD/month",
      subtitle: "Individual intelligence infrastructure.",
      bullets: [
        "Unlimited missions and loops",
        "Advanced orchestration + analytics",
        "Full environment access",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
      href: "mailto:hi@shynvo.app?subject=Shynvo%20Pro%20Upgrade",
      highlight: true,
    },
    {
      name: "Team — 70 USD/month",
      subtitle: "Organizational intelligence system.",
      bullets: [
        "Seats + admin controls",
        "Skill matrix + org analytics",
        "Team missions + dashboards",
        "Enterprise workflows",
      ],
      cta: "Upgrade to Team",
      href: "mailto:hi@shynvo.app?subject=Shynvo%20Team%20Upgrade",
    },
  ];

  return (
    <div className="min-h-screen">
      <BackgroundVideo />

      <section className="relative pt-10 sm:pt-14 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              Structured Intelligence Platform
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Shynvo</h1>

            <p className="mt-2 text-xl text-white/90 sm:text-2xl">Architecture of Applied Intelligence</p>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              A multi-environment intelligence platform for learning, execution, strategy, resilience, and organizational growth.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#buildings"
                className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
              >
                Enter Platform
              </a>

              <Link href="/docs" className="rounded-xl px-5 py-3 text-center text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
                Read Docs
              </Link>
            </div>

            <div className="mt-4 text-xs text-white/60">
              Trial: full access for 7 days. Robot is included during trial; upgrade required after.
            </div>
          </div>

          <div className="relative">
            <RobotChamber onActivate={() => router.push("/robot")} />
            <div className="mt-3 text-xs text-white/60">Click the chamber to open the robot trial experience.</div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10" />
      </section>

      <Section
        id="buildings"
        eyebrow="Environments"
        title="Explore the buildings"
        subtitle="Each building is a purpose-built system with its own departments, identity, and workflows."
      >
        <BuildingsGrid buildings={buildings} />
      </Section>

      <Section id="pricing" eyebrow="Plans" title="Pricing" subtitle="Start with a 7-day free trial. Upgrade is required after trial.">
        <Pricing plans={plans} />
      </Section>

      <ShynvoGuide open={guideOpen} onOpenChange={setGuideOpen} />

      <div className="h-10" />
    </div>
  );
}

function RobotChamber({ onActivate }: { onActivate: () => void }) {
  const [hot, setHot] = useState(false);

  return (
    <button
      type="button"
      onClick={onActivate}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      className={cx(
        "group relative w-full overflow-hidden rounded-3xl border text-left",
        "border-white/10 bg-white/5",
        "transition focus:outline-none focus:ring-2 focus:ring-white/20"
      )}
      aria-label="Open cinematic robot"
    >
      <div className="relative aspect-[4/3] w-full">
        <div className="absolute inset-0 bg-[radial-gradient(900px_280px_at_50%_15%,rgba(255,255,255,0.10),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(650px_220px_at_70%_60%,rgba(56,189,248,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(540px_220px_at_25%_70%,rgba(167,139,250,0.10),transparent_60%)]" />

        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="sh-sweep absolute -left-[40%] top-0 h-full w-[60%] bg-white/10 blur-2xl" />
        </div>

        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay">
          <div className="sh-scan h-full w-full" />
        </div>

        <div className="absolute inset-0">
          <Particles />
        </div>

        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="relative h-full w-full rounded-2xl border border-white/10 bg-black/20 backdrop-blur-[1px]">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(520px_200px_at_50%_35%,rgba(255,255,255,0.09),transparent_62%)]" />

            <div className="absolute left-1/2 top-[18%] h-[28%] w-[42%] -translate-x-1/2 rounded-[2rem] border border-white/12 bg-white/5">
              <div className="absolute left-1/2 top-[36%] h-10 w-10 -translate-x-1/2 rounded-full border border-white/15 bg-white/5">
                <div className={cx("absolute inset-0 rounded-full", hot ? "sh-core-hot" : "sh-core")} />
              </div>
              <div className="absolute left-1/2 top-[72%] h-[2px] w-[54%] -translate-x-1/2 bg-white/20" />
            </div>

            <div className="absolute left-1/2 top-[48%] h-[36%] w-[56%] -translate-x-1/2 rounded-[2.2rem] border border-white/12 bg-white/5">
              <div className="absolute left-1/2 top-[18%] h-14 w-14 -translate-x-1/2 rounded-2xl border border-white/15 bg-white/5">
                <div className={cx("absolute inset-0 rounded-2xl", hot ? "sh-core-hot" : "sh-core")} />
              </div>
              <div className="absolute left-1/2 top-[62%] h-[2px] w-[70%] -translate-x-1/2 bg-white/20" />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(900px_340px_at_50%_120%,rgba(0,0,0,0.65),transparent_55%)]" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-5 py-3">
          <div>
            <div className="text-xs font-semibold text-white/85">Cinematic Robot</div>
            <div className="text-[11px] text-white/55">Open trial experience</div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
            <ArrowRightIcon />
          </span>
        </div>

        <style jsx>{`
          .sh-sweep {
            transform: skewX(-18deg) translateX(0);
            animation: sweep 2.6s linear infinite;
          }
          @keyframes sweep {
            0% {
              transform: skewX(-18deg) translateX(-40%);
              opacity: 0.35;
            }
            35% {
              opacity: 0.6;
            }
            100% {
              transform: skewX(-18deg) translateX(220%);
              opacity: 0.25;
            }
          }

          .sh-scan {
            background: repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.22),
              rgba(255, 255, 255, 0.22) 1px,
              transparent 1px,
              transparent 6px
            );
            animation: scan 3.2s linear infinite;
          }
          @keyframes scan {
            0% {
              transform: translateY(0);
              opacity: 0.12;
            }
            50% {
              opacity: 0.18;
            }
            100% {
              transform: translateY(24px);
              opacity: 0.12;
            }
          }

          .sh-core {
            background: radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.22), rgba(56, 189, 248, 0.2), transparent 64%);
            animation: pulse 2.2s ease-in-out infinite;
          }
          .sh-core-hot {
            background: radial-gradient(
              circle at 50% 45%,
              rgba(255, 255, 255, 0.28),
              rgba(56, 189, 248, 0.28),
              rgba(167, 139, 250, 0.18),
              transparent 64%
            );
            animation: pulseHot 1.4s ease-in-out infinite;
          }
          @keyframes pulse {
            0%,
            100% {
              transform: scale(0.92);
              opacity: 0.72;
            }
            50% {
              transform: scale(1.02);
              opacity: 0.95;
            }
          }
          @keyframes pulseHot {
            0%,
            100% {
              transform: scale(0.9);
              opacity: 0.78;
            }
            50% {
              transform: scale(1.06);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </button>
  );
}

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const left = (i * 7 + 13) % 100;
        const top = (i * 11 + 9) % 100;
        const size = 2 + (i % 3);
        const delay = (i % 7) * 0.35;
        const dur = 3.5 + (i % 5) * 0.8;
        return { left, top, size, delay, dur };
      }),
    []
  );

  return (
    <div className="absolute inset-0">
      {dots.map((d, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-white/35"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: 0.35,
            animation: `floaty ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floaty {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.25;
          }
          50% {
            transform: translate3d(0, -16px, 0);
            opacity: 0.55;
          }
        }
      `}</style>
    </div>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-48 right-[-120px] h-[520px] w-[520px] rounded-full bg-white/4 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">{eyebrow}</div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">{subtitle}</p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function BuildingsGrid({ buildings }: { buildings: Building[] }) {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {buildings.map((b) => (
        <BuildingCard key={b.name} b={b} />
      ))}
    </div>
  );
}

function BuildingCard({ b }: { b: Building }) {
  const accent = useMemo(() => {
    switch (b.accent) {
      case "os":
        return "border-white/20 bg-white/6 ring-1 ring-white/10";
      default:
        return "border-white/10 bg-white/5";
    }
  }, [b.accent]);

  return (
    <Link
      href={b.href}
      className={cx(
        "group relative block rounded-3xl border p-5 transition",
        "hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]",
        accent
      )}
      aria-label={`Open ${b.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/8 ring-1 ring-white/10" />
          <div>
            <div className="text-base font-semibold">{b.name}</div>
            <div className="mt-0.5 text-xs text-white/60">{b.label}</div>
          </div>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/70">{b.desc}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {b.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-white/90 group-hover:text-white">Open</span>
        <span className="rounded-full border border-white/10 bg-white/5 p-2">
          <ArrowRightIcon />
        </span>
      </div>

      {b.accent === "os" ? (
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(800px_220px_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)] opacity-60" />
      ) : null}
    </Link>
  );
}

function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((p) => (
        <div key={p.name} className={cx("rounded-3xl border p-5", p.highlight ? "border-white/20 bg-white/7" : "border-white/10 bg-white/5")}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold">{p.name}</div>
              <div className="mt-1 text-sm text-white/70">{p.subtitle}</div>
            </div>
            {p.highlight ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80">Recommended</span>
            ) : null}
          </div>

          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {p.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {p.href.startsWith("/") ? (
            <Link
              href={p.href}
              className={cx(
                "mt-5 block rounded-xl px-4 py-3 text-center text-sm font-semibold",
                p.highlight ? "bg-white text-[#0B0F14] hover:bg-white/90" : "ring-1 ring-white/15 hover:bg-white/5"
              )}
            >
              {p.cta}
            </Link>
          ) : (
            <a
              href={p.href}
              className={cx(
                "mt-5 block rounded-xl px-4 py-3 text-center text-sm font-semibold",
                p.highlight ? "bg-white text-[#0B0F14] hover:bg-white/90" : "ring-1 ring-white/15 hover:bg-white/5"
              )}
            >
              {p.cta}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

type Msg = { role: "user" | "guide"; text: string };

function ShynvoGuide({ open, onOpenChange }: { open: boolean; onOpenChange: (next: boolean) => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "guide", text: "Shynvo Guide: Short answers about Shynvo (pricing, docs, contact, environments)." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  const qa: GuideQA[] = useMemo(
    () => [
      { match: (q) => /what is shynvo|shynvo\??\s*$/.test(q), answer: "Shynvo is an applied intelligence platform with multiple environments." },
      { match: (q) => /pricing|plans|cost|price/.test(q), answer: "Pricing is on this page under Plans (#pricing). Trial is 7 days." },
      { match: (q) => /trial|7 day|free/.test(q), answer: "Trial lasts 7 days. The cinematic robot is available during trial; upgrade required after." },
      { match: (q) => /contact|email|support/.test(q), answer: "Support email: hi@shynvo.app" },
      { match: (q) => /docs|documentation/.test(q), answer: "Docs are at /docs." },
      { match: (q) => /dashboard|login|signup|account/.test(q), answer: "Sign up at /signup, log in at /login, dashboard at /dashboard." },
    ],
    []
  );

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [open, msgs.length]);

  function reply(qRaw: string) {
    const q = qRaw.trim().toLowerCase();
    const found = qa.find((x) => x.match(q));
    return found?.answer || "I can answer about Shynvo: pricing, docs, contact, environments, signup/login.";
  }

  function send() {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }, { role: "guide", text: reply(text) }]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => onOpenChange(true)}
        className="fixed bottom-5 left-5 z-50 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] shadow-lg hover:bg-white/90"
        aria-label="Open Shynvo Guide"
      >
        Guide
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => onOpenChange(false)} />

          <div className={cx("absolute left-0 top-0 h-full w-full border-r border-white/10 bg-[#0B0F14]", "sm:w-[420px]")} role="dialog" aria-modal="true">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div>
                <div className="text-sm font-semibold">Shynvo Guide</div>
                <div className="text-xs text-white/60">Public • short answers</div>
              </div>
              <button onClick={() => onOpenChange(false)} className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5" aria-label="Close guide">
                <CloseIcon />
              </button>
            </div>

            <div ref={listRef} className="h-[calc(100%-140px)] overflow-auto p-4">
              <div className="space-y-3">
                {msgs.map((m, idx) => (
                  <div
                    key={idx}
                    className={cx(
                      "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-6",
                      m.role === "user" ? "ml-auto border-white/10 bg-white/10 text-white" : "border-white/10 bg-white/5 text-white/85"
                    )}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                  placeholder="Ask about Shynvo..."
                />
                <button onClick={send} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90">
                  Send
                </button>
              </div>
              <div className="mt-2 text-[11px] text-white/50">Support: hi@shynvo.app</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 7 15 12 10 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}