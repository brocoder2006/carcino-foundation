"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface ScrambleTextProps {
  phrases?: string[];
  className?: string;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/░▒▓█";

export default function ScrambleText({
  phrases = [
    "BREAKING DOWN CANCER FOR EVERYONE, WITH PRIDE.",
    "HEALTH EQUITY & PEER-REVIEWED GUIDES FOR ALL.",
    "STUDENT-LED RESEARCH & COMMUNITY ADVOCACY.",
  ],
  className = "",
}: ScrambleTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const targetText = phrases[phraseIndex];
    const totalLength = targetText.length;
    const progressObj = { value: 0 };

    const anim = gsap.to(progressObj, {
      value: 1,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const progress = progressObj.value;
        const currentLength = Math.floor(progress * totalLength);
        let result = "";

        for (let i = 0; i < totalLength; i++) {
          const char = targetText[i];
          if (char === "\n" || char === " ") {
            result += char;
          } else if (i < currentLength) {
            result += char;
          } else if (i < currentLength + 4) {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            result += " ";
          }
        }

        if (el) {
          el.innerHTML = result.replace(/\n/g, "<br/>");
        }
      },
      onComplete: () => {
        // Automatically cycle phrases every 6 seconds
        const timeout = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 5000);
        return () => clearTimeout(timeout);
      },
    });

    return () => {
      anim.kill();
    };
  }, [phraseIndex, phrases]);

  return (
    <h1
      ref={textRef}
      className={`font-swash-serif text-[clamp(1.75rem,5.8vw,5.25rem)] leading-[1.08] sm:leading-[1.04] tracking-wide text-white uppercase max-w-4xl drop-shadow-md select-none min-h-[3.5em] sm:min-h-[3.2em] px-2 text-center flex items-center justify-center ${className}`}
    >
      {phrases[0]}
    </h1>
  );
}
