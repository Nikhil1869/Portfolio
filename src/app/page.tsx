import { readdirSync } from "node:fs";
import path from "node:path";
import { Navigation } from "@/components/navigation";
import { Motion } from "@/components/motion";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { OpenSource } from "@/components/open-source";
import { Skills } from "@/components/skills";
import { CodingProfiles } from "@/components/coding-profiles";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { profile } from "@/data/portfolio";
import { siteOrigin } from "@/lib/site";

export default function Home() {
  const resumeFile = readdirSync(path.join(process.cwd(), "public")).find(
    (file) => file.toLowerCase() === "resume.pdf",
  );
  const resumeHref = resumeFile
    ? `/${encodeURIComponent(resumeFile)}`
    : undefined;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    ...(siteOrigin ? { url: siteOrigin } : {}),
    jobTitle: "Computer Science Engineering Student",
    email: profile.email,
    sameAs: [profile.github, profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <Navigation resumeHref={resumeHref} />
      <Motion />
      <main id="main" tabIndex={-1}>
        <Hero resumeHref={resumeHref} />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <Skills />
        <CodingProfiles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
