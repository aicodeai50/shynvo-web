import Link from "next/link";
import { notFound } from "next/navigation";
import UniversityNav from "@/components/university/UniversityNav";
import { getFaculty } from "@/_lib/university/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default async function FacultyPage({
  params,
}: {
  params: Promise<{ faculty: string }>;
}) {
  const { faculty } = await params;
  const facultyData = getFaculty(faculty);

  if (!facultyData) notFound();

  return (
    <section className="py-10 sm:py-14">
      <UniversityNav />

      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
          Faculty
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {facultyData.title}
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          {facultyData.subtitle}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {facultyData.areas.map((area) => (
          <span
            key={area}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
          >
            {area}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
          Courses
        </div>

        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Choose a course in this faculty
        </h2>

        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          Each course contains its own Teacher, Tutor, and Assistant. These roles
          only work for this faculty field and will not answer unrelated faculties.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facultyData.tracks.map((track) => (
          <Link
            key={track.key}
            href={`/university/${facultyData.key}/track/${track.key}`}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-cyan-300/15 bg-white/5 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
            aria-label={`Open ${track.title}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-white">
                  {track.title}
                </div>
                <div className="mt-1 text-sm text-white/70">
                  {track.subtitle}
                </div>
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
              {track.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
              Enter course
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(900px_240px_at_50%_0%,rgba(56,189,248,0.10),transparent_60%)]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
