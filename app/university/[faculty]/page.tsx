import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaculty } from "@/_lib/university/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FacultyPage({ params }: { params: { faculty: string } }) {
  const faculty = getFaculty(params.faculty);
  if (!faculty) return notFound();

  return (
    <section className="py-10 sm:py-14">
      <Link href="/university" className="text-sm text-white/70 hover:text-white">
        ← Back to University Hub
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: areas */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Faculty</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{faculty.title}</h1>
          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">{faculty.subtitle}</p>

          <div className="mt-6">
            <div className="text-sm font-semibold text-white/85">Areas</div>
            <p className="mt-1 text-sm text-white/65">
              These are the major learning areas inside this faculty.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {faculty.areas.map((a) => (
                <div key={a} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-sm font-semibold text-white/90">{a}</div>
                  <div className="text-xs text-white/60">Structured modules, drills, and guided learning</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: tracks */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white/85">Faculty fields</div>
          <p className="mt-1 text-sm text-white/65">
            Choose a field. You’ll get a dedicated Teacher, Tutor, and Assistant for that field only.
          </p>

          <div className="mt-4 space-y-3">
            {faculty.tracks.map((t) => (
              <Link
                key={t.key}
                href={`/university/${faculty.key}/${t.key}`}
                className={cx(
                  "block rounded-2xl border p-4 transition",
                  "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{t.title}</div>
                    <div className="mt-1 text-sm text-white/70">{t.subtitle}</div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M10 7 15 12 10 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
