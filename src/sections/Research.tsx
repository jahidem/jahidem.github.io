import { research } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Research() {
  return (
    <section id="research" className="research">
      <div className="section-label">Research</div>
      <Reveal>
        <article className="research-card">
          <span className="research-role">{research.role}</span>
          <h3 className="research-title">{research.title}</h3>
          <p className="research-blurb">{research.blurb}</p>
          <div className="research-links">
            {research.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        </article>
      </Reveal>
    </section>
  );
}
