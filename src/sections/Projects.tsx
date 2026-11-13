import { useState } from "react";
import { projects } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Projects() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="projects" className="projects">
      <div className="section-label">Selected Work</div>
      <div className="project-list">
        {projects.map((proj, i) => (
          <Reveal key={proj.name} delay={i * 0.04}>
            <article
              className={`project ${hover !== null && hover !== i ? "dim" : ""}`}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              data-hover
            >
              <div className="project-top">
                <span className="project-index">0{i + 1}</span>
                <span className="project-tag">{proj.tag}</span>
              </div>
              <h3 className="project-name">{proj.name}</h3>
              <p className="project-blurb">{proj.blurb}</p>
              <div className="project-foot">
                <ul className="project-stack">
                  {proj.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {proj.links && (
                  <div className="project-links">
                    {proj.links.map((l) => (
                      <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
