import React, { useState } from 'react';
import './Testimonials.css';

export default function Testimonials({ testimonials }) {
  const [current, setCurrent] = useState(0);
  if (!testimonials?.length) return null;
  const t = testimonials[current];
  const prev = () => setCurrent(i => Math.max(0, i - 1));
  const next = () => setCurrent(i => Math.min(testimonials.length - 1, i + 1));
  const isFirst = current === 0;
  const isLast = current === testimonials.length - 1;

  return (
    <section id="testimonials" className="testi-section">
      <h2 className="section-title">What They Say</h2>
      <div className="gold-rule" />
      <div className="testi-inner">
        <span className="testi-quote-mark">"</span>
        <div className="testi-card">
          <p className="testi-text">{t.quote}</p>
          <div className="testi-avatar">{t.initials}</div>
          <p className="testi-name">{t.name}</p>
          <p className="testi-role">{t.role}</p>
        </div>
        <div className="testi-dots">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`testi-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        {testimonials.length > 1 && (
          <div className="testi-arrows">
            <div className={`testi-arrow${isFirst ? ' disabled' : ''}`} onClick={isFirst ? undefined : prev}>←</div>
            <div className={`testi-arrow${isLast ? ' disabled' : ''}`} onClick={isLast ? undefined : next}>→</div>
          </div>
        )}
      </div>
    </section>
  );
}
