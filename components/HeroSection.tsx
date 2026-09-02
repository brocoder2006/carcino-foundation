"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, CustomEase);
  CustomEase.create("gsapEase", "M0,0 C0.65,0 0.35,1 1,1");
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // 1. HERO SCRAMBLE-IN TEXT ANIMATION
      if (headlineRef.current) {
        // Start state: set initial randomized jumbled text texture
        headlineRef.current.innerText = "%X8#kL9@!0?&m$";

        gsap.to(headlineRef.current, {
          duration: 1.8,
          scrambleText: {
            text: "Breaking Down Cancer for Everyone, With Pride.",
            chars: "upperAndLowerCase",
            speed: 0.4,
            revealDelay: 0.3,
          },
          ease: "power2.out",
          delay: 0.3, // Trigger on load with 0.3s delay after page paint
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[96vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 select-none"
    >
      {/* Full-bleed Pride Flag Waving Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          <Image
            src="/images/aesthetic-hero-bg.png"
            alt="The Carcino Foundation Campaign Wallpaper"
            fill
            priority
            className="object-cover object-center filter brightness-[0.75] contrast-[1.08] saturate-[1.15]"
          />
        </motion.div>

        {/* Rich Atmospheric Purple Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/65 via-navy-950/50 to-[#0F0A1C]" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto font-winter-solace">
        {/* Eyebrow Label */}
        <span className="eyebrow-label block mb-4 tracking-widest text-xs sm:text-sm text-teal drop-shadow-sm uppercase font-winter-solace">
          PRIDE MONTH CAMPAIGN · HEALTH EQUITY FOR ALL
        </span>

        {/* HERO SCRAMBLE-IN HEADLINE */}
        <h1
          ref={headlineRef}
          className="font-winter-solace text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.08] tracking-widest text-white uppercase max-w-4xl drop-shadow-[0_10px_35px_rgba(255,255,255,0.25)] select-none min-h-[1.5em] px-2 text-center font-normal"
        >
          Breaking Down Cancer for Everyone, With Pride.
        </h1>

        {/* Supporting Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-winter-solace text-[#E2E8F0]/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed text-center font-[400] drop-shadow-sm"
        >
          Cancer affects millions of lives—this Pride Month, we stand for dignity, visibility, resilience, and compassionate healthcare for everyone.
        </motion.p>

        {/* Translucent Glass Pill CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
        >
          <a
            href="#articles"
            className="liquid-glass-btn text-white font-medium px-8 py-3.5 rounded-full text-sm inline-flex items-center gap-2.5 shadow-2xl transition-all group"
          >
            <span>Read Articles</span>
            <span className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </motion.div>
      </div>

      {/* Floating Bottom-Right Pride Badge Widget */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-400 p-0.5 shadow-2xl cursor-pointer"
          title="Pride Campaign 2026"
        >
          <div className="w-full h-full rounded-full bg-navy-950 flex items-center justify-center text-sm">
            🎗️
          </div>
        </motion.div>
      </div>

      {/* Section Bottom Vignette Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0F0A1C] via-[#0F0A1C]/80 to-transparent pointer-events-none" />
    </section>
  );
}
