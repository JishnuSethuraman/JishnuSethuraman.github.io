"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const reduceMotion = useReducedMotion();
    const { scrollY } = useScroll();

  // Different speeds = layered feel
    const gridY = useTransform(scrollY, [0, 1200], [0, 120]);

  const streakBase =
    "absolute left-1/2 -translate-x-1/2 rounded-full blur-[0.2px] opacity-0";

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* soft radial glow */}
        <div className="absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
        {/* subtle vignette so grain has something to blend with */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_25%,rgba(255,255,255,0.06),transparent_60%)]" />

        {!reduceMotion && (
            <motion.div
                aria-hidden
                className="absolute inset-0 opacity-[0.50]"
                style={{
                y: gridY,
                backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                transform: "translate3d(0,0,0)",
                }}
            />
            )}


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
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
        <div className="max-w-4xl">
            <div className="flex items-start gap-6 sm:gap-8">
                {/* Headshot circle */}
                <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1.5, filter: "blur(0px)" }}
                transition={
                    reduceMotion ? undefined : { type: "spring", stiffness: 220, damping: 22, mass: 0.7, delay: 0.02 }
                }
                className="relative mt-1 h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] sm:h-20 sm:w-20"
                >
                <Image
                    src="/headshot.jpg"
                    alt="Headshot"
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover"
                    priority
                />

                {/* subtle rim highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
                </motion.div>

                {/* Name + bio */}
                <div>
                <motion.h1
                    initial={reduceMotion ? undefined : { opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                    animate={reduceMotion ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={reduceMotion ? undefined : { type: "spring", stiffness: 260, damping: 22, mass: 0.7 }}
                    className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
                >
                    Jayadityan Sethuraman
                </motion.h1>

                <motion.p
                    initial={reduceMotion ? undefined : { opacity: 0, y: -26, filter: "blur(10px)" }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={
                    reduceMotion
                        ? undefined
                        : { type: "spring", stiffness: 380, damping: 24, mass: 0.55, delay: 0.12 }
                    }
                    className="mt-6 text-balance text-lg leading-relaxed text-white/72 sm:text-xl"
                >
                    ML/AI Software Engineer. Passionate about building scalable AI systems and innovative applications.
                </motion.p>
                </div>
            </div>
            </div>

      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      
      {/* scroll indicator */}
    <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2">
    <div className="flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-wide">Scroll</span>
        <div className="h-8 w-[1px] overflow-hidden bg-white/15">
        <div className="h-8 w-[1px] bg-white/60 animate-[scrollPulse_1.6s_ease-in-out_infinite]" />
        </div>
    </div>
    </div>
        

    </section>
  );
}
