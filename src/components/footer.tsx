import { ChevronUp, Github, Linkedin } from "lucide-react";
import { Monogram } from "./ui";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="finish-line" aria-hidden="true" />
      <div className="footer-main">
        <a href="#home" aria-label="Back to home">
          <Monogram />
        </a>
        <p>
          Devathi Nikhil Suraj
          <span>Designed with precision. Built with curiosity.</span>
        </p>
        <div className="footer-links">
          <a href={profile.github} className="icon-button" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            className="icon-button"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a href="#home" className="back-top">
            BACK TO TOP
            <ChevronUp size={17} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NIKHIL SURAJ</span>
        <span>INDEPENDENTLY ENGINEERED. ALWAYS ITERATING.</span>
        <span>09 / FINISH LINE</span>
      </div>
    </footer>
  );
}
