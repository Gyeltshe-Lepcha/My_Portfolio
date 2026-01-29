"use client";
// gallery.js

import { useState } from 'react';

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);

  // Initial 8 images + additional 4 images for "See More"
  const allImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/400/300?random=${i + 1}`,
    alt: `Gallery image ${i + 1}`
  }));

  const displayedImages = showAll ? allImages : allImages.slice(0, 8);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          My Gallery
        </h1>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-8 md:mb-10"></div>

      {/* Main Content */}
      <div className="mt-8 md:mt-12 mb-8 md:mb-12">
        <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 md:mb-14">
          LEPCHA
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {displayedImages.map((image) => (
            <div 
              key={image.id} 
              className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* See More Button - Only show if not showing all */}
        {!showAll && allImages.length > 8 && (
          <div className="flex justify-center mt-10 md:mt-14">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}