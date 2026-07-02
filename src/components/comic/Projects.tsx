"use client";

import { type CSSProperties } from "react";
import Reveal from "./Reveal";
import { useDisclosure, panelClosedStyle } from "./useDisclosure";
import { MARKER, MONO, SANS } from "./ui";

type Project = {
  id: string;
  file: string;
  title: string;
  tags: string[];
  desc: string;
  href: string;
  rot: number;
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    file: "FILE_01",
    title: "LLM Model Distillation",
    tags: ["ML", "PyTorch", "Python"],
    desc: "Distilling BERT into smaller models with minimal performance loss — compressing large transformers for faster, cheaper inference.",
    href: "https://github.com/JishnuSethuraman/temprep",
    rot: -0.5,
  },
  {
    id: "p2",
    file: "FILE_02",
    title: "Raise-25 Hackathon",
    tags: ["ML", "PyTorch", "HuggingFace"],
    desc: "Sentiment analysis & topic modelling for news headlines using LLMs — built under hackathon time pressure.",
    href: "https://github.com/MukulRamesh/Raise-25",
    rot: 0.5,
  },
  {
    id: "p3",
    file: "FILE_03",
    title: "Portfolio Website",
    tags: ["Next.js", "TypeScript", "CSS Animation"],
    desc: "The comic-panel site you’re reading right now — kinetic type, panel reveals and page-turn transitions.",
    href: "https://github.com/JishnuSethuraman/JishnuSethuraman.github.io",
    rot: -0.4,
  },
  {
    id: "p4",
    file: "FILE_04",
    title: "Stock Market LSTM",
    tags: ["LSTMs", "sklearn", "Python"],
    desc: "Predicting price movements from historical data and news sentiment with recurrent networks.",
    href: "https://github.com/JishnuSethuraman/Stock-Market-Prediction-Model",
    rot: 0.4,
  },
  {
    id: "p5",
    file: "FILE_05",
    title: "Healthcare LLM Assistant",
    tags: ["OpenAI API", "LLMs", "Python"],
    desc: "Explains diagnoses, treatments & medications to patients in plain language via a conversational LLM.",
    href: "https://github.com/JishnuSethuraman/HealthcareLLM",
    rot: -0.5,
  },
  {
    id: "p6",
    file: "FILE_06",
    title: "Smart Home ML / IoT",
    tags: ["ML", "IoT", "Python"],
    desc: "Optimizes home energy use from user habits and weather forecasts across connected devices.",
    href: "https://github.com/JishnuSethuraman/MLIoTProject",
    rot: 0.45,
  },
  {
    id: "p7",
    file: "FILE_07",
    title: "GAN Image Enhancement",
    tags: ["GANs", "Computer Vision", "PyTorch"],
    desc: "Enhancing low-res, low-light & noisy images to high-res with a Retinex + Real-ESRGAN GAN pipeline.",
    href: "https://github.com/JishnuSethuraman/ReflectanceBased-DIRetinex-RealESRGAN-ImageEnhancement-Pipeline",
    rot: -0.45,
  },
  {
    id: "p8",
    file: "FILE_08",
    title: "Time-Series Anomaly Detection",
    tags: ["Autoencoders", "Time-Series", "PyTorch"],
    desc: "Autoencoders identifying unusual patterns in sensor data for predictive maintenance.",
    href: "https://github.com/JishnuSethuraman",
    rot: 0.5,
  },
];

function ProjectCard({ p }: { p: Project }) {
  const { open, toggle, panelRef } = useDisclosure();
  return (
    <div
      style={{
        scrollSnapAlign: "start",
        flex: "0 0 clamp(268px,27vw,340px)",
        background: "var(--panel)",
        border: "3px solid var(--ink)",
        boxShadow: "8px 8px 0 var(--ink)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        transform: `rotate(${p.rot}deg)`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, lineHeight: 1, color: "var(--acc)" }}>{p.file}</span>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, lineHeight: 1, color: "var(--muted)" }}>CLASSIFIED ▾</span>
      </div>
      <h3 style={{ margin: "14px 0 12px", fontFamily: MARKER, fontWeight: 400, fontSize: "clamp(22px,2vw,30px)", lineHeight: 1, color: "var(--ink)" }}>{p.title}</h3>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
        {p.tags.map((t) => (
          <span key={t} style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10.5, lineHeight: 1, color: "var(--ink)", border: "1.5px solid var(--ink)", padding: "5px 8px" }}>{t}</span>
        ))}
      </div>
      <button
        className="press-scale"
        onClick={toggle}
        aria-expanded={open}
        style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, cursor: "pointer", fontFamily: MONO, fontWeight: 700, fontSize: 12, lineHeight: 1, letterSpacing: ".06em", color: "#15120c", background: "var(--acc)", border: "2.5px solid var(--ink)", padding: "11px 13px" }}
      >
        <span>{open ? "CLOSE FILE" : "OPEN FILE"}</span>
        <span style={{ display: "inline-block", transition: "transform .28s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▸</span>
      </button>
      <div ref={panelRef} style={panelClosedStyle}>
        <p style={{ margin: "14px 0 14px", fontFamily: SANS, fontWeight: 500, fontSize: 14, lineHeight: 1.5, color: "var(--text)" }}>{p.desc}</p>
        <a className="hov-fill" href={p.href} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontWeight: 700, fontSize: 11.5, lineHeight: 1, letterSpacing: ".05em", color: "var(--ink)", border: "2.5px solid var(--ink)", padding: "10px 12px" }}>OPEN ON GITHUB ↗</a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="chapter-2" data-role="projPin" style={{ position: "relative", height: "300vh", background: "var(--panel2)", scrollMarginTop: "var(--bar)" }}>
      <div
        data-role="projSticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          minHeight: 620,
          overflow: "hidden",
          background: "var(--panel2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "calc(var(--bar) + clamp(8px,1.5vh,20px)) 0 clamp(16px,2.5vh,32px)",
        }}
      >
        <div data-px="0.08" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "transform" }}>
          <div style={{ position: "absolute", right: "-2vw", top: "16%", fontFamily: MARKER, fontSize: "min(30vh,26vw)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2px var(--line)", opacity: 0.24 }}>03</div>
          <div className="ray-layer" style={{ position: "absolute", left: "88%", top: "52%", width: "180vmax", height: "180vmax", transform: "translate(-50%,-50%)", opacity: 0.04, background: "repeating-conic-gradient(from 0deg at 50% 50%,var(--ink) 0deg .45deg,transparent .45deg 3.2deg)", WebkitMask: "radial-gradient(circle,transparent 5%,#000 24%,transparent 74%)", mask: "radial-gradient(circle,transparent 5%,#000 24%,transparent 74%)", animation: "spinRev 200s linear infinite" }} />
          <div style={{ position: "absolute", left: "8%", top: "14%", width: "clamp(50px,5vw,96px)", height: "clamp(42px,4.2vw,80px)", background: "var(--ink)", opacity: 0.07, borderRadius: "58% 42% 65% 35%/45% 60% 40% 55%", transform: "rotate(20deg)", animation: "floatB 18s ease-in-out infinite" }} />
          <span style={{ position: "absolute", left: "5%", bottom: "14%", fontFamily: MARKER, fontSize: "clamp(26px,2.8vw,50px)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2.5px var(--acc)", animation: "popOccasional 10s ease-in-out infinite", animationDelay: "-5s" }}>CASE&nbsp;FILES</span>
          <span style={{ position: "absolute", left: "10%", top: "40%", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, color: "var(--muted)", opacity: 0.7, animation: "floatA 12s ease-in-out infinite" }}>model.eval()</span>
          <div style={{ position: "absolute", top: "9%", left: 0, width: "52vw", height: 3, background: "linear-gradient(90deg,transparent,var(--acc),transparent)", opacity: 0.28, animation: "flyAcross 11s linear infinite" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 960, margin: "0 auto", padding: "0 clamp(20px,5vw,90px)" }}>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(10px,.9vw,13px)", lineHeight: 1, letterSpacing: ".24em", color: "var(--muted)", marginBottom: 12 }}>PAGE 03</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: "clamp(24px,3vh,44px)" }}>
            <div>
              <Reveal kind="wipe" as="span" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,14px)", lineHeight: 1, letterSpacing: ".18em", color: "#15120c", background: "var(--acc)", border: "3px solid var(--ink)", padding: "8px 12px", transform: "rotate(-1.5deg)" }}>
                CHAPTER 02 // SELECTED BUILDS
              </Reveal>
              <Reveal kind="slam" as="h2" style={{ margin: "14px 0 0", fontFamily: MARKER, fontWeight: 400, fontSize: "clamp(40px,6vw,96px)", lineHeight: 0.9, color: "var(--ink)", textShadow: ".045em .045em 0 var(--acc)" }}>
                THE WORK
              </Reveal>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
              <Reveal
                kind="sfx"
                as="span"
                style={{ "--sr": "-8deg", display: "inline-block", fontFamily: MARKER, fontSize: "clamp(28px,4vw,58px)", lineHeight: 0.8, color: "transparent", WebkitTextStroke: "2.5px var(--acc)" } as CSSProperties}
              >
                SHIP IT!
              </Reveal>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 12, lineHeight: 1.5, letterSpacing: ".1em", color: "var(--muted)", textAlign: "right" }}>
                <span data-role="fileHud" style={{ color: "var(--acc)" }}>FILE 01 / 08</span> · SCROLL TO FLIP THE SHELF
                <br />
                TAP A PANEL TO OPEN THE FILE
              </span>
            </div>
          </div>
        </div>

        <div
          data-role="shelf"
          className="shelf"
          style={{ display: "flex", gap: "clamp(16px,2vw,28px)", overflowX: "auto", padding: "8px clamp(20px,5vw,90px) 34px", scrollSnapType: "x proximity", cursor: "grab", WebkitOverflowScrolling: "touch" }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
