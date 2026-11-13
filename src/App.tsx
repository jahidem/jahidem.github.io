import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scene } from "./three/Scene";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Research } from "./sections/Research";
import { Skills } from "./sections/Skills";
import { Achievements } from "./sections/Achievements";
import { Contact } from "./sections/Contact";
import "./styles/sections.css";

export default function App() {
  useSmoothScroll();
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    // Wait for the display font so particle sampling uses the right glyphs.
    const done = () => {
      setReady(true);
      setTimeout(() => setIntro(false), 900);
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(done);
    } else {
      done();
    }
  }, []);

  return (
    <>
      <Cursor />

      {ready && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      <div className="vignette" />
      <div className="grain" />

      <Nav />

      <main className="content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Achievements />
        <Contact />
      </main>

      <AnimatePresence>
        {intro && (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.span
              className="intro-mark"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              JAHID HOSSAIN
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
