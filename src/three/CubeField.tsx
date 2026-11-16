import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";

const COUNT = 64;
const Z_NEAR = -6; // start behind the name so nothing occludes it at the hero
const Z_FAR = -90;

const PHI = (1 + Math.sqrt(5)) / 2;

// Classic football: a truncated icosahedron built as the convex hull of its 60
// vertices (all even/cyclic permutations of the three golden-ratio triples).
// Shares the icosahedral symmetry of the Platonic solids around it.
function truncatedIcosahedron(): THREE.BufferGeometry {
  const v: THREE.Vector3[] = [];
  const triples: [number, number, number][] = [
    [0, 1, 3 * PHI],
    [1, 2 + PHI, 2 * PHI],
    [PHI, 2, 2 * PHI + 1],
  ];
  const signs = [1, -1];
  for (const [a, b, c] of triples) {
    for (const sa of signs)
      for (const sb of signs)
        for (const sc of signs) {
          const A = a * sa;
          const B = b * sb;
          const C = c * sc;
          // the three cyclic (even) permutations
          v.push(new THREE.Vector3(A, B, C));
          v.push(new THREE.Vector3(B, C, A));
          v.push(new THREE.Vector3(C, A, B));
        }
  }
  return new ConvexGeometry(v);
}

// Scale a geometry so its bounding sphere has radius 1 — lets every shape share
// the same per-instance scale range regardless of its native proportions.
function unitize(geo: THREE.BufferGeometry): THREE.BufferGeometry {
  geo.computeBoundingSphere();
  const r = geo.boundingSphere?.radius ?? 1;
  if (r > 0) geo.scale(1 / r, 1 / r, 1 / r);
  return geo;
}

type ShapeData = {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  spin: THREE.Vector3;
  scale: number;
  geo: number;
};

// Hollow wireframe polyhedra scattered through depth (matching the name swarm).
// The camera flies through them on scroll, giving the fly-through corridor feel.
export function CubeField() {
  const geometries = useMemo(
    () => [
      unitize(new THREE.BoxGeometry(1, 1, 1)),
      unitize(new THREE.IcosahedronGeometry(1, 0)),
      unitize(new THREE.DodecahedronGeometry(1, 0)),
      unitize(new THREE.OctahedronGeometry(1, 0)),
      unitize(new THREE.TetrahedronGeometry(1, 0)),
      unitize(truncatedIcosahedron()),
    ],
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#3a3a3a",
        wireframe: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    []
  );

  // Build every shape, then bucket them by geometry so each geometry gets one
  // InstancedMesh (instancing requires a single shared geometry).
  const groups = useMemo(() => {
    const buckets: ShapeData[][] = geometries.map(() => []);
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 9 + Math.random() * 11;
      // round-robin so every shape appears equally often
      const geo = i % geometries.length;
      buckets[geo].push({
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
        geo,
      });
    }
    return buckets;
  }, [geometries]);

  return (
    <>
      {geometries.map((geo, i) =>
        groups[i].length ? (
          <ShapeInstances key={i} geometry={geo} material={material} items={groups[i]} />
        ) : null
      )}
    </>
  );
}

function ShapeInstances({
  geometry,
  material,
  items,
}: {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  items: ShapeData[];
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = items.length;

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const c = items[i];
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

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
}
