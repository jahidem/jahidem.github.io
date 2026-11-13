import { skills } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-label">Capabilities</div>
      <div className="skills-grid">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.06}>
            <div className="skill-group">
              <h3 className="skill-group-title">{group.group}</h3>
              <ul className="skill-items">
                {group.items.map((item) => (
                  <li key={item} data-hover>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
