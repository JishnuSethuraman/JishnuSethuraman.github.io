"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  delay?: number;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className,
  delay = 0,
}: SectionProps) {
  const reduceMotion = useReducedMotion();

  const item = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 18, scale: 0.99, filter: "blur(10px)" },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.65,
          },
        },
      };

  const container = reduceMotion
    ? {}
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.04 + delay,
          },
        },
      };

  return (
    <motion.section
      id={id}
      className={
        className ??
        "mx-auto max-w-6xl px-6 py-24 border-t border-white/10 bg-black"
      }
      variants={container as any}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.h2 variants={item as any} className="text-2xl font-semibold text-white">
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p variants={item as any} className="mt-3 text-white/70">
          {subtitle}
        </motion.p>
      ) : null}

      {children ? <motion.div variants={item as any} className="mt-10">{children}</motion.div> : null}
    </motion.section>
  );
}
