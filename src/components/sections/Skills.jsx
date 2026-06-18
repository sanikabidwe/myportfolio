import React from 'react';
import './Skills.css';

function SkillGroup({ title, skills }) {
  return (
    <div className="skill-group">
      <h3>{title}</h3>
      {skills.map(s => (
        <div key={s.name} className="skill-item">
          <div className="skill-meta">
            <span className="skill-name">{s.name}</span>
            <span className="skill-pct">{s.pct}%</span>
          </div>
          <div className="skill-bar">
            <div className="skill-fill" style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills({ skills }) {
  if (!skills) return null;
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Skills &amp; Expertise</h2>
      <div className="gold-rule" />
      <div className="skills-grid">
        <SkillGroup title="Fashion Design" skills={skills.fashionDesign} />
        <SkillGroup title="Software" skills={skills.software} />
        <SkillGroup title="Creative" skills={skills.creative} />
      </div>
    </section>
  );
}
