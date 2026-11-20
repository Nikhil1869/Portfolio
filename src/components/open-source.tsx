import { GitPullRequest, Github, ExternalLink } from "lucide-react";
import { contributions, profile } from "@/data/portfolio";
import { SectionHeading } from "./ui";

export function OpenSource() {
  return (
    <section
      id="open-source"
      className="section open-source-section"
      tabIndex={-1}
      aria-labelledby="section-05-title"
    >
      <div className="section-title-row">
        <SectionHeading
          number="05"
          label="THE PIT CREW"
          title="ENGINEERING BEYOND MY OWN CODE"
        >
          Good software is a team effort. Here’s where I’ve contributed.
        </SectionHeading>
        <a className="button button-outline button-small" href={profile.github}>
          <Github size={16} />
          GitHub activity
        </a>
      </div>
      <div className="contribution-grid">
        {contributions.map((item) => (
          <article key={item.name} className="contribution" data-reveal>
            <div className="contribution-icon">
              <GitPullRequest size={21} />
            </div>
            <span className="tiny-label">{item.area}</span>
            <h3>{item.name}</h3>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            {item.link ? (
              <a className="text-link" href={item.link}>
                View pull request <ExternalLink size={13} />
              </a>
            ) : (
              <span className="contribution-note">
                Time-series modeling contribution
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
