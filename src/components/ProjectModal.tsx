import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/projects";

const LINK_ICONS = {
  github: "/icons/line-github.svg",
  live: "/icons/line-external-link.svg",
  demo: "/icons/line-link.svg",
  table: "/icons/line-table.svg",
  dataset: "/icons/line-link.svg",
} as const;

function getFocusable(root: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const images = useMemo(() => project.images ?? [], [project.images]);
  const hasImages = images.length > 0;
  const isCarousel = images.length > 1;

  const [index, setIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [project.title]);

  const closeWithAnim = () => {
    setOpen(false);
    window.setTimeout(() => {
      onClose();
      lastFocusRef.current?.focus({ preventScroll: true });
    }, 200);
  };

  const goPrev = () => {
    if (!isCarousel) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (!isCarousel) return;
    setIndex((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    if (!hasImages) return;

    setImgLoaded(false);

    const src = images[index]?.src;
    if (!src) return;

    let cancelled = false;

    const img: HTMLImageElement = new Image();
    img.src = src;

    const done = () => {
      if (!cancelled) setImgLoaded(true);
    };

    const onLoad = () => done();
    const onError = () => done();

    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    if (typeof img.decode === "function") {
      img.decode().then(done).catch(done);
    }

    return () => {
      cancelled = true;
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [hasImages, images, index]);


  useEffect(() => {
    if (images.length < 2) return;

    const preload = (i: number) => {
      const src = images[i]?.src;
      if (!src) return;
      const im = new Image();
      im.src = src;
    };

    const next = (index + 1) % images.length;
    const prev = (index - 1 + images.length) % images.length;

    preload(next);
    preload(prev);
  }, [images, index]);

  useEffect(() => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeWithAnim();
        return;
      }

      if (hasImages && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        if (e.key === "ArrowLeft") goPrev();
        else goNext();
        return;
      }

      if (e.key === "Tab" && cardRef.current) {
        const focusable = getFocusable(cardRef.current);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const id = requestAnimationFrame(() => setOpen(true));
    setTimeout(() => cardRef.current?.focus({ preventScroll: true }), 0);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [hasImages, isCarousel, images.length]);

  return createPortal(
    <div
      className={`pm-backdrop ${open ? "pm-open" : ""}`}
      onMouseDown={closeWithAnim}
      role="presentation"
    >
      <div
        className={`pm-card ${open ? "pm-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        tabIndex={-1}
        ref={cardRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="pm-close"
          type="button"
          onClick={closeWithAnim}
          aria-label="Close"
        >
          ×
        </button>

        <h3 className="pm-title">{project.title}</h3>
        <h4 className="pm-sub">{project.subtitle}</h4>

        <div className="pm-tech">
          {project.tech.map((t) => (
            <span key={t} className="p-pill">
              {t}
            </span>
          ))}
        </div>

        {hasImages && (
          <div className="pm-carousel" aria-label="Project images">
            <div
              className={`pm-carousel-frame ${imgLoaded ? "is-loaded" : ""}`}
              style={{ ["--pm-img" as any]: `url("${images[index].src}")` }}
            >
              <img
                key={images[index].src}
                className="pm-carousel-img"
                src={images[index].src}
                alt={images[index].alt}
                draggable={false}
                loading="eager"
                decoding="async"
                onLoad={() => setImgLoaded(true)}
              />

              {isCarousel && (
                <>
                  <button
                    type="button"
                    className="pm-car-btn pm-car-prev"
                    onClick={goPrev}
                    aria-label="Previous image"
                    title="Previous"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="pm-car-btn pm-car-next"
                    onClick={goNext}
                    aria-label="Next image"
                    title="Next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {isCarousel && (
              <div className="pm-dots" role="tablist" aria-label="Choose image">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`pm-dot ${i === index ? "is-active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Image ${i + 1} of ${images.length}`}
                    aria-pressed={i === index}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <p className="pm-text">{project.longDescription}</p>

        {project.links && (
          <div className="pm-links">
            {project.links.github && (
              <a
                className="pm-icon-btn"
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <img src={LINK_ICONS.github} alt="" />
              </a>
            )}

            {project.links.live && (
              <a
                className="pm-icon-btn"
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                aria-label="Live site"
                title="Live site"
              >
                <img src={LINK_ICONS.live} alt="" />
              </a>
            )}

            {project.links.demo && (
              <a
                className="pm-icon-btn"
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                aria-label="Demo"
                title="Demo"
              >
                <img src={LINK_ICONS.demo} alt="" />
              </a>
            )}

            {project.links.table && (
              <a
                className="pm-icon-btn"
                href={project.links.table}
                target="_blank"
                rel="noreferrer"
                aria-label="Tableau"
                title="Tableau"
              >
                <img src={LINK_ICONS.table} alt="" />
              </a>
            )}

            {project.links.dataset && (
              <a
                className="pm-icon-btn"
                href={project.links.dataset}
                target="_blank"
                rel="noreferrer"
                aria-label="Dataset"
                title="Dataset"
              >
                <img src={LINK_ICONS.dataset} alt="" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
