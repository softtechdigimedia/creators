import React, { useEffect, useRef, useState, useCallback } from "react";

/* ============================================================
   WHO WE WORK WITH — Brand bubble showcase (React + TypeScript)
   - No text/heading, logo bubbles only
   - Real 2D container physics: gravity pulls every bubble down,
     they collide with the floor, side walls, AND each other,
     bouncing and rolling to rest like real balls dropped in a box
   - Click a bubble to open a lightbox with the full logo image
   - Fully responsive — physics re-scales to container size
============================================================= */

interface BrandLogo {
  id: string;
  name: string;
  src: string;
  size: number; // base diameter in px at reference width (1200px)
  startLeft: number; // % across container width where it begins falling
  delay: number; // seconds before this ball is released
}

interface Ball {
  x: number; // center x, px
  y: number; // center y, px
  vx: number;
  vy: number;
  r: number; // radius, px
  released: boolean;
  dragged: boolean;
  asleep: boolean;
  restTime: number; // seconds spent grounded + slow, used to trigger sleep
}

const BRAND_SOURCES: { name: string; src: string }[] = [
  { name: "Nerdist", src: "https://placehold.co/200x200/1a1a1a/ffffff?text=Nerdist" },
  { name: "Cervisol", src: "https://placehold.co/200x200/1a1a1a/ffffff?text=Cervisol" },
  { name: "30FM", src: "https://placehold.co/200x200/1a1a1a/ffffff?text=30FM" },
  { name: "ootem", src: "https://placehold.co/200x200/1a1a1a/ffffff?text=ootem" },
  { name: "Shinez", src: "https://placehold.co/200x200/1a1a1a/ffffff?text=SHINEZ" },
  { name: "FW", src: "https://placehold.co/200x200/1a1a1a/ffffff?text=FW" },
  { name: "Heartland", src: "https://placehold.co/200x200/1a1a1a/ffffff?text=Heartland" },
  { name: "Media Partners", src: "https://placehold.co/200x200/1a1a1a/ffffff?text=Media+Partners" },
];

const REFERENCE_WIDTH = 1200; // px the base `size` values are tuned for
const REFERENCE_HEIGHT = 600; // matches the 16/8 aspect-ratio stage at REFERENCE_WIDTH
const FILL_RATIO = 0.5; // fraction of container area the balls should cover
const MAX_BALLS = 20; // hard cap so collision cost (O(n^2)) stays cheap

// deterministic PRNG (mulberry32) so the layout is stable across renders/SSR
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateBrandLogos(): BrandLogo[] {
  const rng = mulberry32(42);
  const targetArea = REFERENCE_WIDTH * REFERENCE_HEIGHT * FILL_RATIO;
  const logos: BrandLogo[] = [];
  let coveredArea = 0;
  let i = 0;

  while (coveredArea < targetArea && i < MAX_BALLS) {
    const source = BRAND_SOURCES[i % BRAND_SOURCES.length];
    const size = 110 + rng() * 70; // 110–180px diameter
    const r = size / 2;
    logos.push({
      id: `${source.name.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      name: source.name,
      src: source.src,
      size,
      startLeft: rng() * 100,
      delay: i * 0.025 + rng() * 0.06,
    });
    coveredArea += Math.PI * r * r;
    i += 1;
  }

  return logos;
}

const BRAND_LOGOS: BrandLogo[] = generateBrandLogos();
const GRAVITY = 2200; // px/s^2
const WALL_RESTITUTION = 0.55;
const FLOOR_RESTITUTION = 0.42;
const BALL_RESTITUTION = 0.55;
const FLOOR_FRICTION = 0.97; // horizontal velocity damping while resting on floor
const AIR_DRAG = 0.995;
const DROP_HEIGHT = 500; // px above the container top each ball starts from
const SLEEP_VELOCITY = 6; // px/s — below this (and grounded) a ball is treated as asleep
const COLLISION_SLOP = 0.5; // px of allowed overlap before positional correction kicks in
const COLLISION_PERCENT = 0.8; // fraction of overlap corrected per frame (softens resolution)
const RESTING_CONTACT_VELOCITY = 40; // px/s — below this, ball-ball contacts don't bounce
const VELOCITY_EPS = 10; // px/s — velocities below this are snapped to 0 to stop micro-jitter
const SLEEP_TIME = 0.25; // seconds a ball must stay slow + grounded before it freezes entirely
const MAX_DT = 1 / 30; // clamp huge frame gaps (tab switches etc.)

const BrandShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const bubbleRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const ballsRef = useRef<Map<string, Ball>>(new Map());
  const containerRef = useRef<{ width: number; height: number }>({ width: REFERENCE_WIDTH, height: 600 });
  const scaleRef = useRef<number>(1);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const runningRef = useRef(false);

  const [hasStarted, setHasStarted] = useState(false);
  const [lightboxLogo, setLightboxLogo] = useState<BrandLogo | null>(null);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    containerRef.current = { width: rect.width, height: rect.height };
    scaleRef.current = rect.width / REFERENCE_WIDTH;
  }, []);

  // init balls once container size is known
  const initBalls = useCallback(() => {
    measure();
    const { width } = containerRef.current;
    const scale = scaleRef.current || 1;

    BRAND_LOGOS.forEach((logo) => {
      const r = (logo.size * scale) / 2;
      const x = (logo.startLeft / 100) * width;
      ballsRef.current.set(logo.id, {
        x: Math.max(r, Math.min(width - r, x)),
        y: -DROP_HEIGHT - Math.random() * 200,
        vx: (Math.random() - 0.5) * 40,
        vy: 0,
        r,
        released: false,
        dragged: false,
        asleep: false,
        restTime: 0,
      });
    });
  }, [measure]);

  const applyTransform = useCallback((id: string) => {
    const el = bubbleRefs.current.get(id);
    const b = ballsRef.current.get(id);
    if (!el || !b) return;
    el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
    el.style.width = `${b.r * 2}px`;
    el.style.height = `${b.r * 2}px`;
  }, []);

  const step = useCallback(
    (dt: number, elapsed: number) => {
      const { width, height } = containerRef.current;
      const balls = Array.from(ballsRef.current.values());
      const ids = Array.from(ballsRef.current.keys());

      // integrate per-ball forces (gravity, drag, walls, floor)
      BRAND_LOGOS.forEach((logo) => {
        const b = ballsRef.current.get(logo.id);
        if (!b) return;

        if (!b.released) {
          if (elapsed >= logo.delay) b.released = true;
          else return;
        }

        if (b.dragged) {
          b.asleep = false;
          b.restTime = 0;
          return; // position driven by the pointer handler instead
        }

        if (b.asleep) return; // fully frozen until something disturbs it

        b.vy += GRAVITY * dt;
        b.vx *= AIR_DRAG;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // left wall
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx = Math.abs(b.vx) * WALL_RESTITUTION;
        }
        // right wall
        if (b.x + b.r > width) {
          b.x = width - b.r;
          b.vx = -Math.abs(b.vx) * WALL_RESTITUTION;
        }
        // floor
        if (b.y + b.r > height) {
          b.y = height - b.r;
          if (Math.abs(b.vy) > 60) {
            b.vy = -Math.abs(b.vy) * FLOOR_RESTITUTION;
          } else {
            b.vy = 0;
          }
          b.vx *= FLOOR_FRICTION;
        }
        // ceiling guard (in case of strong bounce)
        if (b.y - b.r < 0) {
          b.y = b.r;
          b.vy = Math.abs(b.vy) * 0.3;
        }
      });

      // ball vs ball collisions (simple equal-ish mass elastic response)
      for (let i = 0; i < balls.length; i++) {
        const a = ballsRef.current.get(ids[i]);
        if (!a) continue;
        for (let j = i + 1; j < balls.length; j++) {
          const c = ballsRef.current.get(ids[j]);
          if (!a || !c) continue;
          if (a.asleep && c.asleep) continue; // two frozen balls never need re-checking

          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const minDist = a.r + c.r;

          if (dist < minDist) {
            // a moving ball touching a sleeping one wakes it up
            if (a.asleep) {
              a.asleep = false;
              a.restTime = 0;
            }
            if (c.asleep) {
              c.asleep = false;
              c.restTime = 0;
            }

            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            // mass proportional to area
            const ma = a.r * a.r;
            const mc = c.r * c.r;
            const totalMass = ma + mc;

            // soft positional correction: leave a tiny allowed overlap (slop) and
            // only resolve a fraction of it per frame — a full instant correction
            // every frame is what causes resting balls to visibly shake/vibrate.
            const correction = Math.max(overlap - COLLISION_SLOP, 0) * COLLISION_PERCENT;
            if (correction > 0) {
              a.x -= nx * correction * (mc / totalMass);
              a.y -= ny * correction * (mc / totalMass);
              c.x += nx * correction * (ma / totalMass);
              c.y += ny * correction * (ma / totalMass);
            }

            // relative velocity along normal
            const rvx = c.vx - a.vx;
            const rvy = c.vy - a.vy;
            const velAlongNormal = rvx * nx + rvy * ny;

            if (velAlongNormal < 0) {
              // treat very slow contacts as resting (no bounce) so two balls
              // settled against each other don't keep re-triggering tiny impulses
              const restitution = Math.abs(velAlongNormal) < RESTING_CONTACT_VELOCITY ? 0 : BALL_RESTITUTION;
              const impulse = (-(1 + restitution) * velAlongNormal) / (1 / ma + 1 / mc);
              const ix = impulse * nx;
              const iy = impulse * ny;
              a.vx -= ix / ma;
              a.vy -= iy / ma;
              c.vx += ix / mc;
              c.vy += iy / mc;
            }
          }
        }
      }

      // re-clamp against the container boundary AFTER collisions run —
      // a collision impulse can nudge a resting ball slightly back into
      // the floor/wall, and without this pass that nudge persists into
      // next frame's gravity step and re-triggers a "bounce", which is
      // what reads as jitter. This keeps everything honestly inside the
      // box at the end of every frame, no exceptions.
      ballsRef.current.forEach((b) => {
        if (b.dragged) return;
        if (b.x - b.r < 0) {
          b.x = b.r;
          if (b.vx < 0) b.vx = 0;
        }
        if (b.x + b.r > width) {
          b.x = width - b.r;
          if (b.vx > 0) b.vx = 0;
        }
        if (b.y + b.r > height) {
          b.y = height - b.r;
          if (Math.abs(b.vy) < 80) b.vy = 0;
        }
      });

      // kill imperceptible residual velocity so settled balls go fully still
      // instead of endlessly micro-correcting (the visible "shaking")
      ballsRef.current.forEach((b) => {
        if (b.dragged || b.asleep) return;
        const grounded = b.y + b.r >= height - 0.5;
        if (Math.abs(b.vy) < VELOCITY_EPS) b.vy = 0;
        if (Math.abs(b.vx) < VELOCITY_EPS) b.vx = 0;

        // once a ball has been essentially motionless and grounded for a
        // little while, freeze it completely instead of letting gravity,
        // floor contact, and neighbor collisions keep nudging it forever
        if (grounded && b.vx === 0 && b.vy === 0) {
          b.restTime += dt;
          if (b.restTime >= SLEEP_TIME) {
            b.asleep = true;
          }
        } else {
          b.restTime = 0;
        }
      });

      ids.forEach((id) => applyTransform(id));

      // decide whether the system is still active
      let active = false;
      ballsRef.current.forEach((b) => {
        if (b.asleep) return;
        const grounded = b.y + b.r >= height - 0.5;
        const speed = Math.hypot(b.vx, b.vy);
        if (b.dragged || !b.released || !grounded || speed > SLEEP_VELOCITY) active = true;
      });
      return active;
    },
    [applyTransform]
  );

  const loop = useCallback(
    (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, MAX_DT);
      lastTimeRef.current = timestamp;

      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      const active = step(dt, elapsed);

      if (active) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        runningRef.current = false;
        rafRef.current = null;
      }
    },
    [step]
  );

  const startSimulation = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    initBalls();
    BRAND_LOGOS.forEach((logo) => applyTransform(logo.id));
    lastTimeRef.current = null;
    startTimeRef.current = 0;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(loop);
  }, [hasStarted, initBalls, applyTransform, loop]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      startSimulation();
      return;
    }
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startSimulation();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startSimulation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(node);

    const fallbackTimer = window.setTimeout(() => {
      startSimulation();
      observer.disconnect();
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startSimulation]);

  // keep the simulation's container bounds in sync on resize
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => {
      const prev = { ...containerRef.current };
      measure();
      const { width, height } = containerRef.current;
      if (prev.width === width && prev.height === height) return;

      // rescale existing ball positions/radii proportionally instead of
      // resetting the whole simulation, so a resize doesn't look jarring
      const scale = scaleRef.current;
      ballsRef.current.forEach((b) => {
        b.r = b.r; // radius is re-derived per-ball below for accuracy
      });
      BRAND_LOGOS.forEach((logo) => {
        const b = ballsRef.current.get(logo.id);
        if (!b) return;
        const newR = (logo.size * scale) / 2;
        b.x = Math.min(Math.max(b.x, newR), Math.max(width - newR, newR));
        b.y = Math.min(b.y, Math.max(height - newR, newR));
        b.r = newR;
        b.asleep = false;
        b.restTime = 0;
      });

      if (!runningRef.current && hasStarted) {
        runningRef.current = true;
        lastTimeRef.current = null;
        rafRef.current = requestAnimationFrame(loop);
      }
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, [measure, hasStarted, loop]);

  const openLightbox = useCallback((logo: BrandLogo) => setLightboxLogo(logo), []);
  const closeLightbox = useCallback(() => setLightboxLogo(null), []);

  useEffect(() => {
    if (!lightboxLogo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxLogo, closeLightbox]);

  // ---- drag-to-move support ----
  const dragRef = useRef<{
    id: string;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    moved: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    lastT: number;
    vx: number;
    vy: number;
  } | null>(null);

  const DRAG_CLICK_THRESHOLD = 6; // px movement below which a release counts as a click
  const MAX_THROW_SPEED = 2600; // px/s — clamp fling velocity on release

  const wakeLoop = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastTimeRef.current = null;
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, logo: BrandLogo) => {
      const stage = stageRef.current;
      const ball = ballsRef.current.get(logo.id);
      if (!stage || !ball) return;

      const rect = stage.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      ball.dragged = true;
      ball.asleep = false;
      ball.restTime = 0;
      ball.vx = 0;
      ball.vy = 0;

      dragRef.current = {
        id: logo.id,
        pointerId: e.pointerId,
        offsetX: px - ball.x,
        offsetY: py - ball.y,
        moved: false,
        startX: px,
        startY: py,
        lastX: px,
        lastY: py,
        lastT: performance.now(),
        vx: 0,
        vy: 0,
      };

      (e.target as HTMLButtonElement).setPointerCapture(e.pointerId);
      wakeLoop();
    },
    [wakeLoop]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, logo: BrandLogo) => {
      const drag = dragRef.current;
      const stage = stageRef.current;
      const ball = ballsRef.current.get(logo.id);
      if (!drag || drag.id !== logo.id || !stage || !ball) return;

      const rect = stage.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const { width, height } = containerRef.current;

      const targetX = px - drag.offsetX;
      const targetY = py - drag.offsetY;

      ball.x = Math.min(Math.max(targetX, ball.r), Math.max(width - ball.r, ball.r));
      ball.y = Math.min(Math.max(targetY, ball.r), Math.max(height - ball.r, ball.r));

      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1) / 1000;
      drag.vx = (px - drag.lastX) / dt;
      drag.vy = (py - drag.lastY) / dt;
      drag.lastX = px;
      drag.lastY = py;
      drag.lastT = now;

      if (!drag.moved && Math.hypot(px - drag.startX, py - drag.startY) > DRAG_CLICK_THRESHOLD) {
        drag.moved = true;
      }

      applyTransform(logo.id);
    },
    [applyTransform]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, logo: BrandLogo) => {
      const drag = dragRef.current;
      const ball = ballsRef.current.get(logo.id);
      if (!drag || drag.id !== logo.id || !ball) return;

      ball.dragged = false;
      const clamp = (v: number) => Math.max(-MAX_THROW_SPEED, Math.min(MAX_THROW_SPEED, v));
      ball.vx = clamp(drag.vx);
      ball.vy = clamp(drag.vy);

      const wasClick = !drag.moved;
      dragRef.current = null;

      try {
        (e.target as HTMLButtonElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore — pointer may already be released
      }

      wakeLoop();
      if (wasClick) openLightbox(logo);
    },
    [openLightbox, wakeLoop]
  );

  return (
    <section className="bs-section" ref={sectionRef}>
      <div className="bs-stage" ref={stageRef}>
        {BRAND_LOGOS.map((logo) => (
          <button
            key={logo.id}
            type="button"
            ref={(el) => {
              if (el) bubbleRefs.current.set(logo.id, el);
            }}
            className="bs-bubble"
            style={{
              width: `${logo.size}px`,
              height: `${logo.size}px`,
              transform: `translate(-9999px, -9999px)`,
            }}
            onPointerDown={(e) => handlePointerDown(e, logo)}
            onPointerMove={(e) => handlePointerMove(e, logo)}
            onPointerUp={(e) => handlePointerUp(e, logo)}
            onPointerCancel={(e) => handlePointerUp(e, logo)}
            aria-label={`View ${logo.name} logo`}
          >
            <img src={logo.src} alt={logo.name} draggable={false} />
          </button>
        ))}
      </div>

      {lightboxLogo && (
        <div
          className="bs-lightbox bs-lightbox--open"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <span className="bs-lightbox-close" onClick={closeLightbox} aria-label="Close">
            &times;
          </span>
          <img src={lightboxLogo.src} alt={lightboxLogo.name} />
        </div>
      )}

      <style>{`
        .bs-section {
          width: 100%;
          padding: 40px 16px;
          box-sizing: border-box;
          background: transparent;
        }

        .bs-stage {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          aspect-ratio: 16 / 8;
          background: #0d0d0d;
          border-radius: 28px;
          overflow: hidden;
        }

        .bs-bubble {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          background: #1c1c1c;
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: grab;
          padding: 0;
          appearance: none;
          touch-action: none;
          will-change: transform;
        }

        .bs-bubble:active {
          cursor: grabbing;
        }

        .bs-bubble:hover {
          box-shadow: 0 0 0 2px rgba(255,255,255,0.18);
          z-index: 5;
        }

        .bs-bubble:focus-visible {
          outline: 2px solid rgba(255,255,255,0.6);
          outline-offset: 3px;
        }

        .bs-bubble img {
          width: 60%;
          height: 60%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .bs-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 24px;
          box-sizing: border-box;
          opacity: 0;
          animation: bsFadeIn 0.2s ease forwards;
        }

        @keyframes bsFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .bs-lightbox img {
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 12px;
          background: #fff;
          padding: 24px;
          box-sizing: border-box;
          animation: bsZoomIn 0.25s cubic-bezier(.2,1,.3,1) forwards;
        }

        @keyframes bsZoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .bs-lightbox-close {
          position: absolute;
          top: 24px;
          right: 32px;
          font-size: 40px;
          color: #fff;
          cursor: pointer;
          line-height: 1;
          font-family: sans-serif;
        }

        @media (max-width: 1024px) {
          .bs-stage { aspect-ratio: 16 / 10; border-radius: 22px; }
        }

        @media (max-width: 768px) {
          .bs-stage { aspect-ratio: 1 / 1.3; border-radius: 20px; }
        }

        @media (max-width: 480px) {
          .bs-stage { aspect-ratio: 1 / 1.7; border-radius: 16px; }
        }
      `}</style>
    </section>
  );
};

export default BrandShowcase;