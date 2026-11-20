import { Download, FileText } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Monogram() {
  return (
    <svg
      viewBox="0 0 68 36"
      fill="none"
      aria-hidden="true"
      className="monogram"
    >
      <path
        d="M4 29 11 7h7l8 16 5-16h7l-7 22h-7L16 13l-5 16H4Z"
        fill="currentColor"
      />
      <path
        d="M61 7H43l-4 10 14 5-1 2H36l-2 5h22l4-11-14-5 1-1h12l2-5Z"
        fill="currentColor"
      />
      <path d="m60 29 2-6h6l-2 6h-6Z" fill="#E10600" />
    </svg>
  );
}

export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div className="eyebrow">
        <span>{number}</span>
        <i />
        {label}
      </div>
      <h2 id={`section-${number}-title`}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function ResumeLink({
  available,
  className = "button button-outline",
}: {
  available: boolean;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={
        available
          ? "/resume.pdf"
          : `mailto:${profile.email}?subject=Resume%20request`
      }
      download={available || undefined}
    >
      {available ? <Download size={16} /> : <FileText size={16} />}
      {available ? "Download resume" : "Request resume"}
    </a>
  );
}
