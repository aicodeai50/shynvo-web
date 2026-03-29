import Link from "next/link";
import { notFound } from "next/navigation";
import UniversityNav from "@/components/university/UniversityNav";
import { getFaculty } from "@/_lib/university/data";
import TrackPageClient from "./track-client";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const REDIRECT_MAP: Record<string, string> = {
  it: "Health Sciences",
  business: "IT & Computer Science",
  law: "Business & Management",
  health: "IT & Computer Science",
  engineering: "IT & Computer Science",
  education: "Health Sciences",
  arts: "Business & Management",
  interdisciplinary: "University Hub",
};

export default async function UniversityCourseRoomPage({
  params,
}: {
  params: Promise<{ faculty: string; track: string }>;
}) {
  const { faculty, track } = await params;

  const facultyData = getFaculty(faculty);
  if (!facultyData) notFound();

  const trackData = facultyData.tracks.find((item) => item.key === track);
  if (!trackData) notFound();

  const redirectLabel = REDIRECT_MAP[faculty] ?? "University Hub";

  const quickCards = [
    {
      title: "Teacher",
      subtitle: "Full academic teaching flow",
      body: "Structured explanations from foundation to advanced level.",
      href: `/university/${faculty}/track/${track}?role=teacher`,
    },
    {
      title: "Tutor",
      subtitle: "Assignments + exam practice",
      body: "Guided help for exercises, quizzes, and course problem-solving.",
      href: `/university/${faculty}/track/${track}?role=tutor`,
    },
    {
      title: "Assistant",
      subtitle: "Fast study support",
      body: "Summaries, checklists, revision structure, and quick clarifications.",
      href: `/university/${faculty}/track/${track}?role=assistant`,
    },
  ];

  const utilities = [
    {
      title: "Course overview",
      text: "See the role structure of this room and how each academic role works.",
      href: `/university/${faculty}/track/${track}?role=teacher`,
    },
    {
      title: "Revision route",
      text: "Use Tutor and Assistant together for exam and weekly study planning.",
      href: `/university/${faculty}/track/${track}?role=tutor`,
    },
    {
      title: "Quick entry",
      text: "Jump directly into the live course room for this subject.",
      href: `/university/${faculty}/track/${track}?role=assistant`,
    },
  ];

  return (
    <section className="py-10 sm:py-14">
      <UniversityNav />

      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
        Course Room
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        {trackData.title}
      </h1>

      <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Faculty: {facultyData.title}. {trackData.subtitle}
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
            Role Access
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Enter the academic role you need
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            This course is not a general AI chat. It is a structured academic room.
            Each role has a different purpose and should take the user into the same course
            from a different working mode.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {quickCards.map((card) => (
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

        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
            Course Status
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Faculty Lock</div>
              <div className="mt-1 text-sm text-white/60">{facultyData.title}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Course Access</div>
              <div className="mt-1 text-sm text-white/60">{trackData.title}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Room Type</div>
              <div className="mt-1 text-sm text-white/60">Teacher • Tutor • Assistant</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
          Navigation
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Course utilities
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
          These cards give users a clean way to move around the course room instead of getting stuck.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {utilities.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-cyan-300/15 bg-white/5 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
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

      <TrackPageClient
        facultyTitle={facultyData.title}
        redirectLabel={redirectLabel}
        trackTitle={trackData.title}
      />
    </section>
  );
}
