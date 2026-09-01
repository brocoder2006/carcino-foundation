"use client";

import { motion } from "framer-motion";
import { RECRUITMENT_ROLES } from "@/lib/data";
import { ApplicationModal } from "./Modals";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function RecruitmentCTA() {
  const [selectedRole, setSelectedRole] = useState<typeof RECRUITMENT_ROLES[0] | null>(null);

  return (
    <section id="recruitment" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <p className="eyebrow-label mb-4">JOIN THE MOVEMENT</p>
            <h2 className="font-heading font-[700] text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#F5F6F8] mb-4">
              Let&apos;s change the world together!
            </h2>
            <p className="font-body text-base text-[#9AA3B2] leading-relaxed max-w-2xl mx-auto mb-12">
              Whether you write code, design campaigns, draft copy, or grow communities — every skill helps us reach more people with life-saving education.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scaleIn" staggerDelay={0.06}>
          <div className="flex flex-wrap justify-center gap-4">
            {RECRUITMENT_ROLES.map((role, i) => (
              <motion.button
                key={role.team}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedRole(role)}
                className="recruitment-pill"
              >
                <span className="mr-2 text-teal group-[.active]:text-navy-950">
                  {/* placeholder for icon */}
                </span>
                {role.team} Team
              </motion.button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {selectedRole && (
        <ApplicationModal
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
        />
      )}
    </section>
  );
}
