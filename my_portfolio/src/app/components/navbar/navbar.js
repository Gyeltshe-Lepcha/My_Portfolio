"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Ref for detecting outside click
  const menuRef = useRef(null);

  // Close menu if user clicks outside
  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    // Only attach listener when menu is open
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-10 py-6 bg-white relative">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-lg">
          L
        </div>
        <h1 className="font-bold text-lg tracking-wide">LEPCHA</h1>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        <Link
          href="/home"
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-100 text-purple-600 font-semibold"
        >
          🏠 Home
        </Link>

        <Link href="/service" className="hover:text-purple-600 transition">
          ✨ Services
        </Link>

        <Link href="#" className="hover:text-purple-600 transition">
          👤 About
        </Link>

        <Link href="#" className="hover:text-purple-600 transition">
          📦 Projects
        </Link>

        <Link href="#" className="hover:text-purple-600 transition">
          🎓 Education
        </Link>

        <Link href="#" className="hover:text-purple-600 transition">
          🖼 Gallery
        </Link>

        <Link href="#" className="hover:text-purple-600 transition">
          ✉ Contact
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-3xl font-bold text-purple-600"
      >
        ☰
      </button>

      {/* Mobile Slide Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          
          {/* Right Side Menu */}
          <div
            ref={menuRef}
            className="w-[260px] h-full bg-white shadow-xl p-6 flex flex-col gap-6 animate-slideIn"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="text-2xl self-end text-purple-600 font-bold"
            >
              ✕
            </button>

            {/* Menu Links */}
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="text-purple-600 font-semibold"
            >
              🏠 Home
            </Link>

            <Link href="#" onClick={() => setOpen(false)}>
              ✨ Services
            </Link>

            <Link href="#" onClick={() => setOpen(false)}>
              👤 About
            </Link>

            <Link href="#" onClick={() => setOpen(false)}>
              📦 Projects
            </Link>

            <Link href="#" onClick={() => setOpen(false)}>
              🎓 Education
            </Link>

            <Link href="#" onClick={() => setOpen(false)}>
              🖼 Gallery
            </Link>

            <Link href="#" onClick={() => setOpen(false)}>
              ✉ Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
