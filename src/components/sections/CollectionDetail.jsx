import React, { useEffect, useRef, useState } from 'react';
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

  /* ── lightbox state ─────────────────────────────── */
  const [lb, setLb] = useState({ open: false, src: '', alt: '' });
  const [lbScale, setLbScale] = useState(1);
  const [lbPos, setLbPos] = useState({ x: 0, y: 0 });
  const lbImgRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  /* open / close */
  const openLb = (src, alt) => { setLb({ open: true, src, alt }); setLbScale(1); setLbPos({ x: 0, y: 0 }); };
  const closeLb = () => setLb({ open: false, src: '', alt: '' });

  /* wheel zoom */
  const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setLbScale(s => Math.min(5, Math.max(1, s + delta * s)));
  };

  /* drag pan */
  const onMouseDown = (e) => {
    if (lbScale <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - lbPos.x, y: e.clientY - lbPos.y };
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    setLbPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };
  const onMouseUp = () => { isDragging.current = false; };

  /* keyboard close */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeLb(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

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
    looks, lineupTitle, lineupSubtitle, lineupImage,
    nextSlug, nextTitle,
  } = collection;

  /* split title into normal + italic last-word for the Noorani-style split */
  const titleParts = title.split(/\s+/);
  const titleHead = titleParts.slice(0, -1).join(' ');
  const titleTail = titleParts[titleParts.length - 1];

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
              Designer<span>{metaDesigner}</span>
            </div>
            <div className="cd-hero__divider" />
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
          <p className="cd-section-label">Mood & Research</p>
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
                  onClick={() => look.image && openLb(look.image, look.name)}
                >
                  {look.image ? (
                    <img
                      className="cd-look-card__img"
                      src={look.image}
                      alt={`Look ${look.number} — ${look.name}`}
                    />
                  ) : (
                    <div className="cd-look-card__placeholder">
                      <span className="cd-look-card__placeholder-num">{look.number}</span>
                      <span className="cd-look-card__placeholder-label">Image coming soon</span>
                    </div>
                  )}
                </div>

                {/* Text side */}
                <div className="cd-look-card__content">
                  <span className="cd-look-card__number">{look.number}</span>
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
          <p className="cd-section-label">The Full Lineup</p>
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

      {/* ══════════════════ BACK / NEXT BAR ════════════════════ */}
      <div className="cd-nav-bar">
        <div className="cd-nav-bar__inner">
          <button className="cd-back-link" onClick={() => navigate('/work')}>
            Back to All Work
          </button>
          {nextSlug && nextTitle && (
            <button
              className="cd-next-link"
              onClick={() => navigate(`/collection/${nextSlug}`)}
            >
              Next: {nextTitle}
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════ LIGHTBOX ═══════════════════════════ */}
      <div
        id="cd-lb-overlay"
        className={`cd-lb-overlay${lb.open ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target.id === 'cd-lb-overlay' || e.target.classList.contains('cd-lb-container'))
            closeLb();
        }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <div className="cd-lb-container">
          <img
            ref={lbImgRef}
            className="cd-lb-img"
            src={lb.src}
            alt={lb.alt}
            style={{
              transform: `translate(${lbPos.x}px, ${lbPos.y}px) scale(${lbScale})`,
            }}
          />
        </div>
        <button className="cd-lb-close" onClick={closeLb} aria-label="Close image viewer">
          &#x2715;
        </button>
        <span className="cd-lb-hint">Scroll to zoom &nbsp;·&nbsp; Drag to pan</span>
        <span className="cd-lb-zoom">{Math.round(lbScale * 100)}%</span>
      </div>
    </>
  );
}
