import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const cards = [
  {
    title: "Progress",
    desc: "Track operational progress, mission flow, and execution status.",
    href: "/enterprise/analytics/progress",
  },
  {
    title: "Workload",
    desc: "Review team capacity, balance, and workload distribution.",
    href: "/enterprise/analytics/workload",
  },
  {
    title: "Output",
    desc: "Measure delivery output, activity, and execution results.",
    href: "/enterprise/analytics/output",
  },
];

export default function EnterpriseAnalyticsPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Analytics" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Analytics
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Analytics
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Open a focused analytics area below.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
          >
            <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/68">{card.desc}</p>
            <div className="mt-5 text-sm font-semibold text-white/90">Open detail →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
