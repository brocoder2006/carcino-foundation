"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface KineticMarqueeProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function KineticMarquee({
  items = [
    "✦ THE CARCINO FOUNDATION",
    "⚡ HEALTH EQUITY FOR ALL",
    "🎗️ CANCER EDUCATION FOR EVERYONE",
    "🌈 PRIDE MONTH CAMPAIGN 2026",
    "🔬 PEER-REVIEWED RESEARCH",
    "🎓 STUDENT LEADERSHIP",
    "✨ 100% FREE RESOURCES",
  ],
  speed = 25,
  reverse = false,
  className = "",
}: KineticMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const direction = reverse ? 1 : -1;

      // Infinite loop animation using GSAP horizontal scroll
      const animation = gsap.to(track, {
        xPercent: direction * 50,
        repeat: -1,
        duration: speed,
        ease: "none",
      });

      // ScrollTrigger scroll velocity booster (speeds up marquee on fast scroll!)
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const timeScale = 1 + velocity / 400;
          gsap.to(animation, { timeScale, duration: 0.3, overwrite: true });
          gsap.to(animation, { timeScale: 1, duration: 1, delay: 0.3 });
        },
      });
    },
    { scope: marqueeRef }
  );

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={marqueeRef}
      className={`relative w-full overflow-hidden py-4 border-y border-white/10 bg-navy-950/80 backdrop-blur-md select-none ${className}`}
    >
      {/* Pride Accent Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-pride-red via-pride-green to-pride-purple opacity-70" />

      <div
        ref={trackRef}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {repeatedItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-6 font-swash-serif text-lg sm:text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-teal uppercase drop-shadow-sm"
          >
            <span>{item}</span>
          </span>
        ))}
      </div>

      {/* Pride Accent Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-pride-purple via-pride-blue to-pride-yellow opacity-70" />
    </div>
  );
}
