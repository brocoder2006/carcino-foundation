"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;

    // Link top progress bar width to overall page scroll percentage
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[10000] pointer-events-none overflow-hidden">
      <div
        ref={barRef}
        className="w-full h-full bg-gradient-to-r from-pride-red via-pride-green to-pride-purple origin-left scale-x-0 shadow-[0_0_15px_rgba(31,182,168,0.8)]"
      />
    </div>
  );
}
