"use client";

import { useEffect } from "react";
import { prefersReducedMotion, registerGsap } from "../lib/gsapClient";

export function usePinnedSection(sectionRef, options = {}) {
  useEffect(() => {
    const section = sectionRef?.current;
    if (!section || prefersReducedMotion()) return undefined;

    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const content = section.querySelectorAll(".js-pin-content");
      const media = section.querySelectorAll(".js-pin-media");
      const overlay = section.querySelectorAll(".js-hero-overlay");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: options.start ?? "top top",
          end: options.end ?? "+=115%",
          scrub: options.scrub ?? 0.9,
          pin: options.pin ?? true,
          pinSpacing: options.pinSpacing ?? true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (media.length) {
        timeline.fromTo(
          media,
          { scale: 1.1, filter: "blur(8px) saturate(0.85)" },
          { scale: 1, filter: "blur(0px) saturate(1)", ease: "none", duration: 1 },
          0
        );
      }

      if (content.length) {
        timeline.fromTo(
          content,
          { autoAlpha: 1, y: 0 },
          { autoAlpha: 0.1, y: -54, ease: "none", duration: 1 },
          0.12
        );
      }

      if (overlay.length) {
        timeline.fromTo(
          overlay,
          { autoAlpha: 0.72 },
          { autoAlpha: 0.08, ease: "none", duration: 1 },
          0
        );
      }
    }, section);

    return () => ctx.revert();
  }, [sectionRef, options.end, options.pin, options.pinSpacing, options.scrub, options.start]);
}
