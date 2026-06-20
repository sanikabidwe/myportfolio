import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ profile }) {
  const videoRef = useRef(null);

  // Trigger play once the video element is mounted AND profile data is available
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    vid.play().catch(() => { });
  }, [profile?.heroVideo]); // re-run when the URL arrives

  if (!profile) return null;

  return (
    <section id="home" className="hero">
      {/* Background video */}
      {profile.heroVideo && (
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={profile.heroVideo} type="video/mp4" />
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
