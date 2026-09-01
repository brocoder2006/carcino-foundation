"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ONCOLOGISTS } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function OncologistPanel() {
  return (
    <section id="oncologists" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <p className="eyebrow-label mb-4">ADVISORY PANEL</p>
          <h2 className="font-heading font-[700] text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#F5F6F8] mb-4">
            Meet the Oncologists
          </h2>
          <p className="font-body text-base text-[#9AA3B2] leading-relaxed max-w-2xl mb-12">
            Our medical advisory board brings decades of clinical experience and a shared commitment to equitable cancer care.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {ONCOLOGISTS.map((onc, i) => (
            <motion.div
              key={onc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="glass-card overflow-hidden group hover:!border-teal/40"
            >
              {/* Photo */}
              <div className="relative w-full h-72 overflow-hidden">
                <Image
                  src={onc.image}
                  alt={onc.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6 -mt-4 relative">
                <h3 className="font-heading font-[700] text-xl text-[#F5F6F8]">
                  {onc.name}
                </h3>
                <p className="font-body text-sm text-teal mt-1">{onc.role}</p>
                <p className="font-body text-xs text-muted mt-1">{onc.institution}</p>
                <p className="font-body text-xs text-[#9AA3B2] mt-3 leading-relaxed">
                  {onc.bio}
                </p>
                <span className="inline-block mt-3 text-[0.65rem] font-heading font-[600] uppercase tracking-wider text-teal bg-teal/10 px-3 py-1 rounded-full">
                  {onc.specialty}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
