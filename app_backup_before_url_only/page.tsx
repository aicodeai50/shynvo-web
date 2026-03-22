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
} from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ENVIRONMENTS = [
  {
    key: "university",
    title: "University Hub", icon: "U",
    subtitle: "Structured Academic Campus",
    desc: "Guided study systems, exam preparation, and faculty-based learning environments.",
    tags: ["Study", "Exams", "Career"],
    href: "/university",
    Icon: BookOpen,
  },
  {
    key: "academy",
    title: "Shynvo Academy", icon: "A",
    subtitle: "School Learning World",
    desc: "Junior and senior high school learning, subject rooms, tutors, and classroom workshops.",
    tags: ["School", "Subjects", "Badges"],
    href: "/academy",
    Icon: GraduationCap,
  },
  {
    key: "enterprise",
    title: "Shynvo Enterprise", icon: "E",
    subtitle: "Unified Operating Environment",
    desc: "Missions, teams, analytics, strategy, automation, support, and OS intelligence in one enterprise environment.",
    tags: ["Missions", "Teams", "Analytics"],
    href: "/enterprise",
    Icon: Building2,
  },
  {
    key: "experiments",
    title: "Experiments", icon: "X",
    subtitle: "AI Exploration Worlds",
    desc: "Standalone worlds for thinking, debate, simulation, and concept development.",
    tags: ["Debate", "Simulation", "Concepts"],
    href: "/experiments",
    Icon: FlaskConical,
  },
  {
    key: "frontier",
    title: "Frontier Lab", icon: "F",
    subtitle: "Engineering District",
    desc: "Code, systems, logic, and build-focused engineering practice for all levels.",
    tags: ["Code", "Build", "Puzzles"],
    href: "/frontier",
    Icon: Cpu,
  },
  {
    key: "arcade",
    title: "Arcade Sim", icon: "G",
    subtitle: "Interactive Skill Arena",
    desc: "Game-based drills, challenge rooms, reflex loops, and simulation-based practice.",
    tags: ["Games", "Challenge", "Levels"],
    href: "/arcade",
    Icon: Gamepad2,
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

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-28 lg:pt-6">
        <div className="grid items-start gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/5 bg-transparent p-4 shadow-none backdrop-blur-0 sm:p-5 lg:p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              Structured Intelligence Platform
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Shynvo
            </h1>

            <p className="mt-3 max-w-3xl text-xl font-medium leading-tight text-white/92 sm:text-2xl lg:text-[2.5rem]">
              Architecture of Applied Intelligence
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/78 sm:text-lg">
              A multi-environment intelligence platform for learning, execution,
              strategy, resilience, organizational growth, coding, and skill development.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#environments"
                className="inline-flex items-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Enter Platform
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Read Docs
              </Link>
            </div>
          </div>

          <div className="space-y-5">
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
                    <div className="mt-1 text-sm text-white/70">Open multilingual robot experience</div>
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
                  <div className="text-lg font-semibold text-white">Continue on phone</div>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                    Scan to open Shynvo on mobile and continue from anywhere.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white p-3">
                  <QRCodeSVG
                    value="https://shynvo-web.vercel.app"
                    size={112}
                    bgColor="#ffffff"
                    fgColor="#0B0F14"
                    includeMargin={true}
                  />
                </div>
              </div>

              <div className="mt-4 text-xs text-white/45">
                Opens shynvo-web.vercel.app
              </div>
            </div>
          </div>
        </div>

        <section id="environments" className="mt-10 sm:mt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
            Environments
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Explore the buildings
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
            Each building is a purpose-built system with its own departments, identity, and workflows.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ENVIRONMENTS.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cx(
                    "group rounded-[1.75rem] border border-white/5 bg-black/15 p-5 transition backdrop-blur-[2px]",
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
      </section>
    </main>
  );
}
