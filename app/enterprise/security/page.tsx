import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const securityCards = [
  "SSO and enterprise sign-in readiness",
  "Role-based access control",
  "Audit and activity visibility",
  "Compliance preparation",
  "Policy-aware AI usage",
  "Protected enterprise workflows",
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
          <div
            key={item}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5"
          >
            <h2 className="text-xl font-semibold text-white">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-white/68">
              Enterprise-grade protection and governance layer for workspace operations.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
