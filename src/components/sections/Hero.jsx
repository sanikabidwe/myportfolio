import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

/** Returns true when the viewport is ≤768px wide, and updates on resize. */
function useMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return isMobile;
}

export default function Hero({ profile }) {
  const videoRef = useRef(null);
  const isMobile = useMobile();

  // Pick the right video URL:
  // - mobile → heroVideoPortrait (fall back to heroVideo if not set yet)
  // - desktop → heroVideo
  const videoSrc = isMobile
    ? (profile?.heroVideoPortrait || profile?.heroVideo)
    : profile?.heroVideo;

  // Reload + play whenever the resolved video URL changes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !videoSrc) return;
    vid.load();
    vid.play().catch(() => {});
  }, [videoSrc]);

  if (!profile) return null;

  return (
    <section id="home" className="hero">
      {/* Background video */}
      {videoSrc && (
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay so text stays readable */}
      <div className="hero-overlay" />

      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">{profile.tagline}</p>
          <h1 className="hero-name">
            {profile.name.split(' ')[0]}<br />{profile.name.split(' ')[1]}
          </h1>
          <div className="hero-btns">
            {/* <Link to="/work" className="btn btn-hero-outline">View Work</Link> */}
            <Link to="/contact" className="btn btn-hero-gold">Contact Me</Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue">
        <span className="hero-scroll-line" />
        <span className="hero-scroll-label">Scroll</span>
      </div>
    </section>
  );
}
