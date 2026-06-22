import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const isCollection = location.pathname.startsWith('/collection/');

  // Pages with a dark full-screen hero (Home, Collection detail) start transparent.
  // Work and Contact are plain light pages — always solid so elements are always visible.
  const isSolid = (!isHome && !isCollection) || scrolled;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar${isSolid ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        S<span className="nav-logo-sup">b</span>
      </Link>

      {/* Desktop links */}
      <ul className="nav-links">
        <li><Link to="/" className={isHome ? 'active' : ''}>Home</Link></li>
        {/* <li><a href={isHome ? '#education' : '/#education'}>Education</a></li>
        <li><a href={isHome ? '#experience' : '/#experience'}>Experience</a></li> */}
        <li><Link to="/work" className={location.pathname === '/work' ? 'active' : ''}>Work</Link></li>
        <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
      </ul>

      {/* Hamburger button */}
      <button
        className={`nav-hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      <div className={`nav-mobile-drawer${menuOpen ? ' open' : ''}`}>
        <ul className="nav-mobile-links">
          <li><Link to="/" className={isHome ? 'active' : ''} onClick={closeMenu}>Home</Link></li>
          {/* <li><a href={isHome ? '#education' : '/#education'} onClick={closeMenu}>Education</a></li>
          <li><a href={isHome ? '#experience' : '/#experience'} onClick={closeMenu}>Experience</a></li> */}
          <li><Link to="/work" className={location.pathname === '/work' ? 'active' : ''} onClick={closeMenu}>Work</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
