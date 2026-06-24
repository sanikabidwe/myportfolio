import React from 'react';
import './About.css';

export default function About({ profile }) {
  if (!profile) return null;
  const { about, heroImage, aboutImage } = profile;
  const photo = aboutImage || heroImage; // use aboutImage if set, fallback to heroImage

  return (
    <section id="about" className="about-section">
      {/* Section title sits above the two-column grid */}
      <div className="about-section-header">
        <h2 className="section-title">About</h2>
        <div className="gold-rule" />
      </div>

      <div className="about-inner">

        {/* Left — sticky profile photo */}
        <div className="about-photo-col">
          {photo
            ? <img src={photo} alt="Saanika Bidwe" className="about-photo" />
            : <div className="about-photo about-photo-placeholder">Editorial Portrait</div>
          }
        </div>

        {/* Right — artistic typographic layout */}
        <div className="about-text-col">
          {/* Decorative ghost open-quote */}
          <span className="about-open-mark">&ldquo;</span>

          {/* Big italic quote with highlighted word */}
          <p className="about-quote-big">
            Through design, I seek to transform<br />
            stories, emotions, and ideas into<br />
            <em>meaningful</em> fashion experiences<br />
            that balance creativity, craftsmanship,<br />
            and contemporary aesthetics.
          </p>

          {/* Gold rule separator */}
          <div className="about-rule" />

          {/* Two-column tiny bio (museum placard style) */}
          <div className="about-bio-block">
            {about.bio.slice(0, 2).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Aspiration line */}
          <p className="about-aspiration-tag">{about.aspiration}</p>
        </div>

      </div>
    </section>
  );
}
