"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { registerGsap } from "../../lib/gsapClient";

const navItems = [
  { id: "home", label: "🏠 Home" },
  { id: "services", label: "✨ Services" },
  { id: "about", label: "👤 About" },
  { id: "projects", label: "📦 Projects" },
  { id: "education", label: "🎓 Education" },
  { id: "gallery", label: "🖼 Gallery" },
  { id: "contact", label: "✉ Contact" },
];

const sections = navItems.map((item) => item.id);

export default function Navbar() {
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateNavMode = () => {
      const matches = mediaQuery.matches;
      setIsMobileNav(matches);
      if (!matches) setOpen(false);
    };

    updateNavMode();
    mediaQuery.addEventListener("change", updateNavMode);
    return () => mediaQuery.removeEventListener("change", updateNavMode);
  }, []);

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

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!isMobileNav || !open) return undefined;

    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobileNav, open]);

  useEffect(() => {
    if (!isMobileNav || typeof window === "undefined") return undefined;

    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const lines = hamburgerRef.current?.querySelectorAll("span");

      if (lines?.length) {
        gsap.to(lines[0], { y: open ? 7 : 0, rotate: open ? 45 : 0, duration: 0.28, ease: "power2.out" });
        gsap.to(lines[1], { autoAlpha: open ? 0 : 1, x: open ? 8 : 0, duration: 0.2, ease: "power2.out" });
        gsap.to(lines[2], { y: open ? -7 : 0, rotate: open ? -45 : 0, duration: 0.28, ease: "power2.out" });
      }

      if (open && overlayRef.current && menuRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { autoAlpha: 0, backdropFilter: "blur(0px)" },
          { autoAlpha: 1, backdropFilter: "blur(10px)", duration: 0.28, ease: "power2.out" }
        );
        gsap.fromTo(
          menuRef.current,
          { xPercent: 100, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.42, ease: "power3.out" }
        );
        gsap.fromTo(
          menuRef.current.querySelectorAll("a, button"),
          { x: 26, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.32, stagger: 0.045, delay: 0.08, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, [isMobileNav, open]);

  const navClass = (id) =>
    active === id ? "text-purple-600 font-semibold" : "text-gray-600 hover:text-purple-600 transition";

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 bg-white/45 backdrop-blur-xl border-b border-white/30 shadow-[0_18px_70px_rgba(91,33,182,0.08)]">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link href="/auth/login" aria-label="Open portfolio login" className="w-11 h-11 flex items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-lg">
          L
        </Link>
        <h1 className="font-bold text-lg tracking-wide">LEPCHA</h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-8 font-medium">
        {navItems.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            className={`${navClass(id)} ${active === id ? "bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]" : ""} px-5 py-2 rounded-xl backdrop-blur-sm`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile Button */}
      <button
        ref={hamburgerRef}
        onClick={() => setOpen((current) => !current)}
        className="cinematic-hamburger flex lg:hidden text-purple-600"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Menu */}
      {isMobileNav && open && (
        <div ref={overlayRef} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex lg:hidden justify-end">
          <div ref={menuRef} className="w-[260px] h-full bg-white/80 backdrop-blur-xl shadow-xl p-6 flex flex-col gap-6">
            <button onClick={() => setOpen(false)} className="text-2xl self-end text-purple-600 font-bold">
              ✕
            </button>

            {navItems.map(({ id, label }) => (
              <Link key={id} href={`#${id}`} onClick={() => setOpen(false)} className={navClass(id)}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
