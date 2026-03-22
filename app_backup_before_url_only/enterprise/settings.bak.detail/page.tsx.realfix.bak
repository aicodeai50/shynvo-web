import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const settingsCards = [
  { title: "Workspace profile", href: "/enterprise/settings/profile" },
  { title: "Organization identity", href: "/enterprise/settings/identity" },
  { title: "Notification preferences", href: "/enterprise/settings/notifications" },
  { title: "Module defaults", href: "/enterprise/settings/modules" },
  { title: "Automation defaults", href: "/enterprise/settings/automation" },
  { title: "AI behavior preferences", href: "/enterprise/settings/ai" },
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {settingsCards.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
          >
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/68">
              Centralized workspace configuration for a more consistent enterprise experience.
            </p>
            <div className="mt-5 text-sm font-semibold text-emerald-100/80">
              Open
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
