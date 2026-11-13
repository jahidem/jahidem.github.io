import { experience } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="section-label">Experience</div>
      <div className="timeline">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05}>
            <article className="job">
              <div className="job-meta">
                <span className="job-period">{job.period}</span>
                <span className="job-loc">{job.location}</span>
              </div>
              <div className="job-main">
                <h3 className="job-role">{job.role}</h3>
                <p className="job-company">{job.company}</p>
                <ul className="job-points">
                  {job.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
