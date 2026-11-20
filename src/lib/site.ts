const configured = process.env.NEXT_PUBLIC_SITE_URL;
const vercel =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const siteOrigin = configured
  ? new URL(configured).origin
  : vercel
    ? `https://${vercel}`
    : undefined;
