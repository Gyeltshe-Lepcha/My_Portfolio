import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <main className="cinematic-shell min-h-screen flex items-center justify-center px-6 text-center">
      <div className="cinematic-ambient" aria-hidden="true">
        <div className="cinematic-ambient__color cinematic-ambient__color--night" />
        <div className="cinematic-ambient__glow cinematic-ambient__glow--one" />
        <div className="cinematic-ambient__fog cinematic-ambient__fog--one" />
        <div className="cinematic-ambient__grain" />
      </div>
      <section className="relative z-10 max-w-xl rounded-2xl border border-white/50 bg-white/55 p-8 shadow-[0_24px_90px_rgba(91,33,182,0.16)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-purple-600">Access denied</p>
        <h1 className="mt-3 text-4xl font-extrabold text-gray-950">This cinematic link is unavailable.</h1>
        <p className="mt-4 text-gray-600">The portfolio link may be inactive, expired, or no longer owned by an active profile.</p>
        <Link href="/" className="mt-6 inline-flex rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white">
          Return home
        </Link>
      </section>
    </main>
  );
}
