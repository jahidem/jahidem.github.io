import * as THREE from "three";

// Draws two lines of text to an offscreen 2D canvas, then samples opaque pixels
// into 3D point positions centered on the origin. No font files required.
export function sampleTextPoints(
  line1: string,
  line2: string,
  opts: { worldWidth?: number; density?: number } = {}
): Float32Array {
  const worldWidth = opts.worldWidth ?? 13;
  const density = opts.density ?? 3; // sample every Nth pixel

  const cw = 1024;
  const ch = 448;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cw, ch);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 150px 'Space Grotesk', Arial, sans-serif";
  // Two well-separated lines; exact centering is enforced below via the centroid.
  ctx.fillText(line1, cw / 2, ch * 0.31);
  ctx.fillText(line2, cw / 2, ch * 0.69);

  const img = ctx.getImageData(0, 0, cw, ch).data;
  const pts: number[] = [];
  const scale = worldWidth / cw;

  for (let y = 0; y < ch; y += density) {
    for (let x = 0; x < cw; x += density) {
      const a = img[(y * cw + x) * 4]; // red channel == brightness
      if (a > 128) {
        const px = (x - cw / 2) * scale;
        const py = -(y - ch / 2) * scale;
        const pz = (Math.random() - 0.5) * 0.25;
        pts.push(px, py, pz);
      }
    }
  }

  // Recenter on the true centroid so the cloud sits exactly at the world origin,
  // independent of font ascent/descent metrics.
  let mx = 0;
  let my = 0;
  const n = pts.length / 3;
  for (let i = 0; i < n; i++) {
    mx += pts[i * 3];
    my += pts[i * 3 + 1];
  }
  mx /= n;
  my /= n;
  for (let i = 0; i < n; i++) {
    pts[i * 3] -= mx;
    pts[i * 3 + 1] -= my;
  }
  return new Float32Array(pts);
}

// Random points on a sphere surface, matching a given point count.
export function spherePoints(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3()
      .randomDirection()
      .multiplyScalar(radius * (0.7 + Math.random() * 0.3));
    arr[i * 3] = v.x;
    arr[i * 3 + 1] = v.y;
    arr[i * 3 + 2] = v.z;
  }
  return arr;
}
