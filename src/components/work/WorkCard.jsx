import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkCard.css';

const TILE_COUNT = 14; // matches the number of .tile-N classes in WorkCard.css

export default function WorkCard({ project, index, onOpenModal }) {
  const navigate = useNavigate();
  const tileClass = `tile-${index % TILE_COUNT}`;
  const bg = project.image
    ? `url(${project.image}) center/cover no-repeat`
    : project.gradient;

  const handleClick = () => {
    // Collection cards deep-link to their dedicated collection page
    if (project.collectionSlug) {
      navigate(`/collection/${project.collectionSlug}`);
      return;
    }
    // All other cards open the project modal
    if (onOpenModal) onOpenModal(project);
  };

  if (project.type === 'described') {
    return (
      <div
        className={`work-card ${tileClass} described-card`}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="described-photo" style={{ background: bg, position: 'relative', objectFit: "contain" }}>
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
    <div
      className={`work-card ${tileClass}${project.collectionSlug ? ' collection-card' : ''}`}
      style={{ background: bg, position: 'relative', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div className="card-overlay">
        <p className="card-hover-title">{project.title}</p>
        <p className="card-hover-tag">
          {project.category} · {project.year}
          {project.collectionSlug && <span className="collection-link-hint"> · View Collection →</span>}
        </p>
      </div>
      <span className="ph-label">{project.title}</span>
    </div>
  );
}
