import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";
import { CubeField } from "./CubeField";
import { scrollStore } from "./scrollStore";

// Drives the camera through the scene based on scroll progress + pointer sway.
function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = scrollStore.progress;
    const px = scrollStore.smoothPointer.x;
    const py = scrollStore.smoothPointer.y;

    // Fly from z=12 (reading the name) deep into the cube tunnel.
    const z = THREE.MathUtils.lerp(12, -62, p);
    // Gentle lateral drift so each section reframes the scene.
    const sway = Math.sin(p * Math.PI * 2) * 3;

    const targetX = sway + px * 1.0;
    const targetY = py * 0.6 + p * 2;

    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
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
