import React, { useState, useEffect, useRef } from 'react';
import './LandscapeCarousel.css';

const DURATION = 2500;

export default function LandscapeCarousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(null);
  const [progressKey, setProgressKey] = useState(0);
  const currentRef = useRef(0);
  const timerRef = useRef(null);

  // Keep ref in sync so interval closure always has the latest value
  currentRef.current = current;

  function activate(next, total) {
    const prev = currentRef.current;
    if (prev === next) return;
    setExiting(prev);
    setTimeout(() => setExiting(null), 900);
    setCurrent(next);
    setProgressKey(k => k + 1);
  }

  useEffect(() => {
    if (!slides?.length) return;

    const total = slides.length;

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % total;
      activate(next, total);
    }, DURATION);

    return () => clearInterval(timerRef.current);
  }, [slides]); // re-run only when slides actually change

  const goTo = (i) => {
    if (!slides?.length) return;
    clearInterval(timerRef.current);
    activate(i, slides.length);
    const total = slides.length;
    timerRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % total;
      activate(next, total);
    }, DURATION);
  };

  // Don't render until slides are loaded
  if (!slides?.length) return null;

  return (
    <div className="lc-section">
      {/* <span className="lc-label">Editorial — Professional Photography</span> */}
      <div className="lc-slides-wrap">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={[
              'lc-slide',
              i === current ? 'active' : '',
              i === exiting ? 'exiting' : ''
            ].filter(Boolean).join(' ')}
          >
            <div
              className="lc-slide-inner"
              style={{
                background: slide.image
                  ? `url(${slide.image}) center/cover no-repeat`
                  : slide.gradient
              }}
            />
            <span className="lc-caption">{slide.caption}</span>
          </div>
        ))}
      </div>
      <div className="lc-vignette" />
      <div className="lc-counter">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
      <div className="lc-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`lc-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <div className="lc-progress-bar">
        <div key={progressKey} className="lc-progress-fill running" />
      </div>
    </div>
  );
}
