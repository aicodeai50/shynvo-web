import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function Page() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Admin" />
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Enterprise Admin
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl capitalize">
          audit
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          This section is ready as a real route and can now be expanded with live enterprise functionality.
        </p>
      </div>
    </section>
  );
}
