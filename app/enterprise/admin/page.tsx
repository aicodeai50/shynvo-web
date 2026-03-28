"use client";

import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";
import EnterpriseAIBriefing from "@/components/enterprise/EnterpriseAIBriefing";

const adminCards = [
  {
    title: "User Management",
    desc: "Manage members, workspace access, and participation status.",
    href: "/enterprise/admin/users",
    actions: ["Invite members", "Suspend access", "Review member status"],
  },
  {
    title: "Team Management",
    desc: "Create teams, assign leads, and structure the organization.",
    href: "/enterprise/admin/teams",
    actions: ["Create team", "Assign lead", "Review structure"],
  },
  {
    title: "Permissions",
    desc: "Set workspace roles and control access across modules.",
    href: "/enterprise/admin/permissions",
    actions: ["Role rules", "Access scope", "Module permissions"],
  },
  {
    title: "Audit Visibility",
    desc: "Review key operational actions and administrative events.",
    href: "/enterprise/admin/audit",
    actions: ["Activity logs", "Recent changes", "Governance review"],
  },
  {
    title: "Billing",
    desc: "Track subscription state, usage, and enterprise plan readiness.",
    href: "/enterprise/admin/billing",
    actions: ["Usage", "Plan", "Workspace billing"],
  },
  {
    title: "Compliance Controls",
    desc: "Prepare policy and governance controls for enterprise customers.",
    href: "/enterprise/admin/compliance",
    actions: ["Policy controls", "Governance", "Readiness"],
  },
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

      <EnterpriseAIBriefing area="admin" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminCards.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
          >
            <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/68">{item.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.actions.map((action) => (
                <span
                  key={action}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {action}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-emerald-100/80">
              Open control panel →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}