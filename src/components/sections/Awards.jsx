import React from 'react';
import './Awards.css';

const PUBLICATIONS = ['Raymonds', 'Bombay Times'];

export default function Awards({ awards }) {
  if (!awards?.length) return null;
  return (
    <section id="awards" className="awards-section">
      <h2 className="section-title">Awards &amp; Recognition</h2>
      <div className="gold-rule" />
      <div className="awards-grid">
        {awards.map(a => (
          <div key={a.id} className="award-card">
            <div className="award-icon">{a.icon}</div>
            <h3>{a.title}</h3>
            <p className="award-org">{a.org}</p>
            <p className="award-year">{a.year}</p>
            <p>{a.description}</p>
          </div>
        ))}
      </div>
      <div className="publications-strip">
        <p className="pub-label">Publications &amp; Features</p>
        <div className="pub-logos">
          {PUBLICATIONS.map(p => <span key={p} className="pub-logo">{p}</span>)}
        </div>
      </div>
    </section>
  );
}
