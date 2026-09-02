"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin, CustomEase);
  CustomEase.create("gsapEase", "M0,0 C0.65,0 0.35,1 1,1");
}

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useGSAP(
    () => {
      const loader = loaderRef.current;
      const plane = planeRef.current;
      const trail = trailRef.current;
      const counter = counterRef.current;
      const brand = brandRef.current;
      const bar = barRef.current;

      if (!loader || !plane || !counter || !brand || !bar) return;

      // Lock body scroll during preloader animation
      document.body.style.overflow = "hidden";

      const counterObj = { value: 0 };

      // Set initial off-screen airplane starting state (bottom-left)
      gsap.set(plane, {
        x: "-20vw",
        y: "80vh",
        scale: 0.4,
        rotation: -40,
        opacity: 0,
      });

      if (trail) {
        gsap.set(trail, { strokeDasharray: 800, strokeDashoffset: 800 });
      }

      // Master GSAP Airplane Preloader Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          setIsDone(true);
        },
      });

      // 1. Plane appears & swoops in from bottom-left to viewport center
      tl.to(plane, {
        opacity: 1,
        x: "35vw",
        y: "42vh",
        scale: 1,
        rotation: -10,
        duration: 1.1,
        ease: "power2.out",
      });

      // Jet Vapor Trail extension
      if (trail) {
        tl.to(
          trail,
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.out",
          },
          0
        );
      }

      // 2. Scramble brand title as plane approaches center
      tl.to(
        brand,
        {
          duration: 1.2,
          scrambleText: {
            text: "THE CARCINO FOUNDATION",
            chars: "upperAndLowerCase",
            speed: 0.5,
          },
          ease: "power2.out",
        },
        0.3
      );

      // 3. Count up 0% -> 100% & Progress Bar Fill
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 1.4,
          ease: "power3.inOut",
          onUpdate: () => {
            counter.innerText = `${Math.floor(counterObj.value)}%`;
          },
        },
        0.3
      );

      tl.to(
        bar,
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
        },
        0.3
      );

      // 4. Plane accelerates up & soars off-screen into the sky (top-right)
      tl.to(plane, {
        x: "120vw",
        y: "-30vh",
        scale: 2.2,
        rotation: 25,
        duration: 0.9,
        ease: "power3.in",
      });

      // Fade out text & counter as plane soars
      tl.to(
        [brand, counter, bar],
        {
          y: -50,
          opacity: 0,
          stagger: 0.06,
          duration: 0.45,
          ease: "power2.in",
        },
        "-=0.6"
      );

      // 5. Preloader Curtain morph & lift-off reveal
      tl.to(
        loader,
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.3"
      );
    },
    { scope: loaderRef }
  );

  if (isDone) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100000] bg-[#070912] flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden"
    >
      {/* Dynamic Flight Path Radar Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1FB6A8_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* SVG Flight Trail */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <path
          ref={trailRef}
          d="M -100 800 Q 300 500 500 350"
          stroke="url(#plane-trail-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="plane-trail-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#1FB6A8" />
            <stop offset="100%" stopColor="#A66DFF" />
          </linearGradient>
        </defs>
      </svg>

      {/* FLYING PLANE CONTAINER */}
      <div
        ref={planeRef}
        className="fixed top-0 left-0 z-20 pointer-events-none filter drop-shadow-[0_0_30px_rgba(31,182,168,0.8)]"
      >
        {/* Dynamic Vector Aircraft SVG */}
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
          {/* Main Fuselage & Wings */}
          <path
            d="M95 50 L10 10 L30 50 L10 90 Z"
            fill="url(#plane-grad)"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Wing Crease */}
          <path d="M95 50 L30 50" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
          {/* Wing Shading */}
          <path d="M30 50 L10 90 L50 50 Z" fill="rgba(0,0,0,0.25)" />
          <defs>
            <linearGradient id="plane-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34D1C2" />
              <stop offset="50%" stopColor="#FF5A5F" />
              <stop offset="100%" stopColor="#A66DFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top Header Label */}
      <div className="relative z-10 flex justify-between items-center text-xs font-mono text-teal uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
          <span>FLIGHT PATH ACTIVE</span>
        </span>
        <span>PRIDE CAMPAIGN 2026</span>
      </div>

      {/* Center Scramble Headline & Counter */}
      <div className="relative z-10 my-auto text-center flex flex-col items-center">
        <h1
          ref={brandRef}
          className="font-winter-solace text-[clamp(1.8rem,5.5vw,4.5rem)] text-white uppercase tracking-widest mb-4 drop-shadow-lg"
        >
          #X8#kL9@!0?&m$
        </h1>

        {/* Dynamic Progress Bar */}
        <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden my-4 relative border border-white/10 shadow-inner">
          <div
            ref={barRef}
            className="w-full h-full bg-gradient-to-r from-pride-red via-teal to-pride-purple origin-left scale-x-0 shadow-[0_0_15px_rgba(31,182,168,0.9)]"
          />
        </div>

        {/* Percentage Counter */}
        <span
          ref={counterRef}
          className="font-mono text-3xl sm:text-4xl font-bold text-teal tracking-wider mt-2 drop-shadow-md"
        >
          0%
        </span>
      </div>

      {/* Bottom Footer Label */}
      <div className="relative z-10 flex justify-between items-center text-xs font-mono text-purple-300/70 uppercase tracking-widest">
        <span>TAKING FLIGHT FOR HEALTH EQUITY</span>
        <span>GSAP AERO ENTRANCE</span>
      </div>
    </div>
  );
}
