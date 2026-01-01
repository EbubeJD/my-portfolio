import { SOCIALS } from "../data/socials";
import { isMailto } from "../utils/links";

export default function HeroSection() {
  return (
    <section className="snap-section hero">
      <div className="hero-row">
        <img className="avatar" src="/images/MEEEE.webp" alt="Profile" draggable={false} />

        <div className="hero-text">
          <h1 className="name">
            Ebubechukwu <br /> Jack-Davies
          </h1>

          <div className="sub">
            <p>Computer Science Graduate Student · Class of 2026</p>
          </div>

          <p className="about">
            I'm a student focused on <b>machine learning</b> and <b>applied data systems</b>, 
            with experience in <b>ML/AI modeling and simulation</b>, large-scale <b>data analysis</b> and <b>visualization</b>, and <b>software development</b> using <b>Python</b>, <b>SQL</b>, and <b>C#</b>. 
            I care about clarity, maintainability, and building systems that make complex data easier to reason about.
          </p>

          <div className="social">
            {SOCIALS.map((s) => {
              const mail = isMailto(s.href);
              return (
                <a
                  key={s.label}
                  className="icon-btn"
                  href={s.href}
                  aria-label={s.label}
                  target={mail ? undefined : "_blank"}
                  rel={mail ? undefined : "noreferrer"}
                >
                  <img src={s.iconSrc} alt="" draggable={false} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
