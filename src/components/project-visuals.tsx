import { useState } from "react";
import { Code2, Check, Wrench, CalendarDays, Zap } from "lucide-react";
import { Circuit } from "./circuit";
import type { Project } from "@/data/portfolio";

const telemetryViews = [
  {
    label: "Telemetry",
    chart: "Speed trace",
    path: "M0 60 15 59 28 35 45 30 55 74 68 77 90 30 104 24 118 45 133 15 150 11 165 72 181 70 196 20 220 14 237 65 254 63 270 32 291 18 320 13",
    reference:
      "M0 65 15 61 28 43 45 39 55 78 68 80 90 39 104 30 118 49 133 23 150 19 165 78 181 74 196 29 220 25 237 71 254 67 270 40 291 28 320 23",
  },
  {
    label: "Strategy",
    chart: "Tyre stints",
    path: "M0 34H94V58H184V31H320",
    reference: "M0 49H133V24H239V58H320",
  },
  {
    label: "Comparison",
    chart: "Gap over a lap",
    path: "M0 57 22 54 52 61 77 45 105 38 122 42 153 27 176 33 201 43 215 34 256 23 284 30 320 15",
    reference:
      "M0 56 28 53 50 54 75 52 99 48 124 50 152 46 178 47 199 44 228 47 251 44 278 48 320 41",
  },
] as const;
const reviewSteps = [
  { label: "Context", description: "Gather the diff and nearby code." },
  { label: "Validation", description: "Check findings before reporting them." },
  { label: "Deduplication", description: "Skip findings already reported." },
] as const;
const sports = [
  { label: "Football", bars: [72, 45, 58, 88, 64, 38, 78, 51, 91, 69, 47, 83] },
  { label: "Cricket", bars: [48, 67, 83, 73, 92, 61, 51, 78, 87, 43, 32, 64] },
  {
    label: "Basketball",
    bars: [53, 62, 91, 41, 69, 79, 58, 82, 64, 36, 60, 91],
  },
] as const;

export function ProjectVisual({ project }: { project: Project }) {
  const [option, setOption] = useState(0);
  const [slot, setSlot] = useState(0);
  const telemetry = telemetryViews[option] ?? telemetryViews[0];
  const reviewStep = reviewSteps[option] ?? reviewSteps[0];
  const sport = sports[option] ?? sports[0];
  if (project.image)
    return (
      <div className="project-image">
        <img
          src={project.image.src}
          alt={project.image.alt}
          loading="lazy"
          width="800"
          height="500"
        />
      </div>
    );
  return (
    <div
      className={`project-visual visual-${project.id}`}
      aria-label={`${project.title} interactive preview with sample data`}
      role="group"
    >
      <div className="visual-topline">
        <span>
          <span className="window-dots">● ● ●</span>{" "}
          {project.id === "f1"
            ? "F1 DATA LAB / TELEMETRY"
            : project.id === "aether"
              ? "aetherreview — terminal"
              : project.id === "fixit"
                ? "fixit / workspace"
                : "quantumscore / analytics"}
        </span>
        <span>SAMPLE PREVIEW</span>
      </div>
      {project.id === "f1" ? (
        <div className="telemetry-ui">
          <div className="telemetry-sidebar">
            <span className="tiny-label">SESSION ANALYSIS</span>
            <strong>
              Every lap.
              <br />A deeper story.
            </strong>
            <div
              className="telemetry-tabs preview-switches"
              role="group"
              aria-label="Race data view"
            >
              {telemetryViews.map((view, index) => (
                <button
                  key={view.label}
                  type="button"
                  aria-pressed={option === index}
                  onClick={() => setOption(index)}
                >
                  {view.label}
                </button>
              ))}
            </div>
            <div className="trace-label">
              <span aria-live="polite">{telemetry.chart}</span>
              <span className="red">ILLUSTRATIVE</span>
            </div>
            <svg
              className="speed-trace"
              viewBox="0 0 320 90"
              fill="none"
              role="img"
              aria-label={`Illustrative ${telemetry.chart.toLowerCase()}`}
            >
              <path
                d="M0 20H320M0 45H320M0 70H320"
                stroke="#2c3037"
                strokeDasharray="3 4"
              />
              <path
                className="telemetry-line"
                d={telemetry.path}
                stroke="#e10600"
                strokeWidth="2"
              />
              <path d={telemetry.reference} stroke="#838b98" strokeWidth="1" />
            </svg>
          </div>
          <div className="telemetry-circuit">
            <Circuit compact />
            <span>ENGINEERING THE RACE WEEKEND</span>
          </div>
        </div>
      ) : project.id === "aether" ? (
        <div className="terminal-ui">
          <div className="terminal-command">
            <span>❯</span> aetherreview
          </div>
          <div className="terminal-line">
            <Code2 size={15} />
            <span>Context-aware review</span>
            <span className="terminal-badge">LOCAL</span>
          </div>
          <div className="code-lines" aria-hidden="true">
            <span>
              01 <i>async function</i> review(pullRequest) {"{"}
            </span>
            <span className={option === 0 ? "review-highlight" : undefined}>
              02 &nbsp; <i>const</i> context = await bundle(diff);
            </span>
            <span className={option === 1 ? "review-highlight" : undefined}>
              03 &nbsp; <i>const</i> findings = validate(response);
            </span>
            <span className={option === 2 ? "review-highlight" : undefined}>
              04 &nbsp; <i>return</i> deduplicate(findings);
            </span>
            <span>05 {"}"}</span>
          </div>
          <div
            className="preview-switches"
            role="group"
            aria-label="Code review stage"
          >
            {reviewSteps.map((step, index) => (
              <button
                key={step.label}
                type="button"
                aria-pressed={option === index}
                onClick={() => setOption(index)}
              >
                {step.label}
              </button>
            ))}
          </div>
          <div className="terminal-result" aria-live="polite">
            <Check size={13} aria-hidden="true" /> {reviewStep.description}
          </div>
        </div>
      ) : project.id === "fixit" ? (
        <div className="booking-ui">
          <div className="booking-side">
            <Wrench size={23} />
            <div />
            <div />
            <div />
          </div>
          <div className="booking-main">
            <div className="booking-greeting">
              <strong>Your space. Sorted.</strong>
              <span>MY SERVICES</span>
            </div>
            <div
              className="booking-services"
              role="group"
              aria-label="Sample services"
            >
              <button
                type="button"
                aria-pressed={option === 0}
                onClick={() => {
                  setOption(0);
                  setSlot(0);
                }}
              >
                <Zap size={20} aria-hidden="true" /> Electrical
              </button>
              <button
                type="button"
                aria-pressed={option === 1}
                onClick={() => {
                  setOption(1);
                  setSlot(0);
                }}
              >
                <Wrench size={20} aria-hidden="true" /> Home repair
              </button>
            </div>
            <div className="booking-appointment">
              <CalendarDays size={19} />
              <div>
                <strong aria-live="polite">
                  {option === 0
                    ? "Electrical appointment"
                    : "Home repair appointment"}
                </strong>
                <div
                  className="preview-switches"
                  role="group"
                  aria-label="Sample appointment times"
                >
                  {["10:00", "14:00"].map((time, index) => (
                    <button
                      key={time}
                      type="button"
                      aria-pressed={index === slot}
                      onClick={() => setSlot(index)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <Check size={16} />
            </div>
          </div>
        </div>
      ) : (
        <div className="prediction-ui">
          <div
            className="sports-tabs preview-switches"
            role="group"
            aria-label="Sample sports"
          >
            {sports.map((sample, index) => (
              <button
                key={sample.label}
                type="button"
                aria-pressed={option === index}
                onClick={() => setOption(index)}
              >
                {sample.label}
              </button>
            ))}
          </div>
          <div className="prediction-title">
            <span>OUTCOME DISTRIBUTION</span>
            <strong>Find the signal.</strong>
          </div>
          <div
            className="probability-bars"
            role="img"
            aria-label={`Illustrative outcome distribution for ${sport.label.toLowerCase()}`}
          >
            {sport.bars.map((height, i) => (
              <i
                key={i}
                style={
                  {
                    height: `${height}%`,
                    "--bar-order": i,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="prediction-bottom">
            <span>FEATURES → MODEL → INSIGHT</span>
            <span>ILLUSTRATIVE</span>
          </div>
        </div>
      )}
    </div>
  );
}
