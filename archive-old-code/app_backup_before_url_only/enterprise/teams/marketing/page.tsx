import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function MarketingTeamPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise/teams" hubTitle="Teams" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Team
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Marketing
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Marketing owns visibility, campaigns, audience growth, messaging, and launch communication.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Core Role</div>
          <div className="mt-3 text-sm text-white/70">Connect product value to the right audience.</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Priority</div>
          <div className="mt-3 text-sm text-white/70">Clear messaging, demand generation, and launches.</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Coordination</div>
          <div className="mt-3 text-sm text-white/70">Works closely with Product and Analytics.</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/enterprise/analytics" className="rounded-xl border border-emerald-300/15 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10">
          Open Analytics
        </Link>
      </div>
    </section>
  );
}
