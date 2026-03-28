import Link from "next/link";
import PreviewTypingLoop from "./PreviewTypingLoop";

const items = [
  {
    title: "Shynvo Robot",
    desc: "AI guide that helps users navigate the platform and choose a direction.",
    variant: "robot" as const,
    lines: [
      "Analyzing your direction...",
      "Recommended route: Shynvo Robot",
      "Next step: choose where to begin",
    ],
    tag: "Guide",
    href: "/robot",
  },
  {
    title: "University Hub",
    desc: "Structured academic learning for guided study and higher education paths.",
    variant: "university" as const,
    lines: [
      "Loading academic pathways...",
      "Faculty ready: Computer Science",
      "Next lesson: Algorithms fundamentals",
    ],
    tag: "Learning",
    href: "/university",
  },
  {
    title: "Frontier Lab",
    desc: "Technical environment for coding, systems, and engineering workflows.",
    variant: "frontier" as const,
    lines: [
      "Booting Frontier systems...",
      "Mode active: AI Builder",
      "Preparing engineering workflow...",
    ],
    tag: "Build",
    href: "/frontier",
  },
];

export default function PreviewBox() {
  return (
    <section className="mt-10 sm:mt-12">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
        Preview
      </div>

      <div className="mt-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-[2px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              See inside Shynvo
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">
              Preview how Shynvo looks and feels before you enter. These are live-style
              mini previews of guided platform experiences.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/preview"
              className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/88 transition hover:bg-white/10 hover:text-white"
            >
              Open full preview →
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[1.4rem] border border-white/10 bg-black/20 p-4 transition hover:bg-white/[0.04] hover:border-white/20"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/60">
                  {item.tag}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-white/65">{item.desc}</p>

              <div className="mt-4">
                <PreviewTypingLoop variant={item.variant} lines={item.lines} />
              </div>

              <div className="mt-4 text-xs font-semibold text-white/75 group-hover:text-white">
                Open this preview path →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
