// Lightweight mutable store shared between Lenis (DOM scroll) and the R3F render
// loop. Mutated in place and read inside useFrame so animation never triggers
// React re-renders.

export const scrollStore = {
  // 0..1 progress through the whole page
  progress: 0,
  // instantaneous scroll velocity (normalized)
  velocity: 0,
  // whether the pointer has moved yet (avoids load-time repulsion at center)
  pointerActive: false,
  // pointer in normalized device coords (-1..1)
  pointer: { x: 0, y: 0 },
  // smoothed pointer (eased toward pointer each frame)
  smoothPointer: { x: 0, y: 0 },
  // populated by useSmoothScroll so UI can trigger smooth anchor scrolls
  scrollTo: (_target: string | number | HTMLElement) => {},
};

export type ScrollStore = typeof scrollStore;
