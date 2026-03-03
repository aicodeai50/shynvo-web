export default function Page() {
  const fac = [
    { n: 'Computer Science', h: '/university/faculties/cs' },
    { n: 'IT', h: '/university/faculties/it' },
    { n: 'Engineering', h: '/university/faculties/engineering' },
    { n: 'Data', h: '/university/faculties/data' },
    { n: 'AI', h: '/university/faculties/ai' },
    { n: 'Cybersecurity', h: '/university/faculties/cybersecurity' },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold">Faculties</h1>
        <p className="mt-3 text-white/70">Choose your track. Each faculty has its own structured path.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fac.map((f) => (
            <a key={f.n} href={f.h} className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7">
              <div className="text-base font-semibold">{f.n}</div>
              <div className="mt-3 text-sm font-semibold text-white/85">Enter</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
