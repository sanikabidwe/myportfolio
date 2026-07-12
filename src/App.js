import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/index.css';
import config from './settings/configs.json';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';
import CollectionPage from './pages/CollectionPage';
import { getProfile } from './services/api';
import { useState } from 'react';

/** Apply configs.json values as CSS custom properties on :root */
function applyTheme() {
  const root = document.documentElement;
  const { colors, typography, spacing } = config;

  // Colors
  root.style.setProperty('--off-white', colors.offWhite);
  root.style.setProperty('--charcoal', colors.charcoal);
  root.style.setProperty('--gold', colors.gold);
  root.style.setProperty('--gold-light', colors.goldLight);
  root.style.setProperty('--beige', colors.beige);
  root.style.setProperty('--beige-light', colors.beigeLight);
  root.style.setProperty('--beige-dark', colors.beigeDark);
  root.style.setProperty('--muted', colors.muted);

  // Typography
  root.style.setProperty('--font-display', typography.fontDisplay);
  root.style.setProperty('--font-hero', typography.fontHero);
  root.style.setProperty('--font-body', typography.fontBody);
  root.style.setProperty('--font-label', typography.fontLabel);
  root.style.setProperty('--font-sans', typography.fontSans);

  // Spacing
  root.style.setProperty('--section-padding-y', spacing.sectionPaddingY);
  root.style.setProperty('--container-max-width', spacing.containerMaxWidth);
  root.style.setProperty('--container-padding-x', spacing.containerPaddingX);
}

/** Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    applyTheme();
    getProfile().then(data => {
      setProfile(data)
    })
  }, []);

  return (
    <BrowserRouter basename="/myportfolio">
      <ScrollToTop />
      <Navbar profile={profile} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection/:slug" element={<CollectionPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
