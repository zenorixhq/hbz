'use client';

import React from 'react';
import Link from 'next/link';
import { SAMPLE_PROJECTS, SAMPLE_POSTS } from '@/lib/data';

export default function HomePage() {
  const openContact = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
    }
  };

  return (
    <div>
      {/* ── 1. Hero Showcase Section ── */}
      <section className="hero-stage" style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 24px 80px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-tag" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold)', marginBottom: '14px', fontWeight: 600 }}>
            Contemporary Architectural Practice
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, lineHeight: 1.1, margin: '0 auto 20px', maxWidth: '1000px', fontFamily: 'var(--font-serif)' }}>
            Architecture of enduring presence &amp; mineral silence.
          </h1>
          <p className="lead" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            HBZ crafts institutional headquarters, private residential villas, and civic environments rooted in monolithic clarity, tactile materials, and environmental permanence.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn-talk" style={{ padding: '14px 28px', fontSize: '14px' }}>
              <span>Explore Selected Schemes</span>
              <span className="arrow-circle">&rarr;</span>
            </Link>
            <Link href="/calculator" className="btn-secondary" style={{ padding: '14px 28px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>🏗️</span> <span>Turnkey Cost Estimator</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Featured Schemes Grid ── */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="section-tag" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 600 }}>
              Atelier Portfolio
            </div>
            <h2 className="serif" style={{ fontSize: '32px', margin: '4px 0 0', fontFamily: 'var(--font-serif)' }}>
              Selected Architectural Schemes
            </h2>
          </div>
          <Link href="/projects" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', textDecoration: 'none' }}>
            View Full Architectural Archive &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '32px' }}>
          {SAMPLE_PROJECTS.slice(0, 4).map((project: any) => (
            <Link key={project.id} href={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="project-card-wrap">
              <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface)', transition: 'all 0.3s ease' }}>
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                  <img
                    src={project.image_url}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(21,20,19,0.75)', backdropFilter: 'blur(4px)', color: '#ffffff', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                    Scheme {project.scheme_num || project.id}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-gold)', marginBottom: '4px' }}>
                    {project.typology || 'Architectural Build'} • {project.location}
                  </div>
                  <h3 className="serif" style={{ fontSize: '22px', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                    {project.brief}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. Spatial Advisory & Estimator Feature Banner ── */}
      <section style={{ background: 'var(--panel-dark)', color: 'var(--text-light)', padding: '80px 24px', margin: '40px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', marginBottom: '8px', fontWeight: 600 }}>
              Turnkey Advisory Platform
            </div>
            <h2 className="serif" style={{ fontSize: '36px', color: '#f7e1b5', margin: '0 0 16px', fontFamily: 'var(--font-serif)' }}>
              Precision Villa &amp; House Construction Estimator
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '24px' }}>
              Modeled after premier turnkey benchmarks, our live estimation suite calculates city-adjusted civil works (48%), interior finishes (18%), flooring (12%), joinery (9%), electrical (7%), and plumbing (6%) with complete brand specifications.
            </p>
            <Link href="/calculator" className="btn-primary" style={{ padding: '16px 28px', fontSize: '14px', background: 'var(--accent-gold)', color: '#151413', textDecoration: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>Launch Construction Estimator</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', marginBottom: '14px' }}>
              Live Benchmark Specifications
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>Premium Turnkey Spec</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#f7e1b5' }}>₹2,750 / sq.ft</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>Structural Warranty</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#a3e635' }}>10–15 Years</div>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              <li>✓ Tata Tiscon Fe550D &amp; UltraTech Super Cement</li>
              <li>✓ Large Format 4×2 Sintered Tiles &amp; Teak Joinery</li>
              <li>✓ 8-Phase Milestones &amp; 430-Point Quality Checklist</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Editorial Monograph Insights ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 120px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="section-tag" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 600 }}>
              Architectural Research
            </div>
            <h2 className="serif" style={{ fontSize: '32px', margin: '4px 0 0', fontFamily: 'var(--font-serif)' }}>
              Monographs &amp; Technical Briefings
            </h2>
          </div>
          <Link href="/journal" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', textDecoration: 'none' }}>
            All Briefings &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {SAMPLE_POSTS.slice(0, 3).map((post: any) => (
            <Link key={post.id} href={`/journal/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="calc-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-gold)', marginBottom: '6px' }}>
                  {post.category} • {post.readTime}
                </div>
                <h3 className="serif" style={{ fontSize: '20px', margin: '0 0 10px', fontFamily: 'var(--font-serif)', flex: 1 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {post.excerpt}
                </p>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                  By {post.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
