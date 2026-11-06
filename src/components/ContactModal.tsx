'use client';

import React, { useState, useEffect } from 'react';
import { recordNewLead } from '@/lib/store';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState('Direct Studio Consultation');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleOpen(e: any) {
      if (e?.detail?.context) {
        setSource(e.detail.context);
      } else {
        setSource('Direct Studio Consultation');
      }
      if (e?.detail?.notes) {
        setNotes(e.detail.notes);
      }
      setError('');
      setSubmitted(false);
      setIsOpen(true);
    }

    window.addEventListener('open-contact-modal', handleOpen);
    return () => window.removeEventListener('open-contact-modal', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please provide both your name and contact details.');
      return;
    }

    recordNewLead({
      name,
      phone,
      source,
      details: notes || `Direct Studio Consultation inquiry from ${name}`
    });

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setName('');
      setPhone('');
      setNotes('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="contact-modal-overlay" style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(21, 20, 19, 0.72)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div className="contact-modal-card" style={{
        background: 'var(--surface, #ffffff)',
        border: '1px solid var(--border, #e0ded9)',
        borderRadius: 'var(--radius-md, 8px)',
        padding: '32px',
        maxWidth: '520px',
        width: '100%',
        boxShadow: '0 24px 64px rgba(0,0,0,0.24)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div className="section-tag" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold, #c3924e)', fontWeight: 600 }}>
              Atelier Consultation
            </div>
            <h3 style={{ margin: '4px 0 6px', fontFamily: 'var(--font-serif)', fontSize: '24px' }}>Let’s discuss your project</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted, #736f69)', margin: 0 }}>
              Leave your details and a studio partner will be in touch within 24 hours.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', fontSize: '26px', cursor: 'pointer', color: 'var(--text-muted, #736f69)', lineHeight: 1 }}
          >
            &times;
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: '32px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '8px' }}>Inquiry Received</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Thank you, {name}. A senior director will review your brief and contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)', fontSize: '14px' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Phone / WhatsApp / Email *</label>
              <input
                type="text"
                required
                placeholder="e.g. +44 7911 123456 or eleanor@company.com"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)', fontSize: '14px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Project Brief &amp; Requirements</label>
              <textarea
                rows={4}
                placeholder="Scheme scale, site location, timeline or architectural specifications..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)', fontSize: '14px' }}
              ></textarea>
            </div>

            {error && (
              <div style={{ color: '#d32f2f', fontSize: '13px', marginBottom: '14px', padding: '8px 12px', background: 'rgba(211,47,47,0.08)', borderRadius: '4px' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', alignItems: 'center' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsOpen(false)}
                style={{ padding: '12px 18px', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-talk"
                style={{ padding: '12px 22px', fontSize: '13px' }}
              >
                <span>Submit Direct Inquiry</span>
                <span className="arrow-circle">
                  <svg viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z" fill="currentColor"/>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
