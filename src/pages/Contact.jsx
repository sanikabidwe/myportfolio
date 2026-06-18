import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/api';
import ContactForm from '../components/contact/ContactForm';

export default function Contact() {
  const [profile, setProfile] = useState(null);
  useEffect(() => { getProfile().then(setProfile); }, []);
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--off-white)' }}>
      <ContactForm profile={profile} />
    </div>
  );
}
