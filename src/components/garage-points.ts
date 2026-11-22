export const garagePoints = [
  {
    id: "frontend",
    area: "Frontend",
    part: "Cockpit",
    anchor: [0, 1.27, 0.25],
    camera: [4.3, 2.85, 4.4],
    target: [0, 0.63, 0.26],
    detail:
      "I build interfaces with React, Next.js, and TypeScript, with attention to keyboard access, responsive layouts, and clear feedback.",
  },
  {
    id: "backend",
    area: "Backend",
    part: "Power unit",
    anchor: [0, 1.38, -1.51],
    camera: [4.1, 2.75, -4.65],
    target: [0, 0.6, -1.1],
    detail:
      "I work with Node.js, Flask, and FastAPI to build APIs and connect application data to the frontend.",
  },
  {
    id: "ml",
    area: "AI/ML",
    part: "Front telemetry",
    anchor: [-0.67, 0.74, 2.53],
    camera: [3.85, 2.65, 5.85],
    target: [0, 0.4, 1.05],
    detail:
      "My projects explore race telemetry, computer vision, and applied machine learning with Python and scikit-learn.",
  },
] as const;

export type GaragePoint = (typeof garagePoints)[number]["id"];
export type CameraView = {
  point: GaragePoint | null;
  heading: number;
  zoom: number;
};

export const defaultView: CameraView = { point: null, heading: 0, zoom: 1 };
