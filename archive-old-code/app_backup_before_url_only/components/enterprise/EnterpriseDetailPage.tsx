import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

type DetailCard = {
  title: string;
  desc: string;
  href?: string;
};

type QuickLink = {
  label: string;
  href: string;
};

function CardBody({ item }: { item: DetailCard }) {
  return (
    <>
      <h2 className="text-lg font-semibold text-white">{item.title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/65">{item.desc}</p>
      {item.href ? (
        <div className="mt-4 text-sm font-semibold text-emerald-100/80">
          Open →
        </div>
      ) : null}
    </>
  );
}

export default function EnterpriseDetailPage({
  label,
  eyebrow,
  title,
  intro,
  focusTitle,
  focusItems,
  actionTitle,
  actionItems,
  relatedTitle,
  relatedLinks,
}: {
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  focusTitle: string;
  focusItems: DetailCard[];
  actionTitle: string;
  actionItems: DetailCard[];
  relatedTitle: string;
  relatedLinks: QuickLink[];
}) {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label={label} />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          {eyebrow}
        </div>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {title}
        </h1>

        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          {intro}
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            {focusTitle}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {focusItems.map((item) =>
              item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
                >
                  <CardBody item={item} />
                </Link>
              ) : (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <CardBody item={item} />
                </div>
              )
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {actionTitle}
            </div>

            <div className="mt-4 space-y-3">
              {actionItems.map((item) =>
                item.href ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-white/60">{item.desc}</div>
                    <div className="mt-3 text-sm font-semibold text-emerald-100/80">
                      Open →
                    </div>
                  </Link>
                ) : (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-white/60">{item.desc}</div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {relatedTitle}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
