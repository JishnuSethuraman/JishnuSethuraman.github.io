"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const nameAnim = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.985, filter: "blur(6px)" },
        animate: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.7,
          },
        },
      };

  const descAnim = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: -26, filter: "blur(10px)" },
        animate: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 380, // feels “snappy”
            damping: 24, // controls “velocity”
            mass: 0.55,
            delay: 0.12,
          },
        },
      };

  const streakBase =
    "absolute left-1/2 -translate-x-1/2 rounded-full blur-[0.2px] opacity-0";

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* soft radial glow */}
        <div className="absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(circle at 50% 25%, black 35%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 25%, black 35%, transparent 70%)",
          }}
        />

        {/* Velocity streaks */}
        {!reduceMotion && (
          <>
            <motion.div
              className={`${streakBase} top-[160px] h-[2px] w-[520px] bg-white/20`}
              initial={{ opacity: 0, x: -40, scaleX: 0.85 }}
              animate={{
                opacity: 1,
                x: 0,
                scaleX: 1,
                transition: { type: "spring", stiffness: 220, damping: 24 },
              }}
            />
            <motion.div
              className={`${streakBase} top-[210px] h-[2px] w-[420px] bg-white/14`}
              initial={{ opacity: 0, x: 36, scaleX: 0.9 }}
              animate={{
                opacity: 1,
                x: 0,
                scaleX: 1,
                transition: {
                  type: "spring",
                  stiffness: 220,
                  damping: 26,
                  delay: 0.08,
                },
              }}
            />
            <motion.div
              className={`${streakBase} top-[260px] h-[2px] w-[320px] bg-white/10`}
              initial={{ opacity: 0, x: -26, scaleX: 0.9 }}
              animate={{
                opacity: 1,
                x: 0,
                scaleX: 1,
                transition: {
                  type: "spring",
                  stiffness: 220,
                  damping: 28,
                  delay: 0.14,
                },
              }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="max-w-3xl">
          <motion.h1
            {...nameAnim}
            className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Jayadityan Sethuraman
          </motion.h1>

          <motion.p
            {...descAnim}
            className="mt-6 text-balance text-lg leading-relaxed text-white/72 sm:text-xl"
          >
            I build clean, high-performance software — from ML systems to
            full-stack products. Here are the projects I’m proud of.
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 backdrop-blur transition hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
