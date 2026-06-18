import React from 'react';
import './Education.css';

export default function Education({ education }) {
  if (!education?.length) return null;
  return (
    <section id="education" className="edu-section">
      <h2 className="section-title">Education</h2>
      <div className="gold-rule" />
      <div className="timeline">
        {education.map(item => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-year">
              {item.years.split('–')[0]}–<br />{item.years.split('–')[1]}
            </div>
            <div className="timeline-dot-col"><div className="timeline-dot" /></div>
            <div className="timeline-card">
              <h3>{item.institution}</h3>
              <p className="degree">{item.degree}</p>
              <div className="coursework">
                {item.coursework.map(c => <span key={c} className="timeline-tag">{c}</span>)}
              </div>
              <ul className="achievements">
                {item.achievements.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
