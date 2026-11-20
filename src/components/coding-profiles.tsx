import {
  ExternalLink,
  Code2,
  Github,
  ChartNoAxesColumn,
  ChefHat,
} from "lucide-react";
import { codingProfiles } from "@/data/portfolio";
import { SectionHeading } from "./ui";

const icons = [Code2, ChefHat, ChartNoAxesColumn, Github];
export function CodingProfiles() {
  return (
    <section
      className="section coding-section"
      aria-labelledby="section-07-title"
    >
      <div>
        <SectionHeading
          number="07"
          label="THE TIMING BOARD"
          title="BEYOND THE BUILD"
        />
        <p className="coding-intro">
          A different kind of practice. Competitive programming keeps me
          thinking about algorithms, edge cases, and the tradeoffs behind a
          solution.
        </p>
      </div>
      <div className="timing-board" data-reveal>
        <div className="timing-head">
          <span>PLATFORM</span>
          <span>PROFILE</span>
        </div>
        {codingProfiles.map((item, i) => {
          const Icon = icons[i];
          return (
            <a key={item.name} href={item.href}>
              <span className="timing-number">0{i + 1}</span>
              <Icon size={21} />
              <strong>{item.name}</strong>
              <span className="timing-handle">{item.handle}</span>
              <ExternalLink size={15} />
            </a>
          );
        })}
        <div className="timing-foot">
          CONSISTENT PRACTICE. COMPOUNDING PROGRESS.
        </div>
      </div>
    </section>
  );
}
