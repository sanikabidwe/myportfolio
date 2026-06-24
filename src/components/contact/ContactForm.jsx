import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim() || name.trim().length < 2)
    errors.name = 'Please enter your full name (at least 2 characters).';
  if (!email.trim())
    errors.email = 'Email address is required.';
  else if (!EMAIL_REGEX.test(email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (!message.trim() || message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  return errors;
}

// ── Toast component ──────────────────────────────────────────────────────────
function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;
  return (
    <div className={`contact-toast contact-toast--${toast.type}`} role="alert">
      <span className="contact-toast__icon">{toast.type === 'success' ? '✓' : '✕'}</span>
      <span className="contact-toast__msg">{toast.message}</span>
      <button className="contact-toast__close" onClick={onDismiss} aria-label="Dismiss">×</button>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────
export default function ContactForm({ profile }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending'
  const [toast, setToast] = useState(null);     // { type: 'success'|'error', message }

  // Controlled field values
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  // Which fields have been touched (blurred at least once)
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const errors = validate(fields);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (e) => {
    const key = e.target.name === 'reply_to' ? 'email' : e.target.name;
    setFields(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleBlur = (e) => {
    const key = e.target.name === 'reply_to' ? 'email' : e.target.name;
    setTouched(prev => ({ ...prev, [key]: true }));
  };

  const dismissToast = () => setToast(null);

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (hasErrors) return;

    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus('idle');
      formRef.current.reset();
      setFields({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      setToast({ type: 'success', message: "Message sent — I'll be in touch soon." });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('idle');
      setToast({ type: 'error', message: 'Something went wrong. Please try again or email directly.' });
    }
  };

  return (
    <main className="contact-main">
      <Toast toast={toast} onDismiss={dismissToast} />

      <div className="contact-layout">

        {/* ── Right panel: editorial image ── */}
        <div className="contact-image-panel" aria-hidden="true">
          <img
            src="/contact-editorial.png"
            alt="Atelier"
            className="contact-image"
          />
          <div className="contact-image-overlay" />
        </div>

        {/* ── Left panel: heading + info + form ── */}
        <div className="contact-left">
          <div className="contact-safe-area">
            <p className="contact-eyebrow">Get In Touch</p>
            <h1 className="contact-heading">Let's Create<br />Together</h1>

            <div className="contact-info">
              <a href={`mailto:${profile?.email}`} className="contact-email">
                {profile?.email || 'sanikabidwe2004@gmail.com'}
              </a>
              <div className="social-links">
                {profile?.social?.map((ele) => (
                  <a key={ele.id} href={ele.accountUrl || '#'} className="social-link" aria-label={ele.name} target="_blank" rel="noreferrer">
                    <img src={ele.icon} alt={ele.name} />
                  </a>
                ))}
              </div>
            </div>

            <form className="contact-form" ref={formRef} onSubmit={submit} noValidate>
              {/* Name */}
              <div className={`form-field${touched.name && errors.name ? ' form-field--error' : ''}`}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={fields.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                />
                {touched.name && errors.name && (
                  <span className="form-error">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className={`form-field${touched.email && errors.email ? ' form-field--error' : ''}`}>
                <label htmlFor="reply_to">Email</label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  placeholder="your@gmail.com"
                  value={fields.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                {touched.email && errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>

              {/* Message */}
              <div className={`form-field${touched.message && errors.message ? ' form-field--error' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or opportunity..."
                  value={fields.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.message && errors.message && (
                  <span className="form-error">{errors.message}</span>
                )}
              </div>

              {/* Hidden time field */}
              <input
                type="hidden"
                name="time"
                ref={el => { if (el) el.value = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }); }}
              />

              <button
                type="submit"
                className="form-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
