"use client";

import { useState } from "react";
import { Github, Plus, ExternalLink } from "lucide-react";
import { categories, projects, type Category } from "@/data/portfolio";
import { SectionHeading } from "./ui";
import { ProjectVisual } from "./project-visuals";

export function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const shown = projects.filter(
    (project) => filter === "All" || project.categories.includes(filter),
  );
  return (
    <section
      id="projects"
      className="section projects-section"
      tabIndex={-1}
      aria-labelledby="section-04-title"
    >
      <div className="section-title-row">
        <SectionHeading
          number="04"
          label="THE GARAGE"
          title="BUILT IN THE GARAGE"
        >
          Selected projects where ideas become working systems.
        </SectionHeading>
        <span className="section-aside">
          FOUR BUILDS. DIFFERENT CHALLENGES.
          <br />
          THE SAME ENGINEERING MINDSET.
        </span>
      </div>
      <div
        className="filter-bar"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
          >
            {category}
            {category === "All" && <span>04</span>}
          </button>
        ))}
        <span className="filter-count" aria-hidden="true">
          {String(shown.length).padStart(2, "0")} PROJECTS
        </span>
      </div>
      <span className="sr-only" role="status">
        Showing {shown.length} projects.
      </span>
      <div className="projects-grid">
        {shown.map((project) => (
          <article
            key={project.id}
            className={`project-card ${project.id === "f1" ? "featured-project" : ""}`}
          >
            <ProjectVisual project={project} />
            <div className="project-body">
              <div className="project-eyebrow">
                <span>{project.eyebrow}</span>
                <span>/{project.number}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technology-tags">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github}>
                  <Github size={15} />
                  Source code
                </a>
                {project.demo && (
                  <a href={project.demo}>
                    <ExternalLink size={14} />
                    Live demo
                  </a>
                )}
                {project.id === "fixit" && (
                  <span className="fork-label">COLLABORATIVE FORK</span>
                )}
              </div>
              <details className="engineering-details">
                <summary>
                  View engineering details
                  <span className="sr-only"> for {project.title}</span>
                  <Plus size={17} />
                </summary>
                <div className="case-study">
                  {project.attribution && (
                    <p className="attribution">{project.attribution}</p>
                  )}
                  <h4>The problem</h4>
                  <p>{project.problem}</p>
                  <h4>The approach</h4>
                  <p>{project.solution}</p>
                  <h4>Architecture</h4>
                  <ol className="architecture">
                    {project.architecture.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <h4>Engineering challenge</h4>
                  <p>{project.challenge}</p>
                  <h4>Repository evidence</h4>
                  <p>{project.implementation}</p>
                  <a href={`${project.github}#readme`} className="text-link">
                    Read the project documentation <ExternalLink size={13} />
                  </a>
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
      <p className="visual-disclosure">
        Interface studies above are original illustrations. Charts are
        illustrative, not live racing data or prediction results.
      </p>
    </section>
  );
}
