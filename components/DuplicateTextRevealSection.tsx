"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("gsapEase", "M0,0 C0.65,0 0.35,1 1,1");
}

export default function DuplicateTextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const shortTextRef = useRef<HTMLParagraphElement>(null);
  const fullTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!shortTextRef.current || !fullTextRef.current || !pinSectionRef.current) return;

      // Split both paragraph versions into lines using SplitText
      const shortSplit = new SplitText(shortTextRef.current, { type: "lines" });
      const fullSplit = new SplitText(fullTextRef.current, { type: "lines" });

      // Initial state: short text visible, full text hidden and translated down 20px
      gsap.set(shortSplit.lines, { opacity: 1, y: 0 });
      gsap.set(fullSplit.lines, { opacity: 0, y: 20 });

      // ScrollTrigger timeline pinned to the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top+=80",
          end: "+=130%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Crossfade short text out while moving up slightly
      tl.to(
        shortSplit.lines,
        {
          opacity: 0,
          y: -18,
          stagger: 0.08,
          duration: 0.6,
          ease: "gsapEase",
        },
        0
      );

      // 2. Crossfade full text in: each line rises up 20px (opacity 0 -> 1)
      tl.to(
        fullSplit.lines,
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "gsapEase",
        },
        0.25
      );

      return () => {
        shortSplit.revert();
        fullSplit.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0B0F1A] py-20 overflow-hidden"
    >
      <div
        ref={pinSectionRef}
        className="max-w-5xl mx-auto px-6 min-h-[50vh] flex flex-col items-center justify-center text-center relative"
      >
        {/* Eyebrow / Label */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/30 text-teal text-xs font-semibold tracking-wider uppercase">
          <span>✨</span>
          <span>The Carcino Foundation — Our Story</span>
        </div>

        <h2 className="font-heading font-[700] text-2xl sm:text-3xl lg:text-4xl text-[#F5F6F8] mb-10 tracking-tight">
          Why The Carcino Foundation
        </h2>

        {/* Stacked Paragraph Container */}
        <div className="relative w-full max-w-4xl min-h-[160px] sm:min-h-[140px] flex items-center justify-center">
          {/* Layer 1: Short Copy Version */}
          <p
            ref={shortTextRef}
            className="absolute inset-x-0 font-heading font-medium text-lg sm:text-2xl md:text-3xl text-purple-200/70 leading-relaxed text-center select-none"
          >
            We empower students and communities with peer-reviewed medical guides and diagnostic awareness.
          </p>

          {/* Layer 2: Full / Expanded Copy Version */}
          <p
            ref={fullTextRef}
            className="absolute inset-x-0 font-heading font-semibold text-lg sm:text-2xl md:text-3xl text-white leading-relaxed text-center select-none drop-shadow-md"
          >
            We empower students and communities with peer-reviewed medical guides, early diagnostic awareness tools, plain-language clinical insights, and compassionate health advocacy for all.
          </p>
        </div>

        {/* Scroll Indicator Subtext */}
        <div className="mt-12 flex items-center gap-2 text-xs font-mono text-purple-300/50 uppercase tracking-widest animate-pulse">
          <span>Scroll to expand the story</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
