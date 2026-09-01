"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface ScrambleTextProps {
  phrases?: string[];
  className?: string;
}

export default function ScrambleText({
  phrases = [
    "BREAKING DOWN CANCER FOR EVERYONE, WITH PRIDE.",
    "HEALTH EQUITY & PEER-REVIEWED GUIDES FOR ALL.",
    "STUDENT-LED RESEARCH & COMMUNITY ADVOCACY.",
  ],
  className = "",
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const currentPhrase = phrases[phraseIndex];
  const words = currentPhrase.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const innerWords = el.querySelectorAll(".word-inner");
    if (innerWords.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Hold title visible for 4.5 seconds before animating out
          gsap.delayedCall(4.5, () => {
            gsap.to(innerWords, {
              y: "-115%",
              rotateX: 45,
              opacity: 0,
              stagger: 0.04,
              duration: 0.5,
              ease: "power3.in",
              onComplete: () => {
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
              },
            });
          });
        },
      });

      // Awwwards-style staggered 3D mask reveal
      tl.fromTo(
        innerWords,
        {
          y: "115%",
          rotateX: -45,
          opacity: 0,
        },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 1.1,
          ease: "power4.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [phraseIndex, phrases]);

  return (
    <h1
      ref={containerRef}
      className={`font-swash-serif text-[clamp(1.8rem,5.8vw,5rem)] leading-[1.12] sm:leading-[1.06] tracking-wide text-white uppercase max-w-4xl drop-shadow-md select-none min-h-[3.6em] sm:min-h-[3.2em] px-2 text-center flex flex-wrap items-center justify-center perspective-[1000px] ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={`${phraseIndex}-${i}-${word}`}
          className="inline-block overflow-hidden py-1 px-1.5"
        >
          <span className="word-inner inline-block transform-gpu will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}
