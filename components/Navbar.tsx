"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS, LANGUAGES } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

interface NavbarProps {
  onOpenSignUp: () => void;
}

export default function Navbar({ onOpenSignUp }: NavbarProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  const headerRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger & Observer for Sticky Nav Behavior
  useGSAP(() => {
    if (!headerRef.current || !navInnerRef.current) return;

    // 1. Header background fade-in (opacity 0 -> 0.95, backdrop-blur) past 50px
    ScrollTrigger.create({
      start: "top+=50 top",
      onUpdate: (self) => {
        if (self.scroll() > 50) {
          navInnerRef.current?.classList.add("scrolled-nav");
        } else {
          navInnerRef.current?.classList.remove("scrolled-nav");
        }
      },
    });

    // 2. Observer plugin to detect scroll direction (hide on scroll-down, show on scroll-up)
    Observer.create({
      type: "scroll,touch",
      onDown: () => {
        if (window.scrollY > 100) {
          gsap.to(headerRef.current, {
            yPercent: -130,
            duration: 0.35,
            ease: "power2.out",
          });
        }
      },
      onUp: () => {
        gsap.to(headerRef.current, {
          yPercent: 0,
          duration: 0.35,
          ease: "power2.out",
        });
      },
      onChangeY: () => {
        if (window.scrollY < 50) {
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: 0.2,
          });
        }
      },
    });
  });

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Left Floating Brand Logo (Visible on desktop & large tablets) */}
      <div className="fixed top-6 left-8 z-50 hidden lg:flex items-center gap-3">
        <Link
          href="#home"
          className="w-11 h-11 rounded-2xl bg-navy-950/80 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform group"
          title="The Carcino Foundation"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-purple-400 transition-colors">
            <path d="M12 2C9 2 7 4.5 7 7.5C7 11 12 17 12 17C12 17 17 11 17 7.5C17 4.5 15 2 12 2Z" />
            <circle cx="12" cy="7.5" r="2.5" />
          </svg>
        </Link>
      </div>

      {/* Floating Center Pill Navigation Bar with GSAP Observer & ScrollTrigger */}
      <header
        ref={headerRef}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:w-auto max-w-5xl transition-transform transform-gpu"
      >
        <nav
          ref={navInnerRef}
          className="liquid-glass-nav rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between md:justify-start gap-2 sm:gap-3.5 transition-all duration-300"
        >
          {/* Left 3D Liquid Ribbon Circle Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass-circle flex items-center justify-center text-white text-base sm:text-lg transition-transform group-hover:scale-105">
              🎗️
            </div>
            <span className="font-heading font-[700] text-sm sm:text-base tracking-wider text-white md:hidden lg:inline-block">
              CARCINO
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 mx-auto">
            {NAV_LINKS.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveTab(link.label)}
                  className={`px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "liquid-glass-active text-white scale-105"
                      : "text-white/85 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Language Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 liquid-glass-btn rounded-full px-3.5 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm text-white font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{currentLang}</span>
              <span className="text-[0.6rem] opacity-70">▼</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-3 bg-navy-950/95 border border-white/25 rounded-2xl py-2 min-w-[140px] shadow-2xl z-50 backdrop-blur-2xl"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.label);
                        setLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        currentLang === lang.label
                          ? "text-purple-400 bg-purple-500/15"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sign Up Account Button */}
          <button
            onClick={onOpenSignUp}
            className="hidden md:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass-btn items-center justify-center text-white text-sm flex-shrink-0"
            title="Sign Up / Join Campaign"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="17" y1="11" x2="23" y2="11" />
            </svg>
          </button>

          {/* Mobile Hamburger Toggle Button (ONLY visible on mobile screens < md) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors border border-white/20 flex items-center justify-center"
            aria-label="Open Mobile Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Full-Screen Mobile Drawer Menu (Appears ONLY when Hamburger Button is tapped) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-navy-950/98 backdrop-blur-3xl md:hidden flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center font-heading font-[700] text-navy-950 text-base shadow-teal-glow">
                  C
                </div>
                <span className="font-heading font-[700] text-lg tracking-wider text-white">
                  CARCINO
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white text-lg transition-colors"
                aria-label="Close Mobile Menu"
              >
                ✕
              </button>
            </div>

            {/* Main Navigation Links */}
            <div className="flex flex-col items-center justify-center gap-6 my-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveTab(link.label);
                      setMobileOpen(false);
                    }}
                    className={`font-editorial italic text-3xl sm:text-4xl text-center block transition-colors ${
                      activeTab === link.label
                        ? "text-purple-400 font-normal underline decoration-purple-500/50 underline-offset-8"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Drawer Footer Controls */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex justify-center gap-3">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.label)}
                    className={`font-heading text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                      currentLang === lang.label
                        ? "border-teal text-teal bg-teal/10 font-bold"
                        : "border-white/15 text-muted hover:text-white"
                    }`}
                  >
                    {lang.code} — {lang.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenSignUp();
                }}
                className="btn-teal w-full text-center text-sm py-3"
              >
                Sign Up & Join Campaign
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}