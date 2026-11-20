import { Code2, Check, Wrench, CalendarDays, Zap } from "lucide-react";
import { Circuit } from "./circuit";
import type { Project } from "@/data/portfolio";

export function ProjectVisual({ project }: { project: Project }) {
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
      aria-label={`${project.title}: illustrative interface concept, not live data`}
      role="img"
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
        <span>CONCEPT UI</span>
      </div>
      {project.id === "f1" ? (
        <div className="telemetry-ui">
          <div className="telemetry-sidebar">
            <span className="tiny-label">SESSION ANALYSIS</span>
            <strong>
              Every lap.
              <br />A deeper story.
            </strong>
            <div className="telemetry-tabs">
              <span className="selected">TELEMETRY</span>
              <span>STRATEGY</span>
              <span>COMPARISON</span>
            </div>
            <div className="trace-label">
              <span>SPEED TRACE</span>
              <span className="red">ILLUSTRATIVE</span>
            </div>
            <svg className="speed-trace" viewBox="0 0 320 90" fill="none">
              <path
                d="M0 20H320M0 45H320M0 70H320"
                stroke="#2c3037"
                strokeDasharray="3 4"
              />
              <path
                className="telemetry-line"
                d="M0 60 15 59 28 35 45 30 55 74 68 77 90 30 104 24 118 45 133 15 150 11 165 72 181 70 196 20 220 14 237 65 254 63 270 32 291 18 320 13"
                stroke="#e10600"
                strokeWidth="2"
              />
              <path
                d="M0 65 15 61 28 43 45 39 55 78 68 80 90 39 104 30 118 49 133 23 150 19 165 78 181 74 196 29 220 25 237 71 254 67 270 40 291 28 320 23"
                stroke="#838b98"
                strokeWidth="1"
              />
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
          <div className="code-lines">
            <span>
              01 <i>async function</i> review(pullRequest) {"{"}
            </span>
            <span>
              02 &nbsp; <i>const</i> context = await bundle(diff);
            </span>
            <span className="review-highlight">
              03 &nbsp; <i>const</i> findings = validate(response);
            </span>
            <span>
              04 &nbsp; <i>return</i> deduplicate(findings);
            </span>
            <span>05 {"}"}</span>
          </div>
          <div className="terminal-result">
            <Check size={13} /> Validate first. Review with context.
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
            <div className="booking-services">
              <div>
                <Zap size={20} />
                <span>Electrical</span>
              </div>
              <div>
                <Wrench size={20} />
                <span>Home repair</span>
              </div>
            </div>
            <div className="booking-appointment">
              <CalendarDays size={19} />
              <div>
                <strong>Service appointment</strong>
                <span>Choose a time that works for you</span>
              </div>
              <Check size={16} />
            </div>
          </div>
        </div>
      ) : (
        <div className="prediction-ui">
          <div className="sports-tabs">
            <span>FOOTBALL</span>
            <span>CRICKET</span>
            <span>BASKETBALL</span>
          </div>
          <div className="prediction-title">
            <span>OUTCOME DISTRIBUTION</span>
            <strong>Find the signal.</strong>
          </div>
          <div className="probability-bars">
            {[72, 45, 58, 88, 64, 38, 78, 51, 91, 69, 47, 83].map(
              (height, i) => (
                <i
                  key={i}
                  style={
                    {
                      height: `${height}%`,
                      "--bar-order": i,
                    } as React.CSSProperties
                  }
                />
              ),
            )}
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
