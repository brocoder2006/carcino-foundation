"use client";

import { useState, useRef } from "react";
import { ARTICLES, Article } from "@/lib/data";
import { ArticleReaderModal } from "./Modals";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("gsapEase", "M0,0 C0.65,0 0.35,1 1,1");
}

const CARD_GLOW_THEMES = [
  {
    // Card 1: Rose Pink / Crimson Glow
    borderHover: "hover:border-[#FF5A5F]/75",
    shadowHover: "hover:shadow-[0_0_40px_rgba(255,90,95,0.4)]",
    lineGradient: "from-transparent via-[#FF5A5F] to-transparent",
    authorHover: "group-hover:text-[#FF8A8E]",
  },
  {
    // Card 2: Warm Amber / Gold Glow
    borderHover: "hover:border-[#FFB84D]/75",
    shadowHover: "hover:shadow-[0_0_40px_rgba(255,184,77,0.4)]",
    lineGradient: "from-transparent via-[#FFB84D] to-transparent",
    authorHover: "group-hover:text-[#FFD185]",
  },
  {
    // Card 3: Bright Yellow / Lemon Glow
    borderHover: "hover:border-[#FFE566]/75",
    shadowHover: "hover:shadow-[0_0_40px_rgba(255,229,102,0.4)]",
    lineGradient: "from-transparent via-[#FFE566] to-transparent",
    authorHover: "group-hover:text-[#FFF099]",
  },
  {
    // Card 4: Emerald / Mint Green Glow
    borderHover: "hover:border-[#4CD97B]/75",
    shadowHover: "hover:shadow-[0_0_40px_rgba(76,217,123,0.4)]",
    lineGradient: "from-transparent via-[#4CD97B] to-transparent",
    authorHover: "group-hover:text-[#80EAA4]",
  },
  {
    // Card 5: Electric Cyan / Sky Blue Glow
    borderHover: "hover:border-[#4DA3FF]/75",
    shadowHover: "hover:shadow-[0_0_40px_rgba(77,163,255,0.4)]",
    lineGradient: "from-transparent via-[#4DA3FF] to-transparent",
    authorHover: "group-hover:text-[#85C2FF]",
  },
  {
    // Card 6: Vivid Violet / Purple Glow
    borderHover: "hover:border-[#A66DFF]/75",
    shadowHover: "hover:shadow-[0_0_40px_rgba(166,109,255,0.4)]",
    lineGradient: "from-transparent via-[#A66DFF] to-transparent",
    authorHover: "group-hover:text-[#C49CFF]",
  },
];

export default function ArticleGallery() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // SHOWCASE GRID STAGGER REVEAL WITH SCROLLTRIGGER.BATCH()
  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".showcase-card");
      if (!cards || cards.length === 0) return;

      // Set initial hidden state: scale 0.9, opacity 0
      gsap.set(cards, { opacity: 0, scale: 0.9, y: 30 });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="articles"
      ref={containerRef}
      className="relative py-28 lg:py-36 bg-[#0B0F1A]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-swash-serif text-[clamp(2.75rem,6.5vw,4.75rem)] text-[#D8B4FE] uppercase tracking-wider text-center drop-shadow-[0_0_25px_rgba(216,180,254,0.25)] select-none">
            ARTICLE GALLERY
          </h2>

          <p className="font-body text-[#94A3B8] text-sm sm:text-base max-w-xl mx-auto mt-4 text-center leading-relaxed font-[400]">
            Here&apos;s the latest collection of articles we offer, tailored to be understandable by everyone, made with love and care by our Writing Team.
          </p>
        </div>

        {/* 3-Column x 2-Row Showcase Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
          {ARTICLES.map((article, i) => {
            const theme = CARD_GLOW_THEMES[i % CARD_GLOW_THEMES.length];
            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className={`showcase-card bg-[#0D101A] hover:bg-[#121626] border border-white/10 ${theme.borderHover} ${theme.shadowHover} rounded-[1.8rem] sm:rounded-[2.2rem] p-6 py-8 sm:p-10 flex flex-col items-center justify-center text-center group cursor-pointer min-h-[170px] sm:aspect-[16/9.5] relative overflow-hidden transition-all duration-300 transform-gpu`}
              >
                {/* Glowing Top Edge Line */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${theme.lineGradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                {/* Glowing Bottom Edge Line */}
                <div className={`absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r ${theme.lineGradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                {/* Eyebrow: research article */}
                <span className="font-serif italic text-purple-300/80 text-sm mb-3 font-[400]">
                  {article.eyebrow}
                </span>

                {/* Title */}
                <h3 className="font-heading font-[800] text-[#F5F6F8] group-hover:text-white tracking-widest text-xl sm:text-2xl uppercase max-w-[210px] leading-tight text-center my-1 transition-colors">
                  {article.title}
                </h3>

                {/* Byline Author */}
                <span className={`text-purple-300/70 ${theme.authorHover} text-xs sm:text-sm font-medium mt-3 transition-colors`}>
                  {article.author}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Pill CTA Button */}
        <div className="mt-14">
          <a
            href="#blogs"
            className="bg-[#181126]/90 hover:bg-[#25183E] border border-purple-500/35 hover:border-purple-400/70 text-purple-200 hover:text-white px-7 py-3 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all hover:scale-105 group"
          >
            <span>Visit the Articles Tab</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </div>
      </div>

      {/* Modal Reader */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}
