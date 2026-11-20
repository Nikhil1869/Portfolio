export const profile = {
  name: "Devathi Nikhil Suraj",
  email: "dnikhilsuraj5@gmail.com",
  phone: "+91-9182475131",
  github: "https://github.com/Nikhil1869",
  linkedin: "https://linkedin.com/in/nikhil-suraj-devathi-019a4a358/",
  location: "Hyderabad, India",
};

export const categories = [
  "All",
  "Full Stack",
  "AI/ML",
  "Developer Tools",
] as const;
export type Category = (typeof categories)[number];
export type Project = {
  id: "f1" | "aether" | "fixit" | "quantum";
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  categories: Category[];
  technologies: string[];
  github: string;
  demo?: string;
  image?: { src: string; alt: string };
  attribution?: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenge: string;
  implementation: string;
};

// Repository README + dependency manifests checked 20 November 2026.
// Visuals are original interface studies, not product screenshots or real data.
export const projects: Project[] = [
  {
    id: "f1",
    number: "01",
    title: "F1 Data Lab",
    eyebrow: "RACE DATA. ENGINEERED INTO INSIGHT.",
    description:
      "An interactive motorsport analytics platform for telemetry replay, driver comparison, race strategy, and ML predictions.",
    categories: ["Full Stack", "AI/ML"],
    technologies: [
      "Next.js",
      "Python",
      "Flask",
      "FastF1",
      "scikit-learn",
      "Docker",
    ],
    github: "https://github.com/Nikhil1869/F1",
    problem:
      "Race results tell only part of the story. Understanding a race means connecting lap traces, driver comparisons, tyre choices, and strategy.",
    solution:
      "Bring those views into a Next.js interface backed by a Flask API, using OpenF1 for session data and FastF1 for detailed telemetry.",
    architecture: [
      "Next.js / React",
      "Flask API",
      "OpenF1 + FastF1",
      "scikit-learn",
    ],
    challenge:
      "Detailed telemetry can be slow on its first load. The documented approach separates basic replay metadata from sampled telemetry and uses FastF1’s disk cache.",
    implementation:
      "The repository documents replay, comparison, strategy, and prediction routes, with Python dependencies and a Docker setup. Prediction quality has not been independently benchmarked here.",
  },
  {
    id: "aether",
    number: "02",
    title: "AetherReview",
    eyebrow: "DEVELOPER TOOLS / LOCAL-FIRST AI",
    description:
      "A local-first AI code review CLI and TUI for GitHub pull requests and GitLab merge requests. Your workflow. Your model.",
    categories: ["AI/ML", "Developer Tools"],
    technologies: ["TypeScript", "Node.js", "React / Ink", "LLM APIs"],
    github: "https://github.com/Nikhil1869/AetherReview",
    problem:
      "Useful automated code review needs repository context, configurable standards, and a choice of model and forge.",
    solution:
      "Run reviews from a local CLI or terminal UI, gathering context around changes and sending it to a configured local or cloud model.",
    architecture: [
      "CLI / Ink TUI",
      "Context bundler",
      "Compatible LLM",
      "Validated findings",
    ],
    challenge:
      "Repeated reviews can create noise. The documented pipeline validates findings and uses markers to deduplicate comments across runs.",
    implementation:
      "The TypeScript package includes GitHub MCP and GitLab REST integration, layered review rules, and a React/Ink TUI. Cloud model use sends review context to the selected provider.",
  },
  {
    id: "fixit",
    number: "03",
    title: "Fixit",
    eyebrow: "FULL STACK / COLLABORATIVE PROJECT",
    description:
      "A home-services booking application connecting customers and service providers through dedicated dashboards.",
    categories: ["Full Stack"],
    technologies: ["Next.js", "React", "MongoDB", "Mongoose", "Tailwind CSS"],
    github: "https://github.com/Nikhil1869/Fixit",
    attribution:
      "Collaborative fork of vishalkarnati/Fixit. Original upstream ownership is retained; individual implementation ownership is not claimed here.",
    problem:
      "Booking a home service requires a clear handoff between the customer’s request and the provider’s availability.",
    solution:
      "Separate customer and employee dashboards support authentication, scheduled bookings, and acceptance of service requests.",
    architecture: ["Next.js / React", "API routes", "Mongoose", "MongoDB"],
    challenge:
      "A booking needs consistent date and time information through both creation and acceptance. The README documents required-field validation at these boundaries.",
    implementation:
      "The fork contains Next.js API routes, authentication dependencies, and Mongoose models. This case study describes the shared application, not an independently verified list of personal changes.",
  },
  {
    id: "quantum",
    number: "04",
    title: "QuantumScore",
    eyebrow: "APPLIED ML / SPORTS ANALYTICS",
    description:
      "A machine-learning sports prediction application exploring football, cricket, and basketball match outcomes.",
    categories: ["Full Stack", "AI/ML"],
    technologies: ["React", "TypeScript", "Express.js", "FastAPI", "XGBoost"],
    github: "https://github.com/Nikhil1869/QuantumScore",
    problem:
      "Sports prediction requires connecting match features, model outputs, and an interface that makes probabilities understandable.",
    solution:
      "A React dashboard connects through an Express proxy to a FastAPI prediction service backed by XGBoost.",
    architecture: ["React / TypeScript", "Express proxy", "FastAPI", "XGBoost"],
    challenge:
      "Training provenance matters. The repository supports both generated training data and a Cricsheet pipeline; those sources should not be confused with validated predictive performance.",
    implementation:
      "Dependency manifests confirm the web and ML stack. Model artifacts are generated locally and excluded from Git. No real-world accuracy claim is made in this portfolio.",
  },
];

export const contributions = [
  {
    name: "Kronos",
    area: "ML / DATA INTEGRITY",
    title: "Keeping future data out of the past.",
    description:
      "Fixed a time-series normalization window to prevent data leakage and preserve reliable model evaluation.",
    link: "https://github.com/shiyu-coder/Kronos/pull/234",
  },
  {
    name: "Celtrix",
    area: "TYPESCRIPT / TOOLING",
    title: "Letting each framework be itself.",
    description:
      "Preserved generated SolidJS components, prevented React-specific code injection, and resolved TypeScript build errors.",
    link: "https://github.com/celtrix-os/Celtrix/pull/294",
  },
  {
    name: "Zeroshot",
    area: "RUST / GIT WORKFLOWS",
    title: "Validating the route before the run.",
    description:
      "Validated remote target branches before agent execution and aligned error handling and Git credential resolution for local PR delivery.",
    link: "https://github.com/the-open-engine/zeroshot/pull/1275",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    items: ["Java", "TypeScript", "Python"],
    detail:
      "Programming foundations, typed application code, and Python data workflows.",
  },
  {
    title: "Frontend",
    icon: "layout",
    items: ["React.js", "Next.js", "Tailwind CSS"],
    detail:
      "Component-based interfaces, application routing, and responsive styling.",
  },
  {
    title: "Backend",
    icon: "server",
    items: ["Node.js", "Express.js", "REST APIs"],
    detail: "API design and integration across JavaScript and Python services.",
  },
  {
    title: "Databases",
    icon: "database",
    items: ["PostgreSQL", "MongoDB"],
    detail: "Relational and document data modeling for application workflows.",
  },
  {
    title: "AI / Machine Learning",
    icon: "brain",
    items: ["scikit-learn", "RAG", "CNNs", "YOLO", "Object detection"],
    detail:
      "Predictive modeling, retrieval-augmented systems, and computer vision.",
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    items: ["AWS EC2", "AWS S3", "Docker", "GitHub Actions"],
    detail:
      "Application hosting, containerized environments, and automated workflows.",
  },
  {
    title: "Developer Tools",
    icon: "terminal",
    items: ["Git", "GitHub", "Postman"],
    detail: "Version control, collaboration, and API exploration.",
  },
] as const;

export const codingProfiles = [
  {
    name: "LeetCode",
    handle: "nikhilsuraj",
    href: "https://leetcode.com/u/nikhilsuraj/",
    mark: "LC",
  },
  {
    name: "CodeChef",
    handle: "dnikhilsuraj5",
    href: "https://www.codechef.com/users/dnikhilsuraj5",
    mark: "CC",
  },
  {
    name: "Codeforces",
    handle: "dnikhilsuraj5",
    href: "https://codeforces.com/profile/dnikhilsuraj5",
    mark: "CF",
  },
  { name: "GitHub", handle: "Nikhil1869", href: profile.github, mark: "GH" },
];
