import { Plus } from "lucide-react";
import { SectionHeading } from "./ui";

export function Experience() {
  return (
    <section
      id="experience"
      className="section experience-section"
      tabIndex={-1}
      aria-labelledby="section-03-title"
    >
      <div className="experience-heading">
        <SectionHeading
          number="03"
          label="CAREER TELEMETRY"
          title="PROGRESS, IN PRACTICE"
        />
        <p>
          A foundation in computer science.
          <br />
          Experience with real engineering problems.
        </p>
      </div>
      <div className="timeline">
        <article className="timeline-item" data-reveal>
          <div className="timeline-date">
            <span>MAY — JUL 2026</span>
            <small>RESEARCH & DEVELOPMENT</small>
          </div>
          <details className="timeline-card" open>
            <summary>
              <div>
                <span className="tiny-label">
                  DRDO · RESEARCH CENTRE IMARAT
                </span>
                <h3>AI & ML Intern</h3>
              </div>
              <Plus size={19} />
            </summary>
            <div className="timeline-content">
              <p>
                Worked with retrieval-augmented generation, CNNs, Faster R-CNN,
                and YOLO for image classification and object detection.
              </p>
              <p>
                Applied transfer learning with COCO-pretrained weights to
                develop and evaluate object detection models for custom
                datasets.
              </p>
              <div className="technology-tags">
                <span>RAG</span>
                <span>Computer vision</span>
                <span>Transfer learning</span>
              </div>
            </div>
          </details>
        </article>
        <article className="timeline-item" data-reveal>
          <div className="timeline-date">
            <span>2023 — 2027</span>
            <small>EDUCATION</small>
          </div>
          <details className="timeline-card">
            <summary>
              <div>
                <span className="tiny-label">CVR COLLEGE OF ENGINEERING</span>
                <h3>B.Tech, Computer Science & Engineering</h3>
              </div>
              <Plus size={19} />
            </summary>
            <div className="timeline-content">
              <p>
                Pursuing Computer Science and Engineering in Hyderabad. CGPA:
                8.12. Alongside coursework, I explore backend systems, machine
                learning, and competitive programming through practical
                projects.
              </p>
            </div>
          </details>
        </article>
      </div>
    </section>
  );
}
