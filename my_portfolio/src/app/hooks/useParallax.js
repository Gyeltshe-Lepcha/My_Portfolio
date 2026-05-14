"use client";

import { useEffect } from "react";
import { prefersReducedMotion, registerGsap } from "../lib/gsapClient";

export function useParallax(scopeRef) {
  useEffect(() => {
    const scope = scopeRef?.current;
    if (!scope || prefersReducedMotion()) return undefined;

    const { gsap } = registerGsap();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const isMobile = context.conditions.mobile;

          gsap.utils.toArray("[data-speed]", scope).forEach((layer) => {
            const speed = Number(layer.dataset.speed || 0);
            const travel = speed * (isMobile ? 58 : 128);

            gsap.fromTo(
              layer,
              { y: -travel * 0.45 },
              {
                y: travel,
                ease: "none",
                scrollTrigger: {
                  trigger: scope,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1.25,
                  invalidateOnRefresh: true,
                },
              }
            );
          });
        }
      );
    }, scope);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [scopeRef]);
}
