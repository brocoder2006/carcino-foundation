"use client";

import { useState } from "react";
import { RECRUITMENT_ROLES, RecruitmentRole } from "@/lib/data";
import { ApplicationModal } from "./Modals";
import ScrollReveal from "./ScrollReveal";

export default function RecruitmentCTA() {
  const [selectedRole, setSelectedRole] = useState<RecruitmentRole | null>(null);

  const teamButtons = [
    { team: "Writing", label: "Writing Team ↗" },
    { team: "Tech", label: "Tech Team ↗" },
    { team: "Design", label: "Design Team ↗" },
    { team: "Marketing", label: "Marketing Team ↗" },
  ];

  return (
    <section id="recruitment" className="relative py-20 lg:py-28 bg-[#0B0F1A]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="3dFlip">
          <div className="bg-[#0E0C18]/95 border border-purple-500/30 rounded-[2.5rem] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Subtle Ambient Radial Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-[110px] pointer-events-none" />

            {/* Left Text Content */}
            <div className="relative z-10 max-w-xl text-left">
              <h2 className="font-winter-solace text-[clamp(2.2rem,5vw,3.75rem)] text-[#E9D5FF] tracking-wide leading-[1.1] mb-4 font-normal uppercase drop-shadow-md">
                Lets change the world together!
              </h2>

              <p className="font-body text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-8 font-[400] max-w-lg">
                Do you wish to contribute to the cause? Write to us or send us articles, and our Writing Team will work on it and share it with the world.
              </p>

              {/* 4 Team Pill Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {teamButtons.map((item) => {
                  const matchedRole = RECRUITMENT_ROLES.find((r) => r.team === item.team) || RECRUITMENT_ROLES[0];
                  return (
                    <button
                      key={item.team}
                      onClick={() => setSelectedRole(matchedRole)}
                      className="bg-[#1A1329]/90 hover:bg-[#2A1B43] border border-white/20 hover:border-purple-400/70 text-purple-100 hover:text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 transition-all shadow-md hover:scale-105 cursor-pointer"
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Ribbon Silhouette Vector Artwork */}
            <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
              <svg
                width="280"
                height="280"
                viewBox="0 0 240 240"
                fill="none"
                stroke="currentColor"
                className="w-56 h-56 sm:w-72 sm:h-72 text-purple-400/75 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] stroke-[2.2] stroke-linecap-round stroke-linejoin-round animate-pulse"
              >
                {/* Outer Loop & Ribbon Tails */}
                <path d="M70 155 L35 170 L95 130" />
                <path d="M170 155 L205 170 L145 130" />

                {/* Main Ribbon Loop Contour */}
                <path d="M120 25 C75 25 45 60 45 105 C45 140 80 185 120 215 C160 185 195 140 195 105 C195 60 165 25 120 25 Z" />

                {/* Inner Profile */}
                <path d="M115 50 C105 50 96 58 96 68 C96 73 98 77 101 80 C95 86 92 94 92 103 C92 109 95 114 99 118 C93 125 90 134 90 144 C90 155 98 164 110 166 L115 167 L120 167" />
                <path d="M120 50 C135 50 148 62 148 78 C148 90 140 100 130 105 C142 110 152 122 152 138 C152 158 135 172 115 172" />
              </svg>
            </div>
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
