import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PortraitCarousel.css';

const CARD_W = 300;
const GAP = 16;
const STEP = CARD_W + GAP;

export default function PortraitCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const trackRef = useRef(null);
  const outerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!outerRef.current || !slides?.length) return;
    const outerW = outerRef.current.offsetWidth;
    const visible = Math.max(1, Math.floor((outerW - 120) / STEP));
    setMaxIndex(Math.max(0, slides.length - visible));
  }, [slides]);

  const update = (newIndex) => {
    setIndex(newIndex);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newIndex * STEP}px)`;
    }
  };

  if (!slides?.length) return null;

  return (
    <div className="pc-section">
      <div className="pc-header">
        <div className="pc-header-left">
          <p className="section-label">Selected Work</p>
          <h2 className="pc-title">Client Projects</h2>
          <p className="pc-sub">Click any project to explore the full case study</p>
        </div>
        <button className="pc-view-all" onClick={() => navigate('/work')}>View All Work ›</button>
      </div>
      <div className="pc-carousel-wrap">
        <button
          className={`pc-arrow-btn pc-arrow-prev${index === 0 ? ' disabled' : ''}`}
          onClick={() => index > 0 && update(index - 1)}
          aria-label="Previous"
        >←</button>
        <div className="pc-track-outer" ref={outerRef}>
          <div className="pc-track" ref={trackRef}>
            {slides.map(slide => (
              <div
                key={slide.id}
                className="pc-card"
                onClick={() => navigate('/work')}
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
        </div>
        <button
          className={`pc-arrow-btn pc-arrow-next${index >= maxIndex ? ' disabled' : ''}`}
          onClick={() => index < maxIndex && update(index + 1)}
          aria-label="Next"
        >→</button>
      </div>
    </div>
  );
}
