"use client";

export default function AboutMe() {
  return (
    <section id = "about" className="min-h-screen px-4 sm:px-6 lg:px-12 py-8 pt-32 scroll-mt-32">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 relative inline-block">
          About Me
          <span className="absolute left-0 -bottom-2 h-1 w-16 bg-purple-600 rounded-full"></span>
        </h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          {/* Personal Details */}
          <Card title="Personal Details" icon="👤">
            <InfoRow label="Name" value="Lepcha" />
            <InfoRow
              label="Studies"
              value="College of Science and Technology"
            />
            <InfoRow label="Location" value="Bhutan" />
          </Card>

          {/* Skills & Abilities */}
          <Card title="Skills & Abilities" icon="🧠">
            <div className="flex flex-wrap gap-3">
              {[
                "Coding",
                "Flutter",
                "Dart",
                "Firebase",
                "UI/UX Design",
                "Mobile Development",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full border border-purple-200 text-purple-600 text-sm font-medium bg-white hover:bg-purple-50 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          {/* Experience */}
          <Card title="Experience" icon="💼">
            <Bullet text="Developing Mobile Apps" />
            <Bullet text="UI/UX Prototyping" />
            <Bullet text="CS Student Projects" />
          </Card>

          {/* Academic Progress */}
          <Card title="Academic Progress" icon="🎓">
            <Bullet text="Core Engineering Sciences" />
            <Bullet text="Algorithm Design" />
            <Bullet text="User-Centric Applications" />
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Components ---------------- */

function Card({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-4 mb-4">
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
        📌
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );
}

function Bullet({ text }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
