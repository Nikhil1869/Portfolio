"use client";

import { useEffect, useRef } from "react";

export function Motion() {
  const bar = useRef<HTMLDivElement>(null);
  const track = useRef<SVGPathElement>(null);
  const lapLine = useRef<SVGPathElement>(null);
  const marker = useRef<SVGCircleElement>(null);
  const lapValue = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const path = track.current;
    const length = path?.getTotalLength() ?? 0;
    let fallbackFrame = 0;
    let refreshFrame = 0;
    let cleanup: (() => void) | undefined;
    let disposed = false;
    let lastPercent = -1;
    const renderLap = (progress: number) => {
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      lapLine.current?.setAttribute("stroke-dashoffset", String(1 - progress));
      if (path && marker.current) {
        const point = path.getPointAtLength(length * progress);
        marker.current.setAttribute("cx", String(point.x));
        marker.current.setAttribute("cy", String(point.y));
      }
      const percent = Math.round(progress * 100);
      if (lapValue.current && percent !== lastPercent) {
        lastPercent = percent;
        lapValue.current.textContent = `${percent}%`;
      }
    };
    const fallbackUpdate = () => {
      fallbackFrame = 0;
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      renderLap(
        available > 0
          ? Math.min(1, Math.max(0, window.scrollY / available))
          : 0,
      );
    };
    const fallbackSchedule = () => {
      if (!fallbackFrame) fallbackFrame = requestAnimationFrame(fallbackUpdate);
    };
    const fallbackObserver = new ResizeObserver(fallbackSchedule);
    fallbackObserver.observe(document.body);
    window.addEventListener("scroll", fallbackSchedule, { passive: true });
    window.addEventListener("resize", fallbackSchedule);
    fallbackUpdate();
    const stopFallback = () => {
      fallbackObserver.disconnect();
      window.removeEventListener("scroll", fallbackSchedule);
      window.removeEventListener("resize", fallbackSchedule);
      cancelAnimationFrame(fallbackFrame);
    };

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const progress = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (trigger) => renderLap(trigger.progress),
          onRefresh: (trigger) => renderLap(trigger.progress),
        });
        stopFallback();
        renderLap(progress.progress);
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          if (window.scrollY < window.innerHeight * 0.45) {
            gsap.from(".hero-line", {
              y: 18,
              opacity: 0.55,
              duration: 0.65,
              stagger: 0.075,
              ease: "power3.out",
              clearProps: "opacity,transform",
            });
            gsap.from(".hero-circuit", {
              opacity: 0.6,
              y: 10,
              duration: 0.7,
              delay: 0.08,
              clearProps: "opacity,transform",
            });
          }
          const circuitPath = document.querySelector<SVGPathElement>(
            ".hero-circuit .track-drawing > path",
          );
          const dot =
            document.querySelector<SVGCircleElement>(".circuit-marker");
          if (circuitPath && dot) {
            const circuitLength = circuitPath.getTotalLength();
            const playhead = { progress: 0 };
            gsap.to(playhead, {
              progress: 1,
              duration: 1.45,
              delay: 0.2,
              ease: "power1.inOut",
              onUpdate() {
                const point = circuitPath.getPointAtLength(
                  playhead.progress * circuitLength,
                );
                dot.setAttribute("cx", String(point.x));
                dot.setAttribute("cy", String(point.y));
              },
            });
          }
          gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              const headingLine = element.querySelector(".eyebrow i");
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: element,
                  start: "top 92%",
                  once: true,
                },
              });
              timeline.from(element, {
                y: 14,
                opacity: 0.55,
                duration: 0.45,
                ease: "power2.out",
                immediateRender: false,
                clearProps: "opacity,transform",
              });
              if (headingLine) {
                timeline.from(
                  headingLine,
                  {
                    scaleX: 0.25,
                    duration: 0.55,
                    ease: "power2.out",
                    immediateRender: false,
                    clearProps: "transform",
                  },
                  0,
                );
              }
            });
        });
        const observer = new ResizeObserver(() => {
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        observer.observe(document.body);
        cleanup = () => {
          observer.disconnect();
          cancelAnimationFrame(refreshFrame);
          progress.kill();
          media.revert();
        };
      })
      .catch(() => {
        /* All content remains visible if optional animation cannot load. */
      });
    return () => {
      disposed = true;
      stopFallback();
      cleanup?.();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={bar} aria-hidden="true" />
      <div className="scroll-track" aria-hidden="true">
        <span>LAP</span>
        <svg viewBox="0 0 36 148" width="36" height="148">
          <path
            ref={track}
            d="M18 8v24q0 6-4 10l-5 6q-4 4-4 10v21q0 6 5 9l14 9q5 3 5 9v15q0 6-4 10l-7 9"
            fill="none"
            stroke="#383c44"
            strokeWidth="1.5"
          />
          <path
            ref={lapLine}
            className="lap-line"
            d="M18 8v24q0 6-4 10l-5 6q-4 4-4 10v21q0 6 5 9l14 9q5 3 5 9v15q0 6-4 10l-7 9"
            fill="none"
            pathLength="1"
            stroke="#e10600"
            strokeWidth="1.5"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
          <circle ref={marker} cx="18" cy="8" r="3" fill="#ff665d" />
        </svg>
        <span className="lap-value" ref={lapValue}>
          0%
        </span>
      </div>
    </>
  );
}
