"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { projects } from "@/data/projects";
import { getGsap } from "@/lib/gsap";
import styles from "./Projects.module.scss";

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const projectCountLabel = useMemo(() => `${projects.length} Projects`, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const { gsap, ScrollTrigger } = getGsap();

    const updateActiveIndex = (nextIndex: number) => {
      if (activeIndexRef.current === nextIndex) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * Math.max(projects.length - 1, 1)}`,
      pin,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const nextIndex = Math.min(
          projects.length - 1,
          Math.round(self.progress * (projects.length - 1))
        );

        gsap.to(progressRef.current, {
          scaleX: self.progress,
          duration: 0.16,
          ease: "power2.out",
          transformOrigin: "left"
        });

        updateActiveIndex(nextIndex);
      }
    });

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(section);

    return () => {
      resizeObserver.disconnect();
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    const preview = previewRef.current;
    if (!panel || !preview) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelectorAll("[data-project-reveal]"),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.62,
          stagger: 0.045,
          ease: "power3.out"
        }
      );

      gsap.fromTo(
        preview,
        { clipPath: "inset(0 0 100% 0)", scale: 0.985 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 0.72,
          ease: "power3.out"
        }
      );
    }, panel);

    return () => ctx.revert();
  }, [activeIndex]);

  const handleProjectClick = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const targetY = section.offsetTop + window.innerHeight * index;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section id="works" ref={sectionRef} className={styles.projects}>
      <div ref={pinRef} className={styles.pin}>
        <div className={styles.topbar}>
          <p>Works</p>
          <span>{projectCountLabel}</span>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span ref={progressRef} />
        </div>

        <aside className={styles.list} aria-label="Project list">
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={clsx(styles.item, index === activeIndex && styles.active)}
              onClick={() => handleProjectClick(index)}
              type="button"
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span>{project.no}</span>
              <strong>{project.title}</strong>
              <em>{project.subtitle}</em>
            </button>
          ))}
        </aside>

        <article ref={panelRef} className={styles.panel} key={activeProject.id}>
          <div className={styles.eyebrow} data-project-reveal>
            <span>{activeProject.type}</span>
            <span>{activeProject.year}</span>
          </div>

          <div className={styles.titleGroup} data-project-reveal>
            <p>{activeProject.no}</p>
            <h2>{activeProject.title}</h2>
            <span>{activeProject.subtitle}</span>
          </div>

          <div ref={previewRef} className={styles.preview} data-project-reveal aria-hidden="true">
            <div className={styles.previewHeader}>
              <span>{activeProject.no}</span>
              <span>{activeProject.type}</span>
            </div>
            <div className={styles.previewTitle}>{activeProject.title}</div>
            <div className={styles.previewLines}>
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className={styles.description} data-project-reveal>
            <p>{activeProject.overview}</p>
          </div>

          <dl className={styles.facts} data-project-reveal>
            <div>
              <dt>Role</dt>
              <dd>{activeProject.role}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{activeProject.scope.join(" / ")}</dd>
            </div>
            <div>
              <dt>Tech</dt>
              <dd>{activeProject.tech.join(" / ")}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
