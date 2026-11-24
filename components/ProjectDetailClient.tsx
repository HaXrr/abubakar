"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Footer from "@/components/Footer";
import ProjectHeroReveal from "@/components/ProjectHeroReveal";
import type { Project, ProjectDetail } from "@/data/projects";

interface Props {
  project: Project;
  detail: ProjectDetail;
  related: Project[];
}

export default function ProjectDetailClient({
  project,
  detail,
  related,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        rootRef.current
          ?.querySelectorAll<HTMLElement>(".pd-block")
          .forEach((block) => {
            const heading =
              block.querySelector<HTMLElement>(".pd-block-heading");
            const items = block.querySelectorAll<HTMLElement>(
              ".pd-paragraph, .pd-list li"
            );

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: block,
                start: "top 82%",
                once: true,
              },
            });

            if (heading) {
              tl.fromTo(
                heading,
                { clipPath: "inset(0 100% 0 0)" },
                {
                  clipPath: "inset(0 0% 0 0)",
                  duration: 0.75,
                  ease: "power3.inOut",
                }
              );
            }

            if (items.length) {
              tl.fromTo(
                items,
                { clipPath: "inset(0 100% 0 0)" },
                {
                  clipPath: "inset(0 0% 0 0)",
                  duration: 0.75,
                  ease: "power3.inOut",
                  stagger: 0.09,
                },
                heading ? "+=0.05" : 0
              );
            }
          });

        const gallery =
          rootRef.current?.querySelectorAll<HTMLElement>(".pd-gallery-item");
        if (gallery && gallery.length) {
          gsap.fromTo(
            gallery,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: gallery[0],
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        ScrollTrigger.refresh();
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <main className="pd-main">
        <ProjectHeroReveal project={project} liveUrl={detail.liveUrl} />

        <div className="pd-body">
          {detail.format === "case" ? (
            <>
              {detail.question && (
                <section className="pd-block">
                  <h2 className="pd-block-heading">The Problem</h2>
                  {detail.question.split("\n\n").map((p, i) => (
                    <p key={i} className="pd-paragraph">
                      {p}
                    </p>
                  ))}
                </section>
              )}
              {detail.challenge && detail.challenge.length > 0 && (
                <section className="pd-block">
                  <h2 className="pd-block-heading">The Challenge</h2>
                  <ul className="pd-list">
                    {detail.challenge.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
              {detail.approach && (
                <section className="pd-block">
                  <h2 className="pd-block-heading">My Approach</h2>
                  {detail.approach.split("\n\n").map((p, i) => (
                    <p key={i} className="pd-paragraph">
                      {p}
                    </p>
                  ))}
                </section>
              )}
              {detail.solution && (
                <section className="pd-block">
                  <h2 className="pd-block-heading">The Solution</h2>
                  {detail.solution.split("\n\n").map((p, i) => (
                    <p key={i} className="pd-paragraph">
                      {p}
                    </p>
                  ))}
                </section>
              )}
              {detail.result && (
                <section className="pd-block">
                  <h2 className="pd-block-heading">The Result</h2>
                  {detail.result.split("\n\n").map((p, i) => (
                    <p key={i} className="pd-paragraph">
                      {p}
                    </p>
                  ))}
                </section>
              )}
              {detail.deliverables && detail.deliverables.length > 0 && (
                <section className="pd-block">
                  <h2 className="pd-block-heading">Deliverables</h2>
                  <ul className="pd-list">
                    {detail.deliverables.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
              {detail.value && (
                <section className="pd-block">
                  <h2 className="pd-block-heading">The Value added</h2>
                  {detail.value.split("\n\n").map((p, i) => (
                    <p key={i} className="pd-paragraph">
                      {p}
                    </p>
                  ))}
                </section>
              )}
            </>
          ) : (
            <>
              {detail.intro && detail.intro.length > 0 && (
                <section className="pd-block">
                  {detail.intro.map((p, i) => (
                    <p key={i} className="pd-paragraph pd-paragraph--lead">
                      {p}
                    </p>
                  ))}
                </section>
              )}
              {detail.sections?.map((sec, i) => (
                <section key={i} className="pd-block">
                  <h2 className="pd-block-heading">{sec.heading}</h2>
                  {sec.paragraphs?.map((p, j) => (
                    <p key={j} className="pd-paragraph">
                      {p}
                    </p>
                  ))}
                  {sec.items && sec.items.length > 0 && (
                    <ul className="pd-list">
                      {sec.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </>
          )}
        </div>

        {detail.gallery && detail.gallery.length > 0 && (
          <section className="pd-gallery">
            {detail.gallery.map((src, i) => (
              <div key={i} className="pd-gallery-item">
                <img
                  src={src}
                  alt={`${project.client} ${i + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </section>
        )}

        {related.length > 0 && (
          <section className="pd-related">
            <div className="pd-related-header">
              <p className="pd-related-eyebrow">Following Products</p>
              <h2 className="pd-related-heading">Explore Further</h2>
            </div>
            <div className="pd-related-grid">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/project/${p.id}`}
                  className="pd-related-card"
                >
                  <div className="pd-related-img-wrap">
                    <img src={p.thumbnail} alt={p.client} loading="lazy" />
                  </div>
                  <div className="pd-related-meta">
                    <span className="pd-related-client">{p.client}</span>
                    <h3 className="pd-related-title">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/projects" className="pd-related-all">
              All Products <span aria-hidden>→</span>
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
