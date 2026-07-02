"use client";

import type { CSSProperties } from "react";
import { useComicTheme } from "./ComicRoot";
import Parallax from "./Parallax";
import { MARKER, MONO, SANS, STAR } from "./ui";

const sceneStyle = (active: boolean, background: string): CSSProperties => ({
  position: "absolute",
  inset: 0,
  opacity: active ? 1 : 0,
  display: active ? "block" : "none",
  background,
  overflow: "hidden",
});

function LightScene({ active }: { active: boolean }) {
  return (
    <div style={sceneStyle(active, "radial-gradient(130% 120% at 68% 32%,#f6ecd4,#eaddbd 70%)")}>
      {/* FAR depth layer: full-page radiating speed lines, centered on the viewport */}
      <Parallax factor={0.2} style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "230vmax",
            height: "230vmax",
            transform: "translate(-50%,-50%)",
            opacity: 0.14,
            background:
              "repeating-conic-gradient(from 0deg at 50% 50%,#15120c 0deg .55deg,transparent .55deg 3.1deg)",
            WebkitMask:
              "radial-gradient(circle at 50% 50%,transparent 3%,#000 16%,#000 75%,transparent 100%)",
            mask: "radial-gradient(circle at 50% 50%,transparent 3%,#000 16%,#000 75%,transparent 100%)",
            animation: "spinSlow 150s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "150vmax",
            height: "150vmax",
            transform: "translate(-50%,-50%)",
            opacity: 0.07,
            background:
              "repeating-conic-gradient(from 0deg at 50% 50%,#15120c 0deg .32deg,transparent .32deg 2deg)",
            WebkitMask:
              "radial-gradient(circle at 50% 50%,transparent 5%,#000 28%,transparent 92%)",
            mask: "radial-gradient(circle at 50% 50%,transparent 5%,#000 28%,transparent 92%)",
            animation: "spinRev 95s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "90vmax",
            height: "90vmax",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(255,106,26,.22),transparent 60%)",
            animation: "pulseScaleCentered 11s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-2vw",
            bottom: "-7vh",
            fontFamily: MARKER,
            fontSize: "min(46vh,42vw)",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "2px rgba(21,18,12,.06)",
          }}
        >
          01
        </div>
      </Parallax>

      {/* MID depth layer: halftone fields */}
      <Parallax factor={0.11} style={{ zIndex: 1 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(#15120c 1.1px,transparent 1.5px)",
            backgroundSize: "7px 7px",
            opacity: 0.06,
            animation: "drift 28s linear infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "7%",
            top: "16%",
            width: "clamp(150px,17vmax,400px)",
            height: "clamp(150px,17vmax,400px)",
            backgroundImage: "radial-gradient(#15120c 2px,transparent 2.6px)",
            backgroundSize: "13px 13px",
            opacity: 0.12,
            WebkitMask: "radial-gradient(circle,#000 28%,transparent 70%)",
            mask: "radial-gradient(circle,#000 28%,transparent 70%)",
            animation: "floatB 14s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "3%",
            bottom: "14%",
            width: "clamp(130px,13vmax,320px)",
            height: "clamp(130px,13vmax,320px)",
            backgroundImage: "radial-gradient(var(--acc) 2px,transparent 2.6px)",
            backgroundSize: "15px 15px",
            opacity: 0.17,
            WebkitMask: "radial-gradient(circle,#000 30%,transparent 70%)",
            mask: "radial-gradient(circle,#000 30%,transparent 70%)",
            animation: "floatA 16s ease-in-out infinite",
          }}
        />
      </Parallax>

      {/* NEAR depth layer: flying speed streaks + spinning action stars */}
      <Parallax factor={0.04} style={{ zIndex: 2 }}>
        <div
          style={{
            position: "absolute",
            top: "14%",
            left: 0,
            width: "46vw",
            height: 4,
            background: "linear-gradient(90deg,transparent,var(--acc),transparent)",
            opacity: 0.5,
            animation: "flyAcross 6.5s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "27%",
            left: 0,
            width: "34vw",
            height: 2,
            background: "linear-gradient(90deg,transparent,#15120c,transparent)",
            opacity: 0.32,
            animation: "flyAcross 9s linear infinite",
            animationDelay: "-3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "72%",
            left: 0,
            width: "52vw",
            height: 3,
            background: "linear-gradient(90deg,transparent,#15120c,transparent)",
            opacity: 0.28,
            animation: "flyAcross 8s linear infinite",
            animationDelay: "-5s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "87%",
            left: 0,
            width: "40vw",
            height: 5,
            background: "linear-gradient(90deg,transparent,var(--acc),transparent)",
            opacity: 0.42,
            animation: "flyAcross 7.4s linear infinite",
            animationDelay: "-1.5s",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "5%",
            top: "22%",
            width: "clamp(30px,3vw,58px)",
            height: "clamp(30px,3vw,58px)",
            opacity: 0.82,
            animation: "pulseScale 4s ease-in-out infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--acc)",
              clipPath: STAR,
              animation: "spinSlowLocal 16s linear infinite",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            right: "15%",
            bottom: "21%",
            width: "clamp(20px,2.2vw,44px)",
            height: "clamp(20px,2.2vw,44px)",
            background: "#15120c",
            clipPath: STAR,
            opacity: 0.65,
            animation: "spinRevLocal 20s linear infinite",
          }}
        />
      </Parallax>

      {/* issue tag */}
      <div
        style={{
          position: "absolute",
          left: "clamp(18px,3.5vw,72px)",
          top: "calc(var(--bar) + clamp(12px,2vh,26px))",
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          gap: 9,
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: "clamp(10px,.85vw,13px)",
          lineHeight: 1,
          letterSpacing: ".2em",
          color: "rgba(21,18,12,.55)",
          animation: "slamIn .6s .2s both",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 9,
            height: 9,
            background: "var(--acc)",
            border: "2px solid #15120c",
          }}
        />
        ISSUE&nbsp;#01 · ORIGIN STORY
      </div>

      {/* content */}
      <div
        style={{
          position: "absolute",
          top: "var(--bar)",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          padding: "clamp(18px,3.5vw,72px)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(24px,3.5vw,80px)",
            width: "100%",
            maxWidth: "min(2600px,94vw)",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1 1 540px", minWidth: 300 }}>
            <div
              style={{
                display: "inline-block",
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "clamp(11px,1vw,15px)",
                lineHeight: 1,
                letterSpacing: ".16em",
                color: "#15120c",
                background: "var(--acc)",
                border: "3px solid #15120c",
                padding: "9px 13px",
                boxShadow: "4px 4px 0 #15120c",
                transform: "rotate(-2deg)",
                animation: "burstIn .6s .5s both",
              }}
            >
              ML/AI SOFTWARE ENGINEER
            </div>
            <h1
              style={{
                margin: ".18em 0 0",
                fontFamily: MARKER,
                fontWeight: 400,
                fontSize: "clamp(38px,7.6vw,188px)",
                lineHeight: 0.84,
                color: "#15120c",
              }}
            >
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    textShadow: ".05em .05em 0 var(--acc)",
                    animation: "dropLine .75s .35s both cubic-bezier(.2,.8,.2,1)",
                  }}
                >
                  JAYADITYAN
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    textShadow: ".05em .05em 0 var(--acc)",
                    animation: "dropLine .75s .5s both cubic-bezier(.2,.8,.2,1)",
                  }}
                >
                  SETHURAMAN
                </span>
              </span>
            </h1>
            <div
              style={{
                width: "min(360px,70%)",
                height: "clamp(10px,1vw,18px)",
                background: "var(--acc)",
                border: "2.5px solid #15120c",
                transform: "rotate(-1deg)",
                margin: ".14em 0 0",
                animation: "wipeReveal .5s 1.05s both",
              }}
            />
            <div
              style={{
                marginTop: "clamp(18px,1.6vw,30px)",
                maxWidth: "min(560px,92%)",
                background: "#fbf6e9",
                border: "3px solid #15120c",
                boxShadow: "6px 6px 0 #15120c",
                padding: "clamp(13px,1.1vw,20px) clamp(16px,1.3vw,24px)",
                transform: "rotate(-.5deg)",
                animation: "slamIn .7s .95s both",
              }}
            >
              <span
                style={{
                  fontFamily: SANS,
                  fontWeight: 500,
                  fontSize: "clamp(14px,1.35vw,20px)",
                  lineHeight: 1.42,
                  color: "#2a241a",
                }}
              >
                Building scalable AI systems and innovative applications — from research to
                production.
              </span>
            </div>
          </div>

          {/* portrait */}
          <div
            style={{
              flex: "0 1 clamp(280px,30vw,620px)",
              minWidth: 230,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-57%,-55%)",
                width: "clamp(340px,37vw,720px)",
                aspectRatio: "1",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#15120c",
                  clipPath: STAR,
                  animation: "burstIn .8s .26s both,pulseScale 6.5s 1.1s ease-in-out infinite",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-49%,-48%)",
                width: "clamp(320px,34vw,660px)",
                aspectRatio: "1",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--acc)",
                  clipPath: STAR,
                  animation: "burstIn .85s .34s both,spinSlowLocal 46s 1.2s linear infinite",
                }}
              />
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
                <img
                  src="/headshot.jpg"
                  alt="Jayadityan Sethuraman"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 26%",
                    filter: "saturate(1.06) contrast(1.02)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  backgroundImage: "radial-gradient(rgba(21,18,12,.5) 1px,transparent 1.5px)",
                  backgroundSize: "5px 5px",
                  mixBlendMode: "multiply",
                  opacity: 0.16,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: -4,
                  bottom: 16,
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: "clamp(11px,.9vw,14px)",
                  lineHeight: 1,
                  letterSpacing: ".14em",
                  color: "#f7efd9",
                  background: "#15120c",
                  padding: "6px 10px",
                }}
              >
                ML/AI
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: "clamp(18px,2.6vh,32px)",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: "clamp(11px,.9vw,14px)",
          lineHeight: 1,
          letterSpacing: ".16em",
          color: "#15120c",
          zIndex: 4,
          animation: "floatY 2.4s ease-in-out infinite",
        }}
      >
        TURN THE PAGE ▾
      </div>
    </div>
  );
}

function DarkScene({ active }: { active: boolean }) {
  return (
    <div style={sceneStyle(active, "radial-gradient(130% 120% at 30% 30%,#1a160e,#100d09 72%)")}>
      {/* FAR depth layer: full-page radiating speed lines, centered on the viewport */}
      <Parallax factor={0.2} style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "230vmax",
            height: "230vmax",
            transform: "translate(-50%,-50%)",
            opacity: 0.15,
            background:
              "repeating-conic-gradient(from 0deg at 50% 50%,var(--acc) 0deg .5deg,transparent .5deg 3.2deg)",
            WebkitMask:
              "radial-gradient(circle at 50% 50%,transparent 3%,#000 16%,#000 75%,transparent 100%)",
            mask: "radial-gradient(circle at 50% 50%,transparent 3%,#000 16%,#000 75%,transparent 100%)",
            animation: "spinSlow 150s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "150vmax",
            height: "150vmax",
            transform: "translate(-50%,-50%)",
            opacity: 0.08,
            background:
              "repeating-conic-gradient(from 0deg at 50% 50%,#f2e8d2 0deg .3deg,transparent .3deg 2deg)",
            WebkitMask:
              "radial-gradient(circle at 50% 50%,transparent 5%,#000 28%,transparent 92%)",
            mask: "radial-gradient(circle at 50% 50%,transparent 5%,#000 28%,transparent 92%)",
            animation: "spinRev 95s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "96vmax",
            height: "96vmax",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,color-mix(in srgb,var(--acc) 30%,transparent),transparent 62%)",
            animation: "pulseScaleCentered 9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-1vw",
            bottom: "-7vh",
            fontFamily: MARKER,
            fontSize: "min(44vh,40vw)",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "2px rgba(242,232,210,.06)",
          }}
        >
          01
        </div>
      </Parallax>

      {/* MID depth layer: ink hatching + halftone fields */}
      <Parallax factor={0.11} style={{ zIndex: 1 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(116deg,rgba(242,232,210,.05) 0 2px,transparent 2px 17px)",
            animation: "driftDiag 8s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "8%",
            top: "15%",
            width: "clamp(150px,17vmax,420px)",
            height: "clamp(150px,17vmax,420px)",
            backgroundImage: "radial-gradient(#f2e8d2 2px,transparent 2.6px)",
            backgroundSize: "14px 14px",
            opacity: 0.1,
            WebkitMask: "radial-gradient(circle,#000 28%,transparent 70%)",
            mask: "radial-gradient(circle,#000 28%,transparent 70%)",
            animation: "floatB 15s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "3%",
            bottom: "12%",
            width: "clamp(140px,14vmax,340px)",
            height: "clamp(140px,14vmax,340px)",
            backgroundImage: "radial-gradient(var(--acc) 2px,transparent 2.7px)",
            backgroundSize: "16px 16px",
            opacity: 0.2,
            WebkitMask: "radial-gradient(circle,#000 30%,transparent 70%)",
            mask: "radial-gradient(circle,#000 30%,transparent 70%)",
            animation: "floatA 17s ease-in-out infinite",
          }}
        />
      </Parallax>

      {/* NEAR depth layer */}
      <Parallax factor={0.04} style={{ zIndex: 2 }}>
        <div
          style={{
            position: "absolute",
            top: "16%",
            left: 0,
            width: "50vw",
            height: 4,
            background: "linear-gradient(90deg,transparent,var(--acc),transparent)",
            opacity: 0.6,
            animation: "flyAcross 6s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: 0,
            width: "36vw",
            height: 2,
            background: "linear-gradient(90deg,transparent,#f2e8d2,transparent)",
            opacity: 0.26,
            animation: "flyAcross 9.5s linear infinite",
            animationDelay: "-4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "69%",
            left: 0,
            width: "46vw",
            height: 3,
            background: "linear-gradient(90deg,transparent,#f2e8d2,transparent)",
            opacity: 0.22,
            animation: "flyAcross 8.5s linear infinite",
            animationDelay: "-2s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "88%",
            left: 0,
            width: "42vw",
            height: 5,
            background: "linear-gradient(90deg,transparent,var(--acc),transparent)",
            opacity: 0.52,
            animation: "flyAcross 7s linear infinite",
            animationDelay: "-5.5s",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "13%",
            bottom: "24%",
            width: "clamp(20px,2vw,40px)",
            height: "clamp(20px,2vw,40px)",
            background: "#f2e8d2",
            clipPath: STAR,
            opacity: 0.5,
            animation: "spinRevLocal 22s linear infinite",
          }}
        />
      </Parallax>

      {/* edition tag */}
      <div
        style={{
          position: "absolute",
          right: "clamp(18px,3.5vw,72px)",
          top: "calc(var(--bar) + clamp(12px,2vh,26px))",
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          gap: 9,
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: "clamp(10px,.85vw,13px)",
          lineHeight: 1,
          letterSpacing: ".2em",
          color: "rgba(242,232,210,.5)",
          animation: "slamIn .6s .2s both",
        }}
      >
        INKY&nbsp;NIGHT&nbsp;EDITION
        <span
          style={{
            display: "inline-block",
            width: 9,
            height: 9,
            background: "var(--acc)",
            border: "2px solid #f2e8d2",
          }}
        />
      </div>

      {/* content */}
      <div
        style={{
          position: "absolute",
          top: "var(--bar)",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          padding: "clamp(18px,3.5vw,72px)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap-reverse",
            alignItems: "center",
            gap: "clamp(20px,3vw,72px)",
            width: "100%",
            maxWidth: "min(2600px,94vw)",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1 1 560px", minWidth: 300, position: "relative" }}>
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "clamp(11px,1vw,15px)",
                lineHeight: 1,
                letterSpacing: ".16em",
                color: "var(--acc)",
                marginBottom: ".4em",
                animation: "slamIn .5s .35s both",
              }}
            >
              {"// PORTFOLIO.v2"}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontFamily: MARKER,
                  fontSize: "clamp(54px,12.5vw,300px)",
                  lineHeight: 0.78,
                  color: "var(--acc)",
                  textShadow:
                    ".04em .04em 0 #14110c,0 0 .18em color-mix(in srgb,var(--acc) 40%,transparent)",
                  animation: "flyL .8s .35s both cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <span style={{ display: "inline-block", animation: "jitter 4s 1.2s ease-in-out infinite" }}>
                  ML/AI
                </span>
              </div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontFamily: MARKER,
                  fontSize: "clamp(40px,9vw,228px)",
                  lineHeight: 0.82,
                  color: "transparent",
                  WebkitTextStroke: "2.5px #f2e8d2",
                  marginTop: ".02em",
                  animation: "flyR .8s .5s both cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <span style={{ display: "inline-block", animation: "jitter 5s 1.3s ease-in-out infinite" }}>
                  ENGINEER
                </span>
              </div>
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: ".5em",
                background: "var(--acc)",
                borderTop: "3px solid #14110c",
                borderBottom: "3px solid #14110c",
                padding: "clamp(9px,.8vw,16px) clamp(20px,1.6vw,34px)",
                transformOrigin: "left center",
                animation: "sashIn .7s .85s both cubic-bezier(.2,.8,.2,1)",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: "clamp(15px,1.9vw,30px)",
                  lineHeight: 1,
                  letterSpacing: ".05em",
                  color: "#14110c",
                }}
              >
                JAYADITYAN SETHURAMAN
              </span>
            </div>
            <div
              style={{
                marginTop: "clamp(16px,1.4vw,28px)",
                maxWidth: "min(560px,92%)",
                animation: "slamIn .7s 1.05s both",
              }}
            >
              <span
                style={{
                  fontFamily: SANS,
                  fontWeight: 500,
                  fontSize: "clamp(14px,1.35vw,20px)",
                  lineHeight: 1.45,
                  color: "#e8dcc2",
                }}
              >
                Building scalable AI systems and innovative applications — from research to
                production.
              </span>
            </div>
          </div>

          {/* portrait */}
          <div
            style={{
              flex: "0 1 clamp(280px,30vw,620px)",
              minWidth: 230,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-56%,-54%)",
                width: "clamp(320px,34vw,660px)",
                aspectRatio: "1",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#f2e8d2",
                  opacity: 0.16,
                  clipPath: STAR,
                  animation: "burstIn .8s .26s both,pulseScale 6.5s 1.1s ease-in-out infinite",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-47%,-47%)",
                width: "clamp(320px,34vw,660px)",
                aspectRatio: "1",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--acc)",
                  opacity: 0.34,
                  clipPath: STAR,
                  animation: "burstIn .85s .34s both,spinSlowLocal 44s 1.2s linear infinite",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "clamp(280px,30vw,560px)",
                aspectRatio: "404/548",
                background: "#14110c",
                border: "4px solid #f2e8d2",
                clipPath: "polygon(6% 2%,98% 0,94% 96%,2% 100%)",
                boxShadow: "0 0 0 6px #14110c,18px 18px 0 rgba(0,0,0,.5)",
                animation:
                  "slamIn .9s .3s both cubic-bezier(.2,.75,.25,1),pulseGlow 6s 1.4s ease-in-out infinite",
              }}
            >
              <div style={{ width: "100%", height: "100%", animation: "floatY 7s 1.4s ease-in-out infinite" }}>
                <img
                  src="/headshot.jpg"
                  alt="Jayadityan Sethuraman"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 26%",
                    filter: "saturate(1.08) contrast(1.03)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  backgroundImage: "radial-gradient(rgba(20,17,12,.55) 1px,transparent 1.5px)",
                  backgroundSize: "5px 5px",
                  mixBlendMode: "multiply",
                  opacity: 0.22,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: "clamp(18px,2.6vh,32px)",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: "clamp(11px,.9vw,14px)",
          lineHeight: 1,
          letterSpacing: ".16em",
          color: "var(--acc)",
          zIndex: 4,
          animation: "floatY 2.4s ease-in-out infinite",
        }}
      >
        TURN THE PAGE ▾
      </div>
    </div>
  );
}

export default function Hero() {
  const theme = useComicTheme();
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 600,
        overflow: "hidden",
        borderBottom: "3px solid var(--ink)",
      }}
    >
      <LightScene active={theme === "light"} />
      <DarkScene active={theme === "dark"} />
    </section>
  );
}
