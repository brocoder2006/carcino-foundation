"use client";

import { motion, Variants } from "framer-motion";
import { MISSION_CARDS } from "@/lib/data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function MissionSection() {
  return (
    <section id="mission" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow-label block mb-2">OUR CORE MISSION</span>
          <h2 className="font-heading font-[600] text-3xl sm:text-4xl lg:text-5xl text-[#F5F6F8] tracking-tight">
            We want everyone to be aware.
          </h2>
          <p className="font-body text-[#9AA3B2] text-base sm:text-lg mt-4 leading-relaxed">
            Empowering students and communities with peer-reviewed medical knowledge, early diagnostic tools, and compassionate health advocacy.
          </p>
        </div>

        {/* 4-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {MISSION_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="glass-card p-8 flex flex-col justify-between group hover:border-teal/50 transition-all duration-300"
            >
              <div>
                {/* Icon with Subtle Hover Rotate */}
                <div className="w-14 h-14 rounded-2xl bg-navy-950 border border-white/[0.1] flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>

                <h3 className="font-heading font-[600] text-xl text-[#F5F6F8] group-hover:text-teal transition-colors mb-3">
                  {card.title}
                </h3>

                <p className="font-body text-sm text-[#9AA3B2] leading-relaxed">
                  {card.description}
                </p>
              </div>

              {card.stats && (
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-heading font-[600] text-teal">
                  ✓ {card.stats}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
