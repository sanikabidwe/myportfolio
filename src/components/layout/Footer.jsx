import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">Sanika Bidwe © 2026</span>
        <ul className="footer-nav">
          <li><Link to="/">Home</Link></li>
          <li><a href="/#education">Education</a></li>
          <li><a href="/#experience">Experience</a></li>
          <li><Link to="/work">Work</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <span
          className="footer-scroll"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Back to Top
        </span>
      </div>
    </footer>
  );
}
