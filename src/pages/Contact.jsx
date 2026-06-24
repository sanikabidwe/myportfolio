import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/api';
import ContactForm from '../components/contact/ContactForm';

export default function Contact() {
  const [profile, setProfile] = useState(null);
  useEffect(() => { getProfile().then(setProfile); }, []);
  return (
    <div>
      <ContactForm profile={profile} />
    </div>
  );
}
