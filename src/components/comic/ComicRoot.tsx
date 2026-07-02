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
import { MARKER, STAR } from "./ui";

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

export default function ComicRoot({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const busy = useRef(false);
  const shakeRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const sfxRef = useRef<HTMLDivElement>(null);

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

    const A = (
      el: HTMLElement | null,
      kf: Keyframe[],
      opt: KeyframeAnimationOptions,
    ) => el?.animate(kf, { fill: "both", ...opt });

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
        <div ref={shakeRef}>{children}</div>

        {/* fixed transition overlay */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            pointerEvents: "none",
            overflow: "hidden",
          }}
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
              background:
                "radial-gradient(circle at 50% 50%,#fff,var(--acc) 60%,var(--acc))",
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
      </div>
    </ThemeCtx.Provider>
  );
}
