"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  href: string; // github url
  imageSrc: string; // /projects/p1.png
  tags: string[];
  accent: string; // css color like "rgba(255,255,255,0.10)" or "#60a5fa"
};

type Spotlight = {
  x: number;
  y: number;
  accent: string;
  active: boolean;
};

export default function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = useMemo(
    () => [
      {
        title: "LLM Model Distillation",
        description: "Performing Distillations of BERT to smaller models with minimal performance loss.",
        href: "https://github.com/JishnuSethuraman/temprep",
        imageSrc: "/Model distillation explained visually.png",
        tags: ["ML", "Pytorch", "Python"],
        accent: "rgba(23, 155, 216, 0.87)",
      },
      {
        title: "Raise-25 Hackathon",
        description: "Sentiment analysis and Topic Modelling for News Headlines using LLMs.",
        href: "https://github.com/MukulRamesh/Raise-25",
        imageSrc: "Future tech hackathon in action.png",
        tags: ["ML", "PyTorch", "HuggingFace", "Python"],
        accent: "rgba(189, 19, 223, 0.48)",
      },
      {
        title: "Portfolio Website",
        description: "The website you see!",
        href: "https://github.com/JishnuSethuraman/JishnuSethuraman.github.io",
        imageSrc: "Alex Johnson portfolio website concept.png",
        tags: ["Next.js", "TypeScript", "UI/UX", "Framer Motion"],
        accent: "rgba(255, 255, 255, 0.38)",
      },
      {
        title: "Stock Market Prediction using LSTMs",
        description: "Using LSTMs to predict stock price movements based on historical data and news sentiment.",
        href: "https://github.com/JishnuSethuraman/Stock-Market-Prediction-Model",
        imageSrc: "Futuristic stock market prediction illustration.png",
        tags: ["ML", "Python", "sklearn", "LSTMs"],
        accent: "rgba(12, 168, 46, 0.6)",
      },
      {
        title: "Healthcare LLM Assistant",
        description: "An LLM-powered assistant designed to help patients understand diagnoses, treatment options, and medication instructions in simple language.",
        href: "https://github.com/JishnuSethuraman/HealthcareLLM",
        imageSrc: "Healthcare LLMs and AI doctor robot.png",
        tags: ["OpenAI API", "LLMs", "Python"],
        accent: "rgba(3, 165, 240, 0.56)",
      },
      {
        title: "Smart Home System",
        description: "Optimizes energy consumption based on user habits and weather forecasts.",
        href: "https://github.com/JishnuSethuraman/MLIoTProject",
        imageSrc: "Modern smart home at twilight.png",
        tags: ["ML", "Python", "IoT"],
        accent: "rgba(255, 196, 0, 0.56)",
      },
      {
        title: "Image Enhancement with GANs",
        description: "Using Generative Adversarial Networks to enhance low-resolution images to high-resolution. Low light and noisy image enhancement.",
        href: "https://github.com/JishnuSethuraman/ReflectanceBased-DIRetinex-RealESRGAN-ImageEnhancement-Pipeline",
        imageSrc: "Golden sunset over the Grand Canyon.png",
        tags: ["GANs", "Computer Vision", "Python", "PyTorch"],
        accent: "rgba(255, 115, 1, 0.54)",
      },
      {
        title: "Anomaly Detection in Time-Series Data",
        description: "Time series anomaly detection using Autoencoders to identify unusual patterns in sensor data.",
        href: "https://github.com/JishnuSethuraman/ReflectanceBased-DIRetinex-RealESRGAN-ImageEnhancement-Pipeline",
        imageSrc: "Futuristic stock market prediction illustration.png",
        tags: ["GANs", "Computer Vision", "Python", "PyTorch"],
        accent: "rgba(192, 39, 179, 0.54)",
      },
    ],
    []
  );

  const [spot, setSpot] = useState<Spotlight>({
    x: 0,
    y: 0,
    accent: "rgba(255,255,255,0.10)",
    active: false,
  });

  function setSpotFromCard(el: HTMLElement, accent: string) {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const w = wrap.getBoundingClientRect();
    const r = el.getBoundingClientRect();

    const x = r.left - w.left + r.width * 0.55;
    const y = r.top - w.top + r.height * 0.45;

    setSpot({ x, y, accent, active: true });
  }

  function clearSpot() {
    setSpot((s) => ({ ...s, active: false }));
  }

  const gridInlayStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
    backgroundSize: "64px 64px",
  };

  return (
    <section
      id="projects"
      className="relative isolate border-t border-white/10"
    >
      {/* Embedded section background (reacts to hovered card) */}
      <div ref={wrapRef} className="relative">
        <div className="absolute inset-0 -z-10">
          {/* base */}
          <div className="absolute inset-0 bg-black" />

          {/* subtle grid inlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={gridInlayStyle}
          />

          {/* spotlight that reacts to hover */}
          {!reduceMotion && (
            <motion.div
              aria-hidden
              className="absolute inset-0"
              animate={
                spot.active
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.25 }}
              style={{
                backgroundImage: `radial-gradient(700px 520px at ${spot.x}px ${spot.y}px, ${spot.accent}, transparent 65%)`,
              }}
            />
          )}

          {/* gentle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>

        {/* Header */}
        <div className="mx-auto max-w-6xl px-6 pt-24">
          <h2 className="text-2xl font-semibold text-white">A curated set of things I’ve built focused on engineering quality, clarity, and impact.</h2>
        </div>

        {/* Embedded scroll container */}
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_80px_rgba(0,0,0,0.60)]"
            onMouseLeave={clearSpot}
          >
            {/* inner grid inlay for the embed container */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={gridInlayStyle}
            />
            <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_20%_10%,rgba(255,255,255,0.06),transparent_55%)]" />

            {/* horizontal scroll */}
            <div
              className="relative flex gap-5 overflow-x-auto p-6 [scrollbar-width:thin] snap-x snap-mandatory"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {projects.map((p, i) => (
                <ProjectCard
                  key={p.title}
                  project={p}
                  index={i}
                  reduceMotion={!!reduceMotion}
                  onHover={(el) => setSpotFromCard(el, p.accent)}
                />
              ))}
            </div>

            {/* subtle bottom fade to feel “embedded” */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/35 to-transparent" />
          </div>

          {/* hint text */}
          <div className="mt-4 text-sm text-white/45">
            Tip: scroll horizontally. Each card opens its GitHub repo.
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  reduceMotion,
  onHover,
}: {
  project: Project;
  index: number;
  reduceMotion: boolean;
  onHover: (el: HTMLElement) => void;
}) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="snap-start group relative w-[320px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm"
      onMouseEnter={(e) => onHover(e.currentTarget)}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,
              boxShadow: "0 22px 60px rgba(0,0,0,0.60)",
              borderColor: "rgba(255,255,255,0.18)",
            }
      }
      transition={
        reduceMotion
          ? undefined
          : { type: "spring", stiffness: 260, damping: 22, mass: 0.7 }
      }
    >
      {/* image */}
      <div className="relative h-40 w-full">
        <Image
          src={project.imageSrc}
          alt={`${project.title} preview`}
          fill
          className="object-cover"
          sizes="320px"
        />
        {/* overlay to keep it on-theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* content */}
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white">{project.title}</h3>
          <span className="text-xs text-white/50 opacity-0 transition group-hover:opacity-100">
            GitHub →
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-white/70">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* grid inlay inside card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* subtle highlight on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(80%_80%_at_30%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
    </motion.a>
  );
}
