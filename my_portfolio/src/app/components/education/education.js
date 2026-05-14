"use client";

export default function Education({ education: educationItems = [] }) {
  return (
    <section id="education" className="js-section relative min-h-screen p-4 md:p-8 scroll-mt-32">
      <div className="js-diagonal-wipe cinematic-diagonal-wipe" aria-hidden="true" />

      <div className="js-scrub mb-8 md:mb-12">
        <h1 className="js-reveal text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Education Journey
        </h1>
        <p className="js-reveal text-gray-600 text-lg md:text-xl">
          My academic path and learning experiences
        </p>
      </div>

      <div className="js-reveal border-t border-gray-300 mb-8 md:mb-10" />

      <div className="space-y-10 md:space-y-12">
        {educationItems.map((item, index) => (
          <div key={item.id || item.title} className="js-reveal js-scrub">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {item.degree || item.title}
            </h2>

            <div className="mb-4 md:mb-6">
              <ul className="list-none pl-0 space-y-2">
                <li className="flex flex-col md:flex-row md:items-baseline">
                  <span className="text-lg md:text-xl font-semibold text-gray-800 md:mr-2">
                    • {item.institution || item.organization}
                  </span>
                  <span className="text-gray-600 text-base md:text-lg mt-1 md:mt-0">
                    {item.period}
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              {item.description}
            </p>

            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center">
              <span>{item.buttonText || item.actionLabel || "View Details →"}</span>
            </button>

            {index < educationItems.length - 1 && (
              <div className="border-t border-gray-300 mt-8 md:mt-10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
