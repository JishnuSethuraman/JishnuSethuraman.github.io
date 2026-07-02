"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";

export const panelClosedStyle: CSSProperties = {
  display: "none",
  height: 0,
  opacity: 0,
  overflow: "hidden",
};

// Expand/collapse with WAAPI height animation, ported from the design's togglePanel.
export function useDisclosure() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const willOpen = !open;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof panel.animate !== "function") {
      panel.style.display = willOpen ? "block" : "none";
      panel.style.height = willOpen ? "auto" : "0";
      panel.style.opacity = willOpen ? "1" : "0";
      setOpen(willOpen);
      return;
    }

    if (willOpen) {
      panel.style.display = "block";
      const h = panel.scrollHeight;
      const a = panel.animate(
        [
          { height: "0px", opacity: 0 },
          { height: `${h}px`, opacity: 1 },
        ],
        { duration: 360, easing: "cubic-bezier(.2,.85,.2,1)", fill: "forwards" },
      );
      a.onfinish = () => {
        panel.style.height = "auto";
        panel.style.opacity = "1";
        a.cancel();
      };
    } else {
      const h = panel.scrollHeight;
      const a = panel.animate(
        [
          { height: `${h}px`, opacity: 1 },
          { height: "0px", opacity: 0 },
        ],
        { duration: 300, easing: "cubic-bezier(.45,0,.2,1)", fill: "forwards" },
      );
      a.onfinish = () => {
        panel.style.display = "none";
        panel.style.height = "0px";
        panel.style.opacity = "0";
        a.cancel();
      };
    }
    setOpen(willOpen);
  }, [open]);

  return { open, toggle, panelRef };
}
