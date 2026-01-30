"use client";

export default function Services() {
  return (
    <section id="services" className="w-full min-h-screen px-6 md:px-12 lg:px-24 py-20 pt-32 scroll-mt-32">
      
      {/* Heading */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          My Services
        </h1>

        <p className="text-gray-500 text-lg font-medium">
          What I Do
        </p>
      </div>

      {/* Services Cards */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        
        {/* Card 1 */}
        <ServiceCard
          icon="📱"
          title="Mobile Development"
          desc="Building cross-platform mobile applications using Flutter and Dart."
        />

        {/* Card 2 */}
        <ServiceCard
          icon="🎨"
          title="UI/UX Design"
          desc="Creating beautiful and intuitive user interfaces for mobile applications."
        />

        {/* Card 3 */}
        <ServiceCard
          icon="💻"
          title="Clean Code"
          desc="Ensuring high performance, scalability, and maintainability of the codebase."
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Service Card Component (Reusable + Clean) */
/* ------------------------------------------------------------------ */

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="w-full max-w-[340px] bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition duration-300 p-10 text-center space-y-6">
      
      {/* Icon Box */}
      <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed text-base">
        {desc}
      </p>
    </div>
  );
}
