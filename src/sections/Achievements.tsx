import { achievements, education } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Achievements() {
  return (
    <section id="achievements" className="achievements">
      <div className="section-label">Awards & Education</div>

      <div className="awards-wrap">
        <div className="awards-col">
          <h3 className="col-title">Achievements</h3>
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="award">
                <h4>
                  {a.link ? (
                    <a href={a.link} target="_blank" rel="noreferrer" data-hover>
                      {a.title} ↗
                    </a>
                  ) : (
                    a.title
                  )}
                </h4>
                <p>{a.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="awards-col">
          <h3 className="col-title">Education</h3>
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <div className="award">
                <h4>{e.title}</h4>
                <p className="award-org">{e.org}</p>
                <p className="award-meta">
                  {e.period} · {e.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
