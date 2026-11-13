import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 64;
const Z_NEAR = -6; // start behind the name so nothing occludes it at the hero
const Z_FAR = -90;

type CubeData = {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  spin: THREE.Vector3;
  scale: number;
};

// Monochrome instanced cubes scattered through depth. The camera flies through
// them on scroll, giving the fly-through corridor feel.
export function CubeField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const cubes = useMemo<CubeData[]>(() => {
    const arr: CubeData[] = [];
    for (let i = 0; i < COUNT; i++) {
      // keep a clear tunnel near the center so content stays readable
      const angle = Math.random() * Math.PI * 2;
      const radius = 9 + Math.random() * 11;
      arr.push({
        pos: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.7,
          Z_NEAR + Math.random() * (Z_FAR - Z_NEAR)
        ),
        rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        ),
        scale: 0.35 + Math.random() * 0.85,
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      const c = cubes[i];
      // slow, steady turn about a fixed diagonal axis plus a gentle float
      const turn = c.spin.x * delta * 0.5;
      c.rot.x += turn;
      c.rot.y += turn * 0.7;
      const phase = c.scale * 7 + i;
      const pulse = 1 + Math.sin(t * 0.5 + phase) * 0.03;
      dummy.position.set(
        c.pos.x + Math.sin(t * 0.18 + phase) * 0.6,
        c.pos.y + Math.sin(t * 0.25 + phase * 1.3) * 0.9,
        c.pos.z
      );
      dummy.rotation.copy(c.rot);
      dummy.scale.setScalar(c.scale * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#5a5a5a"
        metalness={0.1}
        roughness={0.7}
        transparent
        opacity={0.72}
        flatShading
      />
    </instancedMesh>
  );
}
