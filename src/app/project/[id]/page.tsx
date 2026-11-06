'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getStoredProjects } from '@/lib/store';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<any | null>(null);
  const [activePlate, setActivePlate] = useState<any | null>(null);

  useEffect(() => {
    const all = getStoredProjects();
    const found = all.find((p) => p.id === projectId) || all[0];
    setProject(found);
    if (found?.plates && found.plates.length) {
      setActivePlate(found.plates[0]);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div style={{ padding: '160px 24px', textAlign: 'center' }}>
        <p>Loading architectural scheme...</p>
      </div>
    );
  }

  const openContact = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-contact-modal', {
          detail: { context: `Scheme Inquiry: ${project.title}` }
        })
      );
    }
  };

  const plates = project.plates || [];

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '120px 24px 100px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/projects" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>
          &larr; Back to Architectural Portfolio
        </Link>
      </div>

      {/* Project Header Block */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '48px' }}>
        <div>
          <div className="section-tag" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', marginBottom: '8px', fontWeight: 600 }}>
            Scheme {project.scheme_num || project.id} • {project.typology || 'Architectural Build'}
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: '0 0 16px', fontFamily: 'var(--font-serif)', lineHeight: 1.15 }}>
            {project.title}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {project.brief}
          </p>
        </div>

        {/* Technical Data Card */}
        <div className="calc-card" style={{ padding: '28px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', marginBottom: '14px', fontWeight: 600 }}>
            Technical Dossier &amp; Specifications
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6 }}>Location</div>
              <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '2px' }}>{project.location}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6 }}>Gross Internal Area</div>
              <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '2px' }}>{project.gia || '2,400 m²'}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6 }}>Status</div>
              <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '2px' }}>{project.status || 'Delivered'}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6 }}>Year Completed</div>
              <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '2px' }}>{project.year || '2026'}</div>
            </div>
          </div>

          <button
            onClick={openContact}
            className="btn-talk"
            style={{ width: '100%', padding: '14px', fontSize: '13px', justifyContent: 'center' }}
          >
            <span>Commission Scheme Consultation</span>
            <span className="arrow-circle">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Main Image Showcase */}
      <div style={{ marginBottom: '48px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <img
          src={activePlate?.url || project.image_url}
          alt={activePlate?.title || project.title}
          style={{ width: '100%', maxHeight: '720px', objectFit: 'cover', display: 'block' }}
        />
        {activePlate?.title && (
          <div style={{ padding: '14px 20px', background: 'var(--surface)', borderTop: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-muted)' }}>
            Plate Detail: <strong>{activePlate.title}</strong>
          </div>
        )}
      </div>

      {/* Multi-Image Scheme Plates Strip */}
      {plates.length > 1 && (
        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="serif" style={{ fontSize: '20px', margin: 0, fontFamily: 'var(--font-serif)' }}>
              Scheme Photography Plates ({plates.length} Plates)
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Click plate to inspect full scale</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {plates.map((pl: any, idx: number) => {
              const isSelected = activePlate?.url === pl.url;
              return (
                <div
                  key={idx}
                  onClick={() => setActivePlate(pl)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border)',
                    boxShadow: isSelected ? '0 6px 20px rgba(195,146,78,0.2)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={pl.url} alt={pl.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                  <div style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, background: 'var(--surface)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {pl.title || `Plate 0${idx + 1}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
