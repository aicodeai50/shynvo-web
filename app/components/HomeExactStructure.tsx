import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

const topCards = [
  {
    title: "Start Journey",
    subtitle: "SCANNING INTENT",
    line: "Recommended tool: Shynvo Robot",
    tags: ["AI Route", "Optional", "Favorites"],
    glow: "from-emerald-400/25 via-emerald-300/10 to-transparent",
  },
  {
    title: "Multilingual",
    subtitle: "PLATFORM GUIDANCE",
    line: "Guidance across learning and build paths",
    tags: ["AI Bots", "Outreach", "Tools"],
    glow: "from-cyan-400/20 via-sky-300/10 to-transparent",
  },
  {
    title: "University Hub",
    subtitle: "ACADEMIC SPACE",
    line: "Courses, faculties, and guided study",
    tags: ["AI Centers", "Session", "Study"],
    glow: "from-violet-400/20 via-indigo-300/10 to-transparent",
  },
];

export default function HomeExactStructure() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-sky-400/15 bg-[#070b14]/90 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_120px_rgba(0,0,0,0.45)] sm:p-5">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#050811]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(90,140,255,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(90,140,255,0.11) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(34,197,94,0.10),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,26,0.10),rgba(3,6,14,0.72))]" />

          <div className="relative z-10 border-b border-white/8 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
                  S
                </div>
                <div className="text-base font-semibold text-white">Shynvo</div>
              </div>

              <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
                <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
                <Link href="/docs" className="transition hover:text-white">Docs</Link>
                <Link href="/contact" className="transition hover:text-white">Contact</Link>
              </div>

              <Link
                href="/sign-up"
                className="inline-flex items-center rounded-xl border border-sky-300/20 bg-sky-400/90 px-4 py-2 text-sm font-semibold text-[#06111d] transition hover:bg-sky-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10 lg:px-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.8rem] lg:leading-[1.02]">
                  One platform
                  <br />
                  for learning, building,
                  <br />
                  and AI-guided work
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                  Move from confusion to structured progress with environments built to learn, build,
                  explore, or experiment. All guided by AI.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-400 to-lime-300 px-6 py-3 text-sm font-semibold text-[#07110f] transition hover:opacity-95"
                  >
                    Start Your Journey
                  </Link>
                  <Link
                    href="/worlds"
                    className="inline-flex items-center rounded-2xl border border-violet-300/20 bg-violet-500/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500/30"
                  >
                    Explore Shynvo Worlds
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
                  <div className="absolute inset-0 rounded-[2rem] border border-emerald-300/15 bg-emerald-400/5 blur-3xl" />
                  <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2rem] border border-cyan-300/12 bg-cyan-400/5" />
                  <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1.5rem] border border-emerald-300/14 bg-emerald-300/5" />

                  <div className="absolute left-[17%] top-[44%] h-12 w-12 rounded-md border border-emerald-200/15 bg-gradient-to-br from-emerald-300 to-lime-300 shadow-[0_0_40px_rgba(110,231,183,0.18)] sm:h-14 sm:w-14" />
                  <div className="absolute left-[31%] top-[34%] h-16 w-16 rounded-md border border-emerald-200/15 bg-gradient-to-br from-lime-300 to-emerald-400 shadow-[0_0_40px_rgba(163,230,53,0.18)] sm:h-20 sm:w-20" />
                  <div className="absolute left-[47%] top-[26%] h-14 w-14 rounded-md border border-emerald-200/15 bg-gradient-to-br from-emerald-300 to-green-400 shadow-[0_0_40px_rgba(74,222,128,0.18)] sm:h-16 sm:w-16" />
                  <div className="absolute left-[57%] top-[40%] h-16 w-16 rounded-md border border-emerald-200/15 bg-gradient-to-br from-green-300 to-emerald-400 shadow-[0_0_40px_rgba(74,222,128,0.18)] sm:h-20 sm:w-20" />
                  <div className="absolute left-[38%] top-[48%] h-14 w-14 rounded-md border border-emerald-200/15 bg-gradient-to-br from-lime-200 to-emerald-400 shadow-[0_0_40px_rgba(134,239,172,0.18)] sm:h-16 sm:w-16" />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="text-2xl font-semibold text-white">What Shynvo Is</div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {topCards.map((card) => (
                  <div
                    key={card.title}
                    className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.glow}`} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-lg font-semibold text-white">{card.title}</div>
                        <div className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/45">
                          P9
                        </div>
                      </div>

                      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                        {card.subtitle}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-white/74">{card.line}</div>

                      <div className="mt-5 h-px w-full bg-white/10" />

                      <div className="mt-4 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid items-end gap-8 border-t border-white/8 pt-10 lg:grid-cols-[1fr_230px]">
              <div>
                <div className="text-3xl font-semibold tracking-tight text-white">See inside Shynvo</div>
                <p className="mt-3 max-w-2xl text-base leading-7 text-white/72">
                  Clear structures for learners, builders, and teams.
                </p>

                <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/52">
                  <Link href="/terms" className="transition hover:text-white">Terms</Link>
                  <Link href="/refund" className="transition hover:text-white">Refund</Link>
                  <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
                  <Link href="/contact" className="transition hover:text-white">Contact</Link>
                  <Link href="/docs" className="transition hover:text-white">Docs</Link>
                </div>
              </div>

              <div className="justify-self-start lg:justify-self-end">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_8px_50px_rgba(0,0,0,0.3)]">
                  <div className="rounded-[1rem] bg-white p-3">
                    <QRCodeSVG
                      value="https://shynvo.app"
                      size={148}
                      bgColor="#ffffff"
                      fgColor="#050811"
                      includeMargin={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-5 text-sm text-white/45">
              <div>© Shynvo</div>
              <div className="flex items-center gap-4">
                <Link href="/docs" className="transition hover:text-white">Docs</Link>
                <Link href="/worlds" className="transition hover:text-white">Worlds</Link>
                <Link href="/robot" className="transition hover:text-white">Robot</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
