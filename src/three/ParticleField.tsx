import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sampleTextPoints, spherePoints } from "./sampleText";
import { scrollStore } from "./scrollStore";
import { profile } from "../data/content";

// Soft glowing orbs: each particle is a round dot with a feathered radial glow
// (no hard edge). Sizes vary so most are small + crisp to spell the name, while
// a few are large + faint for an atmospheric depth-of-field bokeh.
const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aFade;
  attribute vec3 aColor;
  varying float vFade;
  varying vec3 vColor;
  uniform float uScale;
  uniform float uDpr;
  void main() {
    vFade = aFade;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uDpr * (uScale / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying float vFade;
  varying vec3 vColor;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0; // 0 center .. 1 edge
    // broad soft halo + a slightly stronger core -> reads as a glowing orb
    float halo = pow(max(0.0, 1.0 - d), 1.3);
    float core = pow(max(0.0, 1.0 - d), 4.0);
    float a = halo * 0.75 + core * 0.5;
    float alpha = a * vFade * uOpacity;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// Dusty, mid-tone jewel tints that harmonize with the warm paper theme. Bright
// enough that the hue actually reads on the cream background, but muted so they
// stay gentle and don't overpower the monochrome design. One neutral ink keeps
// the mix grounded.
const GLOW_COLORS = [
  new THREE.Color("#556aa0"), // dusty slate blue
  new THREE.Color("#3f8278"), // dusty teal
  new THREE.Color("#845a8f"), // dusty plum
  new THREE.Color("#a07c44"), // dusty ochre
  new THREE.Color("#647d4c"), // dusty moss
  new THREE.Color("#a2604f"), // dusty terracotta
  new THREE.Color("#333333"), // neutral ink
];

// Particle system that forms the name on load, disperses toward a sphere as the
// user scrolls past the hero, and reacts to the pointer.
export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uOpacity: { value: 0.8 },
          uScale: { value: 0 },
          uDpr: { value: 1 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  const { geometry, count, home, sphere } = useMemo(() => {
    const home = sampleTextPoints(profile.firstName, profile.lastName, {
      worldWidth: 8,
      density: 3,
    });
    const count = home.length / 3;
    const sphere = spherePoints(count, 5.5);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(home.slice(), 3));

    const rnd = new Float32Array(count);
    const size = new Float32Array(count);
    const fade = new Float32Array(count);
    const color = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      rnd[i] = r;
      // Bigger than before so the glow halo is actually visible; r^2 keeps most
      // mid-sized for the name, with a few large faint bokeh orbs.
      size[i] = 0.07 + r * r * 0.16;
      fade[i] = 0.45 + (1 - r * r) * 0.55; // bigger orbs are fainter
      const c = GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)];
      color[i * 3] = c.r;
      color[i * 3 + 1] = c.g;
      color[i * 3 + 2] = c.b;
    }
    geometry.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aFade", new THREE.BufferAttribute(fade, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    return { geometry, count, home, sphere };
  }, []);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;

    const dpr = state.gl.getPixelRatio();
    material.uniforms.uScale.value = state.size.height * dpr * 0.5;
    material.uniforms.uDpr.value = dpr;

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
      const tz = THREE.MathUtils.lerp(home[ix + 2], sphere[ix + 2], eased);

      // Pointer repulsion while in text form
      if (eased < 0.6 && scrollStore.pointerActive) {
        const dx = home[ix] - px * 5.5;
        const dy = home[ix + 1] - py * 3;
        const d2 = dx * dx + dy * dy;
        const force = Math.max(0, 1 - d2 / 5) * (1 - eased);
        tx += dx * force * 0.09;
        ty += dy * force * 0.09;
      }

      const cx = posAttr.getX(i);
      const cy = posAttr.getY(i);
      const cz = posAttr.getZ(i);
      tmp.set(cx + (tx - cx) * 0.16, cy + (ty - cy) * 0.16, cz + (tz - cz) * 0.16);
      posAttr.setXYZ(i, tmp.x, tmp.y, tmp.z);
    }
    posAttr.needsUpdate = true;

    // Gentle rotation once dispersed
    pts.rotation.y = eased * (t * 0.05 + px * 0.3);
    pts.rotation.x = eased * (py * 0.2);

    // Visible name at the hero; fade as it disperses so section text stays clear.
    material.uniforms.uOpacity.value = 0.62 - eased * 0.4;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} position={[0, 2.7, 0]} />
  );
}
