"use client";

import ScrollReveal from "./ScrollReveal";

interface PullQuoteBlockProps {
  quote: string;
  author: string;
  title: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export default function PullQuoteBlock({
  quote,
  author,
  title,
  buttonText,
  buttonHref,
  onButtonClick,
}: PullQuoteBlockProps) {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-[#0F0A1C]">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-navy-900/30 backdrop-blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Next-Level GSAP 3D Flip Scroll Reveal */}
        <ScrollReveal variant="3dFlip">
          <div className="glass-glow-card p-8 sm:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl relative">
            {/* Top Pride Accent Bar */}
            <div className="pride-bar absolute top-0 left-8 right-8 rounded-full h-1" />

            {/* Decorative Quote Icon */}
            <div className="font-quote text-6xl text-teal/40 mb-4 select-none">“</div>

            {/* Centered Calligraphic / Swash Quote */}
            <blockquote className="font-winter-solace text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed max-w-3xl mx-auto tracking-wide drop-shadow-md">
              &quot;{quote}&quot;
            </blockquote>

            {/* Author Name + Title */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center">
              <span className="font-heading font-[700] text-sm uppercase tracking-[0.18em] text-teal">
                {author}
              </span>
              <span className="font-heading text-xs text-[#9AA3B2] uppercase tracking-widest mt-1">
                {title}
              </span>
            </div>

            {/* Optional CTA Button */}
            {buttonText && (
              <div className="mt-8">
                {buttonHref ? (
                  <a href={buttonHref} className="btn-teal-outline text-xs px-6 py-2.5">
                    {buttonText} →
                  </a>
                ) : (
                  <button onClick={onButtonClick} className="btn-teal-outline text-xs px-6 py-2.5">
                    {buttonText} →
                  </button>
                )}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
