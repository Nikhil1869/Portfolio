"use client";

import { useRef, useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Phone,
  MapPin,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import {
  createMailto,
  validateContact,
  type ContactErrors,
} from "@/lib/contact";
import { SectionHeading } from "./ui";

export function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const form = useRef<HTMLFormElement>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("Email copied to clipboard.");
    } catch {
      setCopyStatus(
        "Copy unavailable. Select the email address or use its link.",
      );
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    setFormStatus("");
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>("[aria-invalid=true]")
          ?.focus(),
      );
      return;
    }
    window.location.href = createMailto(fields, profile.email);
    setFormStatus(
      "Your email app has been requested. Review and send the draft there. Nothing has been sent by this website. If no app opens, use the email link.",
    );
  }

  return (
    <section
      id="contact"
      className="section contact-section"
      tabIndex={-1}
      aria-labelledby="section-08-title"
    >
      <div className="contact-layout">
        <div className="contact-copy">
          <SectionHeading
            number="08"
            label="TEAM RADIO"
            title="LET’S BUILD SOMETHING THAT MATTERS"
          />
          <p>
            Open to engineering opportunities, open-source collaboration, and
            interesting technical problems.
          </p>
          <div className="contact-email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              type="button"
              className="icon-button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copyStatus.startsWith("Email copied") ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
          <p className="copy-status" role="status">
            {copyStatus}
          </p>
          <div className="contact-meta">
            <span>
              <MapPin size={16} />
              {profile.location}
            </span>
            <a href="tel:+919182475131">
              <Phone size={15} />
              {profile.phone}
            </a>
          </div>
          <div className="contact-socials">
            <a href={profile.linkedin}>
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a href={profile.github}>
              <Github size={18} />
              GitHub
            </a>
          </div>
        </div>
        <form
          ref={form}
          className="contact-form"
          onSubmit={submit}
          noValidate
          data-reveal
        >
          <div className="form-heading">
            <Mail size={19} />
            <span>START A CONVERSATION</span>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Alex Morgan"
                required
                maxLength={100}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span className="field-error" id="name-error">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@example.com"
                required
                maxLength={254}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span className="field-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact-message">What are you working on?</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="An idea, an opportunity, or a good engineering problem…"
              rows={5}
              required
              minLength={10}
              maxLength={2000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : "form-note"}
            />
            {errors.message && (
              <span className="field-error" id="message-error">
                {errors.message}
              </span>
            )}
          </div>
          <button className="button button-primary" type="submit">
            Send message
            <Mail size={16} />
          </button>
          <p className="form-note" id="form-note">
            Opens a draft in your email app. You review and send it.
          </p>
          <p className="form-status" role="status">
            {formStatus}
          </p>
        </form>
      </div>
    </section>
  );
}
