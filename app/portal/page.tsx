import PortalShell from "@/components/portal/PortalShell";
import UniverseGrid from "@/components/universe/UniverseGrid";

export default function PortalHomePage() {
  return (
    <PortalShell title="Portal">
      <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
        <div className="text-sm text-white/70">
          This is your portal hub. (Stub page so build + routes work.)
        </div>
      </div>

      <div className="mt-6">
        <UniverseGrid />
      </div>
    </PortalShell>
  );
}
