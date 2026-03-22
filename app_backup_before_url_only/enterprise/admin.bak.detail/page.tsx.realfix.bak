import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const adminCards = [
  { title: "User Management", desc: "Manage members, access status, and workspace participation.", href: "/enterprise/admin/users" },
  { title: "Team Management", desc: "Create teams, assign leads, and structure the organization.", href: "/enterprise/admin/teams" },
  { title: "Permissions", desc: "Set workspace roles and control access across modules.", href: "/enterprise/admin/permissions" },
  { title: "Audit Visibility", desc: "Review key operational actions and administrative events.", href: "/enterprise/admin/audit" },
  { title: "Billing", desc: "Track subscription state, usage, and enterprise plan readiness.", href: "/enterprise/admin/billing" },
  { title: "Compliance Controls", desc: "Prepare policy and governance controls for enterprise customers.", href: "/enterprise/admin/compliance" },
];

export default function EnterpriseAdminPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Admin" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Administration
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Enterprise Admin Suite
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Control workspace structure, permissions, governance, and operational access from one administrative layer.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminCards.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
          >
            <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/68">{item.desc}</p>
            <div className="mt-5 text-sm font-semibold text-emerald-100/80">
              Open
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
