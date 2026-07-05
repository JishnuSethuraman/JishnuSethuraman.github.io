"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealKind = "slam" | "wipe" | "sfx" | "flyL" | "flyR" | "pop" | "redact";

const REDACT_ON = "color-mix(in srgb,var(--acc) 26%,transparent)";

// Scroll-triggered reveal, ported from the design's data-reveal handler.
export default function Reveal({
  kind = "slam",
  delay = 0,
  as = "div",
  className,
  style,
  children,
  ...rest
}: {
  kind?: RevealKind;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const unredact = () => {
      el.style.background = REDACT_ON;
      el.style.color = "inherit";
    };
    if (reduce || !("IntersectionObserver" in window)) {
      if (kind === "redact") unredact();
      else el.style.opacity = "1";
      return;
    }
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          if (!en.isIntersecting) return;
          if (kind === "redact") {
            unredact();
          } else {
            const map: Record<Exclude<RevealKind, "redact">, string> = {
              wipe: `revealWipe .65s ${delay}s both cubic-bezier(.2,.8,.2,1)`,
              sfx: `sfxPop .7s ${delay}s both cubic-bezier(.2,.9,.2,1)`,
              flyL: `flyL .8s ${delay}s both cubic-bezier(.2,.8,.2,1)`,
              flyR: `flyR .8s ${delay}s both cubic-bezier(.2,.8,.2,1)`,
              pop: `burstIn .65s ${delay}s both cubic-bezier(.2,.9,.2,1)`,
              slam: `revealSlam .7s ${delay}s both cubic-bezier(.2,.8,.2,1)`,
            };
            el.style.animation = map[kind];
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [kind, delay]);

  const initial: CSSProperties = kind === "redact" ? { ...style } : { opacity: 0, ...style };
  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={initial} {...rest}>
      {children}
    </Tag>
  );
}
