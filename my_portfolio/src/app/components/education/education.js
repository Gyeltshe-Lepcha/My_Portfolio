"user client";
// education.js

export default function Education() {
  const educationItems = [
    {
      id: 1,
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'University Name',
      period: '2020 - 2024',
      description: 'Specialized in Mobile Application Development and Web Technologies.',
      buttonText: 'View Details →'
    },
    {
      id: 2,
      degree: 'Higher Secondary Education',
      institution: 'College Name',
      period: '2018 - 2020',
      description: 'Major in Computer Science with Mathematics and Physics.',
      buttonText: 'View Details →'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Education Journey
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          My academic path and learning experiences
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-8 md:mb-10"></div>

      {/* Education Items */}
      <div className="space-y-10 md:space-y-12">
        {educationItems.map((item, index) => (
          <div key={item.id}>
            {/* Education Header */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {item.degree}
            </h2>

            {/* Education Details */}
            <div className="mb-4 md:mb-6">
              <ul className="list-none pl-0 space-y-2">
                <li className="flex flex-col md:flex-row md:items-baseline">
                  <span className="text-lg md:text-xl font-semibold text-gray-800 md:mr-2">
                    • {item.institution}
                  </span>
                  <span className="text-gray-600 text-base md:text-lg mt-1 md:mt-0">
                    {item.period}
                  </span>
                </li>
              </ul>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              {item.description}
            </p>

            {/* View Details Button */}
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center">
              <span>{item.buttonText}</span>
            </button>

            {/* Divider (except after last item) */}
            {index < educationItems.length - 1 && (
              <div className="border-t border-gray-300 mt-8 md:mt-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}