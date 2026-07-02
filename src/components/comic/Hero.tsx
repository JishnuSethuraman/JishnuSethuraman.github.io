"use client";

import type { CSSProperties, ReactNode } from "react";
import { MARKER, MONO, SANS, STAR } from "./ui";

const HEADSHOT = "/headshot.jpg";

// Pre-split letters so the engine can attach per-letter hover bounce without
// rebuilding React-owned DOM.
function Letters({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="kinetic-letter">
          {ch}
        </span>
      ))}
    </>
  );
}

const token = (extra: CSSProperties): CSSProperties => ({
  position: "absolute",
  fontFamily: MONO,
  fontWeight: 700,
  fontSize: "clamp(11px,1vw,15px)",
  lineHeight: 1,
  ...extra,
});

function LightScene() {
  return (
    <div
      className="scene scene-light"
      data-role="light"
      style={{ background: "radial-gradient(130% 120% at 68% 32%,#f6ecd4,#eaddbd 70%)" }}
    >
      <div
        data-warp-zoom
        data-warp-origin="68% 40%"
        style={{ position: "absolute", inset: 0, willChange: "transform,opacity,filter" }}
      >
        {/* FAR depth layer — radiating speed lines (toned down: lower opacity, slower, tighter mask) */}
        <div data-px="0.20" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "transform" }}>
          <div
            style={{
              position: "absolute",
              left: "68%",
              top: "40%",
              width: "230vmax",
              height: "230vmax",
              transform: "translate(-50%,-50%)",
              opacity: 0.07,
              background: "repeating-conic-gradient(from 0deg at 50% 50%,#15120c 0deg .55deg,transparent .55deg 3.1deg)",
              WebkitMask: "radial-gradient(circle at 50% 50%,transparent 4%,#000 22%,#000 56%,transparent 88%)",
              mask: "radial-gradient(circle at 50% 50%,transparent 4%,#000 22%,#000 56%,transparent 88%)",
              animation: "spinSlow 240s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "68%",
              top: "40%",
              width: "150vmax",
              height: "150vmax",
              transform: "translate(-50%,-50%)",
              opacity: 0.035,
              background: "repeating-conic-gradient(from 0deg at 50% 50%,#15120c 0deg .32deg,transparent .32deg 2deg)",
              WebkitMask: "radial-gradient(circle at 50% 50%,transparent 6%,#000 30%,transparent 82%)",
              mask: "radial-gradient(circle at 50% 50%,transparent 6%,#000 30%,transparent 82%)",
              animation: "spinRev 190s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "68%",
              top: "40%",
              width: "90vmax",
              height: "90vmax",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(255,106,26,.22),transparent 60%)",
              animation: "pulseScaleCentered 11s ease-in-out infinite",
            }}
          />
          <div style={{ position: "absolute", right: "-2vw", bottom: "-7vh", fontFamily: MARKER, fontSize: "min(46vh,42vw)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2px rgba(21,18,12,.06)" }}>01</div>
        </div>

        {/* MID depth layer — halftone + drifting motifs + code tokens */}
        <div data-px="0.11" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", willChange: "transform" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#15120c 1.1px,transparent 1.5px)", backgroundSize: "7px 7px", opacity: 0.06, animation: "drift 28s linear infinite alternate" }} />
          <div style={{ position: "absolute", right: "7%", top: "16%", width: "clamp(150px,17vmax,400px)", height: "clamp(150px,17vmax,400px)", backgroundImage: "radial-gradient(#15120c 2px,transparent 2.6px)", backgroundSize: "13px 13px", opacity: 0.12, WebkitMask: "radial-gradient(circle,#000 28%,transparent 70%)", mask: "radial-gradient(circle,#000 28%,transparent 70%)", animation: "floatB 14s ease-in-out infinite" }} />
          <div style={{ position: "absolute", left: "3%", bottom: "14%", width: "clamp(130px,13vmax,320px)", height: "clamp(130px,13vmax,320px)", backgroundImage: "radial-gradient(var(--acc) 2px,transparent 2.6px)", backgroundSize: "15px 15px", opacity: 0.17, WebkitMask: "radial-gradient(circle,#000 30%,transparent 70%)", mask: "radial-gradient(circle,#000 30%,transparent 70%)", animation: "floatA 16s ease-in-out infinite" }} />
          <span style={token({ left: "9%", top: "38%", color: "rgba(21,18,12,.2)", animation: "floatA 9s ease-in-out infinite" })}>def&nbsp;train()</span>
          <span style={token({ right: "23%", top: "13%", color: "rgba(255,106,26,.4)", animation: "floatA 13s ease-in-out infinite" })}>epoch&nbsp;42</span>
          <span style={token({ right: "6%", bottom: "29%", color: "rgba(21,18,12,.2)", animation: "floatB 10s ease-in-out infinite" })}>torch.nn</span>
          <span style={token({ left: "37%", bottom: "11%", color: "rgba(21,18,12,.16)", animation: "blink 5s ease-in-out infinite" })}>0110&nbsp;1001</span>
          <div style={{ position: "absolute", left: "20%", top: "30%", width: "clamp(130px,15vw,280px)", aspectRatio: "1", border: "3px solid var(--acc)", borderRadius: "50%", opacity: 0, animation: "ringBurst 3.8s ease-out infinite" }} />
          <div style={{ position: "absolute", left: "24%", top: "44%", width: "clamp(100px,11vw,210px)", aspectRatio: "1", border: "3px solid rgba(21,18,12,.5)", borderRadius: "50%", opacity: 0, animation: "ringBurst 3.8s ease-out infinite", animationDelay: "-1.9s" }} />
          <div style={{ position: "absolute", left: "46%", top: "9%", width: "clamp(60px,6vw,120px)", height: "clamp(50px,5vw,100px)", background: "#15120c", opacity: 0.08, borderRadius: "58% 42% 65% 35%/45% 60% 40% 55%", transform: "rotate(18deg)", animation: "floatB 18s ease-in-out infinite" }} />
          <div style={{ position: "absolute", right: "28%", bottom: "9%", width: "clamp(46px,4.6vw,90px)", height: "clamp(40px,4vw,80px)", background: "var(--acc)", opacity: 0.16, borderRadius: "38% 62% 45% 55%/62% 38% 60% 40%", transform: "rotate(-14deg)", animation: "floatA 15s ease-in-out infinite" }} />
        </div>

        {/* NEAR depth layer — flying streaks + spinning stars */}
        <div data-px="0.04" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", willChange: "transform" }}>
          <div style={{ position: "absolute", top: "14%", left: 0, width: "46vw", height: 4, background: "linear-gradient(90deg,transparent,var(--acc),transparent)", opacity: 0.5, animation: "flyAcross 6.5s linear infinite" }} />
          <div style={{ position: "absolute", top: "27%", left: 0, width: "34vw", height: 2, background: "linear-gradient(90deg,transparent,#15120c,transparent)", opacity: 0.32, animation: "flyAcross 9s linear infinite", animationDelay: "-3s" }} />
          <div style={{ position: "absolute", top: "72%", left: 0, width: "52vw", height: 3, background: "linear-gradient(90deg,transparent,#15120c,transparent)", opacity: 0.28, animation: "flyAcross 8s linear infinite", animationDelay: "-5s" }} />
          <div style={{ position: "absolute", top: "87%", left: 0, width: "40vw", height: 5, background: "linear-gradient(90deg,transparent,var(--acc),transparent)", opacity: 0.42, animation: "flyAcross 7.4s linear infinite", animationDelay: "-1.5s" }} />
          <div style={{ position: "absolute", left: "5%", top: "22%", width: "clamp(30px,3vw,58px)", height: "clamp(30px,3vw,58px)", background: "var(--acc)", clipPath: STAR, opacity: 0.82, animation: "spinSlowLocal 16s linear infinite,pulseScale 4s ease-in-out infinite" }} />
          <div style={{ position: "absolute", right: "15%", bottom: "21%", width: "clamp(20px,2.2vw,44px)", height: "clamp(20px,2.2vw,44px)", background: "#15120c", clipPath: STAR, opacity: 0.65, animation: "spinRevLocal 20s linear infinite" }} />
          <span style={{ position: "absolute", left: "27%", top: "12%", fontFamily: MARKER, fontSize: "clamp(30px,3vw,54px)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2.5px var(--acc)", animation: "popOccasional 9s ease-in-out infinite" }}>!!</span>
        </div>

        {/* issue tag */}
        <div style={{ position: "absolute", left: "clamp(18px,3.5vw,72px)", top: "calc(var(--bar) + clamp(12px,2vh,26px))", zIndex: 4, display: "flex", alignItems: "center", gap: 9, fontFamily: MONO, fontWeight: 700, fontSize: "clamp(10px,.85vw,13px)", lineHeight: 1, letterSpacing: ".2em", color: "rgba(21,18,12,.55)", animation: "slamIn .6s .2s both" }}>
          <span style={{ display: "inline-block", width: 9, height: 9, background: "var(--acc)", border: "2px solid #15120c" }} />
          ISSUE&nbsp;#01 · ORIGIN STORY
        </div>

        {/* classic cover corner box */}
        <div style={{ position: "absolute", right: "clamp(18px,3.5vw,72px)", top: "calc(var(--bar) + clamp(12px,2vh,26px))", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "#fbf6e9", border: "3px solid #15120c", boxShadow: "4px 4px 0 #15120c", padding: "8px 10px", transform: "rotate(2deg)", animation: "burstIn .7s .75s both" }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, lineHeight: 1, letterSpacing: ".12em", color: "#15120c" }}>JS COMICS</span>
          <span style={{ fontFamily: MARKER, fontSize: "clamp(16px,1.5vw,24px)", lineHeight: 1, color: "#15120c" }}>No.1</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, lineHeight: 1, letterSpacing: ".08em", color: "#15120c", background: "var(--acc)", border: "2px solid #15120c", padding: "3px 5px", transform: "rotate(-3deg)" }}>FREE!</span>
        </div>
        {/* print barcode */}
        <div style={{ position: "absolute", left: "clamp(18px,3.5vw,72px)", bottom: "clamp(44px,5.4vh,64px)", zIndex: 4, display: "flex", alignItems: "flex-end", gap: 8, opacity: 0.75 }}>
          <div style={{ width: 72, height: 28, background: "repeating-linear-gradient(90deg,#15120c 0 2px,transparent 2px 5px,#15120c 5px 6px,transparent 6px 9px)" }} />
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, lineHeight: 1.25, letterSpacing: ".1em", color: "rgba(21,18,12,.6)" }}>JAY-01<br />2026</span>
        </div>

        {/* CONTENT */}
        <div style={{ position: "absolute", top: "var(--bar)", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", padding: "clamp(18px,3.5vw,72px)", zIndex: 3 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(24px,3.5vw,80px)", width: "100%", maxWidth: "min(2600px,94vw)", margin: "0 auto" }}>
            <div style={{ flex: "1 1 540px", minWidth: 300 }}>
              <div style={{ display: "inline-block", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, letterSpacing: ".16em", color: "#15120c", background: "var(--acc)", border: "3px solid #15120c", padding: "9px 13px", boxShadow: "4px 4px 0 #15120c", transform: "rotate(-2deg)", animation: "burstIn .6s .5s both" }}>ML/AI SOFTWARE ENGINEER</div>
              <h1 style={{ margin: ".18em 0 0", fontFamily: MARKER, fontWeight: 400, fontSize: "clamp(38px,7.6vw,188px)", lineHeight: 0.84, color: "#15120c" }}>
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span style={{ display: "block", fontSize: "0.42em", letterSpacing: ".01em", color: "#3a3020", textShadow: ".04em .04em 0 var(--acc)", animation: "dropLine .75s .35s both cubic-bezier(.2,.8,.2,1)" }}>
                    <Letters text="HI, I'M" />
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span style={{ display: "block", textShadow: ".05em .05em 0 var(--acc)", animation: "dropLine .75s .5s both cubic-bezier(.2,.8,.2,1)" }}>
                    <Letters text="JAY." />
                  </span>
                </span>
              </h1>
              <div style={{ width: "min(360px,70%)", height: "clamp(10px,1vw,18px)", background: "var(--acc)", border: "2.5px solid #15120c", transform: "rotate(-1deg)", margin: ".14em 0 0", animation: "wipeReveal .5s 1.05s both" }} />
              <div style={{ marginTop: "clamp(18px,1.6vw,30px)", maxWidth: "min(560px,92%)", background: "#fbf6e9", border: "3px solid #15120c", boxShadow: "6px 6px 0 #15120c", padding: "clamp(13px,1.1vw,20px) clamp(16px,1.3vw,24px)", transform: "rotate(-.5deg)", animation: "slamIn .7s .95s both" }}>
                <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: "clamp(14px,1.35vw,20px)", lineHeight: 1.42, color: "#2a241a" }}>
                  Building scalable AI systems and innovative applications — from research to production.
                </span>
              </div>
            </div>

            {/* portrait */}
            <div data-tilt style={{ flex: "0 1 clamp(280px,30vw,620px)", minWidth: 230, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-57%,-55%)", width: "clamp(340px,37vw,720px)", aspectRatio: "1", zIndex: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", inset: 0, background: "#15120c", clipPath: STAR, animation: "burstIn .8s .26s both,pulseScale 6.5s 1.1s ease-in-out infinite" }} />
              </div>
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-49%,-48%)", width: "clamp(320px,34vw,660px)", aspectRatio: "1", zIndex: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", inset: 0, background: "var(--acc)", clipPath: STAR, animation: "burstIn .85s .34s both,spinSlowLocal 46s 1.2s linear infinite" }} />
              </div>
              <div
                style={
                  {
                    "--r": "2.4deg",
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: "clamp(280px,30vw,560px)",
                    aspectRatio: "36/46",
                    border: "5px solid #15120c",
                    boxShadow: "14px 14px 0 #15120c",
                    overflow: "hidden",
                    background: "#15120c",
                    animation: "slamInRot .9s .3s both cubic-bezier(.2,.75,.25,1)",
                  } as CSSProperties
                }
              >
                <div style={{ width: "100%", height: "100%", animation: "breathe 8s 1.2s ease-in-out infinite" }}>
                  <img src={HEADSHOT} alt="Jayadityan Sethuraman" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%", filter: "saturate(1.06) contrast(1.02)" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(21,18,12,.5) 1px,transparent 1.5px)", backgroundSize: "5px 5px", mixBlendMode: "multiply", opacity: 0.16 }} />
                <span style={{ position: "absolute", left: -4, bottom: 16, fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,.9vw,14px)", lineHeight: 1, letterSpacing: ".14em", color: "#f7efd9", background: "#15120c", padding: "6px 10px" }}>ML/AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* bottom marquee */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "clamp(30px,3.4vh,46px)", overflow: "hidden", display: "flex", alignItems: "center", borderTop: "2px solid rgba(21,18,12,.22)", background: "rgba(241,230,203,.55)", zIndex: 4 }}>
          <div style={{ display: "flex", whiteSpace: "nowrap", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, letterSpacing: ".1em", color: "rgba(21,18,12,.42)", animation: "marquee 32s linear infinite" }}>
            <span style={{ padding: "0 22px" }}>MACHINE&nbsp;LEARNING&nbsp;//&nbsp;LLM&nbsp;PIPELINES&nbsp;//&nbsp;RAG&nbsp;//&nbsp;PYTORCH&nbsp;//&nbsp;MLOps&nbsp;//&nbsp;INFERENCE&nbsp;//&nbsp;DISTILLATION&nbsp;//&nbsp;GANs&nbsp;//&nbsp;TIME-SERIES&nbsp;//&nbsp;</span>
            <span style={{ padding: "0 22px" }}>MACHINE&nbsp;LEARNING&nbsp;//&nbsp;LLM&nbsp;PIPELINES&nbsp;//&nbsp;RAG&nbsp;//&nbsp;PYTORCH&nbsp;//&nbsp;MLOps&nbsp;//&nbsp;INFERENCE&nbsp;//&nbsp;DISTILLATION&nbsp;//&nbsp;GANs&nbsp;//&nbsp;TIME-SERIES&nbsp;//&nbsp;</span>
          </div>
        </div>
        <div style={{ position: "absolute", right: 24, bottom: "clamp(40px,4.4vh,58px)", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,.9vw,14px)", lineHeight: 1, letterSpacing: ".16em", color: "#15120c", zIndex: 4, animation: "floatY 2.4s ease-in-out infinite" }}>SCROLL TO WARP ▾</div>
      </div>
    </div>
  );
}

function DarkScene() {
  return (
    <div
      className="scene scene-dark"
      data-role="dark"
      style={{ background: "radial-gradient(130% 120% at 30% 30%,#1a160e,#100d09 72%)" }}
    >
      <div
        data-warp-zoom
        data-warp-origin="32% 42%"
        style={{ position: "absolute", inset: 0, willChange: "transform,opacity,filter" }}
      >
        {/* FAR depth layer — radiating speed lines (toned down) */}
        <div data-px="0.20" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "transform" }}>
          <div
            style={{
              position: "absolute",
              left: "32%",
              top: "42%",
              width: "230vmax",
              height: "230vmax",
              transform: "translate(-50%,-50%)",
              opacity: 0.08,
              background: "repeating-conic-gradient(from 0deg at 50% 50%,var(--acc) 0deg .5deg,transparent .5deg 3.2deg)",
              WebkitMask: "radial-gradient(circle at 50% 50%,transparent 4%,#000 22%,#000 56%,transparent 88%)",
              mask: "radial-gradient(circle at 50% 50%,transparent 4%,#000 22%,#000 56%,transparent 88%)",
              animation: "spinSlow 240s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "32%",
              top: "42%",
              width: "150vmax",
              height: "150vmax",
              transform: "translate(-50%,-50%)",
              opacity: 0.04,
              background: "repeating-conic-gradient(from 0deg at 50% 50%,#f2e8d2 0deg .3deg,transparent .3deg 2deg)",
              WebkitMask: "radial-gradient(circle at 50% 50%,transparent 6%,#000 30%,transparent 82%)",
              mask: "radial-gradient(circle at 50% 50%,transparent 6%,#000 30%,transparent 82%)",
              animation: "spinRev 190s linear infinite",
            }}
          />
          <div style={{ position: "absolute", left: "26%", top: "44%", width: "96vmax", height: "96vmax", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle,color-mix(in srgb,var(--acc) 30%,transparent),transparent 62%)", animation: "pulseScaleCentered 9s ease-in-out infinite" }} />
          <div style={{ position: "absolute", left: "-1vw", bottom: "-7vh", fontFamily: MARKER, fontSize: "min(44vh,40vw)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2px rgba(242,232,210,.06)" }}>01</div>
        </div>

        {/* MID depth layer */}
        <div data-px="0.11" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", willChange: "transform" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(116deg,rgba(242,232,210,.05) 0 2px,transparent 2px 17px)", animation: "driftDiag 8s linear infinite" }} />
          <div style={{ position: "absolute", right: "8%", top: "15%", width: "clamp(150px,17vmax,420px)", height: "clamp(150px,17vmax,420px)", backgroundImage: "radial-gradient(#f2e8d2 2px,transparent 2.6px)", backgroundSize: "14px 14px", opacity: 0.1, WebkitMask: "radial-gradient(circle,#000 28%,transparent 70%)", mask: "radial-gradient(circle,#000 28%,transparent 70%)", animation: "floatB 15s ease-in-out infinite" }} />
          <div style={{ position: "absolute", left: "3%", bottom: "12%", width: "clamp(140px,14vmax,340px)", height: "clamp(140px,14vmax,340px)", backgroundImage: "radial-gradient(var(--acc) 2px,transparent 2.7px)", backgroundSize: "16px 16px", opacity: 0.2, WebkitMask: "radial-gradient(circle,#000 30%,transparent 70%)", mask: "radial-gradient(circle,#000 30%,transparent 70%)", animation: "floatA 17s ease-in-out infinite" }} />
          <span style={token({ left: "8%", top: "42%", color: "rgba(242,232,210,.22)", animation: "floatA 9s ease-in-out infinite" })}>attention()</span>
          <span style={token({ right: "25%", top: "12%", color: "rgba(242,232,210,.2)", animation: "floatA 13s ease-in-out infinite" })}>GPU:0</span>
          <span style={token({ right: "7%", bottom: "31%", color: "rgba(242,232,210,.18)", animation: "floatB 10s ease-in-out infinite" })}>∇L&nbsp;→&nbsp;0</span>
          <span style={token({ left: "40%", bottom: "10%", color: "rgba(255,106,26,.42)", animation: "floatB 11s ease-in-out infinite" })}>fit(X,&nbsp;y)</span>
          <div style={{ position: "absolute", right: "19%", top: "20%", width: "clamp(70px,7vw,140px)", height: "clamp(100px,10vw,200px)", background: "#ffd94a", clipPath: "polygon(62% 0,20% 55%,44% 55%,34% 100%,80% 40%,55% 40%)", opacity: 0, filter: "drop-shadow(0 0 14px rgba(255,217,74,.8))", animation: "boltFlash 7s linear infinite" }} />
          <div style={{ position: "absolute", left: "14%", bottom: "28%", width: "clamp(46px,4.6vw,92px)", height: "clamp(70px,7vw,140px)", background: "var(--acc)", clipPath: "polygon(62% 0,20% 55%,44% 55%,34% 100%,80% 40%,55% 40%)", opacity: 0, filter: "drop-shadow(0 0 12px var(--acc))", animation: "boltFlash 9s linear infinite", animationDelay: "-4s" }} />
          <span style={{ position: "absolute", right: "11%", top: "13%", fontFamily: MARKER, fontSize: "clamp(26px,2.6vw,48px)", lineHeight: 1, color: "transparent", WebkitTextStroke: "2.5px #f2e8d2", animation: "popOccasional 7s ease-in-out infinite", animationDelay: "-.6s" }}>KRAK!</span>
          <div style={{ position: "absolute", left: "44%", top: "8%", width: "clamp(60px,6vw,120px)", height: "clamp(50px,5vw,100px)", background: "#f2e8d2", opacity: 0.06, borderRadius: "58% 42% 65% 35%/45% 60% 40% 55%", transform: "rotate(24deg)", animation: "floatB 19s ease-in-out infinite" }} />
        </div>

        {/* NEAR depth layer */}
        <div data-px="0.04" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", willChange: "transform" }}>
          <div style={{ position: "absolute", top: "16%", left: 0, width: "50vw", height: 4, background: "linear-gradient(90deg,transparent,var(--acc),transparent)", opacity: 0.6, animation: "flyAcross 6s linear infinite" }} />
          <div style={{ position: "absolute", top: "30%", left: 0, width: "36vw", height: 2, background: "linear-gradient(90deg,transparent,#f2e8d2,transparent)", opacity: 0.26, animation: "flyAcross 9.5s linear infinite", animationDelay: "-4s" }} />
          <div style={{ position: "absolute", top: "69%", left: 0, width: "46vw", height: 3, background: "linear-gradient(90deg,transparent,#f2e8d2,transparent)", opacity: 0.22, animation: "flyAcross 8.5s linear infinite", animationDelay: "-2s" }} />
          <div style={{ position: "absolute", top: "88%", left: 0, width: "42vw", height: 5, background: "linear-gradient(90deg,transparent,var(--acc),transparent)", opacity: 0.52, animation: "flyAcross 7s linear infinite", animationDelay: "-5.5s" }} />
          <div style={{ position: "absolute", right: "13%", bottom: "24%", width: "clamp(20px,2vw,40px)", height: "clamp(20px,2vw,40px)", background: "#f2e8d2", clipPath: STAR, opacity: 0.5, animation: "spinRevLocal 22s linear infinite" }} />
        </div>

        {/* edition tag */}
        <div style={{ position: "absolute", right: "clamp(18px,3.5vw,72px)", top: "calc(var(--bar) + clamp(12px,2vh,26px))", zIndex: 4, display: "flex", alignItems: "center", gap: 9, fontFamily: MONO, fontWeight: 700, fontSize: "clamp(10px,.85vw,13px)", lineHeight: 1, letterSpacing: ".2em", color: "rgba(242,232,210,.5)", animation: "slamIn .6s .2s both" }}>
          INKY&nbsp;NIGHT&nbsp;EDITION
          <span style={{ display: "inline-block", width: 9, height: 9, background: "var(--acc)", border: "2px solid #f2e8d2" }} />
        </div>

        {/* CONTENT */}
        <div style={{ position: "absolute", top: "var(--bar)", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", padding: "clamp(18px,3.5vw,72px)", zIndex: 3 }}>
          <div style={{ display: "flex", flexWrap: "wrap-reverse", alignItems: "center", gap: "clamp(20px,3vw,72px)", width: "100%", maxWidth: "min(2600px,94vw)", margin: "0 auto" }}>
            <div style={{ flex: "1 1 560px", minWidth: 300, position: "relative" }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, letterSpacing: ".16em", color: "var(--acc)", marginBottom: ".4em", animation: "slamIn .5s .35s both" }}>{"// PORTFOLIO.v2"}</div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontFamily: MARKER, fontSize: "clamp(54px,12.5vw,300px)", lineHeight: 0.78, color: "var(--acc)", textShadow: ".04em .04em 0 #14110c,0 0 .18em color-mix(in srgb,var(--acc) 40%,transparent)", animation: "flyL .8s .35s both cubic-bezier(.2,.8,.2,1)" }}>
                  <span style={{ display: "inline-block", animation: "jitter 4s 1.2s ease-in-out infinite" }}><Letters text="ML/AI" /></span>
                </div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontFamily: MARKER, fontSize: "clamp(40px,9vw,228px)", lineHeight: 0.82, color: "transparent", WebkitTextStroke: "2.5px #f2e8d2", marginTop: ".02em", animation: "flyR .8s .5s both cubic-bezier(.2,.8,.2,1)" }}>
                  <span style={{ display: "inline-block", animation: "jitter 5s 1.3s ease-in-out infinite" }}><Letters text="ENGINEER" /></span>
                </div>
              </div>
              <div style={{ display: "inline-block", marginTop: ".5em", background: "var(--acc)", borderTop: "3px solid #14110c", borderBottom: "3px solid #14110c", padding: "clamp(9px,.8vw,16px) clamp(20px,1.6vw,34px)", transformOrigin: "left center", animation: "sashIn .7s .85s both cubic-bezier(.2,.8,.2,1)" }}>
                <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(15px,1.9vw,30px)", lineHeight: 1, letterSpacing: ".05em", color: "#14110c" }}>HI, I&rsquo;M JAY</span>
              </div>
              <div style={{ marginTop: "clamp(16px,1.4vw,28px)", maxWidth: "min(560px,92%)", animation: "slamIn .7s 1.05s both" }}>
                <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: "clamp(14px,1.35vw,20px)", lineHeight: 1.45, color: "#e8dcc2" }}>Building scalable AI systems and innovative applications — from research to production.</span>
              </div>
            </div>

            {/* portrait */}
            <div data-tilt style={{ flex: "0 1 clamp(280px,30vw,620px)", minWidth: 230, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-56%,-54%)", width: "clamp(320px,34vw,660px)", aspectRatio: "1", zIndex: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", inset: 0, background: "#f2e8d2", opacity: 0.16, clipPath: STAR, animation: "burstIn .8s .26s both,pulseScale 6.5s 1.1s ease-in-out infinite" }} />
              </div>
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-47%,-47%)", width: "clamp(320px,34vw,660px)", aspectRatio: "1", zIndex: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", inset: 0, background: "var(--acc)", opacity: 0.34, clipPath: STAR, animation: "burstIn .85s .34s both,spinSlowLocal 44s 1.2s linear infinite" }} />
              </div>
              <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "clamp(280px,30vw,560px)", aspectRatio: "404/548", background: "#14110c", border: "4px solid #f2e8d2", clipPath: "polygon(6% 2%,98% 0,94% 96%,2% 100%)", boxShadow: "0 0 0 6px #14110c,18px 18px 0 rgba(0,0,0,.5)", animation: "slamIn .9s .3s both cubic-bezier(.2,.75,.25,1),pulseGlow 6s 1.4s ease-in-out infinite" }}>
                <div style={{ width: "100%", height: "100%", animation: "floatY 7s 1.4s ease-in-out infinite" }}>
                  <img src={HEADSHOT} alt="Jayadityan Sethuraman" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%", filter: "saturate(1.08) contrast(1.03)" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(20,17,12,.55) 1px,transparent 1.5px)", backgroundSize: "5px 5px", mixBlendMode: "multiply", opacity: 0.22 }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "clamp(30px,3.4vh,46px)", overflow: "hidden", display: "flex", alignItems: "center", borderTop: "2px solid rgba(242,232,210,.18)", background: "rgba(20,17,12,.6)", zIndex: 4 }}>
          <div style={{ display: "flex", whiteSpace: "nowrap", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, letterSpacing: ".1em", color: "rgba(242,232,210,.4)", animation: "marquee 32s linear infinite" }}>
            <span style={{ padding: "0 22px" }}>MACHINE&nbsp;LEARNING&nbsp;//&nbsp;LLM&nbsp;PIPELINES&nbsp;//&nbsp;RAG&nbsp;//&nbsp;PYTORCH&nbsp;//&nbsp;MLOps&nbsp;//&nbsp;INFERENCE&nbsp;//&nbsp;DISTILLATION&nbsp;//&nbsp;GANs&nbsp;//&nbsp;TIME-SERIES&nbsp;//&nbsp;</span>
            <span style={{ padding: "0 22px" }}>MACHINE&nbsp;LEARNING&nbsp;//&nbsp;LLM&nbsp;PIPELINES&nbsp;//&nbsp;RAG&nbsp;//&nbsp;PYTORCH&nbsp;//&nbsp;MLOps&nbsp;//&nbsp;INFERENCE&nbsp;//&nbsp;DISTILLATION&nbsp;//&nbsp;GANs&nbsp;//&nbsp;TIME-SERIES&nbsp;//&nbsp;</span>
          </div>
        </div>
        <div style={{ position: "absolute", right: 24, bottom: "clamp(40px,4.4vh,58px)", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,.9vw,14px)", lineHeight: 1, letterSpacing: ".16em", color: "var(--acc)", zIndex: 4, animation: "floatY 2.4s ease-in-out infinite" }}>SCROLL TO WARP ▾</div>
      </div>
    </div>
  );
}

const warpStarNode = (
  wx: number,
  wy: number,
  ws: number,
  size: number,
  accent: boolean,
): ReactNode => (
  <div
    data-warp-star
    data-wx={wx}
    data-wy={wy}
    data-ws={ws}
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: size,
      height: size,
      margin: `${-size / 2}px 0 0 ${-size / 2}px`,
      background: accent ? "var(--acc)" : "#f2e8d2",
      clipPath: STAR,
      opacity: 0,
    }}
  />
);

function Tunnel() {
  return (
    <div
      data-role="tunnel"
      aria-hidden
      style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none", opacity: 0, visibility: "hidden", background: "radial-gradient(120% 120% at 50% 50%,#171208 0%,#0b0804 60%,#050302 100%)", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", left: "50%", top: "50%", width: "260vmax", height: "260vmax", transform: "translate(-50%,-50%)", background: "repeating-conic-gradient(from 0deg at 50% 50%,var(--acc) 0deg .7deg,transparent .7deg 2.6deg)", WebkitMask: "radial-gradient(circle,transparent 7%,#000 30%,#000 62%,transparent 92%)", mask: "radial-gradient(circle,transparent 7%,#000 30%,#000 62%,transparent 92%)", opacity: 0.5, animation: "spinSlow 7s linear infinite" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: "200vmax", height: "200vmax", transform: "translate(-50%,-50%)", background: "repeating-conic-gradient(from 0deg at 50% 50%,#f2e8d2 0deg .3deg,transparent .3deg 3.4deg)", WebkitMask: "radial-gradient(circle,transparent 10%,#000 36%,transparent 80%)", mask: "radial-gradient(circle,transparent 10%,#000 36%,transparent 80%)", opacity: 0.28, animation: "spinRev 11s linear infinite" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: "70vmax", height: "70vmax", transform: "translate(-50%,-50%)", background: "radial-gradient(circle,color-mix(in srgb,var(--acc) 36%,transparent),transparent 60%)", animation: "pulseScaleCentered 5s ease-in-out infinite" }} />
      <div data-role="tunRing" style={{ position: "absolute", left: "50%", top: "50%", width: "44vmax", height: "44vmax", margin: "-22vmax 0 0 -22vmax", border: "4px solid var(--acc)", borderRadius: "50%", opacity: 0 }} />
      <div data-role="tunRing" style={{ position: "absolute", left: "50%", top: "50%", width: "44vmax", height: "44vmax", margin: "-22vmax 0 0 -22vmax", border: "3px solid #f2e8d2", borderRadius: "50%", opacity: 0 }} />
      <div data-role="tunRing" style={{ position: "absolute", left: "50%", top: "50%", width: "44vmax", height: "44vmax", margin: "-22vmax 0 0 -22vmax", border: "5px dashed var(--acc)", borderRadius: "50%", opacity: 0 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {warpStarNode(0.97, 0.26, 1.15, 24, true)}
        {warpStarNode(0.71, 0.71, 0.85, 16, false)}
        {warpStarNode(0.17, 0.98, 1.3, 30, true)}
        {warpStarNode(-0.34, 0.94, 0.95, 18, false)}
        {warpStarNode(-0.87, 0.5, 1.2, 26, true)}
        {warpStarNode(-0.98, -0.17, 0.8, 16, false)}
        {warpStarNode(-0.71, -0.71, 1.25, 28, true)}
        {warpStarNode(-0.26, -0.97, 0.9, 18, false)}
        {warpStarNode(0.34, -0.94, 1.1, 24, true)}
        {warpStarNode(0.77, -0.64, 0.75, 14, false)}
      </div>
      <div data-role="tunStar" style={{ position: "absolute", left: "50%", top: "50%", width: "min(46vw,560px)", aspectRatio: "1", marginLeft: "calc(min(46vw,560px) / -2)", marginTop: "calc(min(46vw,560px) / -2)", zIndex: 2, opacity: 0 }}>
        <div style={{ position: "absolute", inset: "-7% 7% 7% -7%", background: "#f2e8d2", clipPath: STAR }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--acc)", clipPath: STAR }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 90% at 50% 50%,transparent 55%,rgba(0,0,0,.55))", zIndex: 3 }} />
      <div data-role="tunFlash" style={{ position: "absolute", inset: 0, opacity: 0, background: "radial-gradient(circle at 50% 50%,#fff,rgba(255,217,74,.8) 45%,transparent 75%)", zIndex: 4 }} />
      <div data-role="tunTitle" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%) scale(2.4)", opacity: 0, textAlign: "center", zIndex: 5, width: "max-content", maxWidth: "92vw" }}>
        <div style={{ display: "inline-block", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1, letterSpacing: ".2em", color: "#15120c", background: "var(--acc)", border: "3px solid #f2e8d2", padding: "9px 14px", transform: "rotate(-2deg)", boxShadow: "5px 5px 0 rgba(0,0,0,.6)" }}>ENTERING CHAPTER 01</div>
        <div style={{ marginTop: 18, fontFamily: MARKER, fontSize: "clamp(48px,9vw,170px)", lineHeight: 0.85, color: "#f2e8d2", textShadow: ".05em .05em 0 var(--acc)" }}>THE ORIGIN RUN</div>
        <div style={{ marginTop: 16, fontFamily: MONO, fontWeight: 700, fontSize: "clamp(10px,.9vw,13px)", lineHeight: 1, letterSpacing: ".3em", color: "rgba(242,232,210,.6)" }}>KEEP SCROLLING ▾</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section data-role="heroPin" style={{ position: "relative", width: "100%", height: "380vh" }}>
      <div data-role="heroSticky" style={{ position: "sticky", top: 0, height: "100vh", minHeight: 600, overflow: "hidden", borderBottom: "3px solid var(--ink)" }}>
        <LightScene />
        <DarkScene />
        <Tunnel />
        <div
          data-role="warpHud"
          style={{ position: "absolute", left: "clamp(18px,3.5vw,72px)", bottom: "clamp(40px,4.4vh,58px)", zIndex: 6, opacity: 0, pointerEvents: "none", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(11px,.95vw,14px)", lineHeight: 1, letterSpacing: ".18em", color: "#f2e8d2", display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{ display: "inline-block", width: 10, height: 10, background: "var(--acc)", animation: "blink 1s ease-in-out infinite" }} />
          WARP&nbsp;DRIVE&nbsp;<span data-role="warpPct" style={{ display: "inline-block", width: "4ch" }}>0%</span>
        </div>
        <div data-role="cineTop" style={{ position: "absolute", left: 0, right: 0, top: 0, height: "8vh", background: "#050302", zIndex: 7, transform: "translateY(-102%)", willChange: "transform" }} />
        <div data-role="cineBot" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "8vh", background: "#050302", zIndex: 7, transform: "translateY(102%)", willChange: "transform" }} />
      </div>
    </section>
  );
}
