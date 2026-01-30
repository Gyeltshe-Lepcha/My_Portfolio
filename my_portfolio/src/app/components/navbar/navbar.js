"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const sections = [
  "home",
  "services",
  "about",
  "projects",
  "education",
  "gallery",
  "contact",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuRef = useRef(null);

  // Detect active section on scroll
  useEffect(() => {
    const onScroll = () => {
      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const offset = section.offsetTop - 140;
          if (window.scrollY >= offset) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const navClass = (id) =>
    active === id
      ? "text-purple-600 font-semibold"
      : "text-gray-600 hover:text-purple-600 transition";

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 bg-white/90 backdrop-blur">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-lg">
          L
        </div>
        <h1 className="font-bold text-lg tracking-wide">LEPCHA</h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link href="#home" className={`${navClass("home")} px-5 py-2 rounded-xl ${active === "home" && "bg-purple-100"}`}>
          🏠 Home
        </Link>
        <Link href="#services" className={navClass("services")}>✨ Services</Link>
        <Link href="#about" className={navClass("about")}>👤 About</Link>
        <Link href="#projects" className={navClass("projects")}>📦 Projects</Link>
        <Link href="#education" className={navClass("education")}>🎓 Education</Link>
        <Link href="#gallery" className={navClass("gallery")}>🖼 Gallery</Link>
        <Link href="#contact" className={navClass("contact")}>✉ Contact</Link>
      </div>

      {/* Mobile Button */}
      <button onClick={() => setOpen(true)} className="md:hidden text-3xl font-bold text-purple-600">
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div
            ref={menuRef}
            className="w-[260px] h-full bg-white shadow-xl p-6 flex flex-col gap-6"
          >
            <button
              onClick={() => setOpen(false)}
              className="text-2xl self-end text-purple-600 font-bold"
            >
              ✕
            </button>

            {sections.map((id) => (
              <Link
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={navClass(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
