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

  // Floating Decorative Shape Refs
  const wormShapeRef = useRef<HTMLDivElement>(null);
  const circleShapeRef = useRef<HTMLDivElement>(null);
  const blobShapeRef = useRef<HTMLDivElement>(null);
  const sparkShapeRef = useRef<HTMLDivElement>(null);

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

      // 2. FLOATING DECORATIVE SHAPES (MULTI-LAYER PARALLAX)
      if (heroRef.current) {
        // Shape 1: Worm / Wave shape (scrub: 1)
        if (wormShapeRef.current) {
          gsap.to(wormShapeRef.current, {
            y: -120,
            rotation: 15,
            scrollTrigger: {
              trigger: heroRef.current,
              scrub: 1,
              start: "top bottom",
              end: "bottom top",
            },
          });
        }

        // Shape 2: Gradient Circle shape (scrub: 1.5)
        if (circleShapeRef.current) {
          gsap.to(circleShapeRef.current, {
            y: -160,
            rotation: -25,
            scrollTrigger: {
              trigger: heroRef.current,
              scrub: 1.5,
              start: "top bottom",
              end: "bottom top",
            },
          });
        }

        // Shape 3: Abstract Blob shape (scrub: 2)
        if (blobShapeRef.current) {
          gsap.to(blobShapeRef.current, {
            y: -210,
            rotation: 30,
            scrollTrigger: {
              trigger: heroRef.current,
              scrub: 2,
              start: "top bottom",
              end: "bottom top",
            },
          });
        }

        // Shape 4: Spark / Starburst shape (scrub: 1.2)
        if (sparkShapeRef.current) {
          gsap.to(sparkShapeRef.current, {
            y: -140,
            rotation: -18,
            scrollTrigger: {
              trigger: heroRef.current,
              scrub: 1.2,
              start: "top bottom",
              end: "bottom top",
            },
          });
        }
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
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/65 via-navy-950/50 to-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      </div>

      {/* FLOATING DECORATIVE PARALLAX SHAPES */}
      {/* Shape 1: Worm / Organic Wave (scrub: 1) */}
      <div
        ref={wormShapeRef}
        className="absolute top-24 left-[8%] sm:left-[12%] z-20 pointer-events-none opacity-85 filter drop-shadow-xl"
        aria-hidden="true"
      >
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
          <path
            d="M10 50 Q 30 10, 50 50 T 90 50"
            stroke="url(#worm-grad)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="worm-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF5A5F" />
              <stop offset="50%" stopColor="#FFE566" />
              <stop offset="100%" stopColor="#4CD97B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Shape 2: Gradient Circle Ring (scrub: 1.5) */}
      <div
        ref={circleShapeRef}
        className="absolute top-36 right-[8%] sm:right-[14%] z-20 pointer-events-none opacity-80 filter drop-shadow-2xl"
        aria-hidden="true"
      >
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="38" stroke="url(#circle-grad)" strokeWidth="8" />
          <defs>
            <linearGradient id="circle-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4DA3FF" />
              <stop offset="100%" stopColor="#A66DFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Shape 3: Abstract Blob (scrub: 2) */}
      <div
        ref={blobShapeRef}
        className="absolute bottom-28 left-[10%] sm:left-[16%] z-20 pointer-events-none opacity-75 filter drop-shadow-xl"
        aria-hidden="true"
      >
        <svg width="85" height="85" viewBox="0 0 100 100" fill="none">
          <path
            d="M30 10 C 60 0, 90 20, 80 50 C 70 80, 40 90, 20 70 C 0 50, 0 20, 30 10 Z"
            fill="url(#blob-grad)"
          />
          <defs>
            <linearGradient id="blob-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
              <stop offset="100%" stopColor="rgba(31, 182, 168, 0.6)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Shape 4: Spark / Starburst (scrub: 1.2) */}
      <div
        ref={sparkShapeRef}
        className="absolute bottom-36 right-[10%] sm:right-[18%] z-20 pointer-events-none opacity-90 filter drop-shadow-lg"
        aria-hidden="true"
      >
        <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 0 L60 38 L100 50 L60 62 L50 100 L40 62 L0 50 L40 38 Z"
            fill="url(#spark-grad)"
          />
          <defs>
            <linearGradient id="spark-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFB84D" />
              <stop offset="100%" stopColor="#FF5A5F" />
            </linearGradient>
          </defs>
        </svg>
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
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent pointer-events-none" />
    </section>
  );
}
