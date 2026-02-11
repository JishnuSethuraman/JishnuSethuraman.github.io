"use client";

import { motion, useReducedMotion } from "framer-motion";

type CareerItem = {
  org: string;
  location: string;
  role: string;
  dates: string;
  tags: string[];
  accent?: "blue" | "green" | "amber" | "pink";
};

const ACCENT: Record<NonNullable<CareerItem["accent"]>, string> = {
  blue: "bg-sky-400",
  green: "bg-emerald-400",
  amber: "bg-amber-300",
  pink: "bg-pink-400",
};

export default function CareerTimeline() {
  const reduceMotion = useReducedMotion();

  const items: CareerItem[] = [
    {
      org: "RTX: Collins Aerospace",
      location: "Cedar Rapids, IA",
      role: "ML/AI Intern",
      dates: "May 2025 - August 2025",
      tags: ["ML/AI", "Full-Stack"],
      accent: "blue",
    },
    {
      org: "Rutgers University",
      location: "New Brunswick, NJ",
      role: "Research Assistant",
      dates: "Sep 2023 – May 2024",
      tags: ["ML/AI"],
      accent: "blue",
    },
    {
      org: "PPL Corporation",
      location: "Allentown, PA",
      role: "Protection and Control Intern",
      dates: "May 2023 – August 2023",
      tags: ["EE", "Power Systems"],
      accent: "blue",
    },
    {
      org: "Metro Analytics - Rutgers",
      location: "",
      role: "Data Science Extern",
      dates: "Sep 2022 – Dec 2022",
      tags: ["SQL", "Data Analysis"],
      accent: "blue",
    },
  ];

  const cardBase =
    "relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm";

  const gridInlayStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
    backgroundSize: "64px 64px",
  };

  return (
    <div className="relative">
      {/* left timeline rail */}
      <div className="absolute left-3 top-0 h-full w-px bg-white/10" />

      <div className="space-y-6">
        {items.map((it, idx) => {
          const dot = it.accent ? ACCENT[it.accent] : "bg-white/50";

          return (
            <div key={idx} className="relative pl-10">
              {/* dot */}
              <div className="absolute left-3 top-7 -translate-x-1/2">
                <div className={`h-3 w-3 rounded-full ${dot}`} />
                <div className="mt-2 h-6 w-px bg-white/10 mx-auto" />
              </div>

              <motion.div
                className={cardBase}
                style={gridInlayStyle}
                initial={false}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                        boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
                        borderColor: "rgba(255,255,255,0.18)",
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { type: "spring", stiffness: 260, damping: 22, mass: 0.7 }
                }
              >
                {/* subtle inner glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(80%_60%_at_30%_20%,rgba(255,255,255,0.06),transparent_55%)]" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm text-white/70">
                      <span className="font-medium text-white/80">{it.org}</span>
                      {it.location ? <span> — {it.location}</span> : null}
                    </div>

                    <div className="mt-1 text-xl font-semibold text-white">
                      {it.role}
                    </div>

                    <div className="mt-1 text-sm text-white/60">{it.dates}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
