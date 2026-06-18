import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ profile }) {
  if (!profile) return null;
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <h1 className="hero-name">
            {profile.name.split(' ')[0]}<br />{profile.name.split(' ')[1]}
          </h1>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-btns">
            <Link to="/contact" className="btn btn-gold">Contact Me</Link>
          </div>
        </div>
        <div className="hero-img">
          {profile.heroImage
            ? <img src={profile.heroImage} alt="Saanika Bidwe" className="hero-photo" />
            : (
              <div className="hero-img-placeholder">
                <span className="hero-img-caption">Editorial Portrait</span>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
