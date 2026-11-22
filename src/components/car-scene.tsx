"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Html,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import { useEffect, useRef, type ComponentRef } from "react";
import { Vector3 } from "three";
import {
  garagePoints,
  type CameraView,
  type GaragePoint,
} from "./garage-points";
import { RacingCar } from "./racing-car";

const heroPosition = [6.7, 3.95, 6.55] as const;
const garagePosition = [6.8, 4.05, 6.65] as const;
const up = new Vector3(0, 1, 0);

type SceneProps = {
  garage?: boolean;
  compact: boolean;
  reducedMotion: boolean;
  view: CameraView;
  onSelect: (id: GaragePoint) => void;
  onFailure: () => void;
  onReady: () => void;
};

function Camera({
  garage,
  compact,
  reducedMotion,
  view,
}: Omit<SceneProps, "onSelect" | "onFailure" | "onReady">) {
  const { camera, gl, invalidate } = useThree();
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const destination = useRef(new Vector3());
  const focus = useRef(new Vector3());
  const pointer = useRef({ x: 0, y: 0 });
  const moving = useRef(false);
  const dragging = useRef(false);

  useEffect(() => {
    const point = garagePoints.find((item) => item.id === view.point);
    const [targetX, targetY, targetZ] = point?.target ?? [0, 0.48, 0];
    const [cameraX, cameraY, cameraZ] =
      point?.camera ?? (garage ? garagePosition : heroPosition);
    const aim = focus.current.set(targetX, targetY, targetZ);
    destination.current
      .set(cameraX, cameraY, cameraZ)
      .sub(aim)
      .applyAxisAngle(up, view.heading)
      .multiplyScalar((compact ? 1.34 : 1) / view.zoom)
      .add(aim);

    if (reducedMotion && controls.current) {
      camera.position.copy(destination.current);
      controls.current.target.copy(aim);
      controls.current.update();
      moving.current = false;
    } else {
      moving.current = true;
    }
    invalidate();
  }, [camera, compact, garage, invalidate, reducedMotion, view]);

  useEffect(() => {
    if (garage || compact || reducedMotion) return;
    const element = gl.domElement;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || dragging.current) return;
      const bounds = element.getBoundingClientRect();
      pointer.current.x = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointer.current.y = (event.clientY - bounds.top) / bounds.height - 0.5;
      moving.current = true;
      invalidate();
    };
    const leave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      if (dragging.current) return;
      moving.current = true;
      invalidate();
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
  }, [compact, garage, gl, invalidate, reducedMotion]);

  useFrame((_, delta) => {
    const orbit = controls.current;
    if (!orbit || !moving.current || dragging.current) return;
    const aim = focus.current;
    const next = destination.current;
    const x = next.x + pointer.current.x * 0.75;
    const y = next.y - pointer.current.y * 0.42;
    const z = next.z - pointer.current.x * 0.55;
    const factor = 1 - Math.exp(-8 * Math.min(delta, 0.1));
    camera.position.x += (x - camera.position.x) * factor;
    camera.position.y += (y - camera.position.y) * factor;
    camera.position.z += (z - camera.position.z) * factor;
    orbit.target.lerp(aim, factor);
    orbit.update();
    moving.current =
      Math.abs(x - camera.position.x) +
        Math.abs(y - camera.position.y) +
        Math.abs(z - camera.position.z) +
        orbit.target.distanceTo(aim) >
      0.003;
    if (moving.current) invalidate();
  });

  return (
    <OrbitControls
      ref={controls}
      enabled={garage || !compact}
      enablePan={false}
      enableZoom={false}
      enableDamping={!reducedMotion}
      minPolarAngle={0.38}
      maxPolarAngle={Math.PI * 0.48}
      target={[0, 0.48, 0]}
      onStart={() => {
        dragging.current = true;
        moving.current = false;
      }}
      onEnd={() => {
        dragging.current = false;
        // Preserve the user's angle when pointer parallax resumes.
        destination.current.copy(camera.position);
        if (controls.current) focus.current.copy(controls.current.target);
      }}
    />
  );
}

function ContextStatus({
  onFailure,
  onReady,
}: Pick<SceneProps, "onFailure" | "onReady">) {
  const element = useThree((state) => state.gl.domElement);
  useEffect(() => {
    element.addEventListener("webglcontextlost", onFailure);
    onReady();
    return () => element.removeEventListener("webglcontextlost", onFailure);
  }, [element, onFailure, onReady]);
  return null;
}

export default function CarScene(props: SceneProps) {
  const { garage, compact, view, onSelect, onFailure, onReady } = props;
  const initial = garage ? garagePosition : heroPosition;
  return (
    <Canvas
      camera={{ position: initial, fov: 36, near: 0.1, far: 55 }}
      dpr={[1, compact ? 1.15 : 1.5]}
      frameloop="demand"
      gl={{ antialias: !compact, powerPreference: "low-power", alpha: true }}
      onCreated={({ gl }) => gl.domElement.setAttribute("aria-hidden", "true")}
    >
      <hemisphereLight args={["#f5efe8", "#7b7276", 2.25]} />
      <directionalLight color="#fff1e5" intensity={3.25} position={[3, 6, 5]} />
      <directionalLight
        color="#b8c4dc"
        intensity={2.2}
        position={[-5, 3, -3]}
      />
      <directionalLight
        color="#ff7469"
        intensity={1.05}
        position={[1, 2, -6]}
      />
      {!compact && (
        <Environment resolution={64} frames={1} environmentIntensity={0.64}>
          <Lightformer
            form="rect"
            intensity={3}
            color="#f5f1ed"
            position={[0, 4, 1]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[4, 7, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2}
            color="#dce6ff"
            position={[-4, 2, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[8, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            color="#f8dfd5"
            position={[3, 1.5, -3]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={[5, 1, 1]}
          />
        </Environment>
      )}
      <RacingCar />
      {garage &&
        garagePoints.map((point, index) => (
          <Html
            key={point.id}
            center
            position={point.anchor}
            zIndexRange={[2, 1]}
          >
            <button
              type="button"
              className="car-hotspot"
              aria-label={`Inspect ${point.part.toLowerCase()} hotspot`}
              aria-pressed={view.point === point.id}
              tabIndex={-1}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => onSelect(point.id)}
            >
              {index + 1}
            </button>
          </Html>
        ))}
      <Camera {...props} />
      <ContextStatus onFailure={onFailure} onReady={onReady} />
    </Canvas>
  );
}
