import React from 'react';
import './About.css';

export default function About({ profile }) {
  if (!profile) return null;
  const { about, aboutImage } = profile;
  return (
    <section id="about" className="about-section">
      <p className="section-label" style={{ textAlign: 'center' }}>About</p>
      <div className="about-inner">
        <div className="about-left">
          <blockquote className="about-quote">"{about.quote}"</blockquote>
          <div className="about-photo-small img-placeholder">
            {aboutImage
              ? <img src={aboutImage} alt="Sanika Sharma" />
              : 'Editorial Photo'
            }
          </div>
        </div>
        <div className="about-content">
          {about.bio.map((para, i) => <p key={i}>{para}</p>)}
          <p className="about-aspiration">{about.aspiration}</p>
        </div>
      </div>
    </section>
  );
}
