import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";
import { CubeField } from "./CubeField";
import { scrollStore } from "./scrollStore";

// Drives the camera through the scene based on scroll progress + pointer sway.
// The downward fly and the upward fly use *different* lateral paths so scrolling
// back up feels like its own motion rather than the down-weave played backwards.
function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const lastP = useRef(0);
  const dir = useRef(1); // smoothed scroll direction: +1 down, -1 up

  useFrame(() => {
    const p = scrollStore.progress;
    const px = scrollStore.smoothPointer.x;
    const py = scrollStore.smoothPointer.y;

    // Smoothed scroll direction from the progress delta.
    const d = p - lastP.current;
    lastP.current = p;
    const raw = d > 0.0003 ? 1 : d < -0.0003 ? -1 : dir.current;
    dir.current += (raw - dir.current) * 0.06;
    const upness = THREE.MathUtils.clamp((1 - dir.current) * 0.5, 0, 1); // 0 down → 1 up

    // Depth fly is shared both ways — the tunnel in/out feels right regardless.
    const z = THREE.MathUtils.lerp(12, -62, p);

    // Down: a wide weaving S-curve. Up: a calmer, phase-shifted glide that leans
    // the opposite way, so reversing doesn't retrace the same left-right swings.
    const swayDown = Math.sin(p * Math.PI * 2) * 3;
    const swayUp = Math.cos(p * Math.PI * 1.5) * 1.1;
    const sway = THREE.MathUtils.lerp(swayDown, swayUp, upness);

    // Up also rides a little higher and flatter than the down path.
    const liftDown = p * 2;
    const liftUp = p * 1.1 + 0.5;
    const lift = THREE.MathUtils.lerp(liftDown, liftUp, upness);

    const targetX = sway + px * 1.0;
    const targetY = py * 0.6 + lift;

    // Ease slightly faster going up so the new path doesn't feel laggy.
    const k = 0.06 + upness * 0.025;
    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.position.z += (z - camera.position.z) * 0.06;

    // Look-at point starts exactly on the name (origin) and travels deeper with
    // scroll, so the camera always sits ~12 units in front of its focus.
    const focusZ = THREE.MathUtils.lerp(0, -72, p);
    target.current.set(px * 0.6, py * 0.4, focusZ);
    camera.lookAt(target.current);
  });

  return null;
}

export function Scene() {
  return (
    <Canvas
      className="scene-canvas"
      // R3F sets an inline `position: relative`; override it so the canvas is
      // truly fixed and out of flow (otherwise it pushes the page content down).
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 200 }}
    >
      {/* No scene background — canvas is transparent so the page's warm
          gradient shows through. Fog matches the mid tone so cubes fade out. */}
      <fog attach="fog" args={["#e7e3da", 12, 52]} />

      {/* Lighting tuned so black cubes read as solid dark shapes on white */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 10, 8]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-6, -4, 2]} intensity={0.5} color="#ffffff" />

      <ParticleField />
      <CubeField />

      <CameraRig />
    </Canvas>
  );
}
