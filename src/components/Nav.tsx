import { useEffect, useState } from "react";
import { nav, profile } from "../data/content";
import { scrollStore } from "../three/scrollStore";
import { Magnetic } from "./Magnetic";

export function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollStore.scrollTo(el);
  };

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <Magnetic strength={0.2}>
        <button className="nav-logo" onClick={() => go("hero")} aria-label="Home">
          JH<span>.</span>
        </button>
      </Magnetic>

      <nav className="nav-links">
        {nav.map((n) => (
          <button
            key={n.id}
            className={`nav-link ${active === n.id ? "is-active" : ""}`}
            onClick={() => go(n.id)}
          >
            {n.label}
          </button>
        ))}
      </nav>

      <Magnetic strength={0.25}>
        <a className="nav-cv" href={profile.cv} target="_blank" rel="noreferrer">
          CV ↗
        </a>
      </Magnetic>
    </header>
  );
}
