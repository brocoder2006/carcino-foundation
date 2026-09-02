"use client";

import { useRef } from "react";
import { MISSION_CARDS } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("gsapEase", "M0,0 C0.65,0 0.35,1 1,1");
}

export default function MissionSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 1. Heading Character / Line Reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            ease: "gsapEase",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Awwwards Showcase Card Batch Stagger
      const cards = containerRef.current.querySelectorAll(".showcase-card");
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, scale: 0.88, y: 45 });

        ScrollTrigger.batch(cards, {
          start: "top 85%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.85,
              ease: "gsapEase",
              overwrite: true,
            });
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="mission"
      ref={containerRef}
      className="py-28 lg:py-36 relative overflow-hidden bg-[#0F0A1C] select-none"
    >
      {/* Background Radial Glow Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/10 via-teal/10 to-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="eyebrow-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/30 text-teal text-xs font-mono font-semibold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(31,182,168,0.2)]">
            <span>✨</span>
            <span>OUR CORE MISSION</span>
          </span>

          <h2
            ref={headingRef}
            className="font-winter-solace text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-teal uppercase drop-shadow-[0_10px_35px_rgba(255,255,255,0.2)]"
          >
            We want everyone to be aware.
          </h2>

          <p className="font-body text-[#94A3B8] text-base sm:text-lg md:text-xl mt-6 leading-relaxed max-w-2xl mx-auto font-[400] drop-shadow-sm">
            Empowering students and communities with peer-reviewed medical knowledge, early diagnostic tools, and compassionate health advocacy.
          </p>
        </div>

        {/* 4-Card Awwwards Squircle Glassmorphism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {MISSION_CARDS.map((card) => (
            <div
              key={card.id}
              className="showcase-card glass-glow-card rounded-[2rem] p-8 sm:p-9 flex flex-col justify-between group cursor-pointer transition-all duration-500 transform-gpu"
            >
              <div>
                {/* 3D Glass Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 via-navy-950 to-teal/20 border border-white/20 flex items-center justify-center text-3xl mb-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:rotate-12 group-hover:scale-110 group-hover:border-teal/50 transition-all duration-300">
                  {card.icon}
                </div>

                <h3 className="font-heading font-[700] text-2xl text-[#F5F6F8] group-hover:text-teal tracking-wide transition-colors mb-3">
                  {card.title}
                </h3>

                <p className="font-body text-sm text-[#94A3B8] leading-relaxed font-[400]">
                  {card.description}
                </p>
              </div>

              {card.stats && (
                <div className="mt-8 pt-5 border-t border-white/10 flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal/15 text-teal border border-teal/35 text-xs font-mono font-bold tracking-wider shadow-[0_0_12px_rgba(31,182,168,0.25)]">
                    <span>✓</span>
                    <span>{card.stats}</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
