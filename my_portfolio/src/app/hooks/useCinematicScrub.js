"use client";

import { useEffect } from "react";
import { prefersReducedMotion, registerGsap } from "../lib/gsapClient";

export function useCinematicScrub(scopeRef) {
  useEffect(() => {
    const scope = scopeRef?.current;
    if (!scope || prefersReducedMotion()) return undefined;

    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".js-section", scope);
      const ambient = scope.querySelector(".cinematic-ambient");
      const lightLeaks = scope.querySelectorAll(".cinematic-light-leak");

      if (ambient) {
        gsap.to(ambient, {
          "--scene-progress": 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.25,
            invalidateOnRefresh: true,
          },
        });
      }

      if (lightLeaks.length) {
        gsap.fromTo(
          lightLeaks,
          { yPercent: -8, autoAlpha: 0.24 },
          {
            yPercent: 18,
            autoAlpha: 0.42,
            ease: "none",
            scrollTrigger: {
              trigger: scope,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.4,
            },
          }
        );
      }

      sections.forEach((section, index) => {
        const wipes = section.querySelectorAll(".js-diagonal-wipe");
        const scrubItems = section.querySelectorAll(".js-scrub:not(.js-reveal)");
        const nextSection = sections[index + 1];

        if (scrubItems.length) {
          gsap.fromTo(
            scrubItems,
            {
              y: 28,
              scale: 0.985,
              autoAlpha: 0.82,
            },
            {
              y: -18,
              scale: 1,
              autoAlpha: 1,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: section,
                start: "top 108%",
                end: "bottom -8%",
                scrub: 1.15,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (nextSection) {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "bottom 92%",
              end: "bottom 36%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
            .to(section, { autoAlpha: 0.62, y: -42, filter: "blur(2px)", ease: "none" }, 0)
            .fromTo(
              nextSection,
              { autoAlpha: 0.76, y: 54, filter: "blur(8px)" },
              { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "none" },
              0
            );
        }

        if (wipes.length) {
          gsap.fromTo(
            wipes,
            {
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 18%)",
            },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 82%)",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 108%",
                end: "top 32%",
                scrub: 1,
              },
            }
          );
        }
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef]);
}
