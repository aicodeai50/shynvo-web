export default function BackgroundVideo() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/robot.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#0B0F14]/72" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(56,189,248,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_20%,rgba(167,139,250,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_20%_80%,rgba(255,255,255,0.05),transparent_55%)]" />
    </div>
  );
}
