"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Scroll-linked depth layer, ported from the design's data-px handler.
// Positions relative to the (untransformed) parent section to avoid feedback.
export default function Parallax({
  factor,
  style,
  children,
}: {
  factor: number;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = el.parentElement ?? el;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        const rc = host.getBoundingClientRect();
        const mid = rc.top + rc.height / 2 - vh / 2;
        el.style.transform = `translate3d(0,${(-mid * factor).toFixed(1)}px,0)`;
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
  }, [factor]);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
