// projects.js
"use client";

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'A brief description of project 1 and its key features.',
      tags: ['FLUTTER', 'DART', 'FIREBASE'],
      image: 'https://source.unsplash.com/random/400x300?tech,1'
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'An advanced analytics dashboard for business management.',
      tags: ['REACT', 'TYPESCRIPT', 'TAILWIND'],
      image: 'https://source.unsplash.com/random/400x300?tech,2'
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Real-time messaging application with end-to-end encryption.',
      tags: ['NODE.JS', 'SOCKET.IO', 'FLUTTER'],
      image: 'https://source.unsplash.com/random/400x300?tech,3'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          My Projects
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Explore my latest work and projects
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 md:mb-10">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500"
            placeholder="Q Search projects by name or tag.."
          />
        </div>
      </div>

      {/* Projects Found Label */}
      <div className="mb-6 md:mb-8">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          FOUND {projects.length} PROJECTS
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details Button */}
              <button className="w-full md:w-auto px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                <span>See Details →</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
