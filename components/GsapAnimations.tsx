"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase, Observer);
  CustomEase.create("gsapEase", "M0,0 C0.65,0 0.35,1 1,1");
}

export default function GsapAnimations() {
  useGSAP(() => {
    // 1. GEN Z 3D CARD MOUSE TILT EFFECT
    const cards = document.querySelectorAll(".showcase-card, .glass-card, .glass-glow-card");
    cards.forEach((card) => {
      const element = card as HTMLElement;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation angles (max 12 deg)
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        gsap.to(element, {
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // 2. HERO MOUSE PARALLAX TILT
    const heroContent = document.querySelector("#home .relative.z-10");
    if (heroContent) {
      const handleWindowMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        gsap.to(heroContent, {
          rotateY: x * 0.5,
          rotateX: -y * 0.5,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleWindowMouseMove);
    }

    // 3. MAGNETIC HOVER EFFECT ON BUTTONS
    const magneticBtns = document.querySelectorAll(
      ".btn-teal, .btn-teal-outline, .liquid-glass-btn, .recruitment-pill"
    );
    magneticBtns.forEach((btn) => {
      const element = btn as HTMLElement;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.35,
          y: y * 0.35,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1.2, 0.4)",
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
  });

  return null;
}
