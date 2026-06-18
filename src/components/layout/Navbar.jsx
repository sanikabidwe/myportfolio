import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <Link to="/" className="nav-logo">
        S<span className="nav-logo-sup">s</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/" className={isHome ? 'active' : ''}>Home</Link></li>
        <li><a href={isHome ? '#education' : '/#education'}>Education</a></li>
        <li><a href={isHome ? '#experience' : '/#experience'}>Experience</a></li>
        <li><Link to="/work" className={location.pathname === '/work' ? 'active' : ''}>Work</Link></li>
        <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
      </ul>
    </nav>
  );
}
