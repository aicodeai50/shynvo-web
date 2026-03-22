import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const securityCards = [
  {
    title: "SSO and Enterprise Sign-In",
    href: "/enterprise/security/sso",
    desc: "Prepare secure workspace access and centralized identity readiness.",
    tags: ["SSO", "Identity", "Access"],
  },
  {
    title: "Role-Based Access Control",
    href: "/enterprise/security/access",
    desc: "Define permissions across teams, modules, and workspace actions.",
    tags: ["Roles", "Permissions", "Control"],
  },
  {
    title: "Audit and Activity Visibility",
    href: "/enterprise/security/audit",
    desc: "Review important actions, changes, and operational traceability.",
    tags: ["Audit", "History", "Visibility"],
  },
  {
    title: "Compliance Preparation",
    href: "/enterprise/security/compliance",
    desc: "Prepare workspace controls for enterprise governance and readiness.",
    tags: ["Compliance", "Governance", "Readiness"],
  },
  {
    title: "Policy-Aware AI Usage",
    href: "/enterprise/security/ai-policy",
    desc: "Shape how AI behavior aligns with enterprise rules and safe usage.",
    tags: ["AI", "Policy", "Safety"],
  },
  {
    title: "Protected Enterprise Workflows",
    href: "/enterprise/security/workflows",
    desc: "Strengthen workflow handling for controlled enterprise execution.",
    tags: ["Workflows", "Protection", "Execution"],
  },
];

export default function EnterpriseSecurityPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Security" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Security & Governance
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Security Center
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Establish enterprise trust through access control, governance, compliance preparation, and secure AI operations.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {securityCards.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
          >
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/68">{item.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-emerald-100/80">
              Open security area →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
