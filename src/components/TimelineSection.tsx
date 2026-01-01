import { TIMELINE, type TimelineItem } from "../data/timeline";
import { kindIcon } from "../utils/icons";
import { useEffect } from "react";

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <div className="t-card">
      <div className="t-top">
        <h3 className="t-title">{item.title}</h3>
        <span className="t-date">{item.date}</span>
      </div>

      <p className="t-org">{item.org}</p>

      <ul className="t-bullets">
        {item.bullets.map((b, i) => (
          <li key={i}>{renderBold(b)}</li>
        ))}
      </ul>
    </div>
  );
}

function renderBold(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}


export default function TimelineSection() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".t-item"));

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

    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section className="snap-section timeline">
      <div className="timeline-inner">
        <h2 className="h2">Experience</h2>

        <div className="timeline-rail">
          {TIMELINE.map((item, idx) => {
            const side = idx % 2 === 0 ? "left" : "right";

            return (
              <article key={`${item.title}-${idx}`} className="t-item">
                <div className="t-col left-col">{side === "left" ? <TimelineCard item={item} /> : <div />}</div>

                <div className="t-col center-col">
                  <div className="t-node" title={item.kind}>
                    <img src={kindIcon(item.kind)} alt="" draggable={false} />
                  </div>
                </div>

                <div className="t-col right-col">{side === "right" ? <TimelineCard item={item} /> : <div />}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
