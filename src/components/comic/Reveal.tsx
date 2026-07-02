"use client";

import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealKind = "slam" | "wipe" | "sfx";

// Scroll-triggered reveal, ported from the design's data-reveal handler.
export default function Reveal({
  kind = "slam",
  delay = 0,
  as = "div",
  className,
  style,
  children,
}: {
  kind?: RevealKind;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.style.opacity = "1";
      return;
    }
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          if (!en.isIntersecting) return;
          const anim =
            kind === "wipe"
              ? `revealWipe .65s ${delay}s both cubic-bezier(.2,.8,.2,1)`
              : kind === "sfx"
                ? `sfxPop .7s ${delay}s both cubic-bezier(.2,.9,.2,1)`
                : `revealSlam .7s ${delay}s both cubic-bezier(.2,.8,.2,1)`;
          el.style.animation = anim;
          io.unobserve(el);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [kind, delay]);

  return createElement(as, { ref, className, style: { opacity: 0, ...style } }, children);
}
