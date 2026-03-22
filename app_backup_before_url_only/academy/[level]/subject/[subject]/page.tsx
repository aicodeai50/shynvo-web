import Link from "next/link";
import { notFound } from "next/navigation";
import AcademyNav from "@/components/academy/AcademyNav";
import { getAcademyLevel } from "@/_lib/academy/data";
import AcademyRoomClient from "./room-client";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const REDIRECT_MAP: Record<string, string> = {
  junior: "Senior Secondary",
  senior: "University Hub",
};

export default async function AcademySubjectPage({
  params,
}: {
  params: Promise<{ level: string; subject: string }>;
}) {
  const { level, subject } = await params;

  const levelData = getAcademyLevel(level);
  if (!levelData) notFound();

  const subjectData = levelData.subjects.find((item) => item.key === subject);
  if (!subjectData) notFound();

  const redirectLabel = REDIRECT_MAP[level] ?? "Shynvo Academy";

  const roleCards = [
    {
      title: "Teacher",
      subtitle: "Patient step-by-step teaching",
      body: "Simple explanations for school students with careful breakdowns.",
      href: `/academy/${level}/subject/${subject}?role=teacher`,
    },
    {
      title: "Tutor",
      subtitle: "Homework, tests, and exam support",
      body: "Guided help for classwork, homework, revision, and practice.",
      href: `/academy/${level}/subject/${subject}?role=tutor`,
    },
    {
      title: "Assistant",
      subtitle: "Quick support and study help",
      body: "Fast summaries, revision plans, and easy clarifications.",
      href: `/academy/${level}/subject/${subject}?role=assistant`,
    },
  ];

  const utilities = [
    {
      title: "Classroom workshop",
      text: "Students can create workshop groups for this subject and revise together.",
      href: `/academy/${level}/subject/${subject}?role=tutor`,
    },
    {
      title: "Revision route",
      text: "Use Tutor and Assistant together for revision and exam preparation.",
      href: `/academy/${level}/subject/${subject}?role=assistant`,
    },
    {
      title: "Quick lesson entry",
      text: "Jump directly into patient teaching support for this subject.",
      href: `/academy/${level}/subject/${subject}?role=teacher`,
    },
  ];

  return (
    <section className="py-10 sm:py-14">
      <AcademyNav />

      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/70">
        Subject Room
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        {subjectData.title}
      </h1>

      <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Level: {levelData.title}. {subjectData.subtitle}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {subjectData.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {subjectData.badges.map((badge) => (
          <span
            key={badge.title}
            className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/5 px-2.5 py-1 text-[11px] text-fuchsia-100/85"
            title={badge.desc}
          >
            {badge.title}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-fuchsia-300/20 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/70">
            Role Access
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Enter the support role you need
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            Academy roles are patient and school-focused. They should only answer this subject at
            school level and redirect students if they ask for unrelated university-level topics.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {roleCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:bg-white/7"
              >
                <div className="text-lg font-semibold text-white">{card.title}</div>
                <div className="mt-1 text-sm text-white/60">{card.subtitle}</div>
                <div className="mt-4 text-sm leading-6 text-white/75">{card.body}</div>
                <div className="mt-5 text-sm font-semibold text-white/90">Open {card.title} →</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-fuchsia-300/20 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/70">
            Subject Status
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Level Lock</div>
              <div className="mt-1 text-sm text-white/60">{levelData.title}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Subject Access</div>
              <div className="mt-1 text-sm text-white/60">{subjectData.title}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Workshop Type</div>
              <div className="mt-1 text-sm text-white/60">Teacher • Tutor • Assistant • Classroom</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/70">
          Navigation
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Subject utilities
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
          Students can use these utilities for lessons, workshops, and revision support.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {utilities.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-fuchsia-300/20 bg-white/5 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="text-base font-semibold text-white">{item.title}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">{item.text}</div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/90 group-hover:text-white">
                Open
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10 7 15 12 10 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <AcademyRoomClient
        levelTitle={levelData.title}
        subjectTitle={subjectData.title}
        redirectLabel={redirectLabel}
      />
    </section>
  );
}
