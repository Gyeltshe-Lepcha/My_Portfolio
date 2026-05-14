"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePinnedSection } from "../../hooks/usePinnedSection";

export default function HomePage({ hero, profile }) {
  const heroRef = useRef(null);

  usePinnedSection(heroRef, {
    end: "+=105%",
  });

  return (
    <section
      ref={heroRef}
      id="home"
      className="js-section cinematic-hero w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 lg:px-24 py-14 pt-32 scroll-mt-32"
    >
      <div className="js-hero-overlay cinematic-hero__overlay" aria-hidden="true" />

      {/* LEFT SIDE TEXT */}
      <div
        className="js-pin-content max-w-xl space-y-6 text-center lg:text-left mt-10 lg:mt-0 relative z-10"
      >
        {/* Hello */}
        <div className="js-reveal flex items-center justify-center lg:justify-start gap-5">
          <h2 className="font-bold text-xl tracking-wide">{hero?.eyebrow || "HELLO"}</h2>
          <div className="w-32 md:w-40 h-[2px] bg-black" />
        </div>

        {/* Main Title */}
        <h1 className="js-reveal cinematic-title text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          {hero?.title || "I AM"} <span className="text-black">{hero?.highlighted || profile?.displayName || "LEPCHA"}</span>
        </h1>

        {/* Subtitle */}
        <p className="js-reveal text-gray-800 tracking-wide font-medium leading-relaxed text-sm md:text-base">
          {hero?.subtitle}
        </p>

        {/* Buttons */}
        <div className="js-reveal flex justify-center lg:justify-start gap-4 md:gap-6 pt-6 flex-wrap">
          <button className="px-8 md:px-10 py-3 border-2 border-purple-500 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition">
            {hero?.primaryCta || "Achievements"}
          </button>

          <button className="px-8 md:px-10 py-3 border-2 border-purple-500 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition">
            {hero?.secondaryCta || "GET CV"}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="js-pin-media relative flex justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[6px] border-purple-200 scale-110" />

        {/* Image Circle */}
        <div className="js-image-reveal js-mask-reveal w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-[10px] border-white shadow-xl relative z-10">
          <Image src={hero?.imageUrl || profile?.avatarUrl || "/profile.png"} alt={profile?.displayName || "Profile"} fill priority className="object-cover" />
        </div>

        {/* Expertise Badge */}
        <div
          className="js-reveal absolute bottom-6 left-2 sm:left-[-40px] bg-white shadow-lg rounded-2xl px-6 py-4 flex items-center gap-3 z-20"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600 text-lg">
            ✨
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">{hero?.badgeLabel || "Expertise"}</p>
            <h3 className="font-bold text-gray-900">{hero?.badgeTitle || "Tech Pro"}</h3>
          </div>
        </div>
      </div>

      <div className="cinematic-scroll-indicator" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
