import HomeExactStructure from "../components/HomeExactStructure";

export default function HomeStructureExactPage() {
  return (
    <main className="min-h-screen bg-[#050b18]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_50%_0%,rgba(37,99,235,0.18),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.2),rgba(2,6,23,0.85))]" />
      <HomeExactStructure />
    </main>
  );
}
