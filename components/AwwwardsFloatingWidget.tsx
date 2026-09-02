"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AwwwardsFloatingWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("Home");

  useGSAP(
    () => {
      const widget = widgetRef.current;
      if (!widget) return;

      // Magnetic float animation
      gsap.to(widget, {
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: widgetRef }
  );

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Story", href: "#mission" },
    { label: "Articles", href: "#articles" },
  ];

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-navy-950/85 backdrop-blur-2xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] select-none"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-teal animate-ping" />
      <span className="text-[0.7rem] font-mono tracking-widest text-teal uppercase font-semibold mr-1">
        AWWWARDS DESIGN
      </span>

      <div className="h-4 w-[1px] bg-white/20" />

      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setActiveSection(item.label)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              activeSection === item.label
                ? "bg-purple-500/25 text-purple-300 border border-purple-400/40"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
