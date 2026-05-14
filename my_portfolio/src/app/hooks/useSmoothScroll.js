"use client";

import { useEffect } from "react";
import { prefersReducedMotion, registerGsap } from "../lib/gsapClient";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === "undefined") return undefined;

    const { ScrollTrigger } = registerGsap();
    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let touchStart = 0;
    const ease = window.matchMedia("(max-width: 767px)").matches ? 0.18 : 0.105;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const setTarget = (next) => {
      target = clamp(next, 0, maxScroll());
    };

    const tick = () => {
      current += (target - current) * ease;

      if (Math.abs(target - current) < 0.45) {
        current = target;
      }

      if (Math.abs(window.scrollY - current) > 0.2) {
        window.scrollTo(0, current);
        ScrollTrigger.update();
      }

      raf = requestAnimationFrame(tick);
    };

    const onWheel = (event) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      setTarget(target + event.deltaY);
    };

    const onTouchStart = (event) => {
      touchStart = event.touches?.[0]?.clientY ?? 0;
    };

    const onTouchMove = (event) => {
      const nextY = event.touches?.[0]?.clientY ?? touchStart;
      const delta = touchStart - nextY;
      touchStart = nextY;
      event.preventDefault();
      setTarget(target + delta * 1.35);
    };

    const onScroll = () => {
      if (Math.abs(window.scrollY - current) < 2) return;
      target = window.scrollY;
      current = window.scrollY;
    };

    const onAnchorClick = (event) => {
      const link = event.target.closest?.("a[href^='#']");
      if (!link) return;

      const id = link.getAttribute("href")?.slice(1);
      const targetElement = id ? document.getElementById(id) : null;
      if (!targetElement) return;

      event.preventDefault();
      setTarget(window.scrollY + targetElement.getBoundingClientRect().top - 88);
      window.history.pushState(null, "", `#${id}`);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);
}
