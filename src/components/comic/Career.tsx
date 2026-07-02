"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Reveal from "./Reveal";
import { useDisclosure, panelClosedStyle } from "./useDisclosure";
import { MARKER, MONO, SANS, STAR } from "./ui";

type Node = {
  tag: string;
  date: string;
  org: string;
  role: string;
  loc?: string;
  tags: string[];
  accent: boolean;
  spin: string;
  size: string;
  rot: number;
  reveal?: "flyL" | "flyR";
};

const NODES: Node[] = [
  {
    tag: "NODE 01 // LATEST",
    date: "2026 — PRESENT",
    org: "Deloitte",
    role: "Associate GenAI Engineer",
    loc: "New York, NY",
    tags: ["ML/AI", "GenAI", "Full-Stack"],
    accent: true,
    spin: "spinSlowLocal 18s linear infinite",
    size: "clamp(30px,4vw,44px)",
    rot: -0.4,
    reveal: "flyL",
  },
  {
    tag: "NODE 02",
    date: "MAY 2025 — AUG 2025",
    org: "RTX · Collins Aerospace",
    role: "ML/AI Intern",
    loc: "Cedar Rapids, IA",
    tags: ["ML/AI", "Full-Stack"],
    accent: false,
    spin: "spinRevLocal 24s linear infinite",
    size: "clamp(26px,3.4vw,38px)",
    rot: 0.4,
    reveal: "flyR",
  },
];

const EARLIER: Node[] = [
  {
    tag: "NODE 03",
    date: "SEP 2023 — MAY 2024",
    org: "Rutgers University",
    role: "Research Assistant",
    loc: "New Brunswick, NJ",
    tags: ["ML/AI"],
    accent: true,
    spin: "spinSlowLocal 20s linear infinite",
    size: "clamp(26px,3.4vw,38px)",
    rot: -0.3,
  },
  {
    tag: "NODE 04",
    date: "MAY 2023 — AUG 2023",
    org: "PPL Corporation",
    role: "Protection & Control Intern",
    loc: "Allentown, PA",
    tags: ["EE", "Power Systems"],
    accent: false,
    spin: "spinRevLocal 26s linear infinite",
    size: "clamp(26px,3.4vw,38px)",
    rot: 0.3,
  },
  {
    tag: "NODE 05 // ORIGIN",
    date: "SEP 2022 — DEC 2022",
    org: "Metro Analytics · Rutgers",
    role: "Data Science Extern",
    tags: ["SQL", "Data Analysis"],
    accent: true,
    spin: "spinSlowLocal 22s linear infinite",
    size: "clamp(26px,3.4vw,38px)",
    rot: -0.35,
  },
];

// centers node markers on the timeline rail
const markerLeft = "calc(clamp(14px,2.6vw,30px) - clamp(34px,6vw,72px) + 2px)";

const cardStyle = (rot: number): CSSProperties => ({
  transition: "box-shadow .45s ease,border-color .45s ease",
  background: "var(--panel)",
  border: "3px solid var(--ink)",
  boxShadow: "8px 8px 0 var(--ink)",
  padding: "clamp(16px,1.6vw,24px) clamp(18px,1.8vw,28px)",
  transform: `rotate(${rot}deg)`,
});

function CardBody({ node }: { node: Node }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 12, lineHeight: 1, letterSpacing: ".14em", color: "var(--acc)" }}>{node.tag}</span>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(12px,1.1vw,15px)", lineHeight: 1, color: "var(--muted)" }}>{node.date}</span>
      </div>
      <h3 style={{ margin: "10px 0 2px", fontFamily: MARKER, fontWeight: 400, fontSize: "clamp(26px,3vw,44px)", lineHeight: 0.98, color: "var(--ink)" }}>{node.org}</h3>
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: "clamp(14px,1.3vw,18px)", lineHeight: 1.3, color: "var(--text)" }}>
        {node.role}
        {node.loc && <span style={{ color: "var(--muted)", fontWeight: 500 }}> · {node.loc}</span>}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {node.tags.map((t) => (
          <span key={t} style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, lineHeight: 1, letterSpacing: ".05em", color: "var(--ink)", border: "2px solid var(--ink)", padding: "6px 9px" }}>{t}</span>
        ))}
      </div>
    </>
  );
}

function TimelineNode({ node, last = false }: { node: Node; last?: boolean }) {
  return (
    <div style={{ position: "relative", marginBottom: last ? 0 : "clamp(20px,3vh,38px)" }}>
      <div style={{ position: "absolute", left: markerLeft, top: 26, width: node.size, height: node.size, transform: "translateX(-50%)" }}>
        <div style={{ position: "absolute", inset: 0, background: node.accent ? "var(--acc)" : "var(--panel)", border: "3px solid var(--ink)", clipPath: STAR, animation: node.spin }} />
      </div>
      {node.reveal ? (
        <Reveal kind={node.reveal} data-tlcard="" style={cardStyle(node.rot)}>
          <CardBody node={node} />
        </Reveal>
      ) : (
        <div data-tlcard="" style={cardStyle(node.rot)}>
          <CardBody node={node} />
        </div>
      )}
    </div>
  );
}

export default function Career() {
  const secRef = useRef<HTMLElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const prRef = useRef<HTMLDivElement>(null);
  const { open, toggle, panelRef } = useDisclosure();

  // timeline progress fill + card lit-glow, ported from the design's onScroll handler
  useEffect(() => {
    const tl = tlRef.current;
    const pr = prRef.current;
    const sec = secRef.current;
    if (!tl || !pr || !sec) return;
    const cards = [...sec.querySelectorAll<HTMLElement>("[data-tlcard]")];
    const lit = new WeakMap<HTMLElement, boolean>();
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        const rc = tl.getBoundingClientRect();
        const total = rc.height || 1;
        const passed = Math.min(total, Math.max(0, vh * 0.55 - rc.top));
        pr.style.height = `${((passed / total) * 100).toFixed(1)}%`;
        for (const c of cards) {
          const r2 = c.getBoundingClientRect();
          if (!r2.height) continue;
          const on = r2.top < vh * 0.55;
          if (lit.get(c) !== on) {
            lit.set(c, on);
            c.style.boxShadow = on
              ? "8px 8px 0 var(--ink), 0 0 30px color-mix(in srgb,var(--acc) 50%,transparent)"
              : "8px 8px 0 var(--ink)";
            c.style.borderColor = on ? "var(--acc)" : "var(--ink)";
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={secRef}
      id="chapter-1"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "clamp(64px,9vh,130px) clamp(20px,5vw,90px) clamp(56px,7vh,100px)",
        overflow: "hidden",
        scrollMarginTop: "var(--bar)",
      }}
    >
      <div data-px="0.08" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "transform" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1.5px)", backgroundSize: "8px 8px", opacity: 0.05 }} />
        <div style={{ position: "absolute", top: "6%", left: 0, width: "60vw", height: 3, background: "linear-gradient(90deg,transparent,var(--acc),transparent)", opacity: 0.3, animation: "flyAcross 10s linear infinite" }} />
        <div style={{ position: "absolute", left: "-2vw", top: "24%", fontFamily: MARKER, fontSize: "min(30vh,26vw)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2px var(--line)", opacity: 0.28 }}>02</div>
        <div style={{ position: "absolute", left: "6%", top: "44%", width: "170vmax", height: "170vmax", transform: "translate(-50%,-50%)", opacity: 0.04, background: "repeating-conic-gradient(from 0deg at 50% 50%,var(--ink) 0deg .4deg,transparent .4deg 3.4deg)", WebkitMask: "radial-gradient(circle,transparent 6%,#000 26%,transparent 76%)", mask: "radial-gradient(circle,transparent 6%,#000 26%,transparent 76%)", animation: "spinSlow 220s linear infinite" }} />
        <div style={{ position: "absolute", right: "10%", top: "12%", width: "clamp(56px,5.4vw,104px)", height: "clamp(48px,4.6vw,88px)", background: "var(--acc)", opacity: 0.14, borderRadius: "38% 62% 45% 55%/62% 38% 60% 40%", transform: "rotate(-16deg)", animation: "floatA 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", right: "26%", bottom: "8%", width: "clamp(120px,12vmax,260px)", height: "clamp(120px,12vmax,260px)", backgroundImage: "radial-gradient(var(--acc) 2px,transparent 2.6px)", backgroundSize: "15px 15px", opacity: 0.14, WebkitMask: "radial-gradient(circle,#000 30%,transparent 70%)", mask: "radial-gradient(circle,#000 30%,transparent 70%)", animation: "floatB 17s ease-in-out infinite" }} />
        <span style={{ position: "absolute", right: "6%", top: "34%", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, color: "var(--muted)", opacity: 0.7, animation: "floatA 11s ease-in-out infinite" }}>git&nbsp;push&nbsp;--force</span>
        <span style={{ position: "absolute", left: "34%", top: "8%", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, color: "rgba(255,106,26,.5)", animation: "floatB 13s ease-in-out infinite" }}>while(true)&nbsp;&#123;&nbsp;learn()&nbsp;&#125;</span>
        <span style={{ position: "absolute", right: "14%", top: "58%", fontFamily: MARKER, fontSize: "clamp(28px,3vw,54px)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2.5px var(--acc)", animation: "popOccasional 8s ease-in-out infinite", animationDelay: "-2s" }}>LEVEL&nbsp;UP!</span>
        <div style={{ position: "absolute", left: "18%", bottom: "20%", width: "clamp(30px,3vw,58px)", height: "clamp(30px,3vw,58px)", background: "var(--acc)", clipPath: STAR, opacity: 0.5, animation: "spinSlowLocal 20s linear infinite,pulseScale 5s ease-in-out infinite" }} />
      </div>

      <div data-dolly style={{ position: "relative", maxWidth: 960, margin: "0 auto", willChange: "transform" }}>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(10px,.9vw,13px)", lineHeight: 1, letterSpacing: ".24em", color: "var(--muted)", marginBottom: 12 }}>PAGE 02</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap", marginBottom: "clamp(30px,4vh,56px)" }}>
          <Reveal kind="wipe" as="span" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,14px)", lineHeight: 1, letterSpacing: ".18em", color: "#15120c", background: "var(--acc)", border: "3px solid var(--ink)", padding: "8px 12px", transform: "rotate(-1.5deg)" }}>
            CHAPTER 01 // FIELD LOG
          </Reveal>
          <Reveal kind="slam" as="h2" style={{ margin: 0, fontFamily: MARKER, fontWeight: 400, fontSize: "clamp(40px,6vw,96px)", lineHeight: 0.9, color: "var(--ink)", textShadow: ".045em .045em 0 var(--acc)" }}>
            THE ORIGIN RUN
          </Reveal>
          <Reveal
            kind="sfx"
            as="span"
            style={{ "--sr": "7deg", display: "inline-block", marginLeft: "auto", fontFamily: MARKER, fontSize: "clamp(28px,4vw,60px)", lineHeight: 0.8, color: "transparent", WebkitTextStroke: "2.5px var(--acc)" } as CSSProperties}
          >
            GRIND!
          </Reveal>
        </div>

        <div ref={tlRef} style={{ position: "relative", paddingLeft: "clamp(34px,6vw,72px)" }}>
          <div style={{ position: "absolute", left: "clamp(14px,2.6vw,30px)", top: 6, bottom: 6, width: 4, background: "var(--line)", opacity: 0.3 }} />
          <div ref={prRef} style={{ position: "absolute", left: "clamp(14px,2.6vw,30px)", top: 6, height: "0%", width: 4, background: "var(--acc)", boxShadow: "0 0 12px var(--acc)" }} />

          {NODES.map((n) => (
            <TimelineNode key={n.tag} node={n} />
          ))}

          {/* earlier chapters toggle */}
          <div style={{ position: "relative", marginBottom: "clamp(20px,3vh,38px)" }}>
            <div style={{ position: "absolute", left: markerLeft, top: 12, width: "clamp(22px,3vw,32px)", height: "clamp(22px,3vw,32px)", transform: "translateX(-50%)", background: "var(--bg)", border: "3px dashed var(--line)", borderRadius: "50%" }} />
            <button
              className="hov-lift"
              onClick={toggle}
              aria-expanded={open}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,14px)", lineHeight: 1, letterSpacing: ".08em", color: "var(--ink)", background: "var(--panel)", border: "3px solid var(--ink)", padding: "12px 16px", boxShadow: "5px 5px 0 var(--ink)" }}
            >
              <span style={{ display: "inline-block", color: "var(--acc)", transition: "transform .28s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▸</span>
              <span>{open ? "HIDE EARLIER CHAPTERS" : "READ EARLIER CHAPTERS (3)"}</span>
            </button>
          </div>

          <div ref={panelRef} style={panelClosedStyle}>
            {EARLIER.map((n, i) => (
              <TimelineNode key={n.tag} node={n} last={i === EARLIER.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
