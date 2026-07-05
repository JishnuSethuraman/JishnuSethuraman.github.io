"use client";

import type { CSSProperties } from "react";
import type { Theme } from "./ComicRoot";
import { EMAIL, MARKER, MONO } from "./ui";

const navLink: CSSProperties = {
  fontFamily: MONO,
  fontWeight: 700,
  fontSize: "clamp(11px,.95vw,13px)",
  lineHeight: 1,
  letterSpacing: ".06em",
  color: "rgba(242,232,210,.75)",
  padding: "8px 9px",
};

export default function TopBar({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <div
      data-role="topbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
        height: "var(--bar)",
        padding: "0 clamp(14px,2.5vw,40px)",
        background: "#15120c",
        borderBottom: "3px solid var(--acc)",
      }}
    >
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(32px,3vh,42px)",
            height: "clamp(32px,3vh,42px)",
            background: "var(--acc)",
            border: "2.5px solid #f2e8d2",
            fontFamily: MARKER,
            fontSize: "clamp(18px,1.8vh,26px)",
            color: "#15120c",
            transform: "rotate(-4deg)",
          }}
        >
          JS
        </span>
        <span
          className="bar-name"
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: "clamp(12px,1.1vh,15px)",
            lineHeight: 1,
            letterSpacing: ".08em",
            color: "#f2e8d2",
          }}
        >
          J. SETHURAMAN
        </span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
        <a className="hov-accent ch-link" href="#chapter-1" style={navLink}>
          CH.1
        </a>
        <a className="hov-accent ch-link" href="#chapter-2" style={navLink}>
          CH.2
        </a>
        <a className="hov-accent ch-link" href="#chapter-3" style={navLink}>
          CH.3
        </a>
        <a
          className="nav-outline"
          href={EMAIL}
          style={{
            ...navLink,
            fontSize: "clamp(11px,.95vw,14px)",
            color: "#f2e8d2",
            border: "2px solid rgba(242,232,210,.4)",
            padding: "8px 11px",
          }}
        >
          EMAIL
        </a>
        <button
          className="btn-press"
          onClick={onToggle}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: "clamp(11px,.95vw,14px)",
            lineHeight: 1,
            letterSpacing: ".06em",
            color: "#15120c",
            background: "var(--acc)",
            border: "2px solid #f2e8d2",
            padding: "9px 14px",
            marginLeft: 4,
            boxShadow: "3px 3px 0 rgba(0,0,0,.55)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "linear-gradient(90deg,#15120c 0 50%,transparent 50%)",
              border: "2px solid #15120c",
            }}
          />
          <span>{theme === "light" ? "GO DARK" : "GO LIGHT"}</span>
        </button>
      </div>
    </div>
  );
}
