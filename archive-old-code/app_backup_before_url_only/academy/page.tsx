import Link from "next/link";
import AcademyNav from "@/components/academy/AcademyNav";
import { ACADEMY_LEVELS } from "@/_lib/academy/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AcademyPage() {
  return (
    <section className="py-10 sm:py-14">
      <AcademyNav />

      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-fuchsia-100/70">
          Shynvo Academy
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Secondary School Learning World
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          Shynvo Academy is for junior and senior secondary school students. It provides
          subject-focused teaching, patient tutoring, study assistance, and classroom workshop
          spaces built only for school-level learning.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ACADEMY_LEVELS.map((level) => (
          <Link
            key={level.key}
            href={`/academy/${level.key}`}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-6 transition",
              "border-fuchsia-300/20 bg-white/5 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-white">{level.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{level.subtitle}</div>
              </div>

              <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/5 px-3 py-1 text-[11px] font-semibold text-fuchsia-100/85">
                {level.levelBadge}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {level.subjects.slice(0, 5).map((subject) => (
                <span
                  key={subject.key}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {subject.title}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
              Open level
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-fuchsia-300/20 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/70">
          Academy Rewards
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Lesson Badge</div>
            <div className="mt-2 text-sm text-white/70">
              Earned when students complete guided lessons and follow explanations carefully.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Revision Badge</div>
            <div className="mt-2 text-sm text-white/70">
              Earned when students revise topics consistently and use summaries well.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Workshop Badge</div>
            <div className="mt-2 text-sm text-white/70">
              Earned for participation in classroom groups and workshop study sessions.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
