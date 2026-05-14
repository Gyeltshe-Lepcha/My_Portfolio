"use client";

export default function Services({ services = [] }) {
  return (
    <section id="services" className="js-section relative w-full min-h-screen px-6 md:px-12 lg:px-24 py-20 pt-32 scroll-mt-32">
      <div className="js-diagonal-wipe cinematic-diagonal-wipe" aria-hidden="true" />

      <div className="js-scrub text-center space-y-3">
        <h1 className="js-reveal text-4xl md:text-5xl font-extrabold text-gray-900">
          My Services
        </h1>

        <p className="js-reveal text-gray-500 text-lg font-medium">
          What I Do
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {services.map((service) => (
          <ServiceCard
            key={service.id || service.title}
            icon={service.icon || "✨"}
            title={service.title}
            desc={service.description}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="js-reveal js-scrub w-full max-w-[340px] bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition duration-300 p-10 text-center space-y-6">
      <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600" data-speed="0.12">
        {icon}
      </div>

      <h2 className="text-xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="text-gray-500 leading-relaxed text-base">
        {desc}
      </p>
    </div>
  );
}
