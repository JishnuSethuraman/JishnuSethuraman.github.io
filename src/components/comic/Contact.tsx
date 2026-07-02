"use client";

import type { CSSProperties } from "react";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import { EMAIL, MARKER, MONO, SANS } from "./ui";

const btnBase: CSSProperties = {
  fontFamily: MONO,
  fontWeight: 700,
  fontSize: "clamp(13px,1.2vw,16px)",
  lineHeight: 1,
  letterSpacing: ".06em",
  padding: "16px 22px",
};

export default function Contact() {
  return (
    <section
      style={{
        position: "relative",
        background: "#15120c",
        color: "#f2e8d2",
        padding: "clamp(66px,10vh,140px) clamp(20px,5vw,90px)",
        overflow: "hidden",
      }}
    >
      <Parallax factor={0.12} style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "200vmax",
            height: "200vmax",
            transform: "translate(-50%,-50%)",
            opacity: 0.12,
            background:
              "repeating-conic-gradient(from 0deg at 50% 50%,var(--acc) 0deg .55deg,transparent .55deg 3.1deg)",
            WebkitMask:
              "radial-gradient(circle at 50% 50%,transparent 5%,#000 26%,#000 64%,transparent 96%)",
            mask: "radial-gradient(circle at 50% 50%,transparent 5%,#000 26%,#000 64%,transparent 96%)",
            animation: "spinSlow 130s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(116deg,rgba(242,232,210,.05) 0 2px,transparent 2px 18px)",
            animation: "driftDiag 8s linear infinite",
          }}
        />
      </Parallax>

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: "clamp(10px,.9vw,13px)",
            lineHeight: 1,
            letterSpacing: ".24em",
            color: "rgba(242,232,210,.45)",
            marginBottom: 14,
          }}
        >
          PAGE 05 // FINALE
        </div>
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
            border: "3px solid #f2e8d2",
            padding: "8px 12px",
            transform: "rotate(-1.5deg)",
          }}
        >
          NEXT PANEL // CONTACT
        </Reveal>
        <Reveal
          kind="slam"
          as="h2"
          style={{
            margin: "18px 0 6px",
            fontFamily: MARKER,
            fontWeight: 400,
            fontSize: "clamp(46px,8vw,150px)",
            lineHeight: 0.86,
            color: "#f2e8d2",
            textShadow: ".045em .045em 0 var(--acc)",
          }}
        >
          LET’S BUILD
        </Reveal>
        <p
          style={{
            margin: "0 auto clamp(28px,4vh,44px)",
            maxWidth: 520,
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(14px,1.4vw,18px)",
            lineHeight: 1.5,
            color: "#e8dcc2",
          }}
        >
          Resume, LinkedIn, GitHub and email — always one panel away.
        </p>
        <div
          style={{
            display: "flex",
            gap: "clamp(12px,1.5vw,18px)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            className="contact-btn"
            href="/Jayadityan_Sethuraman_Resume.pdf"
            target="_blank"
            rel="noopener"
            style={{
              ...btnBase,
              color: "#15120c",
              background: "#f2e8d2",
              border: "3px solid #f2e8d2",
            }}
          >
            RESUME
          </a>
          <a
            className="contact-btn ghost-fill"
            href="https://www.linkedin.com/in/jayset/"
            target="_blank"
            rel="noopener"
            style={{
              ...btnBase,
              color: "#f2e8d2",
              background: "transparent",
              border: "3px solid #f2e8d2",
            }}
          >
            LINKEDIN
          </a>
          <a
            className="contact-btn ghost-fill"
            href="https://github.com/JishnuSethuraman"
            target="_blank"
            rel="noopener"
            style={{
              ...btnBase,
              color: "#f2e8d2",
              background: "transparent",
              border: "3px solid #f2e8d2",
            }}
          >
            GITHUB
          </a>
          <a
            className="contact-btn"
            href={EMAIL}
            style={
              {
                ...btnBase,
                "--sh": "#f2e8d2",
                color: "#15120c",
                background: "var(--acc)",
                border: "3px solid var(--acc)",
              } as CSSProperties
            }
          >
            EMAIL ▾
          </a>
        </div>
        <div
          style={{
            marginTop: "clamp(40px,6vh,72px)",
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 12,
            lineHeight: 1.6,
            letterSpacing: ".1em",
            color: "rgba(242,232,210,.45)",
          }}
        >
          JAYADITYAN SETHURAMAN · ML/AI SOFTWARE ENGINEER · EST. 2022 · THE END ▸
        </div>
      </div>
    </section>
  );
}
