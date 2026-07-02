"use client";

import { useEffect, type RefObject } from "react";
import { STAR } from "./ui";

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const ez = (a: number, b: number, t: number) => clamp01((t - a) / (b - a));

// Ambient/scroll/pointer engine, ported near-verbatim from the design's controller
// class. It operates on data-* hooks inside the root and never rebuilds React DOM —
// it only reads layout and writes transform/opacity, so components render once.
export function useComicEngine(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = <T extends Element = HTMLElement>(s: string) =>
      root.querySelector<T>(s);
    const qa = <T extends Element = HTMLElement>(s: string) => [
      ...root.querySelectorAll<T>(s),
    ];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer:fine)").matches;
    // "lite" = phones/tablets/small viewports. The pinned warp + huge gradient
    // layers exhaust mobile GPU memory (Safari reload-loops), so we collapse to
    // a static, reduced-motion-style experience there.
    const lite =
      reduce ||
      window.matchMedia("(pointer:coarse)").matches ||
      window.innerWidth <= 820;

    const cleanups: Array<() => void> = [];

    // ---- warp / pinned hero + tunnel ----
    const heroPin = q("[data-role=heroPin]");
    const tunnel = q("[data-role=tunnel]");
    const tunTitle = q("[data-role=tunTitle]");
    const tunStar = q("[data-role=tunStar]");
    const tunFlash = q("[data-role=tunFlash]");
    const tunRings = qa("[data-role=tunRing]");
    const warpStars = qa("[data-warp-star]").map((el) => ({
      el,
      dx: parseFloat(el.getAttribute("data-wx") || "0") || 0,
      dy: parseFloat(el.getAttribute("data-wy") || "0") || 0,
      sp: parseFloat(el.getAttribute("data-ws") || "1") || 1,
    }));
    const warpHud = q("[data-role=warpHud]");
    const warpPct = q("[data-role=warpPct]");
    const zoomEls = qa("[data-warp-zoom]");
    zoomEls.forEach((el) => {
      el.style.transformOrigin = el.getAttribute("data-warp-origin") || "50% 45%";
    });
    const cineTop = q("[data-role=cineTop]");
    const cineBot = q("[data-role=cineBot]");

    // ---- pinned project shelf ----
    const projPin = q("[data-role=projPin]");
    const projSticky = q("[data-role=projSticky]");
    const shelf = q("[data-role=shelf]");
    const shelfCards = shelf ? ([...shelf.children] as HTMLElement[]) : [];
    const fileHud = q("[data-role=fileHud]");

    // ---- finale rising star ----
    const riseStar = q("[data-role=riseStar]");
    const finale = q("#finale");

    // ---- ambient parallax + dolly + spine ----
    const pxEls = qa("[data-px]");
    const dollyEls = qa("[data-dolly]");
    const spineLinks = qa("[data-spine]");

    // ---- cinematic overlays ----
    const cursorEl = q("[data-role=cursor]");
    const curst1El = q("[data-role=curst1]");
    const curst2El = q("[data-role=curst2]");
    const fxEl = q("[data-role=fx]");
    const speedoEl = q("[data-role=speedo]");
    const shakeEl = q("[data-role=shake]");
    const topbarEl = document.querySelector<HTMLElement>("[data-role=topbar]");

    let _shelfHeld = false;
    let _fileIdx = 0;
    let _lastPct = -1;

    // lite/reduced-motion: unpin everything, hide the warp/HUD flourishes
    if (lite) {
      if (heroPin) heroPin.style.height = "100vh";
      if (tunnel) tunnel.style.display = "none";
      if (warpHud) warpHud.style.display = "none";
      if (projPin) projPin.style.height = "auto";
      if (projSticky) {
        projSticky.style.position = "relative";
        projSticky.style.height = "auto";
      }
    }
    if (shelf && !lite) shelf.style.scrollSnapType = "none";

    // ---------- shake helper ----------
    const shakeFrames = (a: number): Keyframe[] => {
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
    };

    // ---------- comic SFX: click bursts + section fly-words ----------
    const burstWords = ["POW!", "BAM!", "ZAP!", "WHAM!", "KRAK!", "BOOM!"];
    let burstCount = 0;
    const spawnBurst = (x: number, y: number) => {
      if (!fxEl || burstCount > 5) return;
      burstCount++;
      const d = document.createElement("div");
      d.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:0;height:0;pointer-events:none;`;
      const s = document.createElement("div");
      s.style.cssText = `position:absolute;left:-44px;top:-44px;width:88px;height:88px;background:var(--acc);clip-path:${STAR};filter:drop-shadow(3px 3px 0 rgba(21,18,12,.8));`;
      const w = document.createElement("span");
      w.textContent = burstWords[Math.floor(Math.random() * burstWords.length)];
      w.style.cssText = `position:absolute;left:0;top:0;transform:translate(-50%,-50%) rotate(${(Math.random() * 24 - 12).toFixed(1)}deg);font-family:var(--font-marker),cursive;font-size:24px;color:#15120c;white-space:nowrap;`;
      d.appendChild(s);
      d.appendChild(w);
      fxEl.appendChild(d);
      const a = d.animate(
        [
          { transform: "scale(.15) rotate(-22deg)", opacity: 0 },
          { transform: "scale(1.12) rotate(5deg)", opacity: 1, offset: 0.38 },
          { transform: "scale(1) rotate(0deg)", opacity: 1, offset: 0.6 },
          { transform: "scale(1.3) rotate(3deg)", opacity: 0 },
        ],
        { duration: 640, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
      a.onfinish = () => {
        d.remove();
        burstCount--;
      };
    };

    const flyWord = (word?: string) => {
      if (!word || !fxEl || reduce) return;
      const e = document.createElement("div");
      e.textContent = word;
      e.style.cssText = `position:absolute;left:0;top:${(26 + Math.random() * 38).toFixed(0)}%;font-family:var(--font-marker),cursive;font-size:min(17vw,210px);line-height:1;color:transparent;-webkit-text-stroke:3px var(--acc);white-space:nowrap;opacity:0;filter:drop-shadow(6px 6px 0 rgba(21,18,12,.3));transform:translateX(-70vw) rotate(-4deg);`;
      fxEl.appendChild(e);
      const a = e.animate(
        [
          { transform: "translateX(-70vw) rotate(-4deg)", opacity: 0 },
          { opacity: 1, offset: 0.16 },
          { opacity: 1, offset: 0.82 },
          { transform: "translateX(175vw) rotate(-4deg)", opacity: 0 },
        ],
        { duration: 950, easing: "cubic-bezier(.35,.6,.3,1)" },
      );
      a.onfinish = () => e.remove();
      shakeEl?.animate(shakeFrames(6), { duration: 400, easing: "linear" });
      topbarEl?.animate([{ filter: "brightness(1.7)" }, { filter: "brightness(1)" }], {
        duration: 450,
        easing: "ease-out",
      });
    };

    if (!lite && fxEl) {
      const onDown = (e: PointerEvent) => {
        spawnBurst(e.clientX, e.clientY);
        const star = cursorEl?.firstElementChild;
        if (star && cursorEl && cursorEl.style.display !== "none") {
          star.animate([{ opacity: 1 }, { opacity: 0.4 }, { opacity: 1 }], {
            duration: 200,
          });
        }
      };
      window.addEventListener("pointerdown", onDown, { passive: true });
      cleanups.push(() => window.removeEventListener("pointerdown", onDown));

      const words: Record<string, string> = {
        "chapter-1": "KRAK!",
        "chapter-2": "THWIP!",
        "chapter-3": "FWOOSH!",
        finale: "BOOM!",
      };
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (ents) => {
            ents.forEach((en) => {
              if (en.isIntersecting) {
                flyWord(words[en.target.id]);
                io.unobserve(en.target);
              }
            });
          },
          { threshold: 0.18 },
        );
        Object.keys(words).forEach((id) => {
          const el = root.querySelector(`#${id}`);
          if (el) io.observe(el);
        });
        cleanups.push(() => io.disconnect());
      }
    }

    // ---------- custom cursor ----------
    let tx = -100,
      ty = -100,
      cx = -100,
      cy = -100,
      t1x = -100,
      t1y = -100,
      t2x = -100,
      t2y = -100;
    const cursorOn = !lite && finePointer && !!cursorEl;
    if (cursorOn) {
      cursorEl!.style.display = "block";
      if (curst1El) curst1El.style.display = "block";
      if (curst2El) curst2El.style.display = "block";
      const onMove = (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));
    } else {
      if (cursorEl) cursorEl.style.display = "none";
      if (curst1El) curst1El.style.display = "none";
      if (curst2El) curst2El.style.display = "none";
    }

    // ---------- portrait tilt ----------
    if (!lite && finePointer) {
      qa("[data-tilt]").forEach((el) => {
        const sec = el.closest("section") || el;
        const onMove = (e: Event) => {
          const pe = e as PointerEvent;
          const r = el.getBoundingClientRect();
          if (!r.width) return;
          const rx = (pe.clientX - (r.left + r.width / 2)) / r.width;
          const ry = (pe.clientY - (r.top + r.height / 2)) / r.height;
          el.style.transition = "transform .14s ease-out";
          el.style.transform = `perspective(1100px) rotateY(${(rx * 9).toFixed(2)}deg) rotateX(${(-ry * 7).toFixed(2)}deg)`;
        };
        const onLeave = () => {
          el.style.transition = "transform .6s cubic-bezier(.2,.8,.2,1)";
          el.style.transform = "perspective(1100px)";
        };
        sec.addEventListener("pointermove", onMove);
        sec.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          sec.removeEventListener("pointermove", onMove);
          sec.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    // ---------- kinetic type: per-letter hover bounce ----------
    if (!lite && finePointer) {
      qa(".kinetic-letter").forEach((ch) => {
        const onEnter = () => {
          ch.animate(
            [
              { transform: "translateY(0) rotate(0deg)" },
              {
                transform: `translateY(-14px) rotate(${(Math.random() * 16 - 8).toFixed(1)}deg) scale(1.12)`,
              },
              { transform: "translateY(0) rotate(0deg)" },
            ],
            { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" },
          );
        };
        ch.addEventListener("pointerenter", onEnter);
        cleanups.push(() => ch.removeEventListener("pointerenter", onEnter));
      });
    }

    // ---------- shelf drag-to-scroll (native touch scroll handles lite mode) ----------
    if (shelf && !lite) {
      let down = false,
        startX = 0,
        startS = 0,
        moved = 0;
      const onDown = (e: PointerEvent) => {
        down = true;
        moved = 0;
        startX = e.clientX;
        startS = shelf.scrollLeft;
        _shelfHeld = true;
        shelf.style.cursor = "grabbing";
      };
      const onMove = (e: PointerEvent) => {
        if (!down) return;
        const dx = e.clientX - startX;
        moved += Math.abs(dx);
        shelf.scrollLeft = startS - dx;
      };
      const up = () => {
        down = false;
        _shelfHeld = false;
        shelf.style.cursor = "grab";
      };
      const onClick = (e: MouseEvent) => {
        if (moved > 8) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      shelf.addEventListener("pointerdown", onDown);
      shelf.addEventListener("pointermove", onMove);
      shelf.addEventListener("pointerup", up);
      shelf.addEventListener("pointerleave", up);
      shelf.addEventListener("click", onClick, true);
      cleanups.push(() => {
        shelf.removeEventListener("pointerdown", onDown);
        shelf.removeEventListener("pointermove", onMove);
        shelf.removeEventListener("pointerup", up);
        shelf.removeEventListener("pointerleave", up);
        shelf.removeEventListener("click", onClick, true);
      });
    }

    // ---------- per-frame updates ----------
    const updateWarp = () => {
      if (!heroPin || !tunnel || reduce) return;
      const vh = window.innerHeight;
      const rc = heroPin.getBoundingClientRect();
      const total = rc.height - vh;
      if (total <= 10) return;
      const p = clamp01(-rc.top / total);
      const pz = ez(0.1, 0.5, p);
      const pt = ez(0.3, 0.52, p);
      const ps = ez(0.28, 0.64, p);
      const pti = ez(0.64, 0.78, p);
      for (const el of zoomEls) {
        const sc = 1 + pz * pz * 2.4;
        el.style.transform = pz > 0 ? `scale(${sc.toFixed(3)})` : "";
        el.style.filter = pz > 0.12 ? `blur(${(pz * 9).toFixed(1)}px)` : "";
        el.style.opacity = String(1 - ez(0.34, 0.5, p));
      }
      tunnel.style.opacity = String(pt);
      tunnel.style.visibility = pt > 0 ? "visible" : "hidden";
      const breach = ez(0.3, 0.36, p) * (1 - ez(0.4, 0.48, p));
      if (breach > 0.05) {
        tunnel.style.transform = `translate(${((Math.random() * 2 - 1) * breach * 10).toFixed(1)}px,${((Math.random() * 2 - 1) * breach * 10).toFixed(1)}px)`;
      } else {
        tunnel.style.transform = "";
      }
      if (tunFlash) tunFlash.style.opacity = String((breach * 0.9).toFixed(3));
      for (let i = 0; i < tunRings.length; i++) {
        const ph = (ps * 2.2 + i / tunRings.length) % 1;
        tunRings[i].style.transform = `scale(${(0.15 + ph * 2.6).toFixed(3)})`;
        tunRings[i].style.opacity = String(ps > 0 && ps < 1 ? ((1 - ph) * 0.55).toFixed(3) : 0);
      }
      const D = Math.max(vh, window.innerWidth) * 0.95;
      for (const st of warpStars) {
        const d = Math.pow(Math.min(1, ps * st.sp), 1.7);
        st.el.style.transform = `translate(${(st.dx * d * D).toFixed(1)}px,${(st.dy * d * D).toFixed(1)}px) scale(${(0.25 + d * 3.2).toFixed(2)}) rotate(${(d * 190).toFixed(0)}deg)`;
        st.el.style.opacity = String(d < 0.02 ? 0 : Math.min(1, d * 4).toFixed(2));
      }
      if (tunStar) {
        const s = 0.2 + Math.pow(ps, 1.9) * 10;
        tunStar.style.transform = `scale(${s.toFixed(2)}) rotate(${(ps * 130).toFixed(0)}deg)`;
        tunStar.style.opacity = String(ps <= 0 ? 0 : (1 - ez(0.82, 0.98, ps)).toFixed(2));
      }
      if (tunTitle) {
        const sc = 2.6 - pti * 1.6;
        tunTitle.style.opacity = String(pti.toFixed(2));
        tunTitle.style.transform = `translate(-50%,-50%) scale(${sc.toFixed(2)}) rotate(${((1 - pti) * -6).toFixed(1)}deg)`;
      }
      if (cineTop && cineBot) {
        const k = ez(0.26, 0.42, p) * (1 - ez(0.88, 0.98, p));
        cineTop.style.transform = `translateY(${(-102 + k * 102).toFixed(1)}%)`;
        cineBot.style.transform = `translateY(${(102 - k * 102).toFixed(1)}%)`;
      }
      if (warpHud) {
        warpHud.style.opacity = p > 0.03 && p < 0.97 ? ".95" : "0";
        const pct = Math.round(p * 100);
        if (pct !== _lastPct && warpPct) {
          _lastPct = pct;
          warpPct.textContent = `${pct}%`;
        }
      }
    };

    const updateShelf = () => {
      if (!projPin || !shelf || reduce) return;
      const vh = window.innerHeight,
        vw = window.innerWidth;
      const rc = projPin.getBoundingClientRect();
      if (rc.bottom < -40 || rc.top > vh + 40) return;
      const total = rc.height - vh;
      if (total > 10 && !_shelfHeld) {
        const p = clamp01(-rc.top / total);
        const pe = p < 0.06 ? 0 : p > 0.94 ? 1 : (p - 0.06) / 0.88;
        const max = shelf.scrollWidth - shelf.clientWidth;
        if (max > 0) {
          const target = pe * max;
          if (Math.abs(shelf.scrollLeft - target) > 1) shelf.scrollLeft = target;
        }
        const n = shelfCards.length;
        if (fileHud && n) {
          const idx = Math.min(n, Math.max(1, Math.round(pe * (n - 1)) + 1));
          if (idx !== _fileIdx) {
            _fileIdx = idx;
            fileHud.textContent = `FILE 0${idx} / 0${n}`;
          }
        }
      }
      for (let i = 0; i < shelfCards.length; i++) {
        const c = shelfCards[i];
        const r2 = c.getBoundingClientRect();
        if (r2.right < -80 || r2.left > vw + 80) continue;
        const nn = Math.max(
          -1.4,
          Math.min(1.4, (r2.left + r2.width / 2 - vw / 2) / (vw / 2)),
        );
        c.style.transform = `rotate(${(nn * 3 + (i % 2 ? -0.5 : 0.5)).toFixed(2)}deg) translateY(${(Math.pow(Math.abs(nn), 1.5) * 26).toFixed(1)}px) scale(${(1 - Math.min(0.09, Math.abs(nn) * 0.05)).toFixed(3)})`;
      }
    };

    const updateRise = () => {
      if (!riseStar || !finale || reduce) return;
      const vh = window.innerHeight;
      const r = finale.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      const qv = clamp01((vh - r.top) / (vh + r.height));
      riseStar.style.transform = `translateY(${(-(qv * 40)).toFixed(2)}vmax) rotate(${(qv * 80).toFixed(1)}deg)`;
    };

    let mx = 0,
      my = 0,
      spineTick = 0;
    const updateAmbient = () => {
      const vh = window.innerHeight,
        vw = window.innerWidth;
      if (finePointer && tx > -1) {
        const nx = tx / vw - 0.5,
          ny = ty / vh - 0.5;
        mx += (nx - mx) * 0.06;
        my += (ny - my) * 0.06;
      } else {
        mx = 0;
        my = 0;
      }
      for (const el of pxEls) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const f = parseFloat(el.getAttribute("data-px") || "0") || 0;
        const mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(${(mx * f * 260).toFixed(1)}px,${(-mid * f + my * f * 160).toFixed(1)}px,0)`;
      }
      for (const el of dollyEls) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const qq = clamp01((vh - r.top) / (vh * 0.7));
        el.style.transform = `translateY(${((1 - qq) * 44).toFixed(1)}px) scale(${(0.962 + 0.038 * qq).toFixed(4)})`;
      }
      spineTick++;
      if (spineTick % 10 === 0 && spineLinks.length) {
        let active = 0;
        for (let i = 0; i < spineLinks.length; i++) {
          const sel = spineLinks[i].getAttribute("data-spine") || "";
          const tEl = sel ? root.querySelector(sel) : null;
          if (tEl && tEl.getBoundingClientRect().top <= vh * 0.5) active = i;
        }
        for (let i = 0; i < spineLinks.length; i++) {
          const a = spineLinks[i] as HTMLElement & { _on?: boolean };
          const on = i === active;
          if (a._on !== on) {
            a._on = on;
            a.style.background = on ? "var(--acc)" : "transparent";
            a.style.color = on ? "#15120c" : "rgba(242,232,210,.65)";
          }
        }
      }
    };

    // ---------- main rAF loop ----------
    let loopId = 0;
    let lastY = window.scrollY;
    let vel = 0;
    const step = () => {
      loopId = requestAnimationFrame(step);
      if (cursorOn && cursorEl) {
        cx += (tx - cx) * 0.28;
        cy += (ty - cy) * 0.28;
        cursorEl.style.transform = `translate(${cx.toFixed(1)}px,${cy.toFixed(1)}px)`;
        if (curst1El) {
          t1x += (tx - t1x) * 0.13;
          t1y += (ty - t1y) * 0.13;
          curst1El.style.transform = `translate(${t1x.toFixed(1)}px,${t1y.toFixed(1)}px)`;
        }
        if (curst2El) {
          t2x += (tx - t2x) * 0.06;
          t2y += (ty - t2y) * 0.06;
          curst2El.style.transform = `translate(${t2x.toFixed(1)}px,${t2y.toFixed(1)}px)`;
        }
      }
      const yy = window.scrollY;
      const v = yy - lastY;
      lastY = yy;
      vel += (v - vel) * 0.2;
      if (!reduce) {
        updateWarp();
        updateShelf();
        updateRise();
        updateAmbient();
      }
      if (!reduce && speedoEl) {
        const o = Math.min(0.26, Math.abs(vel) * 0.005);
        speedoEl.style.opacity = o < 0.02 ? "0" : o.toFixed(2);
      }
    };
    // Skip the per-frame loop entirely in lite mode — no warp/shelf/parallax
    // work, no cursor, no speedo. This is the main mobile-memory relief.
    if (!lite) {
      loopId = requestAnimationFrame(step);
      cleanups.push(() => cancelAnimationFrame(loopId));
    }

    // ---------- intro cinematic curtain ----------
    const intro = q("[data-role=intro]");
    if (intro) {
      if (lite) {
        intro.style.display = "none";
      } else {
        const top = q("[data-role=introTop]");
        const bot = q("[data-role=introBot]");
        const seam = q("[data-role=introSeam]");
        const title = q("[data-role=introTitle]");
        const A = (el: HTMLElement | null, kf: Keyframe[], opt: KeyframeAnimationOptions) =>
          el?.animate(kf, { fill: "both", ...opt });
        A(seam, [
          { transform: "translateY(-50%) scaleX(0)" },
          { transform: "translateY(-50%) scaleX(1)" },
        ], { duration: 340, easing: "cubic-bezier(.2,.8,.2,1)", delay: 100 });
        A(title, [
          { opacity: 0 },
          { opacity: 1, offset: 0.1 },
          { opacity: 0.25, offset: 0.2 },
          { opacity: 1, offset: 0.3 },
          { opacity: 1 },
        ], { duration: 800, easing: "steps(1, end)", delay: 240 });
        const t1 = window.setTimeout(() => {
          A(title, [
            { opacity: 1, transform: "translate(-50%,-50%) scale(1)" },
            { opacity: 0, transform: "translate(-50%,-50%) scale(1.5)" },
          ], { duration: 300, easing: "ease-in" });
        }, 1150);
        const t2 = window.setTimeout(() => {
          A(top, [{ transform: "translateY(0)" }, { transform: "translateY(-103%)" }], {
            duration: 620,
            easing: "cubic-bezier(.75,0,.2,1)",
          });
          A(bot, [{ transform: "translateY(0)" }, { transform: "translateY(103%)" }], {
            duration: 620,
            easing: "cubic-bezier(.75,0,.2,1)",
          });
          A(seam, [{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: "ease-out" });
          shakeEl?.animate(shakeFrames(9), { duration: 520, easing: "linear" });
        }, 1400);
        const t3 = window.setTimeout(() => {
          intro.style.display = "none";
        }, 2100);
        cleanups.push(() => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        });
      }
    }

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
