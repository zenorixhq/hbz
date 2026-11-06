'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const openContact = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner-container">
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <div className="footer-brand-logo">HBZ<span className="tagline">STUDIO</span></div>
            <p className="footer-brand-mission">Spatial practice crafting commercial headquarters, residential living, and architecture of enduring presence.</p>
          </div>

          <div className="footer-nav-columns">
            <div className="footer-col">
              <h4>Monographs</h4>
              <Link href="/project/p1">Palazzo Molteni Tokyo</Link>
              <Link href="/project/p2">Meridian Commercial Campus</Link>
              <Link href="/project/p3">Cedar Hill Residences</Link>
              <Link href="/project/p5">The Tannery Adaptive Reuse</Link>
              <Link href="/projects" className="footer-view-all">All Selected Works &rarr;</Link>
            </div>
            <div className="footer-col">
              <h4>Expertise</h4>
              <Link href="/projects">Workplace Strategy</Link>
              <Link href="/projects">Cat A / Cat B Fit-Out</Link>
              <Link href="/calculator">Turnkey Construction Estimator</Link>
              <Link href="/calculator">Spatial Cost Modeling</Link>
              <Link href="/journal">Architectural Research</Link>
            </div>
            <div className="footer-col">
              <h4>Ateliers</h4>
              <p>London: 42 Clerkenwell Close</p>
              <p>Tokyo: Minami-Aoyama 5-Chome</p>
              <p>Zurich: Seestrasse 104</p>
              <a href="mailto:hello@hbz.studio" className="footer-email">hello@hbz.studio</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-copy">&copy; {new Date().getFullYear()} HBZ Architectural Studio Ltd. All rights reserved.</div>
          <div className="footer-links">
            <button onClick={openContact} className="btn-link" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              Direct Studio Inquiry
            </button>
            <Link href="/admin">CMS Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
