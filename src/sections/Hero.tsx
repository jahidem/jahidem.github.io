import { profile } from "../data/content";
import { scrollStore } from "../three/scrollStore";
import { Magnetic } from "../components/Magnetic";

export function Hero() {
  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollStore.scrollTo(el);
  };

  return (
    <section id="hero" className="hero">
      {/* Accessible name — the visual name is rendered as 3D particles */}
      <h1 className="sr-only">
        {profile.name} — {profile.role}
      </h1>

      <div className="hero-content hero-fade">
        <p className="eyebrow">{profile.role} · AI Integration</p>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-cta">
          <Magnetic strength={0.3}>
            <button className="btn" onClick={() => goTo("projects")}>
              View Work <span aria-hidden>↓</span>
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a className="btn btn-ghost" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV <span aria-hidden>↗</span>
            </a>
          </Magnetic>
          <span className="hero-loc">{profile.location}</span>
        </div>
      </div>

      <div className="scroll-cue hero-fade-slow">
        <div className="scroll-line">
          <div className="scroll-dot scroll-dot-anim" />
        </div>
      </div>
    </section>
  );
}
