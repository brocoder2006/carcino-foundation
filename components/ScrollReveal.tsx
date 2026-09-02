"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("gsapEase", "M0,0 C0.65,0 0.35,1 1,1");
}

export type RevealVariant = "3dFlip" | "maskUp" | "skewSlide" | "elasticScale" | "fadeUp";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  startTrigger?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "3dFlip",
  delay = 0,
  duration = 0.85,
  startTrigger = "top 85%",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = elementRef.current;
      if (!el) return;

      // GSAP Next-Level Awwwards Scroll Reveal Variants
      switch (variant) {
        case "3dFlip":
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 65,
              rotateX: -35,
              transformPerspective: 1000,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration,
              delay,
              ease: "gsapEase",
              transformPerspective: 1000,
              scrollTrigger: {
                trigger: el,
                start: startTrigger,
                toggleActions: "play none none none",
              },
            }
          );
          break;

        case "maskUp":
          gsap.fromTo(
            el,
            {
              opacity: 0,
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
              y: 40,
            },
            {
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              y: 0,
              duration: duration * 1.1,
              delay,
              ease: "gsapEase",
              scrollTrigger: {
                trigger: el,
                start: startTrigger,
                toggleActions: "play none none none",
              },
            }
          );
          break;

        case "skewSlide":
          gsap.fromTo(
            el,
            {
              opacity: 0,
              x: -50,
              skewY: 6,
            },
            {
              opacity: 1,
              x: 0,
              skewY: 0,
              duration,
              delay,
              ease: "gsapEase",
              scrollTrigger: {
                trigger: el,
                start: startTrigger,
                toggleActions: "play none none none",
              },
            }
          );
          break;

        case "elasticScale":
          gsap.fromTo(
            el,
            {
              opacity: 0,
              scale: 0.82,
              y: 35,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: duration * 1.2,
              delay,
              ease: "elastic.out(1.05, 0.5)",
              scrollTrigger: {
                trigger: el,
                start: startTrigger,
                toggleActions: "play none none none",
              },
            }
          );
          break;

        case "fadeUp":
        default:
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 45,
            },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "gsapEase",
              scrollTrigger: {
                trigger: el,
                start: startTrigger,
                toggleActions: "play none none none",
              },
            }
          );
          break;
      }
    },
    { scope: elementRef }
  );

  return (
    <div
      ref={elementRef}
      className={`will-change-transform transform-gpu ${className}`}
    >
      {children}
    </div>
  );
}
