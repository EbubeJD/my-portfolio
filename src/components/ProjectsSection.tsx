import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS, type Project } from "../data/projects";
import ProjectModal from "./ProjectModal";
import { renderBold } from "../utils/renderBold";

const COUNT = PROJECTS.length;
// three copies of the list; the middle one is "home" and the outer two let the track loop
const LOOPED = [...PROJECTS, ...PROJECTS, ...PROJECTS];

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);
  const [revealed, setRevealed] = useState(false);

  // distance between the starts of two neighbouring cards
  const cardStep = useCallback(() => {
    const cards = trackRef.current?.querySelectorAll<HTMLElement>(".p-card-btn");
    if (!cards || cards.length < 2) return 0;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }, []);

  // jump (without animation) back into the middle copy; returns the position there
  const recenter = useCallback(() => {
    const track = trackRef.current;
    const step = cardStep();
    if (!track || !step) return COUNT;

    let pos = Math.round(track.scrollLeft / step);
    if (pos < COUNT) {
      track.scrollLeft += COUNT * step;
      pos += COUNT;
    } else if (pos >= 2 * COUNT) {
      track.scrollLeft -= COUNT * step;
      pos -= COUNT;
    }
    return pos;
  }, [cardStep]);

  const scrollToPos = useCallback(
    (pos: number) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      trackRef.current?.scrollTo({
        left: pos * cardStep(),
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [cardStep]
  );

  const move = useCallback(
    (dir: 1 | -1) => {
      if (!cardStep()) return;
      scrollToPos(recenter() + dir);
    },
    [cardStep, recenter, scrollToPos]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let settle: number | undefined;

    // only cards on screen carry a shadow, so off-screen neighbours can't bleed into the edges.
    // every copy of a project is marked together so the loop jump never changes what is drawn
    const markInView = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".p-card-btn"));
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const width = track.clientWidth - 2 * pad;
      const inView = new Set<number>();

      cards.forEach((card, i) => {
        const centre = card.offsetLeft + card.offsetWidth / 2 - track.scrollLeft;
        if (centre >= 0 && centre <= width) inView.add(i % COUNT);
      });
      cards.forEach((card, i) => card.toggleAttribute("data-in-view", inView.has(i % COUNT)));
    };

    const onScroll = () => {
      const step = cardStep();
      if (!step) return;

      const i = ((Math.round(track.scrollLeft / step) % COUNT) + COUNT) % COUNT;
      indexRef.current = i;
      markInView();

      window.clearTimeout(settle);
      settle = window.setTimeout(recenter, 140);
    };

    // fires once on observe, then whenever the track is resized
    const ro = new ResizeObserver(() => {
      track.scrollLeft = (COUNT + indexRef.current) * cardStep();
      markInView();
    });
    ro.observe(track);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(track);

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(settle);
      ro.disconnect();
      io.disconnect();
      track.removeEventListener("scroll", onScroll);
    };
  }, [cardStep, recenter]);

  return (
    <section className="snap-section projects">
      <div className="projects-inner">
        <header className="projects-head">
          <h2 className="h2">Projects</h2>
        </header>

        <div className="projects-carousel">
          <button
            type="button"
            className="projects-nav-btn projects-nav-prev"
            onClick={() => move(-1)}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div className="projects-grid" ref={trackRef}>
            {LOOPED.map((p, i) => {
              const isClone = i < COUNT || i >= 2 * COUNT;
              return (
                <button
                  key={i}
                  type="button"
                  className={`p-card p-card-btn ${revealed ? "is-visible" : ""}`}
                  onClick={() => setActive(p)}
                  aria-hidden={isClone || undefined}
                  tabIndex={isClone ? -1 : undefined}
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
              );
            })}
          </div>

          <button
            type="button"
            className="projects-nav-btn projects-nav-next"
            onClick={() => move(1)}
            aria-label="Next project"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
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
