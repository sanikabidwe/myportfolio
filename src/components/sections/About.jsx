import React from 'react';
import './About.css';

export default function About({ profile }) {
  if (!profile) return null;
  const { about, heroImage, aboutImage } = profile;
  const photo = aboutImage || heroImage; // use aboutImage if set, fallback to heroImage

  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About</h2>
      <div className="gold-rule" />
      <div className="about-inner">

        {/* Left — profile photo */}
        <div className="about-photo-col">
          {photo
            ? <img src={photo} alt="Saanika Bidwe" className="about-photo" />
            : <div className="about-photo about-photo-placeholder">Editorial Portrait</div>
          }
        </div>

        {/* Right — quote + bio */}
        <div className="about-content">
          <blockquote className="about-quote">"{about.quote}"</blockquote>
          {about.bio.map((para, i) => <p key={i}>{para}</p>)}
          <p className="about-aspiration">{about.aspiration}</p>
        </div>

      </div>
    </section>
  );
}
