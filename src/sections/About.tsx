import { about, profile } from "../data/content";
import { Reveal, RevealText } from "../components/Reveal";
import { Magnetic } from "../components/Magnetic";

export function About() {
  return (
    <section id="about" className="about">
      <div className="section-label">About</div>
      <div className="about-grid">
        <RevealText
          className="about-lead"
          lines={["Engineer first.", "AI-native by craft.", "Researcher at heart."]}
        />
        <div className="about-copy">
          <Reveal>
            <p className="about-intro">{about.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about-body">{about.body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic strength={0.3}>
              <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">
                Download CV <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
