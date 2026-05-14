"use client";

import { useEffect } from "react";
import { cinematicEase, prefersReducedMotion, registerGsap, sectionTrigger } from "../lib/gsapClient";

export function useScrollReveal(scopeRef, options = {}) {
  useEffect(() => {
    const scope = scopeRef?.current;
    if (!scope || prefersReducedMotion()) return undefined;

    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".js-section", scope);

      sections.forEach((section) => {
        const revealItems = section.querySelectorAll(".js-reveal");
        const imageItems = section.querySelectorAll(".js-image-reveal");
        const maskItems = section.querySelectorAll(".js-mask-reveal");

        if (revealItems.length) {
          gsap.fromTo(
            revealItems,
            {
              autoAlpha: 0,
              y: options.y ?? 46,
              filter: "blur(10px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: options.duration ?? 1.05,
              ease: cinematicEase(),
              stagger: options.stagger ?? 0.12,
              scrollTrigger: sectionTrigger(section, {
                start: "top 94%",
                end: "center 22%",
              }),
            }
          );
        }

        if (imageItems.length) {
          gsap.fromTo(
            imageItems,
            {
              autoAlpha: 0,
              scale: 1.1,
              filter: "blur(14px) saturate(0.72)",
            },
            {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px) saturate(1)",
              duration: 1.25,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: sectionTrigger(section, {
                start: "top 92%",
                end: "center 18%",
              }),
            }
          );
        }

        if (maskItems.length) {
          gsap.fromTo(
            maskItems,
            {
              "--mask-size": "0%",
              clipPath: "circle(0% at 50% 50%)",
              autoAlpha: 0,
            },
            {
              "--mask-size": "145%",
              clipPath: "circle(76% at 50% 50%)",
              autoAlpha: 1,
              duration: 1.35,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: sectionTrigger(section, {
                start: "top 90%",
                end: "center 18%",
              }),
            }
          );
        }
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, options.duration, options.stagger, options.y]);
}
