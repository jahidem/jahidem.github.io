import { profile } from "../data/content";
import { Reveal, RevealText } from "../components/Reveal";
import { Magnetic } from "../components/Magnetic";

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-label">Contact</div>
      <div className="contact-inner">
        <RevealText
          className="contact-head"
          lines={["Let's build", "something."]}
        />
        <Reveal delay={0.15}>
          <Magnetic strength={0.2}>
            <a className="contact-mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.25}>
          <ul className="contact-socials">
            <li>
              <a href={profile.socials.github} target="_blank" rel="noreferrer" data-hover>
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" data-hover>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" data-hover>
                LeetCode
              </a>
            </li>
            <li>
              <a href={profile.socials.codeforces} target="_blank" rel="noreferrer" data-hover>
                Codeforces
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <footer className="footer">
        <span>© {profile.name}</span>
        <span>Tokyo, Japan</span>
        <span>Built with three.js · React</span>
      </footer>
    </section>
  );
}
