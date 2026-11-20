"use client";

import { useEffect, useRef } from "react";

export function Motion() {
  const bar = useRef<HTMLDivElement>(null);
  const track = useRef<SVGPathElement>(null);
  const marker = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        available > 0
          ? Math.min(1, Math.max(0, window.scrollY / available))
          : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      if (track.current && marker.current) {
        const point = track.current.getPointAtLength(
          progress * track.current.getTotalLength(),
        );
        marker.current.setAttribute("cx", String(point.x));
        marker.current.setAttribute("cy", String(point.y));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.from(".hero-line", {
            y: 30,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
          });
          gsap.from(".hero-circuit", {
            opacity: 0,
            y: 15,
            duration: 1.1,
            delay: 0.2,
            clearProps: "all",
          });
          const path = document.querySelector<SVGPathElement>(
            ".hero-circuit .track-drawing > path",
          );
          const dot =
            document.querySelector<SVGCircleElement>(".circuit-marker");
          if (path && dot) {
            const playhead = { progress: 0 };
            gsap.to(playhead, {
              progress: 1,
              duration: 1.8,
              delay: 0.3,
              ease: "power1.inOut",
              onUpdate() {
                const point = path.getPointAtLength(
                  playhead.progress * path.getTotalLength(),
                );
                dot.setAttribute("cx", String(point.x));
                dot.setAttribute("cy", String(point.y));
              },
            });
          }
          gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .forEach((element, index) => {
              gsap.from(element, {
                y: index % 3 === 0 ? 26 : 16,
                opacity: 0,
                duration: 0.65,
                ease: "power2.out",
                clearProps: "all",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
              });
            });
        });
        let refreshFrame = 0;
        const observer = new ResizeObserver(() => {
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        observer.observe(document.body);
        cleanup = () => {
          observer.disconnect();
          cancelAnimationFrame(refreshFrame);
          media.revert();
        };
      })
      .catch(() => {
        /* All content remains visible if optional animation cannot load. */
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={bar} aria-hidden="true" />
      <div className="scroll-track" aria-hidden="true">
        <span>LAP</span>
        <svg viewBox="0 0 30 140" width="30" height="140">
          <path
            ref={track}
            d="M15 7v35l-8 12v30l16 12v22l-8 15"
            fill="none"
            stroke="#383c44"
            strokeWidth="1.5"
          />
          <circle ref={marker} cx="15" cy="7" r="3" fill="#e10600" />
        </svg>
        <span>01</span>
      </div>
    </>
  );
}
