"use client";

import { motion } from "framer-motion";

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
    <section className="py-20 lg:py-24 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-navy-900/30 backdrop-blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Scroll-triggered Fade + Scale-in (0.98 -> 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-navy-900/70 border border-white/[0.08] p-8 sm:p-12 lg:p-16 rounded-3xl shadow-2xl relative"
        >
          {/* Top Pride Accent Bar */}
          <div className="pride-bar absolute top-0 left-8 right-8 rounded-full" />

          {/* Decorative Quote Icon */}
          <div className="font-quote text-5xl text-teal/40 mb-4 select-none">“</div>

          {/* Centered Italic Quote */}
          <blockquote className="font-quote italic text-2xl sm:text-3xl lg:text-4xl text-[#F5F6F8] leading-tight sm:leading-relaxed max-w-3xl mx-auto">
            &quot;{quote}&quot;
          </blockquote>

          {/* Author Name + Title in Small Caps / Muted Teal */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col items-center">
            <span className="font-heading font-[700] text-sm uppercase tracking-[0.15em] text-teal">
              {author}
            </span>
            <span className="font-heading text-xs text-[#9AA3B2] uppercase tracking-wider mt-1">
              {title}
            </span>
          </div>

          {/* Optional CTA Button e.g., "Meet the team" */}
          {buttonText && (
            <div className="mt-8">
              {buttonHref ? (
                <a href={buttonHref} className="btn-teal-outline text-xs">
                  {buttonText} →
                </a>
              ) : (
                <button onClick={onButtonClick} className="btn-teal-outline text-xs">
                  {buttonText} →
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
