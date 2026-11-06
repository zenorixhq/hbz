'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [timeStr, setTimeStr] = useState('India --:-- IST');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      try {
        const ist = new Intl.DateTimeFormat('en-GB', options).format(now);
        setTimeStr(`India ${ist} IST`);
      } catch (e) {
        setTimeStr('India IST');
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const openContact = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
    }
  };

  return (
    <header className="site-header" id="siteHeader">
      <div className="site-header-inner" id="siteHeaderInner">
        {/* Left: Anchored Date & Live Time Dock */}
        <div className="header-left-dock">
          <div className="time-pill" id="headerTimePill">
            <span className="pulse-dot"></span>
            <span>{timeStr}</span>
          </div>
        </div>

        {/* Center: Floating Frosted Glass Capsule (HBZ Logo + Nav / Menu) */}
        <div className="header-center-pill" id="headerBar">
          <Link href="/" className="brand-logo" id="headerBrandLogo">
            HBZ<span className="tagline">STUDIO</span>
          </Link>

          <span className="nav-hairline-sep"></span>

          <nav className="header-nav" id="headerNavLinks">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>Overview</Link>
            <Link href="/projects" className={pathname?.startsWith('/projects') ? 'active' : ''}>Projects</Link>
            <Link href="/calculator" className={pathname === '/calculator' ? 'active' : ''}>Calculator</Link>
            <Link href="/journal" className={pathname?.startsWith('/journal') ? 'active' : ''}>Journal</Link>
            <Link href="/admin" className={pathname === '/admin' ? 'active' : ''}>CMS Admin</Link>
          </nav>

          {/* Thirdway Signature Menu Button (Icon Only - No Text) */}
          <button
            className="nav-menu-btn"
            id="navMenuBtn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="menu-icon-bars">
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
            </span>
          </button>
        </div>

        {/* Right: Anchored Let's Talk Dock */}
        <div className="header-right-dock">
          <button className="btn-talk" onClick={openContact}>
            <span>Let’s talk</span>
            <span className="arrow-circle">
              <svg viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z" fill="currentColor"/>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Thirdway Signature Dropdown / Overlay Architectural Menu */}
      <div
        className="thirdway-menu-overlay"
        id="thirdwayMenuOverlay"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="thirdway-menu-backdrop" onClick={() => setMenuOpen(false)}></div>
        <div className="thirdway-menu-card">
          <div className="thirdway-menu-header">
            <div className="menu-brand">HBZ<span className="tagline">STUDIO</span></div>
            <button className="thirdway-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close Menu">
              <span>Close</span>
              <span className="close-cross">&times;</span>
            </button>
          </div>

          <div className="thirdway-menu-scrollable">
            <nav className="thirdway-editorial-nav">
              <Link href="/" className="editorial-nav-item" onClick={() => setMenuOpen(false)}>
                <span className="nav-hover-arrow">&rarr;</span>
                <span className="nav-item-text">Overview</span>
              </Link>
              <Link href="/projects" className="editorial-nav-item" onClick={() => setMenuOpen(false)}>
                <span className="nav-hover-arrow">&rarr;</span>
                <span className="nav-item-text">Projects Archive</span>
              </Link>
              <Link href="/calculator" className="editorial-nav-item" onClick={() => setMenuOpen(false)}>
                <span className="nav-hover-arrow">&rarr;</span>
                <span className="nav-item-text">Spatial Calculator</span>
              </Link>
              <Link href="/journal" className="editorial-nav-item" onClick={() => setMenuOpen(false)}>
                <span className="nav-hover-arrow">&rarr;</span>
                <span className="nav-item-text">Monographs &amp; Journal</span>
              </Link>
              <Link href="/admin" className="editorial-nav-item" onClick={() => setMenuOpen(false)}>
                <span className="nav-hover-arrow">&rarr;</span>
                <span className="nav-item-text">CMS Admin</span>
              </Link>
            </nav>

            {/* Lately at HBZ Cards */}
            <div className="menu-lately-section">
              <div className="menu-lately-header">
                <span className="lately-pulse-dot"></span>
                <span className="lately-title">Lately at HBZ Studio</span>
              </div>
              <div className="menu-lately-track">
                <Link href="/project/p1" className="lately-card lately-card-1" onClick={() => setMenuOpen(false)}>
                  <div className="lately-card-meta">
                    <span className="lately-tag">Behind the Build</span>
                    <h4 className="lately-name">Palazzo Molteni Tokyo</h4>
                  </div>
                  <div className="lately-thumb-wrap">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" alt="Palazzo Molteni Tokyo" loading="lazy" />
                  </div>
                </Link>
                <Link href="/project/p2" className="lately-card lately-card-2" onClick={() => setMenuOpen(false)}>
                  <div className="lately-card-meta">
                    <span className="lately-tag">Monograph Dossier</span>
                    <h4 className="lately-name">Meridian Campus London</h4>
                  </div>
                  <div className="lately-thumb-wrap">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80" alt="Meridian Campus" loading="lazy" />
                  </div>
                </Link>
                <Link href="/calculator" className="lately-card lately-card-3" onClick={() => setMenuOpen(false)}>
                  <div className="lately-card-meta">
                    <span className="lately-tag">Spatial Advisory</span>
                    <h4 className="lately-name">Turnkey Cost Modeler</h4>
                  </div>
                  <div className="lately-thumb-wrap">
                    <img src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=400&q=80" alt="Calculator" loading="lazy" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Studio Contact & Atelier Meta */}
            <div className="menu-contact-footer">
              <div className="menu-footer-meta">
                <div className="footer-meta-block">
                  <span className="f-label">Studio Inquiries</span>
                  <a href="mailto:hello@hbz.studio" className="f-link">hello@hbz.studio</a>
                </div>
                <div className="footer-meta-block">
                  <span className="f-label">Atelier</span>
                  <span className="f-text">London &bull; Tokyo &bull; Zurich</span>
                </div>
              </div>
              <button className="btn-talk" onClick={() => { setMenuOpen(false); openContact(); }}>
                <span>Let’s talk</span>
                <span className="arrow-circle">
                  <svg viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z" fill="currentColor"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
