import React from 'react';
import './WorkCard.css';

export default function WorkCard({ project }) {
  const bg = project.image
    ? `url(${project.image}) center/cover no-repeat`
    : project.gradient;

  if (project.type === 'described') {
    return (
      <div className={`work-card ${project.gridClass} described-card`}>
        <div className="described-photo" style={{ background: bg, position: 'relative' }}>
          <span className="ph-label">{project.title}</span>
        </div>
        <div className="described-body">
          <h3>{project.title}</h3>
          <p className="card-meta">{project.year} &nbsp;·&nbsp; {project.category}</p>
          <p>{project.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`work-card ${project.gridClass}`} style={{ background: bg, position: 'relative' }}>
      <div className="card-overlay">
        <p className="card-hover-title">{project.title}</p>
        <p className="card-hover-tag">{project.category} · {project.year}</p>
      </div>
      <span className="ph-label">{project.title}</span>
    </div>
  );
}
