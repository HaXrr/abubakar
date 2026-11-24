"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const logos = [
  "Javascript",
  "Python",
  "C++",
  "Web Application",
  "UI/UX Designs",
  "Unit Testing",
  "Deployment",
  "AI/ML",
  "Production",
  "Maintain",
  "Mobile Apps",
  "Software Methodologies",
  "Agile Development",
  "RBAC",
  "Security",
  "AI Agents",
  "Best Practices",
  "Build",
  "Responsiveness",
];

function LogoSet({ reverse }: { reverse?: boolean }) {
  return (
    <div className={`lm-set${reverse ? " lm-set--reverse" : ""}`} aria-hidden>
      {logos.map((name) => (
        <span key={name} className="lm-item">
          <span className="bg-white/95 opacity-90 mx-2! font-bold! text-black! lm-name">
            {name}
          </span>
          <span className="lm-dot" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { rotateX: 90 },
        {
          rotateX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="lm-perspective">
      <section
        ref={sectionRef}
        className="lm-section"
        aria-label="Onze opdrachtgevers"
      >
        <div className="lm-fade-left" aria-hidden />
        <div className="lm-fade-right" aria-hidden />
        {/* <div className="lm-label">
          <span>Vertrouwd door</span>
        </div> */}

        <div className="lm-row">
          <div className="lm-track">
            <LogoSet />
            <LogoSet />
          </div>
        </div>

        <div className="lm-row lm-row--slow">
          <div className="lm-track lm-track--reverse">
            <LogoSet reverse />
            <LogoSet reverse />
          </div>
        </div>
      </section>
    </div>
  );
}
