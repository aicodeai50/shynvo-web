export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl py-16">
      <div className="rounded-3xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-4 text-white/80">For support or business inquiries:</p>
        <p className="mt-2 text-lg">
          Email:{" "}
          <a className="underline hover:opacity-80" href="mailto:hi@shynvo.app">
            hi@shynvo.app
          </a>
        </p>
      </div>
    </div>
  );
}
