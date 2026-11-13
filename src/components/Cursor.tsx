import { useEffect, useRef, useState } from "react";

// Custom cursor: a tiny precise dot at the exact pointer, plus a lagging,
// continuously-spinning 3D cube that nods to the site's cube motif. The cube
// scales up and spins into focus over interactive elements.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const cube = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setHidden(true);
      return;
    }
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const cubePos = { ...pos };
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
      cubePos.x += (pos.x - cubePos.x) * 0.14;
      cubePos.y += (pos.y - cubePos.y) * 0.14;
      if (cube.current) {
        cube.current.style.transform = `translate(${cubePos.x}px, ${cubePos.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  if (hidden) return null;
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={cube} className={`cursor-cube ${hovering ? "is-hover" : ""}`}>
        <div className="cursor-cube-scale">
          <div className="cursor-cube-inner">
            <span className="cf cf-front" />
            <span className="cf cf-back" />
            <span className="cf cf-right" />
            <span className="cf cf-left" />
            <span className="cf cf-top" />
            <span className="cf cf-bottom" />
          </div>
        </div>
      </div>
    </>
  );
}
