'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredProjects } from '@/lib/store';

export default function ProjectsArchivePage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filterTypology, setFilterTypology] = useState('All');

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const typologies = ['All', 'Commercial Flagship', 'Corporate Campus', 'Private Residence', 'Adaptive Reuse'];

  const filtered = projects.filter((p) => {
    if (filterTypology === 'All') return true;
    return (p.typology || '').toLowerCase().includes(filterTypology.toLowerCase());
  });

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '120px 24px 100px' }}>
      <div style={{ marginBottom: '36px' }}>
        <div className="section-tag" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 600 }}>
          Atelier Archive
        </div>
        <h1 className="serif" style={{ fontSize: '38px', margin: '8px 0 12px', fontFamily: 'var(--font-serif)' }}>
          Selected Architectural Works &amp; Schemes
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '680px', lineHeight: 1.6 }}>
          A curated catalog of completed and developing architectural schemes spanning London, Tokyo, Zurich, and Milan.
        </p>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
          {typologies.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTypology(t)}
              className={`pill-btn ${filterTypology === t ? 'active' : ''}`}
              style={{ padding: '6px 16px', fontSize: '12px' }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px' }}>
        {filtered.map((project: any) => (
          <Link key={project.id} href={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface)', transition: 'all 0.3s ease' }}>
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <img
                  src={project.image_url}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--accent-gold)', fontWeight: 600 }}>
                  View Full Dossier &amp; Photography Plates &rarr;
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
