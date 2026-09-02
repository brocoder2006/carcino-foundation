"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Set initial centered offset
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50, opacity: 0 });

    // High performance GSAP quickTo setters for 120fps smooth cursor movement
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power3.out" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      gsap.set([cursor, follower], { opacity: 1 });
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Interactive expansion on hoverable elements
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 0.3, backgroundColor: "#FF5A5F", duration: 0.2 });
      gsap.to(follower, {
        scale: 2.4,
        borderColor: "rgba(166, 109, 255, 0.8)",
        backgroundColor: "rgba(166, 109, 255, 0.15)",
        boxShadow: "0 0 30px rgba(166, 109, 255, 0.4)",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "#1FB6A8", duration: 0.2 });
      gsap.to(follower, {
        scale: 1,
        borderColor: "rgba(31, 182, 168, 0.5)",
        backgroundColor: "transparent",
        boxShadow: "none",
        duration: 0.3,
      });
    };

    const interactives = document.querySelectorAll(
      "a, button, .showcase-card, .glass-card, .glass-glow-card, input, select, h1, h2"
    );

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-teal rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
      {/* Smooth Trailing Spring Ring with Dynamic Aura */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-teal/50 rounded-full pointer-events-none z-[9998] hidden md:block transition-shadow duration-300"
      />
    </>
  );
}
