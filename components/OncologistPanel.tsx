"use client";

import Image from "next/image";
import { ONCOLOGISTS } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function OncologistPanel() {
  return (
    <section id="oncologists" className="relative py-24 lg:py-32 bg-[#0F0A1C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="3dFlip">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow-label block mb-2">ADVISORY PANEL</span>
            <h2 className="font-winter-solace text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.08] tracking-widest text-white uppercase drop-shadow-md">
              Meet the Oncologists
            </h2>
            <p className="font-body text-base text-[#94A3B8] leading-relaxed mt-4 font-[400]">
              Our medical advisory board brings decades of clinical experience and a shared commitment to equitable cancer care.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {ONCOLOGISTS.map((onc, i) => (
            <ScrollReveal key={onc.id} variant="elasticScale" delay={i * 0.15}>
              <div className="showcase-card glass-glow-card rounded-[2rem] overflow-hidden group cursor-pointer transition-all duration-500 transform-gpu">
                {/* Photo Container */}
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src={onc.image}
                    alt={onc.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                </div>

                {/* Info Container */}
                <div className="p-7 sm:p-8 -mt-6 relative">
                  <h3 className="font-heading font-[700] text-xl sm:text-2xl text-[#F5F6F8] group-hover:text-teal transition-colors">
                    {onc.name}
                  </h3>
                  <p className="font-body text-sm text-teal font-semibold mt-1">{onc.role}</p>
                  <p className="font-body text-xs text-muted mt-1">{onc.institution}</p>
                  <p className="font-body text-xs text-[#94A3B8] mt-3 leading-relaxed font-[400]">
                    {onc.bio}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="inline-block text-[0.7rem] font-mono font-bold uppercase tracking-wider text-teal bg-teal/15 border border-teal/30 px-3.5 py-1 rounded-full">
                      {onc.specialty}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
