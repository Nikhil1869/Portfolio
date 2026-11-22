"use client";

import dynamic from "next/dynamic";
import {
  Crosshair,
  Minus,
  Plus,
  RotateCcw,
  RotateCw,
  Scan,
  X,
} from "lucide-react";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  defaultView,
  garagePoints,
  type CameraView,
  type GaragePoint,
} from "./garage-points";
import type { HotspotRefs } from "./car-scene";

const CarScene = dynamic(() => import("./car-scene"), { ssr: false });
const quarterTurn = Math.PI / 4;

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function CameraButtons({
  view,
  onChange,
  zoom = false,
  disabled,
}: {
  view: CameraView;
  onChange: (view: CameraView) => void;
  zoom?: boolean;
  disabled: boolean;
}) {
  return (
    <div className="car-controls" role="group" aria-label="Camera controls">
      <button
        type="button"
        className="icon-button"
        aria-label="Rotate left"
        disabled={disabled}
        onClick={() =>
          onChange({ ...view, heading: view.heading - quarterTurn })
        }
      >
        <RotateCcw size={17} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="icon-button"
        aria-label="Rotate right"
        disabled={disabled}
        onClick={() =>
          onChange({ ...view, heading: view.heading + quarterTurn })
        }
      >
        <RotateCw size={17} aria-hidden="true" />
      </button>
      {zoom && (
        <>
          <button
            type="button"
            className="icon-button"
            aria-label="Zoom out"
            disabled={disabled || view.zoom <= 0.85}
            onClick={() =>
              onChange({ ...view, zoom: Math.max(0.85, view.zoom - 0.2) })
            }
          >
            <Minus size={17} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Zoom in"
            disabled={disabled || view.zoom >= 1.45}
            onClick={() =>
              onChange({ ...view, zoom: Math.min(1.45, view.zoom + 0.2) })
            }
          >
            <Plus size={17} aria-hidden="true" />
          </button>
        </>
      )}
      <button
        type="button"
        className="icon-button"
        aria-label="Reset view"
        disabled={disabled && view.point === null}
        onClick={() => onChange({ ...defaultView })}
      >
        <Crosshair size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

function CarStage({
  enabled,
  compact,
  reducedMotion,
  garage,
  view,
  onSelect,
  onAvailability,
  children,
}: {
  enabled: boolean;
  compact: boolean;
  reducedMotion: boolean;
  garage?: boolean;
  view: CameraView;
  onSelect?: (id: GaragePoint) => void;
  onAvailability: (ready: boolean) => void;
  children?: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const hotspots: HotspotRefs = useRef({});
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  const visible = enabled && ready && !failed;

  useEffect(() => {
    onAvailability(visible);
  }, [onAvailability, visible]);

  return (
    <div className="car-stage" data-ready={visible}>
      {children && (
        <div className="car-stage-fallback" aria-hidden={visible}>
          {children}
        </div>
      )}
      {enabled && !failed && (
        <div className="car-render">
          <SceneBoundary onFailure={onFailure}>
            <CarScene
              garage={garage}
              compact={compact}
              reducedMotion={reducedMotion}
              view={view}
              hotspots={garage ? hotspots : undefined}
              onFailure={onFailure}
              onReady={onReady}
            />
          </SceneBoundary>
        </div>
      )}
      {garage && enabled && !failed && onSelect && (
        <div className="car-hotspots">
          {garagePoints.map((point, index) => (
            <button
              key={point.id}
              ref={(button) => {
                hotspots.current[point.id] = button;
              }}
              type="button"
              className="car-hotspot"
              aria-label={`Inspect ${point.part.toLowerCase()} hotspot`}
              aria-pressed={view.point === point.id}
              tabIndex={-1}
              onClick={() => onSelect(point.id)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {enabled && !visible && (
        <p className="car-stage-status" role="status">
          {failed
            ? "3D view is unavailable on this device."
            : "Loading the 3D car…"}
        </p>
      )}
    </div>
  );
}

export function VehicleShowcase({ circuit }: { circuit: ReactNode }) {
  const [mode, setMode] = useState<"car" | "circuit">("circuit");
  const [compact, setCompact] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [heroView, setHeroView] = useState<CameraView>(defaultView);
  const [garageView, setGarageView] = useState<CameraView>(defaultView);
  const [heroReady, setHeroReady] = useState(false);
  const [garageReady, setGarageReady] = useState(false);
  const [open, setOpen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const userSelected = useRef(false);
  const selected = garagePoints.find((point) => point.id === garageView.point);
  const selectPoint = (id: GaragePoint) =>
    setGarageView({ ...defaultView, point: id });

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const small = matchMedia("(max-width: 760px), (pointer: coarse)");
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    const update = () => {
      setReducedMotion(motion.matches);
      setCompact(small.matches || !!saveData);
    };
    update();
    motion.addEventListener("change", update);
    small.addEventListener("change", update);

    let idle = 0;
    const activate = () => {
      if (
        !userSelected.current &&
        !motion.matches &&
        !small.matches &&
        !saveData
      )
        setMode("car");
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(activate, { timeout: 1600 })
        : window.setTimeout(activate, 250);
    });
    if (stage.current) observer.observe(stage.current);
    return () => {
      observer.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      motion.removeEventListener("change", update);
      small.removeEventListener("change", update);
    };
  }, []);

  function chooseMode(next: "car" | "circuit") {
    userSelected.current = true;
    setMode(next);
  }

  function enterGarage() {
    dialog.current?.showModal();
    userSelected.current = true;
    setGarageView({ ...defaultView });
    setOpen(true);
  }

  return (
    <div className="vehicle-showcase" ref={stage}>
      <div className="vehicle-toolbar">
        <div className="vehicle-modes" role="group" aria-label="Hero visual">
          <button
            type="button"
            aria-pressed={mode === "car"}
            onClick={() => chooseMode("car")}
          >
            3D car
          </button>
          <button
            type="button"
            aria-pressed={mode === "circuit"}
            onClick={() => chooseMode("circuit")}
          >
            Circuit map
          </button>
        </div>
        {mode === "car" && (
          <CameraButtons
            view={heroView}
            onChange={setHeroView}
            disabled={!heroReady || open}
          />
        )}
      </div>
      <CarStage
        key={open ? "parked" : mode}
        enabled={mode === "car" && !open}
        compact={compact}
        reducedMotion={reducedMotion}
        view={heroView}
        onAvailability={setHeroReady}
      >
        {circuit}
      </CarStage>
      <button
        ref={opener}
        type="button"
        className="garage-entry button button-outline"
        onClick={enterGarage}
        aria-haspopup="dialog"
      >
        <Scan size={17} aria-hidden="true" /> Enter Garage Mode
      </button>

      <dialog
        ref={dialog}
        className="garage-dialog"
        aria-labelledby="garage-title"
        onClose={() => {
          setOpen(false);
          setGarageReady(false);
          opener.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        {open && (
          <div className="garage-inner">
            <div className="garage-header">
              <div>
                <span className="eyebrow">Vehicle inspection</span>
                <h2 id="garage-title">Garage Mode</h2>
              </div>
              <button
                type="button"
                className="button button-outline button-small"
                autoFocus
                onClick={() => dialog.current?.close()}
              >
                <X size={17} aria-hidden="true" /> Exit garage
              </button>
            </div>
            <div className="garage-content">
              <div className="garage-visual">
                <CarStage
                  enabled
                  garage
                  compact={compact}
                  reducedMotion={reducedMotion}
                  view={garageView}
                  onSelect={selectPoint}
                  onAvailability={setGarageReady}
                />
                <div className="garage-camera-bar">
                  <span>
                    {garageReady
                      ? "Drag to rotate or use the camera controls."
                      : "Explore the engineering notes using the buttons."}
                  </span>
                  <CameraButtons
                    view={garageView}
                    onChange={setGarageView}
                    zoom
                    disabled={!garageReady}
                  />
                </div>
              </div>
              <div className="garage-notes">
                <div
                  className="garage-topics"
                  role="group"
                  aria-label="Engineering hotspots"
                >
                  {garagePoints.map((point, index) => (
                    <button
                      key={point.id}
                      type="button"
                      aria-pressed={garageView.point === point.id}
                      onClick={() => selectPoint(point.id)}
                    >
                      <span aria-hidden="true">{index + 1}</span>
                      <strong>{point.area}</strong>
                      <small>{point.part}</small>
                    </button>
                  ))}
                </div>
                <div className="garage-point-detail" aria-live="polite">
                  <h3>{selected?.area ?? "Engineering notes"}</h3>
                  <p>
                    {selected?.detail ??
                      "Select a hotspot to see how each part of the car connects to the software I work on."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
