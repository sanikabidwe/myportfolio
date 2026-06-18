import React from 'react';
import './Experience.css';

export default function Experience({ experience }) {
  if (!experience?.length) return null;
  return (
    <section id="experience" className="exp-section">
      <h2 className="section-title">Experience</h2>
      <div className="gold-rule" />
      <div className="exp-timeline">
        {experience.map(item => (
          <div key={item.id} className="exp-item">
            {item.side === 'left' ? (
              <>
                <div className="exp-card exp-card-left">
                  <h3>{item.company}</h3>
                  <p className="exp-role">{item.role}</p>
                  <p className="exp-duration">{item.duration}</p>
                  <p>{item.description}</p>
                  <ul className="exp-achievements">
                    {item.achievements.map(a => <li key={a}>{a}</li>)}
                  </ul>
                </div>
                <div className="exp-dot-col"><div className="exp-dot" /></div>
                <div />
              </>
            ) : (
              <>
                <div />
                <div className="exp-dot-col"><div className="exp-dot" /></div>
                <div className="exp-card exp-card-right">
                  <h3>{item.company}</h3>
                  <p className="exp-role">{item.role}</p>
                  <p className="exp-duration">{item.duration}</p>
                  <p>{item.description}</p>
                  <ul className="exp-achievements">
                    {item.achievements.map(a => <li key={a}>{a}</li>)}
                  </ul>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
