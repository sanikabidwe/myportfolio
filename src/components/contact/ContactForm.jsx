import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function ContactForm({ profile }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <main className="contact-main">
      <div className="contact-safe-area">
        <h1 className="contact-heading">Let's Create<br />Together</h1>
        <div className="contact-inner">
          <div className="contact-info">
            <p className="contact-info-label">Get In Touch</p>
            <a href={`mailto:${profile?.email}`} className="contact-email">
              {profile?.email || 'sanikabidwe2004@gmail.com'}
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

          <form className="contact-form" ref={formRef} onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="from_name">Name</label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="reply_to">Email</label>
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                required
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="form-feedback form-feedback--success">
                Message sent — I'll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-feedback--error">
                Something went wrong. Please try again or email directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
