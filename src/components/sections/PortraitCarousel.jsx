import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PortraitCarousel.css';

export default function PortraitCarousel({ slides }) {
  const navigate = useNavigate();

  if (!slides?.length) return null;

  // Only show first 4
  const cards = slides.slice(0, 4);

  return (
    <div className="pc-section">
      <div className="pc-inner">
        {/* Centred title — matches all other sections */}
        <h2 className="section-title">Projects</h2>
        <div className="gold-rule" />

        <div className="pc-grid">
          {cards.map(slide => (
            <div
              key={slide.id}
              className="pc-card"
              onClick={() =>
                slide.collectionSlug
                  ? navigate(`/collection/${slide.collectionSlug}`)
                  : navigate('/work')
              }
            >
              <div
                className="pc-card-inner"
                style={{
                  background: slide.image
                    ? `url(${slide.image}) center/cover no-repeat`
                    : slide.gradient
                }}
              />
              <div className="pc-card-overlay">
                <p className="pc-card-title">{slide.title}</p>
                <p className="pc-card-tag">{slide.tag}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "View All Work" sits below grid, aligned to the right */}
        <div className="pc-footer">
          <button className="pc-view-all" onClick={() => navigate('/work')}>
            View All Work ›
          </button>
        </div>
      </div>
    </div>
  );
}
