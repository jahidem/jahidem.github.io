import { useEffect, useRef, useState } from "react";

// Shapes the cursor cycles through: triangle, square, pentagon, hexagon.
const SIDES = [3, 4, 5, 6];
const RADIUS = 10;

// Points for a regular n-gon inscribed in RADIUS, centered at the origin and
// starting at the top vertex (SVG viewBox is centered on 0,0).
function polyPoints(n: number): string {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    pts.push(`${(Math.cos(a) * RADIUS).toFixed(2)},${(Math.sin(a) * RADIUS).toFixed(2)}`);
  }
  return pts.join(" ");
}

// Custom cursor: a tiny precise dot at the exact pointer, plus a lagging,
// continuously-spinning polygon that cycles through shapes (triangle → square →
// pentagon → hexagon). It scales up and spins faster over interactive elements.
export function Cursor() {
  const shell = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [sides, setSides] = useState(SIDES[0]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setHidden(true);
      return;
    }
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const polyPos = { ...pos };
    let raf = 0;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [data-hover]"));
    };

    const loop = () => {
      polyPos.x += (pos.x - polyPos.x) * 0.14;
      polyPos.y += (pos.y - polyPos.y) * 0.14;
      if (shell.current) {
        shell.current.style.transform = `translate(${polyPos.x}px, ${polyPos.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move);

    // Cycle the cursor's shape; the 3D flip masks the swap.
    let idx = 0;
    const cycle = window.setInterval(() => {
      idx = (idx + 1) % SIDES.length;
      setSides(SIDES[idx]);
    }, 2600);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(cycle);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  if (hidden) return null;
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={shell} className={`cursor-poly ${hovering ? "is-hover" : ""}`}>
        <div className="cursor-poly-scale">
          <svg className="cursor-poly-spin" viewBox="-13 -13 26 26" width="26" height="26">
            <polygon points={polyPoints(sides)} />
          </svg>
        </div>
      </div>
    </>
  );
}
