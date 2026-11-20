"use client";

import { useState } from "react";
import {
  Braces,
  PanelsTopLeft,
  Server,
  Database,
  BrainCircuit,
  Cloud,
  Terminal,
  Plus,
  Atom,
  GitBranch,
} from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading } from "./ui";

const icons = {
  code: Braces,
  layout: PanelsTopLeft,
  server: Server,
  database: Database,
  brain: BrainCircuit,
  cloud: Cloud,
  terminal: Terminal,
};
function TechIcon({ name }: { name: string }) {
  if (name.includes("React")) return <Atom size={20} aria-hidden="true" />;
  if (["Git", "GitHub", "GitHub Actions"].includes(name))
    return <GitBranch size={19} aria-hidden="true" />;
  const labels: Record<string, string> = {
    TypeScript: "TS",
    Python: "Py",
    Java: "Jv",
    "Next.js": "N",
    "Tailwind CSS": "≈",
    "Node.js": "JS",
    "Express.js": "ex",
    PostgreSQL: "Pg",
    MongoDB: "M",
    Docker: "▤",
    "AWS EC2": "ec2",
    "AWS S3": "s3",
    "scikit-learn": "sk",
  };
  return (
    <span className="tech-symbol" aria-hidden="true">
      {labels[name] ?? name.slice(0, 2)}
    </span>
  );
}

export function Skills() {
  const [filter, setFilter] = useState("All");
  const groups = skillGroups.filter(
    (group) => filter === "All" || group.title === filter,
  );
  return (
    <section
      id="skills"
      className="section skills-section"
      tabIndex={-1}
      aria-labelledby="section-06-title"
    >
      <div className="section-title-row">
        <SectionHeading
          number="06"
          label="ENGINEERING TOOLKIT"
          title="THE TOOLKIT"
        >
          The right tools. A considered approach.
        </SectionHeading>
        <span className="section-aside">
          TOOLS I WORK WITH.
          <br />
          ALWAYS ADDING TO THE GARAGE.
        </span>
      </div>
      <div
        className="skill-filters"
        role="group"
        aria-label="Filter skill groups"
      >
        {["All", ...skillGroups.map((group) => group.title)].map((title) => (
          <button
            key={title}
            aria-pressed={filter === title}
            onClick={() => setFilter(title)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="toolkit-grid">
        {groups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <div className="toolkit-group" key={group.title}>
              <div className="toolkit-title">
                <Icon size={20} />
                <h3>{group.title}</h3>
              </div>
              <div className="toolkit-items">
                {group.items.map((item) => (
                  <span key={item}>
                    <TechIcon name={item} />
                    {item}
                  </span>
                ))}
              </div>
              <details className="toolkit-details">
                <summary>
                  How I use these
                  <Plus size={14} />
                </summary>
                <p>{group.detail}</p>
              </details>
            </div>
          );
        })}
      </div>
      <span className="sr-only" aria-live="polite">
        Showing {groups.length} skill groups.
      </span>
    </section>
  );
}
