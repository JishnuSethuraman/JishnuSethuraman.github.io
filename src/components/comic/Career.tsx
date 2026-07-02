"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Parallax from "./Parallax";
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

// centers node markers on the timeline rail (rail sits at clamp(14px,2.6vw,30px)
// inside a container padded by clamp(34px,6vw,72px))
const markerLeft = "calc(clamp(14px,2.6vw,30px) - clamp(34px,6vw,72px) + 2px)";

function TimelineNode({ node, last = false }: { node: Node; last?: boolean }) {
  return (
    <div style={{ position: "relative", marginBottom: last ? 0 : "clamp(20px,3vh,38px)" }}>
      <div
        style={{
          position: "absolute",
          left: markerLeft,
          top: 26,
          width: node.size,
          height: node.size,
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: node.accent ? "var(--acc)" : "var(--panel)",
            border: "3px solid var(--ink)",
            clipPath: STAR,
            animation: node.spin,
          }}
        />
      </div>
      <Reveal
        kind="slam"
        delay={0.05}
        style={{
          background: "var(--panel)",
          border: "3px solid var(--ink)",
          boxShadow: "8px 8px 0 var(--ink)",
          padding: "clamp(16px,1.6vw,24px) clamp(18px,1.8vw,28px)",
          transform: `rotate(${node.rot}deg)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 12,
              lineHeight: 1,
              letterSpacing: ".14em",
              color: "var(--acc)",
            }}
          >
            {node.tag}
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: "clamp(12px,1.1vw,15px)",
              lineHeight: 1,
              color: "var(--muted)",
            }}
          >
            {node.date}
          </span>
        </div>
        <h3
          style={{
            margin: "10px 0 2px",
            fontFamily: MARKER,
            fontWeight: 400,
            fontSize: "clamp(26px,3vw,44px)",
            lineHeight: 0.98,
            color: "var(--ink)",
          }}
        >
          {node.org}
        </h3>
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: "clamp(14px,1.3vw,18px)",
            lineHeight: 1.3,
            color: "var(--text)",
          }}
        >
          {node.role}
          {node.loc && (
            <span style={{ color: "var(--muted)", fontWeight: 500 }}> · {node.loc}</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          {node.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 11,
                lineHeight: 1,
                letterSpacing: ".05em",
                color: "var(--ink)",
                border: "2px solid var(--ink)",
                padding: "6px 9px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function Career() {
  const tlRef = useRef<HTMLDivElement>(null);
  const prRef = useRef<HTMLDivElement>(null);
  const { open, toggle, panelRef } = useDisclosure();

  // timeline progress fill, ported from the design's onScroll handler
  useEffect(() => {
    const tl = tlRef.current;
    const pr = prRef.current;
    if (!tl || !pr) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rc = tl.getBoundingClientRect();
        const total = rc.height || 1;
        const passed = Math.min(total, Math.max(0, window.innerHeight * 0.55 - rc.top));
        pr.style.height = `${((passed / total) * 100).toFixed(1)}%`;
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
      id="chapter-1"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "clamp(64px,9vh,130px) clamp(20px,5vw,90px) clamp(56px,7vh,100px)",
        overflow: "hidden",
        scrollMarginTop: "var(--bar)",
      }}
    >
      <Parallax factor={0.08} style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1.5px)",
            backgroundSize: "8px 8px",
            opacity: 0.05,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "6%",
            left: 0,
            width: "60vw",
            height: 3,
            background: "linear-gradient(90deg,transparent,var(--acc),transparent)",
            opacity: 0.3,
            animation: "flyAcross 10s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-2vw",
            top: "24%",
            fontFamily: MARKER,
            fontSize: "min(30vh,26vw)",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "2px var(--line)",
            opacity: 0.28,
          }}
        >
          02
        </div>
      </Parallax>

      <div style={{ position: "relative", maxWidth: 960, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: "clamp(10px,.9vw,13px)",
            lineHeight: 1,
            letterSpacing: ".24em",
            color: "var(--muted)",
            marginBottom: 12,
          }}
        >
          PAGE 02
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: "clamp(30px,4vh,56px)",
          }}
        >
          <Reveal
            kind="wipe"
            as="span"
            style={{
              display: "inline-block",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: "clamp(11px,1vw,14px)",
              lineHeight: 1,
              letterSpacing: ".18em",
              color: "#15120c",
              background: "var(--acc)",
              border: "3px solid var(--ink)",
              padding: "8px 12px",
              transform: "rotate(-1.5deg)",
            }}
          >
            CHAPTER 01 // FIELD LOG
          </Reveal>
          <Reveal
            kind="slam"
            as="h2"
            style={{
              margin: 0,
              fontFamily: MARKER,
              fontWeight: 400,
              fontSize: "clamp(40px,6vw,96px)",
              lineHeight: 0.9,
              color: "var(--ink)",
              textShadow: ".045em .045em 0 var(--acc)",
            }}
          >
            THE ORIGIN RUN
          </Reveal>
          <Reveal
            kind="sfx"
            as="span"
            style={
              {
                "--sr": "7deg",
                display: "inline-block",
                marginLeft: "auto",
                fontFamily: MARKER,
                fontSize: "clamp(28px,4vw,60px)",
                lineHeight: 0.8,
                color: "transparent",
                WebkitTextStroke: "2.5px var(--acc)",
              } as CSSProperties
            }
          >
            GRIND!
          </Reveal>
        </div>

        <div ref={tlRef} style={{ position: "relative", paddingLeft: "clamp(34px,6vw,72px)" }}>
          <div
            style={{
              position: "absolute",
              left: "clamp(14px,2.6vw,30px)",
              top: 6,
              bottom: 6,
              width: 4,
              background: "var(--line)",
              opacity: 0.3,
            }}
          />
          <div
            ref={prRef}
            style={{
              position: "absolute",
              left: "clamp(14px,2.6vw,30px)",
              top: 6,
              height: "0%",
              width: 4,
              background: "var(--acc)",
              boxShadow: "0 0 12px var(--acc)",
            }}
          />

          {NODES.map((n) => (
            <TimelineNode key={n.tag} node={n} />
          ))}

          {/* earlier chapters toggle */}
          <div style={{ position: "relative", marginBottom: "clamp(20px,3vh,38px)" }}>
            <div
              style={{
                position: "absolute",
                left: markerLeft,
                top: 12,
                width: "clamp(22px,3vw,32px)",
                height: "clamp(22px,3vw,32px)",
                transform: "translateX(-50%)",
                background: "var(--bg)",
                border: "3px dashed var(--line)",
                borderRadius: "50%",
              }}
            />
            <button
              className="hov-lift"
              onClick={toggle}
              aria-expanded={open}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "clamp(11px,1vw,14px)",
                lineHeight: 1,
                letterSpacing: ".08em",
                color: "var(--ink)",
                background: "var(--panel)",
                border: "3px solid var(--ink)",
                padding: "12px 16px",
                boxShadow: "5px 5px 0 var(--ink)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  color: "var(--acc)",
                  transition: "transform .28s",
                  transform: open ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                ▸
              </span>
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
