import PreviewTypingLoop from "./components/PreviewTypingLoop";
import Link from "next/link";
import RobotTypingLine from "@/components/RobotTypingLine";
import { QRCodeSVG } from "qrcode.react";
import {
  BookOpen,
  GraduationCap,
  Building2,
  FlaskConical,
  Cpu,
  Gamepad2,
  Sparkles,
  ShieldCheck,
  Workflow,
  Rocket,
  Users,
  Bot,
  Layers3,
} from "lucide-react";


function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ENVIRONMENTS = [
  {
    key: "university",
    title: "University Hub",
    subtitle: "Structured Academic Campus",
    desc: "Guided study systems, exam preparation, and faculty-based learning environments.",
    tags: ["Study", "Exams", "Career"],
    href: "/university",
    Icon: BookOpen,
  },
  {
    key: "academy",
    title: "Shynvo Academy",
    subtitle: "School Learning World",
    desc: "Junior and senior high school learning, subject rooms, tutors, and classroom workshops.",
    tags: ["School", "Subjects", "Badges"],
    href: "/academy",
    Icon: GraduationCap,
  },
  {
    key: "enterprise",
    title: "Shynvo Enterprise",
    subtitle: "Unified Operating Environment",
    desc: "Missions, teams, analytics, strategy, automation, support, and OS intelligence in one enterprise environment.",
    tags: ["Missions", "Teams", "Analytics"],
    href: "/enterprise",
    Icon: Building2,
  },
  {
    key: "experiments",
    title: "Experiments",
    subtitle: "AI Exploration Worlds",
    desc: "Standalone worlds for thinking, debate, simulation, and concept development.",
    tags: ["Debate", "Simulation", "Concepts"],
    href: "/experiments",
    Icon: FlaskConical,
  },
  {
    key: "frontier",
    title: "Frontier Lab",
    subtitle: "Engineering District",
    desc: "Code, systems, logic, and build-focused engineering practice for all levels.",
    tags: ["Code", "Build", "Puzzles"],
    href: "/frontier",
    Icon: Cpu,
  },
  {
    key: "arcade",
    title: "Arcade Sim",
    subtitle: "Interactive Skill Arena",
    desc: "Game-based drills, challenge rooms, reflex loops, and simulation-based practice.",
    tags: ["Games", "Challenge", "Levels"],
    href: "/arcade",
    Icon: Gamepad2,
  },
];

const VALUE_POINTS = [
  {
    title: "For learners",
    desc: "Study with structure instead of scattered AI chats and random resources.",
    Icon: GraduationCap,
  },
  {
    title: "For builders",
    desc: "Use guided environments for coding, workflows, experiments, and execution.",
    Icon: Layers3,
  },
  {
    title: "For teams",
    desc: "Coordinate missions, analytics, and organized work inside focused systems.",
    Icon: Users,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create your account",
    desc: "Start with secure platform access across Shynvo.",
  },
  {
    step: "02",
    title: "Begin your 7-day trial",
    desc: "Every new user gets full access during the trial period.",
  },
  {
    step: "03",
    title: "Choose your environment",
    desc: "Learn, build, train, or explore inside the area that fits your goal.",
  },
  {
    step: "04",
    title: "Use AI and structured tools",
    desc: "Get guidance from Shynvo Robot and work inside focused systems.",
  },
];

const INSIDE_SHYNVO = [
  {
    title: "Guided AI support",
    desc: "Use Shynvo Robot to understand where to start, what to do next, and how to move through the platform.",
    Icon: Bot,
  },
  {
    title: "Focused environments",
    desc: "Each environment is built around a real purpose: learning, building, simulation, strategy, or training.",
    Icon: Workflow,
  },
  {
    title: "Structured progression",
    desc: "Move through clear paths instead of trying to build everything from scratch with no direction.",
    Icon: Sparkles,
  },
];

const PRICING_PREVIEW = [
  {
    title: "7-day trial",
    subtitle: "Start free",
    points: [
      "Create your account",
      "Get full platform access",
      "Explore all core environments",
    ],
  },
  {
    title: "Upgrade after trial",
    subtitle: "Continue with access",
    points: [
      "Keep using Shynvo tools",
      "Continue AI-assisted workflows",
      "Best for active users and teams",
    ],
  },
];

const PLATFORM_PREVIEWS = [
  {
    title: "Shynvo Robot",
    desc: "AI guide that helps users navigate the platform, choose a direction, and get started faster.",
    href: "/robot",
    previewType: "robot" as const,
  },
  {
    title: "University Hub",
    desc: "Structured academic learning space for guided study, faculties, and higher education paths.",
    href: "/university",
    previewType: "university" as const,
  },
  {
    title: "Frontier Lab",
    desc: "Technical environment for coding, systems, engineering workflows, and build-focused practice.",
    href: "/frontier",
    previewType: "frontier" as const,
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-[#070B11]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/shynvo-wallpaper.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_10%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_420px_at_85%_20%,rgba(16,185,129,0.08),transparent_58%)]" />
        <div className="absolute inset-0 bg-black/22" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-6">
        <div className="grid items-start gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2rem] border border-white/5 bg-transparent p-4 sm:p-5 lg:p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              Structured AI Platform
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Shynvo
            </h1>

            <p className="mt-3 max-w-4xl text-xl font-medium leading-tight text-white/92 sm:text-2xl lg:text-[2.5rem]">
              Learn, build, train, and explore inside guided AI environments
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/78 sm:text-lg">
              Shynvo is a structured AI platform for learners, builders, and teams who want guided environments instead of scattered tools, random prompts, and unclear workflows.
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-white/85">
              <div className="text-sm font-semibold text-white">Start clearly</div>
              <ul className="mt-2 space-y-1 text-white/78">
                <li>Create an account to use Shynvo.</li>
                <li>Every new user starts with a 7-day free trial.</li>
                <li>You get full access during the trial.</li>
                <li>Upgrade after the trial to continue using the platform.</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Start for free
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                How it works
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Read Docs
              </Link>
            </div>

            <p className="mt-4 text-sm text-white/58">
              Account required for AI tools, guided environments, and platform access.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <Link
              href="/robot"
              className="group block overflow-hidden rounded-[2rem] border border-white/5 bg-black/15 shadow-none backdrop-blur-[2px]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <video
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src="/robot.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="border-t border-white/10 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-2xl font-semibold text-white">Shynvo Robot</div>
                    <div className="mt-1 text-sm text-white/70">
                      Your multilingual guide across the Shynvo platform
                    </div>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white/80 transition group-hover:bg-white group-hover:text-[#0B0F14]">
                    →
                  </div>
                </div>

                <div className="mt-4">
                  <RobotTypingLine />
                </div>
              </div>
            </Link>

            <div className="rounded-[2rem] border border-white/5 bg-black/12 p-5 shadow-none backdrop-blur-[2px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">Continue on mobile</div>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                    Scan to open Shynvo securely on your phone and continue from anywhere.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white p-3">
                  <QRCodeSVG
                    value="https://www.shynvo.app"
                    size={112}
                    bgColor="#ffffff"
                    fgColor="#0B0F14"
                    includeMargin={true}
                  />
                </div>
              </div>

              <div className="mt-4 text-xs text-white/45">Secure link: www.shynvo.app</div>
            </div>
          </div>
        </div>

        <section className="mt-10 sm:mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">

          What Shynvo is
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            One platform for learning, building, and AI-guided work
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
            Shynvo helps people move from confusion to structured progress by giving them clear environments, guided AI help, and focused digital workflows.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {VALUE_POINTS.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              What you can do
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white">
              Start with real use cases
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/72">
              <li>Learn through guided academic and school environments.</li>
              <li>Practice skills with structured drills, challenges, and simulations.</li>
              <li>Explore focused AI environments for coding, strategy, and digital work.</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Product status
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white">
              Available now and still evolving
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/72">
              <li>Available now: Shynvo Robot, University Hub, Academy, Frontier Lab, and core platform navigation.</li>
              <li>In development: deeper simulations, expanded environment tools, and more advanced training flows.</li>
              <li>Shynvo is actively improving as new sections, workflows, and features are added.</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Trust
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white">
              Built and actively maintained
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/72">
              <li>Secure access on the official Shynvo domain.</li>
              <li>
                Direct support through{" "}
                <a href="mailto:hi@shynvo.app" className="underline hover:opacity-80">
                  hi@shynvo.app
                </a>{" "}
                and{" "}
                <a href="mailto:support@shynvo.app" className="underline hover:opacity-80">
                  support@shynvo.app
                </a>.
              </li>
              <li>Terms, Privacy, Refund, and Contact pages are available in the footer for transparency.</li>
            </ul>
          </div>
        </section>

        <section id="how-it-works" className="mt-10 sm:mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
            How it works
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A simple path from signup to progress
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
            Shynvo is designed so new users can start clearly instead of trying to figure out everything alone.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                  {item.step}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 sm:mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
            Inside Shynvo
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What users actually get inside the platform
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
            Shynvo is more than a homepage. It is a system of guided environments, AI support, and structured progress tools.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {INSIDE_SHYNVO.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 sm:mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
            See inside Shynvo
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What the platform looks like
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
            Explore how Shynvo looks and feels before you enter. These previews show real directions inside the platform and where each experience begins.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PLATFORM_PREVIEWS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.07]"
              >
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-white/70">{item.desc}</p>

                <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 p-3">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.16),transparent_38%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_42%)]" />
                  <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:20px_20px]" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.95)]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                          Live preview
                        </span>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/55">
                        {item.title === "Shynvo Robot" ? "Guide" : item.title === "University Hub" ? "Learning" : "Build"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur-sm">
                      {item.title === "Shynvo Robot" && (
                        <PreviewTypingLoop
                          variant="robot"
                          lines={[
                            "Analyzing your direction...",
                            "Recommended route: Shynvo Robot",
                            "Next step: choose where to begin",
                          ]}
                        />
                      )}
                      {item.title === "University Hub" && (
                        <PreviewTypingLoop
                          variant="university"
                          lines={[
                            "Loading academic pathways...",
                            "Faculty ready: Computer Science",
                            "Next lesson: Algorithms fundamentals",
                          ]}
                        />
                      )}
                      {item.title === "Frontier Lab" && (
                        <PreviewTypingLoop
                          variant="frontier"
                          lines={[
                            "Booting Frontier systems...",
                            "Mode active: AI Builder",
                            "Preparing engineering workflow...",
                          ]}
                        />
                      )}
                    </div>

                    <div className="flex gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                        AI active
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                        Cinematic
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white">
                    Open preview path
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    Live
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="environments" className="mt-10 sm:mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
            Environments
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Explore Shynvo environments
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
            Each environment is built for a specific kind of work, learning, practice, or exploration.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-emerald-300/90">
            All environments are available during your 7-day full-access trial.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ENVIRONMENTS.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cx(
                    "group rounded-[1.75rem] border border-white/5 bg-black/15 p-4 sm:p-5 transition backdrop-blur-[2px]",
                    "hover:border-white/8 hover:bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/62">{item.subtitle}</p>
                  </div>

                  <p className="mt-4 text-base leading-7 text-white/74">{item.desc}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">Open</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white/80 transition group-hover:bg-white group-hover:text-[#0B0F14]">
                      ›
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10 sm:mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
            Pricing
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Start free, upgrade when ready
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
            Start with a 7-day free trial and use the platform before deciding to continue.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {PRICING_PREVIEW.map((plan) => (
              <div
                key={plan.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]"
              >
                <div className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                  <div>
                    <div className="text-xl font-semibold text-white">{plan.title}</div>
                    <div className="text-sm text-white/65">{plan.subtitle}</div>
                  </div>
                </div>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-white/72">
                  {plan.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </section>

        <section className="mt-10 sm:mt-12">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <ShieldCheck className="h-5 w-5 text-white/80" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Security and trust</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Terms, Privacy, Refund, and Contact links are visible for transparency and support.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Users className="h-5 w-5 text-white/80" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Built for real users</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Shynvo is designed for students, independent learners, builders, and organized teams.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <BookOpen className="h-5 w-5 text-white/80" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Documentation and support</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Use docs for platform understanding and contact support when you need help.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 sm:mt-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-[2px] sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Start now
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Enter Shynvo with a clear starting path
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
              Create your account, begin your 7-day free trial, and explore all core environments with full access before upgrading.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Create account
              </Link>
              <Link
                href="/robot"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Meet Shynvo Robot
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
