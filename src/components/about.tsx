import { Braces, BrainCircuit, GitBranch, GraduationCap } from "lucide-react";
import { SectionHeading, Monogram } from "./ui";

export function About() {
  return (
    <section
      id="about"
      className="section about-section"
      tabIndex={-1}
      aria-labelledby="section-02-title"
    >
      <SectionHeading
        number="02"
        label="DRIVER PROFILE"
        title="A LITTLE ABOUT ME"
      />
      <div className="about-layout">
        <div className="about-copy" data-reveal>
          <h3>
            Curious by nature.{" "}
            <br />
            Learning by doing.
          </h3>
          <p>
            I’m <strong>Devathi Nikhil Suraj</strong>, a Computer Science and
            Engineering student at CVR College of Engineering in Hyderabad.
          </p>
          <p>
            I enjoy building practical software, exploring AI systems, and
            contributing to open source. From full-stack platforms to
            machine-learning-powered developer tools, I focus on turning complex
            engineering problems into working solutions.
          </p>
          <p>
            Outside the build, you’ll find me solving algorithmic problems or
            following Formula 1. I’m interested in what the data says — and what
            we can build with it.
          </p>
          <div className="interest-list">
            <span>
              <Braces size={17} />
              Full-stack systems
            </span>
            <span>
              <BrainCircuit size={17} />
              Applied AI & ML
            </span>
            <span>
              <GitBranch size={17} />
              Open-source development
            </span>
          </div>
        </div>
        <aside
          className="profile-panel"
          data-reveal
          aria-label="Engineering profile"
        >
          <div className="profile-panel-header">
            <span>ENGINEERING PROFILE</span>
            <Monogram />
          </div>
          <div className="profile-panel-name">
            <span>DEVATHI</span>
            <strong>NIKHIL SURAJ</strong>
            <span className="profile-role">COMPUTER SCIENCE & ENGINEERING</span>
          </div>
          <dl>
            <div>
              <dt>BASE</dt>
              <dd>Hyderabad, India</dd>
            </div>
            <div>
              <dt>EDUCATION</dt>
              <dd>CVR College of Engineering</dd>
            </div>
            <div>
              <dt>DEGREE</dt>
              <dd>B.Tech · 2023–2027</dd>
            </div>
            <div>
              <dt>CGPA</dt>
              <dd>
                8.12 <span>/ 10</span>
              </dd>
            </div>
            <div>
              <dt>FOCUS</dt>
              <dd>Full Stack · AI/ML · APIs</dd>
            </div>
          </dl>
          <div className="profile-panel-footer">
            <GraduationCap size={18} />
            <span>LEARNING BY BUILDING.</span>
            <div className="barcode" aria-hidden="true" />
          </div>
        </aside>
      </div>
    </section>
  );
}
