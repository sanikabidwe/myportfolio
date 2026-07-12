import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CollectionDetail.css';

/**
 * CollectionDetail
 * ----------------
 * Receives a single `collection` object (from collections.json) and renders
 * the full editorial page: hero → intro → concept board → look cards →
 * full lineup → back/next nav.
 *
 * All content is driven by props — the same component handles Noorani,
 * Adirath, Entangled Souls, and any future collection.
 */
export default function CollectionDetail({ collection }) {
  const navigate = useNavigate();

  /* ── slider lightbox state ───────────────────────────────── */
  const [lb, setLb] = useState({ open: false, images: [], index: 0, alt: '' });

  /* open / close */
  const openLb = (look) => {
    // Build image array: prefer look.images[], fall back to [look.image]
    const imgs = (look.images && look.images.length > 0 ? look.images : [look.image]).filter(Boolean);
    if (imgs.length === 0) return;
    setLb({ open: true, images: imgs, index: 0, alt: look.name });
  };
  const closeLb = () => setLb({ open: false, images: [], index: 0, alt: '' });

  /* clamped slide navigation — non-circular, matches Project Modal pattern */
  const lbSlide = (dir) => {
    setLb(prev => ({
      ...prev,
      index: Math.max(0, Math.min(prev.images.length - 1, prev.index + dir)),
    }));
  };

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e) => {
      if (!lb.open) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') lbSlide(-1);
      if (e.key === 'ArrowRight') lbSlide(1);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [lb.open]); // eslint-disable-line react-hooks/exhaustive-deps

  /* lock body scroll when lb open */
  useEffect(() => {
    document.body.style.overflow = lb.open ? 'hidden' : '';
  }, [lb.open]);

  /* scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!collection) return null;

  const {
    title, eyebrow, heroImage,
    metaDesigner, metaLooks, metaCategory, metaYear,
    conceptQuote, conceptBody, conceptRight, pills,
    conceptBoardSubtitle, conceptBoardImage, overviewSubtitle,
    looks, lineupLabel, lineupTitle, lineupSubtitle, lineupImage,
    nextSlug, nextTitle,
  } = collection;

  /* split title into normal + italic last-word for the Noorani-style split */
  const titleParts = title.split(/\s+/);
  const titleHead = titleParts.slice(0, -1).join(' ');
  const titleTail = titleParts[titleParts.length - 1];

  /* derived slider values */
  const lbTotal = lb.images.length;
  const lbIndex = lb.index;
  const lbAtFirst = lbIndex === 0;
  const lbAtLast = lbIndex === lbTotal - 1;

  return (
    <>
      {/* ══════════════════ HERO ═══════════════════════════════ */}
      <section className="cd-hero">
        <div className="cd-hero__bg">
          {heroImage && (
            <img className="cd-hero__bg-img" src={heroImage} alt="" aria-hidden="true" />
          )}
        </div>

        <div className="cd-hero__content">
          <p className="cd-hero__eyebrow">{eyebrow}</p>
          <h1 className="cd-hero__title">
            {titleHead ? <>{titleHead} <em>{titleTail}</em></> : <em>{titleTail}</em>}
          </h1>
          <div className="cd-hero__meta">
            <div className="cd-hero__meta-item">
              Collection<span>{metaLooks}</span>
            </div>
            <div className="cd-hero__divider" />
            <div className="cd-hero__meta-item">
              Category<span>{metaCategory}</span>
            </div>
            <div className="cd-hero__divider" />
            <div className="cd-hero__meta-item">
              Year<span>{metaYear}</span>
            </div>
          </div>
        </div>

        <div className="cd-scroll-hint" aria-hidden="true">
          <div className="cd-scroll-line" />
          Scroll
        </div>
      </section>

      {/* ══════════════════ INTRO ══════════════════════════════ */}
      <div className="cd-intro">
        <div className="cd-intro__left">
          <p className="cd-intro__label">The Concept</p>
          <blockquote className="cd-intro__quote">{conceptQuote}</blockquote>
          <p
            className="cd-intro__body"
            dangerouslySetInnerHTML={{ __html: conceptBody }}
          />
        </div>
        <div className="cd-intro__right">
          {conceptRight.map((para, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
          ))}
          {pills?.length > 0 && (
            <div className="cd-pills">
              {pills.map(p => <span className="cd-pill" key={p}>{p}</span>)}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════ CONCEPT BOARD ══════════════════════ */}
      <section className="cd-concept">
        <div className="cd-concept__inner">
          <p className="cd-section-label">Mood &amp; Research</p>
          <h2 className="cd-section-title">Concept Board</h2>
          <p className="cd-section-subtitle">{conceptBoardSubtitle}</p>
          <div className="cd-gold-divider" />
          <div className="cd-concept-board">
            {conceptBoardImage ? (
              <img
                className="cd-concept-board__img"
                src={conceptBoardImage}
                alt={`${title} concept board`}
              />
            ) : (
              <div className="cd-concept-board__placeholder">
                Concept Board · Coming Soon
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════ COLLECTION OVERVIEW HEADER ═════════ */}
      <section className="cd-overview">
        <div className="cd-overview__inner">
          <p className="cd-section-label">The Looks</p>
          <h2 className="cd-section-title">Full Collection</h2>
          <p className="cd-section-subtitle">{overviewSubtitle}</p>
        </div>
      </section>

      {/* ══════════════════ LOOK CARDS ═════════════════════════ */}
      <section className="cd-looks">
        <div className="cd-looks__inner">
          {looks.length === 0 ? (
            <div className="cd-coming-soon">
              <p>Looks are being photographed — check back soon.</p>
            </div>
          ) : (
            looks.map((look) => (
              <div className="cd-look-card" key={look.number}>
                {/* Image side */}
                <div
                  className="cd-look-card__image"
                  onClick={() => look.image && openLb(look)}
                >
                  {look.image ? (
                    <>
                      <img
                        className="cd-look-card__img"
                        src={look.image}
                        alt={`Look ${look.number} — ${look.name}`}
                      />
                      {/* Hover overlay — signals the image is clickable */}
                      <div className="cd-look-card__view-overlay" aria-hidden="true">
                        <div className="cd-look-card__view-icon" />
                        <span className="cd-look-card__view-label">View</span>
                      </div>
                    </>
                  ) : (
                    <div className="cd-look-card__placeholder">
                      <span className="cd-look-card__placeholder-num">{look.number}</span>
                      <span className="cd-look-card__placeholder-label">Image coming soon</span>
                    </div>
                  )}
                </div>

                {/* Text side */}
                <div className="cd-look-card__content">
                  {/* Decorative background number — absolutely positioned, out of flow */}
                  <span className="cd-look-card__number" aria-hidden="true">{look.number}</span>
                  <p className="cd-look-card__label">Look {look.number}</p>
                  <h3 className="cd-look-card__name">{look.name}</h3>
                  <p
                    className="cd-look-card__desc"
                    dangerouslySetInnerHTML={{ __html: look.description }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ══════════════════ FULL LINEUP ════════════════════════ */}
      <section className="cd-lineup">
        <div className="cd-lineup__inner">
          <p className="cd-section-label">{lineupLabel}</p>
          <h2 className="cd-section-title">{lineupTitle}</h2>
          <p className="cd-section-subtitle">{lineupSubtitle}</p>
          <div className="cd-gold-divider" />
          {lineupImage ? (
            <img
              className="cd-lineup__img"
              src={lineupImage}
              alt={`${title} — full lineup`}
            />
          ) : (
            <div className="cd-lineup__placeholder">
              Full Lineup · Coming Soon
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ SLIDER LIGHTBOX ════════════════════ */}
      <div
        id="cd-lb-overlay"
        className={`cd-lb-overlay${lb.open ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target.id === 'cd-lb-overlay') closeLb();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        {/* Left arrow */}
        <button
          className={`cd-lb-arrow cd-lb-arrow--prev${lbAtFirst ? ' disabled' : ''}`}
          onClick={() => lbSlide(-1)}
          aria-label="Previous image"
          disabled={lbAtFirst}
        >
          &#8592;
        </button>

        {/* Image container */}
        <div className="cd-lb-container">
          {lb.open && (
            <img
              key={lbIndex}
              className="cd-lb-img"
              src={lb.images[lbIndex]}
              alt={`${lb.alt} — ${lbIndex + 1} of ${lbTotal}`}
            />
          )}
        </div>

        {/* Right arrow */}
        <button
          className={`cd-lb-arrow cd-lb-arrow--next${lbAtLast ? ' disabled' : ''}`}
          onClick={() => lbSlide(1)}
          aria-label="Next image"
          disabled={lbAtLast}
        >
          &#8594;
        </button>

        {/* Close button */}
        <button className="cd-lb-close" onClick={closeLb} aria-label="Close image viewer">
          &#x2715;
        </button>

        {/* Slide counter */}
        {lbTotal > 1 && (
          <span className="cd-lb-counter">
            {String(lbIndex + 1).padStart(2, '0')} / {String(lbTotal).padStart(2, '0')}
          </span>
        )}
      </div>
    </>
  );
}

