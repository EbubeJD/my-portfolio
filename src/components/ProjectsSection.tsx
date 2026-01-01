import { useState, useEffect } from "react";
import { PROJECTS, type Project } from "../data/projects";
import ProjectModal from "./ProjectModal";

function renderBold(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".p-card-btn")
    );

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    cards.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="snap-section projects">
      <div className="projects-inner">
        <header className="projects-head">
          <h2 className="h2">Projects</h2>
        </header>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <button
              key={p.title}
              type="button"
              className="p-card p-card-btn"
              onClick={() => setActive(p)}
            >
              <h3 className="p-title">{p.title}</h3>
              <p className="p-desc">{renderBold(p.description)}</p>

              <div className="p-tech">
                {p.tech.map((t) => (
                  <span key={t} className="p-pill">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}

      <footer className="projects-footer">
        <div className="footer-icons">
          <a
            className="icon-btn"
            href="https://github.com/EbubeJD"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img src="/icons/line-github.svg" alt="" />
          </a>

          <a
            className="icon-btn"
            href="https://www.linkedin.com/in/ebubejackdavies/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img src="/icons/line-brand-linkedin.svg" alt="" />
          </a>

          <a
            className="icon-btn"
            href="mailto:ebubejackdavies@gmail.com"
            aria-label="Email"
          >
            <img src="/icons/line-mail.svg" alt="" />
          </a>
        </div>
      </footer>
    </section>
  );
}
