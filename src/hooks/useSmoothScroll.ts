import { useEffect } from "react";
import Lenis from "lenis";
import { scrollStore } from "../three/scrollStore";

// Initializes Lenis smooth scrolling and feeds global scroll progress/velocity
// into scrollStore. Returns nothing; mount once at the app root.
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", (e: { progress: number; velocity: number }) => {
      scrollStore.progress = e.progress;
      scrollStore.velocity = e.velocity;
    });

    scrollStore.scrollTo = (target) => lenis.scrollTo(target, { offset: 0 });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onPointer = (ev: PointerEvent) => {
      scrollStore.pointerActive = true;
      scrollStore.pointer.x = (ev.clientX / window.innerWidth) * 2 - 1;
      scrollStore.pointer.y = -((ev.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      lenis.destroy();
    };
  }, []);
}
