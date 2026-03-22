import Link from "next/link";
import { notFound } from "next/navigation";
import AcademyNav from "@/components/academy/AcademyNav";
import { getAcademyLevel } from "@/_lib/academy/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default async function AcademyLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const levelData = getAcademyLevel(level);

  if (!levelData) notFound();

  return (
    <section className="py-10 sm:py-14">
      <AcademyNav />

      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-fuchsia-100/70">
          Academy Level
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {levelData.title}
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          {levelData.subtitle}
        </p>
      </div>

      <div className="mt-5 inline-flex rounded-full border border-fuchsia-300/20 bg-fuchsia-400/5 px-3 py-1 text-xs font-semibold text-fuchsia-100/85">
        {levelData.levelBadge}
      </div>

      <div className="mt-8 rounded-3xl border border-fuchsia-300/20 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/70">
          Classroom System
        </div>

        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Group Workshops</div>
            <div className="mt-2 text-sm text-white/70">
              Students can create workshop groups for revision, reading, and solving problems together.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Subject Rooms</div>
            <div className="mt-2 text-sm text-white/70">
              Every subject has its own room with Teacher, Tutor, and Assistant support.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Patient Guidance</div>
            <div className="mt-2 text-sm text-white/70">
              Academy helpers must break things down simply and patiently for school students.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-fuchsia-100/70">
          Subjects
        </div>

        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Choose a subject
        </h2>

        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          Shynvo Academy only answers school subjects. It does not answer university-level questions
          and should redirect students back to the correct environment if needed.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levelData.subjects.map((subject) => (
          <Link
            key={subject.key}
            href={`/academy/${levelData.key}/subject/${subject.key}`}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-fuchsia-300/20 bg-white/5 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-white">{subject.title}</div>
                <div className="mt-1 text-sm text-white/70">{subject.subtitle}</div>
              </div>

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

            <div className="mt-4 flex flex-wrap gap-2">
              {subject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {subject.badges.map((badge) => (
                <span
                  key={badge.title}
                  className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/5 px-2.5 py-1 text-[11px] text-fuchsia-100/80"
                >
                  {badge.title}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
              Enter subject
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
