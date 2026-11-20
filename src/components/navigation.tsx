"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Monogram, ResumeLink } from "./ui";

export const navigation = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["open-source", "Open source"],
  ["skills", "Skills"],
  ["contact", "Contact"],
] as const;

export function Navigation({ resumeAvailable }: { resumeAvailable: boolean }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = [...navigation]
        .reverse()
        .find(
          ([id]) =>
            (document.getElementById(id)?.getBoundingClientRect().top ??
              Infinity) <=
            window.innerHeight * 0.35,
        );
      setActive(current?.[0] ?? "home");
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1080px)");
    const onResize = () => {
      if (desktop.matches) dialog.current?.close();
    };
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = oldOverflow;
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  function close() {
    dialog.current?.close();
  }
  function containFocus(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  function goTo(id: string) {
    close();
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      section?.focus({ preventScroll: true });
      section?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <a href="#home" aria-label="Nikhil Suraj — home" className="brand">
            <Monogram />
            <span>
              DEVELOPER
              <br />
              PADDOCK
            </span>
          </a>
          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-resume">
            <ResumeLink
              available={resumeAvailable}
              className="button button-small button-outline"
            />
          </div>
          <button
            ref={trigger}
            className="icon-button menu-toggle"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Navigation"
        onKeyDown={containFocus}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="drawer-content">
          <div className="drawer-header">
            <Monogram />
            <button
              className="icon-button"
              aria-label="Close navigation"
              onClick={close}
            >
              <X />
            </button>
          </div>
          <span className="eyebrow">THE DEVELOPER PADDOCK</span>
          <nav aria-label="Mobile navigation">
            {navigation.map(([id, label], index) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => goTo(id)}
              >
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>
          <ResumeLink available={resumeAvailable} />
        </div>
      </dialog>
    </>
  );
}
