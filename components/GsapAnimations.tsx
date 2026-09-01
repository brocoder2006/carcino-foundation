"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapAnimations() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Headline Character / Line Entrance
    const heroTitle = document.querySelector("#home h1");
    if (heroTitle) {
      gsap.fromTo(
        heroTitle,
        { opacity: 0, y: 50, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }

    // 2. Parallax Scroll Effect on Hero Image
    const heroImg = document.querySelector("#home img");
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // 3. Section Titles ScrollReveal Fade & Lift
    const sectionHeadings = document.querySelectorAll("h2");
    sectionHeadings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 4. Glass Cards Batch Stagger
    const cards = document.querySelectorAll(".glass-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 5. GSAP Magnetic Hover Effect on Buttons
    const magneticBtns = document.querySelectorAll(".btn-teal, .btn-teal-outline, .recruitment-pill");
    magneticBtns.forEach((btn) => {
      const element = btn as HTMLElement;
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
