import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const helpCards = [
  { title: "Getting Started", desc: "Learn how to set up your workspace, teams, and enterprise modules.", href: "/enterprise/help/getting-started" },
  { title: "Workspace Support", desc: "Get help with navigation, structure, and platform usage.", href: "/enterprise/help/workspace-support" },
  { title: "AI Guidance", desc: "Understand how Enterprise AI and OS Core are used inside the workspace.", href: "/enterprise/help/ai-guidance" },
  { title: "Documentation", desc: "Open product documentation and support material.", href: "/docs" },
];

export default function EnterpriseHelpPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Help" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Help & Support
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Support Center
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Help users onboard, navigate, understand the product, and get support inside Shynvo Enterprise.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        {helpCards.map((item) => (
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
