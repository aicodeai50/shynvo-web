import Link from "next/link";
import { FACULTIES } from "@/_lib/university/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function UniversityHubPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">University Hub</div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Select a faculty</h1>
        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          A professional education environment. Choose a faculty to access its fields and dedicated Teacher, Tutor, and Assistant.
          Each faculty is strict: it only answers its own domain.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FACULTIES.map((f) => (
          <Link
            key={f.key}
            href={`/university/${f.key}`}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
            aria-label={`Open ${f.title}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-white">{f.title}</div>
                <div className="mt-1 text-sm text-white/70">{f.subtitle}</div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M10 7 15 12 10 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {f.areas.slice(0, 5).map((a) => (
                <span key={a} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                  {a}
                </span>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(900px_240px_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
