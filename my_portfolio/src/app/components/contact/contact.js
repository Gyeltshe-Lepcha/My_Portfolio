"user client";

// contact.js

export default function Contact() {
  return (
    <div className="">
      {/* Contact Section */}
      <div className="p-4 md:p-8">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ready to start a project?
          </h1>
          
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl">
            I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-16 md:mb-20">
          <button className="px-8 py-4 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition-colors duration-300 flex-1 sm:flex-none">
            Send an Email
          </button>
          
          <button className="px-8 py-4 border-2 border-gray-300 text-gray-800 font-medium text-lg rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-300 flex-1 sm:flex-none">
            View Profile
          </button>
        </div>
      </div>

      {/* Footer Section - Direct continuation */}
      <div className="border-t border-gray-200 p-4 md:p-8 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Portfolio Name */}
            <div className="text-xl md:text-2xl font-bold text-gray-900">
            LEPCHA PORTFOLIO
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition"
                aria-label="GitHub"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.55-3.88-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.21-1.5 3.18-1.19 3.18-1.19.63 1.57.23 2.73.11 3.02.74.81 1.19 1.85 1.19 3.11 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56 4.56-1.53 7.85-5.86 7.85-10.96C23.5 5.74 18.27.5 12 .5z" />
                </svg>
            </a>

            {/* LinkedIn */}
            <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition"
                aria-label="LinkedIn"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
                </svg>
            </a>

            {/* WhatsApp */}
            <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition"
                aria-label="WhatsApp"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.82 11.82 0 0 0 12.04 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.19 1.6 6.02L0 24l6.18-1.6A11.93 11.93 0 0 0 12.04 24C18.66 24 24 18.62 24 12a11.9 11.9 0 0 0-3.48-8.52ZM12.04 21.82c-1.8 0-3.56-.48-5.1-1.38l-.37-.22-3.67.95.98-3.57-.24-.37A9.77 9.77 0 0 1 2.27 12c0-5.4 4.39-9.78 9.77-9.78A9.8 9.8 0 0 1 21.82 12c0 5.4-4.38 9.82-9.78 9.82Zm5.36-7.34c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.9 1.13-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.7-1.58-1.99-.17-.29-.02-.44.12-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.82 1.18 3.02.14.19 2.02 3.09 4.9 4.33.68.29 1.21.46 1.62.59.68.22 1.29.19 1.78.12.54-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.11-.26-.18-.55-.32Z" />
                </svg>
            </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-600 text-base md:text-lg text-center md:text-right">
            © 2026. Built with passion and clean code.
            </div>
        </div>
        </div>
    </div>
  );
}