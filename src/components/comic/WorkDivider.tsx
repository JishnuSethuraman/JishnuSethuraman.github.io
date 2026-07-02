"use client";

import Reveal from "./Reveal";
import { MARKER } from "./ui";

export default function WorkDivider() {
  return (
    <Reveal
      kind="wipe"
      style={{
        position: "relative",
        height: "clamp(56px,8vh,90px)",
        background: "var(--ink)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(115deg,transparent 0 16px,var(--acc) 16px 20px)",
          opacity: 0.5,
          animation: "driftDiag 6s linear infinite",
        }}
      />
      <span
        style={{
          position: "relative",
          fontFamily: MARKER,
          fontSize: "clamp(22px,3vw,38px)",
          color: "var(--acc)",
          WebkitTextStroke: "1.5px var(--bg)",
        }}
      >
        THE WORK ▸▸▸
      </span>
    </Reveal>
  );
}
