import UniverseGrid from "@/components/universe/UniverseGrid";

export default function UniverseIndexPage() {
  return (
    <div className="mx-auto w-full max-w-6xl py-10">
      <div className="mb-6">
        <div className="text-3xl font-semibold">Universe</div>
        <div className="mt-1 text-sm text-white/70">Choose a destination</div>
      </div>
      <UniverseGrid />
    </div>
  );
}
