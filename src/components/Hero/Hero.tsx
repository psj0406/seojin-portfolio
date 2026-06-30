"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import styles from "./Hero.module.scss";

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-reveal]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out"
        }
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="top" className={styles.hero} aria-label="Portfolio intro">
      <div className={styles.inner}>
        <p className={styles.mark} data-hero-reveal>PS.</p>
        <div className={styles.info} data-hero-reveal>
          <h1>Park Seojin</h1>
          <p>Frontend Publisher</p>
        </div>
        <a href="#works" className={styles.scroll} data-hero-reveal>
          <span>Scroll</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
