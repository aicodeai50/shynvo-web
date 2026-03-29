import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function EngineeringTeamPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise/teams" hubTitle="Teams" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Team
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Engineering
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Engineering owns system architecture, shipping velocity, reliability, and technical execution.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Core Role</div>
          <div className="mt-3 text-sm text-white/70">Build, maintain, and improve the product stack.</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Priority</div>
          <div className="mt-3 text-sm text-white/70">Reliability, speed, and release quality.</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Coordination</div>
          <div className="mt-3 text-sm text-white/70">Works closely with Product and AI Strategy.</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/enterprise/skills" className="rounded-xl border border-emerald-300/15 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10">
          Open Skill Matrix
        </Link>
      </div>
    </section>
  );
}
