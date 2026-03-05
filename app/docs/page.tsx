import Link from "next/link";

export default function DocsPage() {
  const items = [
    { title: "University Hub", href: "/university" },
    { title: "Shynvo OS", href: "/os" },
    { title: "Experiments", href: "/experiments" },
    { title: "Enterprise Suite", href: "/portal" },
    { title: "Frontier Lab", href: "/portal" },
    { title: "Arcade Sim", href: "/portal" },
    { title: "Robot assistant", href: "/assistant" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl py-16">
      <div className="rounded-3xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl">
        <h1 className="text-4xl font-semibold">Docs</h1>
        <p className="mt-3 text-white/80">
          Documentation is being prepared. For now, explore these sections:
        </p>

        <ul className="mt-6 list-disc space-y-2 pl-5 text-white/85">
          {items.map((x) => (
            <li key={x.title}>
              <Link className="underline hover:opacity-80" href={x.href}>
                {x.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
