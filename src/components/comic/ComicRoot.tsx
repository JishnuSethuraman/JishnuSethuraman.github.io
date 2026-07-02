"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import TopBar from "./TopBar";
import { useComicEngine } from "./useComicEngine";
import { MARKER, MONO, STAR } from "./ui";

export type Theme = "light" | "dark";

const ThemeCtx = createContext<Theme>("light");
export const useComicTheme = () => useContext(ThemeCtx);

// decaying random screen shake, ported from the design
function shakeFrames(a: number): Keyframe[] {
  const f: Keyframe[] = [];
  const n = 11;
  for (let i = 0; i <= n; i++) {
    const decay = 1 - i / n;
    const x = (Math.random() * 2 - 1) * a * decay;
    const y = (Math.random() * 2 - 1) * a * decay;
    f.push({
      transform: `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${(x * 0.04).toFixed(2)}deg)`,
    });
  }
  f[0] = { transform: "translate(0,0)" };
  f[n] = { transform: "translate(0,0)" };
  return f;
}

const spineLink: CSSProperties = {
  fontFamily: MONO,
  fontWeight: 700,
  fontSize: 10,
  lineHeight: 1,
  letterSpacing: ".1em",
  color: "rgba(242,232,210,.65)",
  padding: "6px 8px",
  transition: "color .15s,background .15s",
};

const cursorStar = (size: number, opacity: number, spin: string): CSSProperties => ({
  position: "absolute",
  left: -size / 2,
  top: -size / 2,
  width: size,
  height: size,
  background: "var(--acc)",
  opacity,
  clipPath: STAR,
  animation: spin,
});

export default function ComicRoot({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const busy = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const shakeRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const sfxRef = useRef<HTMLDivElement>(null);

  useComicEngine(rootRef);

  const toggleTheme = useCallback(() => {
    if (busy.current) return;
    const toDark = theme === "light";
    const next: Theme = toDark ? "dark" : "light";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setTheme(next);
      return;
    }
    busy.current = true;

    const A = (el: HTMLElement | null, kf: Keyframe[], opt: KeyframeAnimationOptions) =>
      el?.animate(kf, { fill: "both", ...opt });

    const lines = linesRef.current;
    if (lines) lines.style.display = "block";
    A(
      lines,
      [
        { opacity: 0, transform: "translate(-50%,-50%) scale(1.8) rotate(0deg)" },
        { opacity: 0.95, transform: "translate(-50%,-50%) scale(1) rotate(10deg)", offset: 0.42 },
        { opacity: 0.6, transform: "translate(-50%,-50%) scale(.9) rotate(16deg)", offset: 0.7 },
        { opacity: 0, transform: "translate(-50%,-50%) scale(.8) rotate(22deg)" },
      ],
      { duration: 1000, easing: "cubic-bezier(.3,.7,.2,1)" },
    );

    shakeRef.current?.animate(shakeFrames(15), { duration: 900, easing: "linear" });

    A(
      flashRef.current,
      [
        { opacity: 0 },
        { opacity: 0, offset: 0.16 },
        { opacity: 1, offset: 0.33 },
        { opacity: 1, offset: 0.47 },
        { opacity: 0, offset: 0.82 },
      ],
      { duration: 1000, easing: "ease-out" },
    );

    A(
      wipeRef.current,
      [
        { transform: "translateX(-125%) skewX(-12deg)" },
        { transform: "translateX(-125%) skewX(-12deg)", offset: 0.18 },
        { transform: "translateX(0%) skewX(-12deg)", offset: 0.5 },
        { transform: "translateX(125%) skewX(-12deg)", offset: 0.86 },
        { transform: "translateX(125%) skewX(-12deg)" },
      ],
      { duration: 1000, easing: "cubic-bezier(.5,.08,.3,1)" },
    );

    A(
      starRef.current,
      [
        { opacity: 0, transform: "translate(-50%,-50%) scale(0) rotate(-60deg)" },
        { opacity: 0, transform: "translate(-50%,-50%) scale(0) rotate(-60deg)", offset: 0.2 },
        { opacity: 1, transform: "translate(-50%,-50%) scale(1.25) rotate(10deg)", offset: 0.44 },
        { opacity: 1, transform: "translate(-50%,-50%) scale(1.08) rotate(6deg)", offset: 0.7 },
        { opacity: 0, transform: "translate(-50%,-50%) scale(1.5) rotate(0deg)" },
      ],
      { duration: 1000, easing: "cubic-bezier(.2,.8,.2,1)" },
    );

    if (sfxRef.current) sfxRef.current.textContent = toDark ? "NIGHT" : "DAY";
    A(
      sfxRef.current,
      [
        { opacity: 0, transform: "translate(-50%,-50%) scale(2.6) rotate(-10deg)" },
        { opacity: 0, transform: "translate(-50%,-50%) scale(2.6) rotate(-10deg)", offset: 0.2 },
        { opacity: 1, transform: "translate(-50%,-50%) scale(1) rotate(-5deg)", offset: 0.46 },
        { opacity: 1, transform: "translate(-50%,-50%) scale(1) rotate(-5deg)", offset: 0.72 },
        { opacity: 0, transform: "translate(-50%,-50%) scale(1.18) rotate(-3deg)" },
      ],
      { duration: 1000, easing: "cubic-bezier(.2,.8,.2,1)" },
    );

    window.setTimeout(() => setTheme(next), 420);
    window.setTimeout(() => {
      if (lines) lines.style.display = "none";
      busy.current = false;
    }, 1040);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={theme}>
      <div
        ref={rootRef}
        data-theme={theme}
        style={
          {
            "--acc": "#ff6a1a",
            "--bar": "clamp(58px,5vh,82px)",
            position: "relative",
            width: "100%",
            overflowX: "clip",
            background: "var(--bg)",
            color: "var(--text)",
          } as CSSProperties
        }
      >
        <TopBar theme={theme} onToggle={toggleTheme} />
        <span id="top" />
        <div data-role="shake" ref={shakeRef}>
          <div data-role="skew" style={{ willChange: "transform" }}>
            {children}
          </div>
        </div>

        {/* ===================== theme transition overlay ===================== */}
        <div
          aria-hidden
          style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none", overflow: "hidden" }}
        >
          <div
            ref={linesRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "220vmax",
              height: "220vmax",
              transform: "translate(-50%,-50%)",
              display: "none",
              opacity: 0,
              background:
                "repeating-conic-gradient(from 0deg at 50% 50%,#15120c 0deg 1deg,transparent 1deg 4deg)",
            }}
          />
          <div
            ref={flashRef}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              background: "radial-gradient(circle at 50% 50%,#fff,var(--acc) 60%,var(--acc))",
            }}
          />
          <div
            ref={wipeRef}
            style={{
              position: "absolute",
              top: "-10%",
              left: "-20%",
              width: "140%",
              height: "120%",
              transform: "translateX(-125%) skewX(-12deg)",
              backgroundColor: "var(--acc)",
              borderRight: "8px solid #15120c",
              backgroundImage: "radial-gradient(#15120c 1.4px,transparent 1.8px)",
              backgroundSize: "9px 9px",
            }}
          />
          <div
            ref={starRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "min(56vw,620px)",
              height: "min(56vw,620px)",
              transform: "translate(-50%,-50%) scale(0)",
              opacity: 0,
            }}
          >
            <div style={{ position: "absolute", inset: "-7%", background: "#15120c", clipPath: STAR }} />
            <div style={{ position: "absolute", inset: 0, background: "var(--acc)", clipPath: STAR }} />
          </div>
          <div
            ref={sfxRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%) scale(0)",
              opacity: 0,
              fontFamily: MARKER,
              fontSize: "min(20vw,260px)",
              lineHeight: 0.9,
              color: "var(--acc)",
              WebkitTextStroke: "4px #15120c",
              textShadow: "0 0 36px rgba(0,0,0,.45)",
              whiteSpace: "nowrap",
            }}
          >
            NIGHT
          </div>
        </div>

        {/* ===================== cinematic overlays ===================== */}
        <div
          data-role="speedo"
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            pointerEvents: "none",
            opacity: 0,
            background:
              "repeating-linear-gradient(90deg,transparent 0 54px,color-mix(in srgb,var(--ink) 60%,transparent) 54px 56px,transparent 56px 118px)",
            WebkitMask: "radial-gradient(120% 92% at 50% 50%,#000 26%,transparent 76%)",
            mask: "radial-gradient(120% 92% at 50% 50%,#000 26%,transparent 76%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 56,
            pointerEvents: "none",
            opacity: 0.05,
            backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1.3px)",
            backgroundSize: "6px 6px",
            animation: "grainShift .5s steps(1,end) infinite",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 57,
            pointerEvents: "none",
            border: "clamp(4px,.6vw,10px) solid var(--ink)",
            background: "radial-gradient(125% 105% at 50% 42%,transparent 60%,rgba(10,8,4,.16))",
          }}
        />
        <div
          data-role="fx"
          aria-hidden
          style={{ position: "fixed", inset: 0, zIndex: 75, pointerEvents: "none", overflow: "hidden" }}
        />
        <div
          data-role="cursor"
          aria-hidden
          style={{ position: "fixed", left: 0, top: 0, zIndex: 80, pointerEvents: "none", width: 0, height: 0, display: "none" }}
        >
          <div
            style={{
              ...cursorStar(24, 1, "spinSlowLocal 5s linear infinite"),
              filter: "drop-shadow(1.5px 1.5px 0 #15120c)",
            }}
          />
        </div>
        <div
          data-role="curst1"
          aria-hidden
          style={{ position: "fixed", left: 0, top: 0, zIndex: 79, pointerEvents: "none", width: 0, height: 0, display: "none" }}
        >
          <div style={cursorStar(16, 0.4, "spinRevLocal 4s linear infinite")} />
        </div>
        <div
          data-role="curst2"
          aria-hidden
          style={{ position: "fixed", left: 0, top: 0, zIndex: 78, pointerEvents: "none", width: 0, height: 0, display: "none" }}
        >
          <div style={cursorStar(10, 0.2, "spinSlowLocal 3s linear infinite")} />
        </div>

        {/* ===================== spine nav ===================== */}
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 16,
            transform: "translateX(-50%)",
            zIndex: 58,
            display: "flex",
            alignItems: "center",
            gap: 3,
            background: "#15120c",
            border: "2.5px solid #f2e8d2",
            boxShadow: "4px 4px 0 rgba(0,0,0,.5)",
            padding: "5px 7px",
          }}
        >
          <a data-spine="#top" href="#top" style={spineLink}>COVER</a>
          <a data-spine="#chapter-1" href="#chapter-1" style={spineLink}>CH.1</a>
          <a data-spine="#chapter-2" href="#chapter-2" style={spineLink}>CH.2</a>
          <a data-spine="#chapter-3" href="#chapter-3" style={spineLink}>CH.3</a>
          <a data-spine="#finale" href="#finale" style={spineLink}>FIN</a>
        </div>

        {/* ===================== intro cinematic ===================== */}
        <div data-role="intro" aria-hidden style={{ position: "fixed", inset: 0, zIndex: 90, pointerEvents: "none" }}>
          <div data-role="introTop" style={{ position: "absolute", left: 0, right: 0, top: 0, height: "50.4%", background: "#0f0c07" }} />
          <div data-role="introBot" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "50.4%", background: "#0f0c07" }} />
          <div
            data-role="introSeam"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: 3,
              transform: "translateY(-50%) scaleX(0)",
              background: "var(--acc)",
              boxShadow: "0 0 20px var(--acc)",
            }}
          />
          <div
            data-role="introTitle"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              opacity: 0,
              textAlign: "center",
              width: "max-content",
              maxWidth: "92vw",
            }}
          >
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(10px,1vw,14px)", lineHeight: 1, letterSpacing: ".34em", color: "#f2e8d2", marginBottom: 14 }}>
              JS COMICS PRESENTS
            </div>
            <div style={{ fontFamily: MARKER, fontSize: "clamp(38px,7vw,110px)", lineHeight: 0.9, color: "var(--acc)", textShadow: ".05em .05em 0 rgba(0,0,0,.55)" }}>
              THE ML ENGINEER
            </div>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(9px,.85vw,12px)", lineHeight: 1.6, letterSpacing: ".26em", color: "rgba(242,232,210,.6)", marginTop: 14 }}>
              A JAYADITYAN SETHURAMAN PRODUCTION · ISSUE #01
            </div>
          </div>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
