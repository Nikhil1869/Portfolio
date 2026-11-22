# The Developer Paddock

An original motorsport-inspired portfolio for **Devathi Nikhil Suraj**. The visual language combines condensed typography, an original NS monogram, an SVG engineering circuit, a 3D open-wheel race car, restrained red accents, and interactive previews of four projects.

## Run locally

Use Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Fonts are self-hosted through Fontsource; the portfolio makes no runtime requests to GitHub or any analytics service.

```sh
npm run typecheck
npm test
npm run build
npm start
```

`build` produces a static site in `out/`. `start` serves that production export. No database or server secrets are necessary.

## Stack and structure

- Next.js App Router, TypeScript, Tailwind CSS 4, GSAP/ScrollTrigger, Three.js, React Three Fiber, Drei, and Lucide React.
- `src/app/`: server-rendered composition, shared design tokens/styles, SEO metadata, sitemap, robots, and 404 page.
- `src/components/`: reusable section components and original CSS/SVG project graphics. Interactive islands handle filters, navigation, contact, and optional motion.
- `src/data/portfolio.ts`: typed project data, source links, case studies, contributions, skills, and profile details.
- `src/lib/contact.ts`: field validation and safely encoded mailto composition, with regression tests in `tests/`.
- `public/`: original brand and social preview assets; add real project screenshots or your resume here.

## Customize

Update `src/data/portfolio.ts` to change projects, technologies, URLs, or case studies. Add an optional `image: { src: "/projects/example.webp", alt: "…" }` to replace a project's illustrative graphic with an authentic screenshot. Add `demo` only after verifying the deployment works. Project categories use a typed union; change the category list when adding a new category.

The base styles live in `src/app/globals.css`. The original car model is in `src/components/racing-car.tsx`. The 3D view loads separately and renders on demand. Visitors can use the circuit map and read the garage notes on devices without WebGL. Scroll and camera transitions respect reduced-motion preferences.

### Resume

Replace `public/Resume.pdf` with the current resume and rebuild. The download uses the filename in the repository, including its letter case. If the PDF is absent, the resume action opens an email request.

### Contact

The contact form validates name, email, and message, then opens a prefilled draft in the visitor's email application. The visitor must send it there. This site never claims a message was delivered. Direct email, copy email, phone, GitHub, and LinkedIn actions are also available. Clipboard denial produces a visible fallback instruction.

If a delivery provider is added later, remove static export mode, implement a server endpoint with credentials stored on the server, validate requests there, apply rate limiting, and show a success state only after the provider confirms acceptance. No delivery integration is configured in this version.

## Deploy to Vercel

1. Push this project to a Git repository and import it into Vercel.
2. Select the Next.js framework preset and Node.js 24. Use `npm ci` and `npm run build`; the static output directory is `out`.
3. Set `NEXT_PUBLIC_SITE_URL` to your canonical public HTTPS origin, without a path (for example, your custom domain). Rebuild whenever the origin changes. Vercel's production domain is used automatically if the variable is absent.
4. Verify that `public/Resume.pdf` is the resume you want to publish.
5. Deploy. Verify the generated sitemap, canonical URL, Open Graph image, and contact links at your production origin.

No account credentials are included in the repository. The optional ignored `.env.production.local` is for the local Sites build; use your own Vercel environment settings when deploying there. The same `out/` directory can also be deployed to any static host.

## Content provenance

Personal, education, internship, and skill details are supplied in the owner's brief. Repository READMEs and dependency manifests were checked on **20 November 2026**:

- [F1 Data Lab](https://github.com/Nikhil1869/F1), default branch `feature/strategy-radar-async`: Next.js/React frontend, Flask, FastF1/OpenF1, ML dependencies, and Docker setup.
- [AetherReview](https://github.com/Nikhil1869/AetherReview): TypeScript/Node.js CLI/TUI, React/Ink, model integrations, GitHub MCP/GitLab REST, contextual reviews, validation, and deduplication. Local execution does not imply local-only data processing when a cloud model is selected.
- [Fixit](https://github.com/Nikhil1869/Fixit): verified fork of [vishalkarnati/Fixit](https://github.com/vishalkarnati/Fixit). Clearly credited as collaborative work; no unverified personal implementation ownership is asserted. A README demo exists, but a working live deployment was not verified, so there is no demo button.
- [QuantumScore](https://github.com/Nikhil1869/QuantumScore): React/TypeScript frontend, Express proxy, FastAPI and XGBoost. Synthetic training and optional Cricsheet data are distinguished; no accuracy metric is asserted.
- [Kronos PR #234](https://github.com/shiyu-coder/Kronos/pull/234), [Celtrix PR #294](https://github.com/celtrix-os/Celtrix/pull/294), and [Zeroshot PR #1275](https://github.com/the-open-engine/zeroshot/pull/1275) were verified against their titles/bodies and author. No merge status is claimed.

The [MoncyDev reference](https://github.com/MoncyDev/Portfolio-Website) was reviewed for its emphasis on intentional motion and visual depth. Its code, layouts, assets, and proprietary models were not reused.

All miniature interfaces and chart traces are original illustrative compositions. Coding profiles show links, never fabricated ratings. The portfolio is an independent personal project and is not affiliated with Formula 1.

## Accessibility and verification

Semantic landmarks, a skip link, visible focus, real disclosure elements, labeled form errors, filter pressed states, and live announcements support keyboard and assistive technology use. Mobile navigation uses a native modal dialog, focus restoration, Escape dismissal, and scroll locking. Reduced motion disables entrance and hover animations and uses immediate anchor navigation.

Tests cover invalid form values, limits, header injection, and Unicode/URL encoding. Browser review covers desktop, tablet, 360px mobile, filters, project details, mobile navigation, and validation. Lighthouse scores should be measured against the final production origin; no unmeasured scores are claimed.

Fonts are Barlow Condensed, Inter, and IBM Plex Mono via their Fontsource packages, which include their licenses. Lucide icons are ISC licensed. The core implementation uses no paid animation plugins.
