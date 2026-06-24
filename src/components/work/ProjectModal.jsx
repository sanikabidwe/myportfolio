import React, { useEffect, useRef, useState } from 'react';
import './ProjectModal.css';

/**
 * ProjectModal
 * ------------
 * Renders the editorial two-column project detail modal.
 * Props:
 *   project  — the full project object (from projects.json), or null when closed
 *   onClose  — callback to close the modal
 *
 * Image rendering:
 *   All images are shown via <img> with max-width/max-height: 100% and auto dimensions.
 *   This preserves the natural aspect ratio of every image (800×1000, 1920×1080, any size),
 *   scales it to fit within the panel, and centers it — no clipping, no distortion.
 *   The dark charcoal background fills any remaining space around the image.
 */
export default function ProjectModal({ project, onClose }) {
  const [slide, setSlide] = useState(0);
  const overlayRef = useRef(null);

  /* Reset slide index whenever a new project opens */
  useEffect(() => {
    setSlide(0);
  }, [project]);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  /* Keyboard: Escape closes, arrows navigate slides */
  useEffect(() => {
    if (!project) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  });

  if (!project) return null;

  /* Build slides: use modalImages array if present, otherwise fall back to gradient */
  const slides = (project.modalImages && project.modalImages.length > 0)
    ? project.modalImages.map(img => ({ type: 'image', src: img }))
    : (project.modalGradients || [project.gradient || 'linear-gradient(135deg,#2A2520 0%,#1C1810 100%)']).map(g => ({ type: 'gradient', src: g }));

  const total = slides.length;

  const prevSlide = () => setSlide(s => Math.max(0, s - 1));
  const nextSlide = () => setSlide(s => Math.min(total - 1, s + 1));

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  /* Build description: use modalDescription if available, else fall back to description */
  const desc = project.modalDescription || project.description || '';

  /* Tags: use modalTags if available */
  const tags = project.modalTags || [];

  return (
    <div
      className="pm-overlay open"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
    >
      <div className="pm-modal">

        {/* ── LEFT: sticky image gallery ── */}
        <div className="pm-gallery">
          <div className="pm-slides">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`pm-slide${i === slide ? ' active' : ''}`}
                style={s.type === 'gradient' ? { background: s.src } : {}}
              >
                {s.type === 'image' && (
                  <img
                    src={s.src}
                    alt=""
                    className="pm-slide-img"
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </div>

          {total > 1 && (
            <>
              <button
                className="pm-arrow pm-arrow-prev"
                onClick={prevSlide}
                disabled={slide === 0}
                aria-label="Previous image"
              >&#8592;</button>
              <button
                className="pm-arrow pm-arrow-next"
                onClick={nextSlide}
                disabled={slide === total - 1}
                aria-label="Next image"
              >&#8594;</button>
              <div className="pm-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`pm-dot${i === slide ? ' active' : ''}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
              <span className="pm-counter">{slide + 1} / {total}</span>
            </>
          )}
        </div>

        {/* ── RIGHT: content ── */}
        <div className="pm-content">
          <p className="pm-eyebrow">{project.category} · {project.year}</p>
          <h2
            className="pm-title"
            dangerouslySetInnerHTML={{ __html: project.modalTitle || project.title }}
          />

          <div className="pm-meta-row">
            <div className="pm-meta-item">
              Year<span>{project.year}</span>
            </div>
            <div className="pm-meta-divider" />
            <div className="pm-meta-item">
              Category<span>{project.category}</span>
            </div>
          </div>

          <p className="pm-desc-label">About this project</p>
          <p
            className="pm-desc"
            dangerouslySetInnerHTML={{ __html: desc.replace(/\n\n/g, '<br><br>') }}
          />

          {tags.length > 0 && (
            <div className="pm-tags">
              {tags.map(t => <span className="pm-tag" key={t}>{t}</span>)}
            </div>
          )}
        </div>

        {/* Close button */}
        <button className="pm-close" onClick={onClose} aria-label="Close project">&#x2715;</button>
      </div>
    </div>
  );
}
