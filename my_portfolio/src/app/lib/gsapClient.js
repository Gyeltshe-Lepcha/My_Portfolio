"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (typeof window === "undefined") {
    return { gsap, ScrollTrigger };
  }

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    registered = true;
  }

  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function cinematicEase() {
  return "power3.out";
}

export function sectionTrigger(trigger, overrides = {}) {
  return {
    trigger,
    start: "top 82%",
    end: "bottom 18%",
    toggleActions: "play none none reverse",
    ...overrides,
  };
}
