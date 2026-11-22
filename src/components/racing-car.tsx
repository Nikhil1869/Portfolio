import { useEffect, useMemo } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Quaternion,
  Vector2,
  Vector3,
} from "three";

type Point = [number, number, number];
type Profile = [
  z: number,
  halfWidth: number,
  bottom: number,
  top: number,
  centerX?: number,
];

// Original bodywork profiles, from the gearbox toward the front wing.
const chassis: Profile[] = [
  [-2.36, 0.15, 0.27, 0.52],
  [-2.05, 0.28, 0.22, 0.7],
  [-1.56, 0.42, 0.21, 0.86],
  [-0.91, 0.49, 0.22, 0.92],
  [-0.34, 0.44, 0.24, 0.86],
  [0.26, 0.35, 0.28, 0.74],
  [0.91, 0.27, 0.31, 0.65],
  [1.6, 0.2, 0.34, 0.58],
  [2.22, 0.14, 0.32, 0.51],
  [2.71, 0.1, 0.31, 0.41],
];
const sidepod: Profile[] = [
  [-1.9, 0.11, 0.21, 0.48, 0.42],
  [-1.5, 0.18, 0.21, 0.54, 0.54],
  [-0.96, 0.28, 0.19, 0.66, 0.63],
  [-0.35, 0.29, 0.19, 0.73, 0.64],
  [0.15, 0.24, 0.23, 0.68, 0.62],
  [0.38, 0.15, 0.28, 0.56, 0.57],
];
const engineCover: Profile[] = [
  [-2.12, 0.14, 0.37, 0.56],
  [-1.58, 0.21, 0.48, 0.84],
  [-1.11, 0.22, 0.54, 1.03],
  [-0.77, 0.2, 0.59, 1.16],
  [-0.52, 0.13, 0.66, 1.12],
];
const tyreProfile = [
  [0.37, -0.21],
  [0.45, -0.21],
  [0.49, -0.18],
  [0.51, -0.11],
  [0.51, 0.11],
  [0.49, 0.18],
  [0.45, 0.21],
  [0.37, 0.21],
].map(([radius, axial]) => new Vector2(radius, axial));

function loftGeometry(profiles: Profile[], side: number) {
  const resolution = 20;
  const points: number[] = [];
  const indices: number[] = [];
  for (const [z, width, bottom, top, center = 0] of profiles) {
    for (let i = 0; i < resolution; i++) {
      const angle = (i / resolution) * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      points.push(
        side * center + Math.sign(x) * Math.abs(x) ** 0.75 * width,
        (top + bottom) / 2 +
          (Math.sign(y) * Math.abs(y) ** 0.85 * (top - bottom)) / 2,
        z,
      );
    }
  }
  for (let ring = 0; ring < profiles.length - 1; ring++) {
    for (let i = 0; i < resolution; i++) {
      const a = ring * resolution + i;
      const b = ring * resolution + ((i + 1) % resolution);
      indices.push(a, b, a + resolution, b, b + resolution, a + resolution);
    }
  }
  const last = (profiles.length - 1) * resolution;
  for (let i = 1; i < resolution - 1; i++) {
    indices.push(0, i + 1, i, last, last + i, last + i + 1);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(points), 3),
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

type Finish = ReturnType<typeof makeFinishes>;

function makeFinishes() {
  return {
    paint: new MeshPhysicalMaterial({
      color: "#d80b16",
      metalness: 0.48,
      roughness: 0.29,
      clearcoat: 0.8,
      clearcoatRoughness: 0.22,
    }),
    carbon: new MeshStandardMaterial({
      color: "#24272e",
      metalness: 0.44,
      roughness: 0.4,
    }),
    rubber: new MeshStandardMaterial({ color: "#191a1d", roughness: 0.8 }),
    rim: new MeshStandardMaterial({
      color: "#7c828c",
      metalness: 0.7,
      roughness: 0.34,
    }),
    graphite: new MeshStandardMaterial({ color: "#101217", roughness: 0.65 }),
    stripe: new MeshStandardMaterial({ color: "#f5eee2", roughness: 0.49 }),
    trim: new MeshStandardMaterial({
      color: "#ab5f42",
      metalness: 0.32,
      roughness: 0.46,
    }),
  };
}

function Loft({
  profiles,
  material,
  side = 1,
}: {
  profiles: Profile[];
  material: Finish["paint"];
  side?: number;
}) {
  const geometry = useMemo(
    () => loftGeometry(profiles, side),
    [profiles, side],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} material={material} />;
}

function Plate({
  at,
  size,
  material,
  tilt = 0,
  sweep = 0,
}: {
  at: Point;
  size: Point;
  material: MeshStandardMaterial;
  tilt?: number;
  sweep?: number;
}) {
  return (
    <mesh position={at} rotation={[tilt, sweep, 0]} material={material}>
      <boxGeometry args={size} />
    </mesh>
  );
}

function Strut({
  from,
  to,
  material,
  radius = 0.035,
}: {
  from: Point;
  to: Point;
  material: MeshStandardMaterial;
  radius?: number;
}) {
  const start = new Vector3(...from);
  const end = new Vector3(...to);
  const direction = end.clone().sub(start);
  const length = direction.length();
  const orientation = new Quaternion().setFromUnitVectors(
    new Vector3(0, 1, 0),
    direction.normalize(),
  );
  return (
    <mesh
      position={start.lerp(end, 0.5)}
      quaternion={orientation}
      material={material}
    >
      <cylinderGeometry args={[radius, radius, length, 6]} />
    </mesh>
  );
}

function Wheel({
  side,
  z,
  finish,
}: {
  side: number;
  z: number;
  finish: Finish;
}) {
  const rear = z < 0;
  const x = side * (rear ? 1.18 : 1.19);
  return (
    <group
      position={[x, 0.51, z]}
      rotation={[0, 0, (-side * Math.PI) / 2]}
      scale={[1, rear ? 1.3 : 1, 1]}
    >
      <mesh material={finish.rubber}>
        <latheGeometry args={[tyreProfile, 32]} />
      </mesh>
      <mesh material={finish.carbon}>
        <cylinderGeometry args={[0.38, 0.38, 0.423, 28]} />
      </mesh>
      <mesh
        position={[0, 0.214, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={finish.trim}
      >
        <ringGeometry args={[0.422, 0.438, 32]} />
      </mesh>
      <mesh
        position={[0, 0.216, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={finish.rim}
      >
        <ringGeometry args={[0.322, 0.355, 28]} />
      </mesh>
      <mesh position={[0, 0.223, 0]} material={finish.rim}>
        <cylinderGeometry args={[0.1, 0.11, 0.044, 12]} />
      </mesh>
      {Array.from({ length: 5 }, (_, index) => (
        <group key={index} rotation={[0, (index * Math.PI * 2) / 5, 0]}>
          <Plate
            at={[0.209, 0.217, 0]}
            size={[0.28, 0.032, 0.035]}
            material={finish.rim}
          />
        </group>
      ))}
    </group>
  );
}

export function RacingCar() {
  const finish = useMemo(makeFinishes, []);
  useEffect(
    () => () => Object.values(finish).forEach((material) => material.dispose()),
    [finish],
  );
  return (
    <group>
      <Loft profiles={chassis} material={finish.paint} />
      <Loft profiles={engineCover} material={finish.paint} />
      <Plate
        at={[0, 0.17, -0.48]}
        size={[1.87, 0.065, 2.77]}
        material={finish.carbon}
      />
      <Plate
        at={[0, 0.17, -2.12]}
        size={[1.3, 0.13, 0.77]}
        material={finish.carbon}
        tilt={-0.18}
      />
      <Plate
        at={[0, 0.17, 2.66]}
        size={[2.5, 0.09, 0.51]}
        material={finish.carbon}
        tilt={0.05}
      />
      <Plate
        at={[0, 0.262, 2.72]}
        size={[2.39, 0.058, 0.21]}
        material={finish.paint}
        tilt={0.08}
      />
      <Plate
        at={[0, 0.56, 1.29]}
        size={[0.076, 0.025, 0.97]}
        material={finish.stripe}
        tilt={0.12}
      />
      <Plate
        at={[0, 0.49, 2.05]}
        size={[0.076, 0.025, 0.55]}
        material={finish.stripe}
        tilt={0.13}
      />
      <Plate
        at={[0, 1.03, -2.34]}
        size={[2.02, 0.065, 0.38]}
        material={finish.carbon}
        tilt={-0.22}
      />
      <Plate
        at={[0, 1.19, -2.46]}
        size={[2.03, 0.059, 0.32]}
        material={finish.paint}
        tilt={-0.32}
      />
      <Plate
        at={[0, 1.2, -2.62]}
        size={[1.91, 0.038, 0.038]}
        material={finish.stripe}
      />
      <mesh
        position={[0, 0.82, -0.12]}
        scale={[0.29, 0.08, 0.47]}
        material={finish.graphite}
      >
        <sphereGeometry args={[1, 24, 12]} />
      </mesh>
      <mesh
        position={[0, 0.965, 0.075]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.32, 0.49, 0.8]}
        material={finish.carbon}
      >
        <torusGeometry args={[1, 0.102, 8, 32]} />
      </mesh>
      <Strut
        from={[0, 0.63, 0.71]}
        to={[0, 0.96, 0.55]}
        material={finish.carbon}
        radius={0.061}
      />
      <mesh position={[0, 0.32, -2.52]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial
          color="#e10600"
          emissive="#9a0010"
          emissiveIntensity={0.7}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <Loft profiles={sidepod} material={finish.paint} side={side} />
          <Plate
            at={[side * 0.66, 0.52, 0.355]}
            size={[0.34, 0.18, 0.035]}
            material={finish.graphite}
            sweep={side * 0.2}
          />
          <Plate
            at={[side * 0.83, 0.41, -0.47]}
            size={[0.029, 0.061, 0.91]}
            material={finish.stripe}
            sweep={side * 0.08}
          />
          <Plate
            at={[side * 1.245, 0.27, 2.64]}
            size={[0.06, 0.29, 0.6]}
            material={finish.paint}
            tilt={0.07}
          />
          <Plate
            at={[side * 0.71, 0.31, 2.53]}
            size={[0.94, 0.06, 0.2]}
            material={finish.carbon}
            tilt={0.22}
            sweep={side * 0.12}
          />
          <Plate
            at={[side * 1.015, 1.01, -2.4]}
            size={[0.06, 0.52, 0.58]}
            material={finish.carbon}
            tilt={-0.16}
          />
          <Plate
            at={[side * 1.05, 1.15, -2.48]}
            size={[0.012, 0.14, 0.27]}
            material={finish.paint}
            tilt={-0.16}
          />
          <Strut
            from={[side * 0.33, 0.43, -2.16]}
            to={[side * 0.57, 1.04, -2.36]}
            material={finish.carbon}
            radius={0.05}
          />
          <Strut
            from={[side * 0.25, 0.71, 0.32]}
            to={[side * 0.68, 0.89, 0.25]}
            material={finish.carbon}
            radius={0.024}
          />
          <Plate
            at={[side * 0.69, 0.89, 0.25]}
            size={[0.18, 0.075, 0.12]}
            material={finish.paint}
          />
          {[1.65, -1.57].map((z) => (
            <group key={z}>
              <Wheel side={side} z={z} finish={finish} />
              <Strut
                from={[side * 0.26, 0.58, z - 0.36]}
                to={[side * 1.05, 0.58, z]}
                material={finish.rim}
              />
              <Strut
                from={[side * 0.27, 0.48, z + 0.34]}
                to={[side * 1.03, 0.53, z]}
                material={finish.carbon}
              />
              <Strut
                from={[side * 0.3, 0.26, z - 0.25]}
                to={[side * 1.05, 0.38, z]}
                material={finish.carbon}
              />
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}
