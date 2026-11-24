"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredProjects } from "@/data/projects";

const CARD_COLORS = ["#16141f", "#141917", "#1a1410", "#111111"];
const projects = featuredProjects.slice(0, 4);

export default function StickyProjectCards() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const stack = stackRef.current;
    if (!stack) return;

    const cards = stack.querySelectorAll<HTMLElement>(".spc-card");
    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;
    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stack,
        start: "top top",
        end: `+=${window.innerHeight * 8}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.min(
            Math.floor(progress / segmentSize),
            totalCards - 1
          );
          const segProgress =
            (progress - activeIndex * segmentSize) / segmentSize;

          cards.forEach((card, i) => {
            if (i < activeIndex) {
              gsap.set(card, { yPercent: -250, rotationX: 35 });
            } else if (i === activeIndex) {
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              });
            } else {
              const behindIndex = i - activeIndex;
              gsap.set(card, {
                yPercent: -50 + (behindIndex - segProgress) * cardYOffset,
                rotationX: 0,
                scale: 1 - (behindIndex - segProgress) * cardScaleStep,
              });
            }
          });
        },
      });
    }, stack);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" className="spc-section">
      <div className="spc-header">
        <p className="spc-eyebrow">Cases &amp; Demo&apos;s</p>
        <h2 className="spc-heading">Selected work</h2>
        <Link href="/projects" className="spc-all-link">
          hazrr's Projects <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="spc-stack" ref={stackRef}>
        {projects.map((p, i) => (
          <Link
            key={p.id}
            href={`/project/${p.id}`}
            className="spc-card"
            style={{
              backgroundColor: CARD_COLORS[i],
              zIndex: projects.length - i,
            }}
          >
            <div className="spc-card-col spc-card-text">
              <p className="spc-card-index">0{i + 1}</p>
              <div>
                <p className="spc-card-client">{p.client}</p>
                <h3 className="spc-card-title">{p.title}</h3>
              </div>
            </div>
            <div className="spc-card-col spc-card-img">
              <img src={p.thumbnail} alt={p.client} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
