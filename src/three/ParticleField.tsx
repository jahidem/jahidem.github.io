import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sampleTextPoints, spherePoints } from "./sampleText";
import { scrollStore } from "./scrollStore";
import { profile } from "../data/content";

// Particle system that forms the name on load, disperses toward a sphere as the
// user scrolls past the hero, and reacts to the pointer.
export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { geometry, count, home, sphere } = useMemo(() => {
    const home = sampleTextPoints(profile.firstName, profile.lastName, {
      worldWidth: 8,
      density: 2,
    });
    const count = home.length / 3;
    const sphere = spherePoints(count, 5.5);

    const geometry = new THREE.BufferGeometry();
    // live positions start at home
    geometry.setAttribute("position", new THREE.BufferAttribute(home.slice(), 3));
    // per-particle random for drift variation
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) rnd[i] = Math.random();
    geometry.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));
    return { geometry, count, home, sphere };
  }, []);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;

    // Ease smoothed pointer toward raw pointer
    scrollStore.smoothPointer.x += (scrollStore.pointer.x - scrollStore.smoothPointer.x) * 0.05;
    scrollStore.smoothPointer.y += (scrollStore.pointer.y - scrollStore.smoothPointer.y) * 0.05;

    // Morph factor: 0 while in hero, ramps to 1 as we scroll away (first ~18%)
    const p = scrollStore.progress;
    const morph = THREE.MathUtils.clamp(p / 0.18, 0, 1);
    const eased = morph * morph * (3 - 2 * morph); // smoothstep

    const posAttr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const rndAttr = pts.geometry.getAttribute("aRnd") as THREE.BufferAttribute;
    const px = scrollStore.smoothPointer.x;
    const py = scrollStore.smoothPointer.y;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const r = rndAttr.getX(i);

      // target = lerp(home, sphere) + organic drift
      const driftX = Math.sin(t * 0.6 + r * 10) * 0.04;
      const driftY = Math.cos(t * 0.5 + r * 8) * 0.04;

      let tx = THREE.MathUtils.lerp(home[ix], sphere[ix], eased) + driftX;
      let ty = THREE.MathUtils.lerp(home[ix + 1], sphere[ix + 1], eased) + driftY;
      let tz = THREE.MathUtils.lerp(home[ix + 2], sphere[ix + 2], eased);

      // Pointer repulsion while in text form (only after the pointer has moved,
      // so the name doesn't explode from the centered default position on load)
      if (eased < 0.6 && scrollStore.pointerActive) {
        const dx = home[ix] - px * 5.5;
        const dy = home[ix + 1] - py * 3;
        const d2 = dx * dx + dy * dy;
        const force = Math.max(0, 1 - d2 / 5) * (1 - eased);
        tx += dx * force * 0.09;
        ty += dy * force * 0.09;
      }

      // Ease current toward target
      const cx = posAttr.getX(i);
      const cy = posAttr.getY(i);
      const cz = posAttr.getZ(i);
      tmp.set(
        cx + (tx - cx) * 0.16,
        cy + (ty - cy) * 0.16,
        cz + (tz - cz) * 0.16
      );
      posAttr.setXYZ(i, tmp.x, tmp.y, tmp.z);
    }
    posAttr.needsUpdate = true;

    // Gentle rotation once dispersed
    pts.rotation.y = eased * (t * 0.05 + px * 0.3);
    pts.rotation.x = eased * (py * 0.2);

    if (matRef.current) {
      matRef.current.opacity = 0.88 - eased * 0.3;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, 2.7, 0]}>
      <pointsMaterial
        ref={matRef}
        color="#141414"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.88}
        depthWrite={false}
      />
    </points>
  );
}
