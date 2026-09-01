"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FOOTER_DATA } from "@/lib/data";
import { TributeModal } from "./Modals";
import { useState } from "react";

const SOCIAL_ICONS: Record<string, string> = {
  IG: "📷",
  X: "𝕏",
  YT: "▶️",
  IN: "in",
};

export default function Footer() {
  const [showTribute, setShowTribute] = useState(false);

  return (
    <footer className="relative bg-navy-950 border-t border-white/[0.06] pt-20 pb-8">
      {/* Faint outline logo watermark */}
      <div className="absolute top-0 left-0 w-full h-64 opacity-[0.04] flex items-center justify-center pointer-events-none">
        <span className="font-heading font-[800] text-[12rem] tracking-[0.2em] text-[#F5F6F8]">
          CARCINO
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Org name & tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-[800] text-3xl sm:text-4xl tracking-tight text-[#F5F6F8] mb-3">
            {FOOTER_DATA.orgName}
          </h2>
          <p className="font-body text-sm text-[#9AA3B2]">
            {FOOTER_DATA.tagline}
          </p>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-10"
        >
          {FOOTER_DATA.socials.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-navy-900 border border-white/[0.08] flex items-center justify-center text-muted hover:text-teal hover:border-teal/40 transition-all duration-300 text-sm font-heading font-[700]"
              aria-label={social.platform}
            >
              {SOCIAL_ICONS[social.icon] || social.icon}
            </a>
          ))}
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center space-y-2 mb-10 font-body text-sm text-[#9AA3B2]"
        >
          <a href={`mailto:${FOOTER_DATA.email}`} className="block hover:text-teal transition-colors">
            {FOOTER_DATA.email}
          </a>
          <a href={`tel:${FOOTER_DATA.phone}`} className="block hover:text-teal transition-colors">
            {FOOTER_DATA.phone}
          </a>
          <p className="text-xs text-muted mt-2">{FOOTER_DATA.address}</p>
        </motion.div>

        {/* Our Tribute link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <button
            onClick={() => setShowTribute(true)}
            className="font-heading text-sm font-[600] text-teal hover:text-teal-light transition-colors underline underline-offset-4 decoration-teal/30 hover:decoration-teal"
          >
            Our Tribute — Pride Month Campaign
          </button>
        </motion.div>

        {/* Legal links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-6 text-xs font-body text-muted mb-8"
        >
          {FOOTER_DATA.legal.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#F5F6F8] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-6 border-t border-white/[0.06] text-center"
        >
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} The Carcino Foundation. All rights reserved.
          </p>
        </motion.div>
      </div>

      {showTribute && <TributeModal isOpen={showTribute} onClose={() => setShowTribute(false)} />}
    </footer>
  );
}
