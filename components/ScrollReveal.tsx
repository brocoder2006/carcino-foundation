"use client";

import { motion, MotionProps, Variants } from "framer-motion";

interface ScrollRevealProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeScale" | "fadeLeft" | "fadeRight" | "scaleIn";
  staggerDelay?: number;
  index?: number;
  once?: boolean;
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  },
  fadeScale: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  },
};

export default function ScrollReveal({
  children,
  className = "",
  variant = "fadeUp",
  staggerDelay = 0.08,
  index = 0,
  once = true,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={variants[variant]}
      transition={{ delay: index * staggerDelay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
