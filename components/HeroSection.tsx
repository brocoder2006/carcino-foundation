"use client";

import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[96vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Full-bleed Pride Flag Waving Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <img
            src="/images/pride-hero-bg.png"
            alt="The Carcino Foundation Pride Month Campaign"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
        </motion.div>

        {/* Soft Blue Atmospheric Vignette & Bottom Navy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-blue-900/20 to-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        {/* GSAP Typing & Scrambled Text Headline */}
        <ScrambleText
          phrases={[
            "BREAKING DOWN CANCER FOR EVERYONE, WITH PRIDE.",
            "HEALTH EQUITY & PEER-REVIEWED RESEARCH FOR ALL.",
            "STUDENT-LED CANCER EDUCATION & COMMUNITY OUTREACH.",
          ]}
        />

        {/* Supporting Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-body text-[#E2E8F0]/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed text-center font-[400] drop-shadow-sm"
        >
          Cancer affects millions of lives—but this Pride Month, we stand for dignity, visibility, resilience, and compassionate healthcare for everyone.
        </motion.p>

        {/* Translucent Glass Pill CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
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
