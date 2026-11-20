import { Github, MapPin, ChevronDown } from "lucide-react";
import { Circuit } from "./circuit";
import { ResumeLink } from "./ui";
import { profile } from "@/data/portfolio";

export function Hero({ resumeAvailable }: { resumeAvailable: boolean }) {
  return (
    <section
      id="home"
      className="hero"
      tabIndex={-1}
      aria-labelledby="hero-title"
    >
      <div className="hero-top">
        <div className="eyebrow">
          <span>01</span>
          <i />
          STARTING GRID
        </div>
        <span className="availability">
          <span />
          OPEN TO OPPORTUNITIES
        </span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-kicker">THE DEVELOPER PADDOCK</div>
          <h1 id="hero-title">
            <span className="hero-line">BUILDING WITH</span>
            <span className="hero-line">PRECISION.</span>
            <span className="hero-line headline-red">SHIPPING AT SPEED.</span>
          </h1>
          <div className="hero-person">
            <h2>
              NIKHIL SURAJ<span>.</span>
            </h2>
            <p>
              Full-Stack Developer <b> / </b> AI/ML Engineer <b> / </b>{" "}
              Open-Source Contributor
            </p>
          </div>
          <p className="hero-intro">
            I turn complex engineering problems into working solutions.
            Full-stack platforms, practical AI, and open-source software — built
            with intent.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work{" "}
              <span className="button-stripes" aria-hidden="true">
                ///
              </span>
            </a>
            <ResumeLink available={resumeAvailable} />
            <a
              className="icon-button"
              href={profile.github}
              aria-label="Visit Nikhil’s GitHub"
            >
              <Github size={20} />
            </a>
          </div>
          <div className="hero-location">
            <MapPin size={14} />
            Hyderabad, India
            <span className="location-divider" />
            17.3850° N · 78.4867° E
          </div>
        </div>
        <div className="hero-circuit">
          <div className="circuit-caption">
            <span>NS / ENGINEERING CIRCUIT</span>
            <span className="red">REV. 01</span>
          </div>
          <div className="circuit-stage">
            <div className="circuit-watermark">NS</div>
            <Circuit />
            <div className="circuit-cross cross-one">+</div>
            <div className="circuit-cross cross-two">+</div>
          </div>
          <div className="circuit-bottom">
            <div>
              <span>THE PROCESS</span>
              <strong>Think. Build. Refine.</strong>
            </div>
            <svg
              viewBox="0 0 100 30"
              width="100"
              height="30"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 24h15l4-7 5 10 6-22 5 15 5-6 7 10h14l4-15 4 15h31"
                stroke="#e10600"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#about">
          <span className="scroll-icon">
            <ChevronDown size={14} />
          </span>
          SCROLL TO EXPLORE
        </a>
        <span>ENGINEERED FOR PRECISION. BUILT FOR SPEED.</span>
        <span>PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}
