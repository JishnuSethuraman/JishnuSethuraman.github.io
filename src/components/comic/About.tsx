"use client";

import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import { useDisclosure, panelClosedStyle } from "./useDisclosure";
import { MARKER, MONO, SANS, STAR } from "./ui";

const redactStyle = (transition: string): CSSProperties => ({
  background: "var(--ink)",
  color: "transparent",
  padding: "0 5px",
  WebkitBoxDecorationBreak: "clone",
  boxDecorationBreak: "clone",
  transition,
});

const boltPath = "polygon(62% 0,20% 55%,44% 55%,34% 100%,80% 40%,55% 40%)";

export default function About() {
  const { open, toggle, panelRef } = useDisclosure();

  return (
    <section
      id="chapter-3"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "clamp(64px,9vh,130px) clamp(20px,5vw,90px)",
        overflow: "hidden",
        scrollMarginTop: "var(--bar)",
      }}
    >
      <div data-px="0.09" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "transform" }}>
        <div style={{ position: "absolute", right: "6%", top: "14%", width: "clamp(40px,4vw,72px)", height: "clamp(40px,4vw,72px)", background: "var(--acc)", clipPath: STAR, opacity: 0.85, animation: "spinSlowLocal 18s linear infinite,pulseScale 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: "-2vw", bottom: "6%", fontFamily: MARKER, fontSize: "min(30vh,26vw)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2px var(--line)", opacity: 0.22 }}>04</div>
        <div className="ray-layer" style={{ position: "absolute", left: "70%", top: "30%", width: "150vmax", height: "150vmax", transform: "translate(-50%,-50%)", opacity: 0.04, background: "repeating-conic-gradient(from 0deg at 50% 50%,var(--ink) 0deg .4deg,transparent .4deg 3.6deg)", WebkitMask: "radial-gradient(circle,transparent 6%,#000 28%,transparent 78%)", mask: "radial-gradient(circle,transparent 6%,#000 28%,transparent 78%)", animation: "spinSlow 220s linear infinite" }} />
        <div style={{ position: "absolute", right: "16%", bottom: "16%", width: "clamp(60px,6vw,110px)", height: "clamp(90px,8.6vw,170px)", background: "var(--acc)", clipPath: boltPath, opacity: 0, filter: "drop-shadow(0 0 12px var(--acc))", animation: "boltFlash 8s linear infinite", animationDelay: "-3s" }} />
        <span style={{ position: "absolute", left: "8%", top: "16%", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, color: "var(--muted)", opacity: 0.7, animation: "floatB 11s ease-in-out infinite" }}>whoami</span>
        <div style={{ position: "absolute", left: "16%", bottom: "26%", width: "clamp(46px,4.6vw,90px)", height: "clamp(40px,4vw,80px)", background: "var(--ink)", opacity: 0.06, borderRadius: "38% 62% 45% 55%/62% 38% 60% 40%", transform: "rotate(-12deg)", animation: "floatA 14s ease-in-out infinite" }} />
      </div>

      <div data-dolly style={{ position: "relative", maxWidth: 820, margin: "0 auto", willChange: "transform" }}>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(10px,.9vw,13px)", lineHeight: 1, letterSpacing: ".24em", color: "var(--muted)", marginBottom: 12 }}>PAGE 04</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          <Reveal kind="wipe" as="span" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,14px)", lineHeight: 1, letterSpacing: ".18em", color: "#15120c", background: "var(--acc)", border: "3px solid var(--ink)", padding: "8px 12px", transform: "rotate(-1.5deg)" }}>
            CHAPTER 03 // ORIGIN FILE
          </Reveal>
          <Reveal
            kind="sfx"
            as="span"
            style={{ "--sr": "6deg", display: "inline-block", marginLeft: "auto", fontFamily: MARKER, fontSize: "clamp(28px,4vw,58px)", lineHeight: 0.8, color: "transparent", WebkitTextStroke: "2.5px var(--acc)" } as CSSProperties}
          >
            DECODE
          </Reveal>
        </div>
        <Reveal kind="slam" as="h2" style={{ margin: "16px 0 22px", fontFamily: MARKER, fontWeight: 400, fontSize: "clamp(40px,6vw,96px)", lineHeight: 0.9, color: "var(--ink)", textShadow: ".045em .045em 0 var(--acc)" }}>
          THE ENGINEER
        </Reveal>
        <Reveal kind="slam" delay={0.1} style={{ position: "relative", background: "var(--panel)", border: "3px solid var(--ink)", boxShadow: "10px 10px 0 var(--ink)", padding: "clamp(22px,2.4vw,38px)" }}>
          <span style={{ position: "absolute", left: "clamp(16px,2vw,28px)", top: -14, fontFamily: MONO, fontWeight: 700, fontSize: 11, lineHeight: 1, letterSpacing: ".14em", color: "#15120c", background: "var(--acc)", border: "2.5px solid var(--ink)", padding: "5px 9px" }}>DOSSIER</span>
          <Reveal
            kind="sfx"
            as="span"
            delay={0.5}
            style={{ "--sr": "8deg", position: "absolute", right: "clamp(14px,1.8vw,26px)", top: -20, fontFamily: MARKER, fontSize: "clamp(18px,1.6vw,28px)", lineHeight: 1, letterSpacing: ".04em", color: "var(--acc)", border: "3px solid var(--acc)", padding: "5px 10px", background: "var(--panel)" } as CSSProperties}
          >
            DECLASSIFIED
          </Reveal>
          <p style={{ margin: 0, fontFamily: SANS, fontWeight: 500, fontSize: "clamp(15px,1.5vw,21px)", lineHeight: 1.62, color: "var(--text)" }}>
            Machine Learning Engineer with experience architecting{" "}
            <Reveal kind="redact" as="span" style={redactStyle("background .7s .35s ease,color .5s .6s ease")}>
              high-performance LLM pipelines
            </Reveal>
            ,{" "}
            <Reveal kind="redact" as="span" style={redactStyle("background .7s .55s ease,color .5s .8s ease")}>
              retrieval-augmented generation systems
            </Reveal>
            , and scalable deep learning models across research and industry.
          </p>
          <div ref={panelRef} style={panelClosedStyle}>
            <p style={{ margin: "18px 0 0", fontFamily: SANS, fontWeight: 500, fontSize: "clamp(15px,1.5vw,21px)", lineHeight: 1.62, color: "var(--text)" }}>
              Proven track record of optimizing model efficiency, accelerating inference, and delivering{" "}
              <Reveal kind="redact" as="span" style={redactStyle("background .7s .3s ease,color .5s .55s ease")}>
                production-grade AI solutions
              </Reveal>{" "}
              using modern MLOps, cloud infrastructure, and data engineering best practices.
            </p>
          </div>
          <button
            className="hov-fill"
            onClick={toggle}
            aria-expanded={open}
            style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: MONO, fontWeight: 700, fontSize: 12, lineHeight: 1, letterSpacing: ".06em", color: "var(--ink)", background: "transparent", border: "2.5px solid var(--ink)", padding: "11px 14px" }}
          >
            <span>{open ? "LESS ▴" : "CONTINUE READING"}</span>
            <span style={{ display: "inline-block", color: "var(--acc)", transition: "transform .28s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▸</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
