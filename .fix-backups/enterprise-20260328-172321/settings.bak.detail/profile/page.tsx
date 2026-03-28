import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function ProfileSettings() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Settings" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">

        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Workspace Settings
        </div>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Profile
        </h1>

        <p className="mt-4 max-w-3xl text-sm text-white/70">
          Manage the main identity of your enterprise workspace.
        </p>

      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">

        <div className="rounded-xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-xl font-semibold text-white">Workspace Name</h2>
          <input
            className="mt-3 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white"
            placeholder="Shynvo Enterprise"
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-xl font-semibold text-white">Workspace Description</h2>
          <textarea
            className="mt-3 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white"
            placeholder="Describe this enterprise workspace..."
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-xl font-semibold text-white">Primary Admin</h2>
          <input
            className="mt-3 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white"
            placeholder="admin@email.com"
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-xl font-semibold text-white">Workspace Status</h2>

          <select className="mt-3 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white">
            <option>Active</option>
            <option>Private</option>
            <option>Maintenance</option>
          </select>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <button className="rounded-lg bg-emerald-500 px-6 py-2 text-black font-semibold">
          Save Changes
        </button>
      </div>

    </section>
  );
}
