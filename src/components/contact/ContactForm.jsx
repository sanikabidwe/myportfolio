import React, { useState } from 'react';
import './ContactForm.css';

export default function ContactForm({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); alert('Message sent! (placeholder)'); };

  return (
    <main className="contact-main">
      <h1 className="contact-heading">Let's Create<br />Together</h1>
      <div className="contact-inner">
        <div className="contact-info">
          <p className="contact-info-label">Get In Touch</p>
          <a href={`mailto:${profile?.email}`} className="contact-email">
            {profile?.email || 'sanika@example.com'}
          </a>
          <p className="social-label">Find Me On</p>
          <div className="social-links">
            <a href={profile?.social?.instagram || '#'} className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              <span className="social-name">Insta</span>
            </a>
            <a href={profile?.social?.linkedin || '#'} className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              <span className="social-name">LinkedIn</span>
            </a>
            <a href={profile?.social?.behance || '#'} className="social-link" aria-label="Behance">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                <path d="M2 7h8c2.2 0 4 1.8 4 4s-1.8 4-4 4H2V7z"/>
                <path d="M2 15h9c2.8 0 5-2.2 5-5s-2.2-5-5-5H2"/>
                <line x1="14" y1="7" x2="20" y2="7"/>
              </svg>
              <span className="social-name">Behance</span>
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handle} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handle} />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Tell me about your project or opportunity..." value={form.message} onChange={handle} />
          </div>
          <button type="submit" className="form-submit">Send Message</button>
        </form>
      </div>
    </main>
  );
}
