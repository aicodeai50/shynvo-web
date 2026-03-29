import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";
import EnterpriseAIBriefing from "@/components/enterprise/EnterpriseAIBriefing";

const settingsCards = [
  {
    title: "Workspace Profile",
    href: "/enterprise/settings/profile",
    desc: "Edit workspace name, owner, description, and operational state.",
    tags: ["Name", "Owner", "Status"],
  },
  {
    title: "Organization Identity",
    href: "/enterprise/settings/identity",
    desc: "Manage brand identity, logo direction, and workspace presentation.",
    tags: ["Brand", "Identity", "Visuals"],
  },
  {
    title: "Notification Preferences",
    href: "/enterprise/settings/notifications",
    desc: "Configure alerts, updates, reminders, and communication defaults.",
    tags: ["Alerts", "Updates", "Reminders"],
  },
  {
    title: "Module Defaults",
    href: "/enterprise/settings/modules",
    desc: "Control which enterprise modules are emphasized across the workspace.",
    tags: ["Modules", "Visibility", "Defaults"],
  },
  {
    title: "Automation Defaults",
    href: "/enterprise/settings/automation",
    desc: "Set baseline workflow behavior for routing, triggers, and actions.",
    tags: ["Triggers", "Flow", "Actions"],
  },
  {
    title: "AI Behavior Preferences",
    href: "/enterprise/settings/ai",
    desc: "Adjust assistance style, AI guidance, and enterprise reasoning preferences.",
    tags: ["AI", "Behavior", "Reasoning"],
  },
];

export default function EnterpriseSettingsPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Settings" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Workspace Settings
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Settings
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Configure workspace defaults, module behavior, AI usage preferences, and enterprise identity settings.
        </p>
      </div>

      <EnterpriseAIBriefing area="settings" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {settingsCards.map((item) => (
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
              Open settings area →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}