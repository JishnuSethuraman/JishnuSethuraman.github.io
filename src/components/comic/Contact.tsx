"use client";

import type { CSSProperties, ReactNode } from "react";
import Reveal from "./Reveal";
import { EMAIL, MARKER, MONO, SANS, STAR } from "./ui";

const btnBase: CSSProperties = {
  fontFamily: MONO,
  fontWeight: 700,
  fontSize: "clamp(13px,1.2vw,16px)",
  lineHeight: 1,
  letterSpacing: ".06em",
  padding: "16px 22px",
};

function PopLink({
  delay,
  href,
  external,
  style,
  className,
  children,
}: {
  delay: number;
  href: string;
  external?: boolean;
  style: CSSProperties;
  className: string;
  children: ReactNode;
}) {
  return (
    <Reveal kind="pop" as="span" delay={delay} style={{ display: "inline-flex" }}>
      <a
        className={className}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        style={{ ...btnBase, ...style }}
      >
        {children}
      </a>
    </Reveal>
  );
}

const boltPath = "polygon(62% 0,20% 55%,44% 55%,34% 100%,80% 40%,55% 40%)";

export default function Contact() {
  return (
    <section
      id="finale"
      style={{
        position: "relative",
        background: "#15120c",
        color: "#f2e8d2",
        padding: "clamp(66px,10vh,140px) clamp(20px,5vw,90px)",
        overflow: "hidden",
      }}
    >
      <div data-px="0.12" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "transform" }}>
        <div className="ray-layer" style={{ position: "absolute", left: "50%", top: "50%", width: "200vmax", height: "200vmax", transform: "translate(-50%,-50%)", opacity: 0.06, background: "repeating-conic-gradient(from 0deg at 50% 50%,var(--acc) 0deg .55deg,transparent .55deg 3.1deg)", WebkitMask: "radial-gradient(circle at 50% 50%,transparent 5%,#000 26%,#000 55%,transparent 85%)", mask: "radial-gradient(circle at 50% 50%,transparent 5%,#000 26%,#000 55%,transparent 85%)", animation: "spinSlow 220s linear infinite" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(116deg,rgba(242,232,210,.05) 0 2px,transparent 2px 18px)", animation: "driftDiag 8s linear infinite" }} />
        <div style={{ position: "absolute", left: "12%", top: "18%", width: "clamp(20px,2vw,40px)", height: "clamp(20px,2vw,40px)", background: "var(--acc)", clipPath: STAR, opacity: 0.6, animation: "spinSlowLocal 14s linear infinite,pulseScale 4s ease-in-out infinite" }} />
        <div style={{ position: "absolute", right: "10%", top: "30%", width: "clamp(14px,1.5vw,30px)", height: "clamp(14px,1.5vw,30px)", background: "#f2e8d2", clipPath: STAR, opacity: 0.4, animation: "spinRevLocal 18s linear infinite" }} />
        <div style={{ position: "absolute", right: "22%", bottom: "24%", width: "clamp(50px,5vw,100px)", height: "clamp(76px,7.4vw,150px)", background: "#ffd94a", clipPath: boltPath, opacity: 0, filter: "drop-shadow(0 0 14px rgba(255,217,74,.8))", animation: "boltFlash 8s linear infinite", animationDelay: "-1.5s" }} />
      </div>

      <div data-role="riseStar" style={{ position: "absolute", left: "50%", bottom: "-58vmax", width: "76vmax", height: "76vmax", marginLeft: "-38vmax", zIndex: 0, pointerEvents: "none", willChange: "transform" }}>
        <div style={{ position: "absolute", inset: "-6% 6% 6% -6%", background: "#f2e8d2", opacity: 0.1, clipPath: STAR }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--acc)", opacity: 0.22, clipPath: STAR }} />
      </div>

      <div data-dolly style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center", willChange: "transform" }}>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(10px,.9vw,13px)", lineHeight: 1, letterSpacing: ".24em", color: "rgba(242,232,210,.45)", marginBottom: 14 }}>PAGE 05 // FINALE</div>
        <Reveal kind="wipe" as="span" style={{ display: "inline-block", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,14px)", lineHeight: 1, letterSpacing: ".18em", color: "#15120c", background: "var(--acc)", border: "3px solid #f2e8d2", padding: "8px 12px", transform: "rotate(-1.5deg)" }}>
          NEXT PANEL // CONTACT
        </Reveal>
        <Reveal kind="slam" as="h2" style={{ margin: "18px 0 6px", fontFamily: MARKER, fontWeight: 400, fontSize: "clamp(46px,8vw,150px)", lineHeight: 0.86, color: "#f2e8d2", textShadow: ".045em .045em 0 var(--acc)" }}>
          LET’S BUILD
        </Reveal>
        <p style={{ margin: "0 auto clamp(28px,4vh,44px)", maxWidth: 520, fontFamily: SANS, fontWeight: 500, fontSize: "clamp(14px,1.4vw,18px)", lineHeight: 1.5, color: "#e8dcc2" }}>
          Resume, LinkedIn, GitHub and email — always one panel away.
        </p>
        <div style={{ display: "flex", gap: "clamp(12px,1.5vw,18px)", flexWrap: "wrap", justifyContent: "center" }}>
          <PopLink delay={0.05} href="/Jayadityan_Sethuraman_Resume.pdf" external className="contact-btn" style={{ color: "#15120c", background: "#f2e8d2", border: "3px solid #f2e8d2" }}>
            RESUME
          </PopLink>
          <PopLink delay={0.15} href="https://www.linkedin.com/in/jayset/" external className="contact-btn ghost-fill" style={{ color: "#f2e8d2", background: "transparent", border: "3px solid #f2e8d2" }}>
            LINKEDIN
          </PopLink>
          <PopLink delay={0.25} href="https://github.com/JishnuSethuraman" external className="contact-btn ghost-fill" style={{ color: "#f2e8d2", background: "transparent", border: "3px solid #f2e8d2" }}>
            GITHUB
          </PopLink>
          <PopLink delay={0.35} href={EMAIL} className="contact-btn" style={{ "--sh": "#f2e8d2", color: "#15120c", background: "var(--acc)", border: "3px solid var(--acc)" } as CSSProperties}>
            EMAIL ▾
          </PopLink>
        </div>
        <div style={{ marginTop: "clamp(40px,6vh,72px)", fontFamily: MONO, fontWeight: 700, fontSize: 12, lineHeight: 1.6, letterSpacing: ".1em", color: "rgba(242,232,210,.45)" }}>
          JAYADITYAN SETHURAMAN · ML/AI SOFTWARE ENGINEER · EST. 2022 · THE END ▸
        </div>
        <Reveal
          kind="sfx"
          as="div"
          delay={0.3}
          style={{ "--sr": "-4deg", marginTop: 20, display: "inline-block", fontFamily: MARKER, fontSize: "clamp(24px,3vw,52px)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2px var(--acc)" } as CSSProperties}
        >
          TO BE CONTINUED…
        </Reveal>
        <div style={{ marginTop: 24 }}>
          <a className="again-btn" href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: MONO, fontWeight: 700, fontSize: "clamp(12px,1.05vw,15px)", lineHeight: 1, letterSpacing: ".08em", color: "#15120c", background: "var(--acc)", border: "3px solid #f2e8d2", padding: "13px 18px", boxShadow: "5px 5px 0 rgba(0,0,0,.55)" }}>
            READ IT AGAIN ↻
          </a>
        </div>
      </div>
    </section>
  );
}
