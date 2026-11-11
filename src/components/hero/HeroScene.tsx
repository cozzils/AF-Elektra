import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Geometria del circuito ─── */

type Point = [number, number];

const TRACES: Point[][] = [
  [[-2.05, -1.15], [-1.2, -1.15], [-0.55, -0.5], [0.35, -0.5], [0.75, -0.9], [1.75, -0.9]],
  [[-2.05, -0.1], [-1.45, -0.1], [-1.05, 0.3], [-0.15, 0.3], [0.2, -0.05], [1.1, -0.05], [1.45, 0.3], [2.05, 0.3]],
  [[-2.05, 0.95], [-1.3, 0.95], [-0.9, 0.55], [0.05, 0.55], [0.45, 0.95], [1.45, 0.95]],
  [[-1.75, -1.45], [-1.75, -0.75], [-1.3, -0.3], [-1.3, 0.35], [-0.9, 0.75], [-0.9, 1.4]],
  [[1.95, -1.35], [1.95, -0.65], [1.5, -0.2], [1.5, 0.65], [1.1, 1.05], [1.1, 1.4]],
  [[-0.2, -1.5], [-0.2, -1.05], [0.25, -0.6], [0.7, -0.6], [0.7, 0.2], [0.35, 0.55], [0.35, 1.4]],
];

const CHIPS: { pos: Point; size: [number, number]; pins: number }[] = [
  { pos: [-0.55, 0.95], size: [0.62, 0.44], pins: 7 },
  { pos: [0.95, -0.5], size: [0.5, 0.36], pins: 6 },
  { pos: [-1.45, 0.9], size: [0.34, 0.26], pins: 5 },
  { pos: [0.45, 1.05], size: [0.3, 0.22], pins: 4 },
  { pos: [1.55, 0.9], size: [0.26, 0.4], pins: 4 },
];

const BOARD = { w: 4.6, d: 3.4, h: 0.16 };

function Trace({ points }: { points: Point[] }) {
  const segments = useMemo(() => {
    return points.slice(0, -1).map(([x, z], i) => {
      const [nx, nz] = points[i + 1];
      const dx = nx - x;
      const dz = nz - z;
      return {
        length: Math.hypot(dx, dz),
        x: (x + nx) / 2,
        z: (z + nz) / 2,
        angle: Math.atan2(dz, dx),
      };
    });
  }, [points]);

  return (
    <group>
      {segments.map((s, i) => (
        <mesh key={i} position={[s.x, BOARD.h / 2 + 0.012, s.z]} rotation={[0, -s.angle, 0]}>
          <boxGeometry args={[s.length, 0.015, 0.028]} />
          <meshStandardMaterial
            color="#6EF59B"
            emissive="#2FD46A"
            emissiveIntensity={1.1}
            metalness={0.2}
            roughness={0.35}
            toneMapped={false}
          />
        </mesh>
      ))}
      {points.map(([x, z], i) => (
        <mesh key={`pad-${i}`} position={[x, BOARD.h / 2 + 0.016, z]}>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
          <meshStandardMaterial color="#C9A45C" metalness={0.9} roughness={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function Chip({ pos, size, pins }: { pos: Point; size: [number, number]; pins: number }) {
  const [px, pz] = pos;
  const [w, d] = size;
  const pinList = useMemo(
    () => Array.from({ length: pins * 2 }, (_, i) => {
      const side = i < pins ? -1 : 1;
      const n = i % pins;
      const t = (n + 0.5) / pins;
      return side < 0
        ? [-w / 2 - 0.035, -d / 2 + t * d] as Point
        : [w / 2 + 0.035, -d / 2 + t * d] as Point;
    }),
    [pins, w, d],
  );

  return (
    <group position={[px, 0, pz]}>
      <mesh position={[0, BOARD.h / 2 + 0.06, 0]} castShadow>
        <boxGeometry args={[w, 0.11, d]} />
        <meshStandardMaterial color="#121814" metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0, BOARD.h / 2 + 0.118, 0]}>
        <boxGeometry args={[w * 0.62, 0.004, d * 0.62]} />
        <meshStandardMaterial color="#1D2A20" metalness={0.3} roughness={0.6} />
      </mesh>
      {pinList.map(([x, z], i) => (
        <mesh key={i} position={[x, BOARD.h / 2 + 0.025, z]}>
          <boxGeometry args={[0.06, 0.022, 0.045]} />
          <meshStandardMaterial color="#C9A45C" metalness={0.95} roughness={0.22} />
        </mesh>
      ))}
    </group>
  );
}

function Pulse({ points, offset, speed }: { points: Point[]; offset: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  const path = useMemo(() => {
    const curve = new THREE.CurvePath<THREE.Vector3>();
    points.slice(0, -1).forEach(([x, z], i) => {
      const [nx, nz] = points[i + 1];
      curve.add(new THREE.LineCurve3(
        new THREE.Vector3(x, BOARD.h / 2 + 0.03, z),
        new THREE.Vector3(nx, BOARD.h / 2 + 0.03, nz),
      ));
    });
    return curve;
  }, [points]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * speed + offset) % 1;
    const p = path.getPointAt(t);
    if (p) ref.current.position.copy(p);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color="#D8FFE6" toneMapped={false} />
    </mesh>
  );
}

function BoardScene() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!group.current || !inner.current) return;
    const scroll = typeof window === 'undefined'
      ? 0
      : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.36 + pointer.y * 0.08, 0.045);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.28 + pointer.x * 0.28 + scroll * 0.35, 0.045);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pointer.x * -0.03, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(clock.elapsedTime * 0.5) * 0.055, 0.06);
    inner.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.035;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <group ref={inner}>
        {/* PCB */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[BOARD.w, BOARD.h, BOARD.d]} />
          <meshStandardMaterial color="#0A2E1B" metalness={0.35} roughness={0.55} />
        </mesh>

        {/* Piste e pad */}
        {TRACES.map((trace, i) => (
          <Trace key={i} points={trace} />
        ))}

        {/* Componenti */}
        {CHIPS.map((chip, i) => (
          <Chip key={i} {...chip} />
        ))}

        {/* Connettore laterale */}
        <mesh position={[-2.18, BOARD.h / 2 + 0.09, 0.15]}>
          <boxGeometry args={[0.16, 0.18, 0.85]} />
          <meshStandardMaterial color="#D9DEDA" metalness={0.2} roughness={0.45} />
        </mesh>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} position={[-2.18, BOARD.h / 2 + 0.09, -0.19 + i * 0.135]}>
            <boxGeometry args={[0.17, 0.02, 0.03]} />
            <meshStandardMaterial color="#6B746D" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}

        {/* Elettrolitico */}
        <mesh position={[1.9, BOARD.h / 2 + 0.24, -1.15]}>
          <cylinderGeometry args={[0.17, 0.17, 0.48, 24]} />
          <meshStandardMaterial color="#1B2420" metalness={0.35} roughness={0.4} />
        </mesh>

        {/* Pulsi luminosi */}
        {TRACES.map((trace, i) => (
          <Pulse key={i} points={trace} offset={i * 0.17} speed={0.09 + (i % 3) * 0.02} />
        ))}
      </group>

      {/* Bagliore sotto la scheda */}
      <mesh position={[0, -0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.9, 48]} />
        <meshBasicMaterial color="#15803D" transparent opacity={0.09} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 4.3, 6.9], fov: 36 }}
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <CameraRig />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#eafff0" />
      <directionalLight position={[-6, 4, -4]} intensity={0.8} color="#39a867" />
      <pointLight position={[0, 3, 0]} intensity={14} distance={9} color="#6EF59B" />
      <BoardScene />
    </Canvas>
  );
}
