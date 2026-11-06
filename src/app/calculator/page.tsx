'use client';

import React, { useState } from 'react';
import TurnkeyCalculator from '@/components/TurnkeyCalculator';

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<'construction' | 'flooring' | 'wall'>('construction');

  return (
    <div className="calc-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div className="section-tag" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 600 }}>
          Architectural Estimation Suite
        </div>
        <h1 className="serif" style={{ margin: '8px 0 12px', fontSize: '38px', fontFamily: 'var(--font-serif)' }}>
          Spatial &amp; Construction Estimation Tools
        </h1>
        <p className="lead" style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '780px', lineHeight: 1.6 }}>
          Interactive turnkey calculators designed for architects, estimators, and occupiers to plan structural investments, material quantities, and architectural specifications with CAD accuracy.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="calc-tab-nav" style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap', borderBottom: '1px solid rgba(21,20,19,0.08)', paddingBottom: '18px' }}>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'construction' ? 'active' : ''}`}
          onClick={() => setActiveTab('construction')}
          style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <span>🏗️</span> <span>01 / Turnkey House Construction Cost Estimator</span>
        </button>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'flooring' ? 'active' : ''}`}
          onClick={() => setActiveTab('flooring')}
          style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <span>📐</span> <span>02 / Flooring &amp; Tile Estimator</span>
        </button>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'wall' ? 'active' : ''}`}
          onClick={() => setActiveTab('wall')}
          style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <span>🏛️</span> <span>03 / Wall Paneling &amp; Acoustic Cladding Estimator</span>
        </button>
      </div>

      {/* Tab 1: Turnkey Construction Estimator */}
      {activeTab === 'construction' && <TurnkeyCalculator />}

      {/* Tab 2: Flooring & Tile */}
      {activeTab === 'flooring' && (
        <div className="calc-card" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>📐</div>
          <h3 className="serif" style={{ fontSize: '24px', marginBottom: '10px' }}>Flooring &amp; Tile Material Estimator</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 24px', fontSize: '14px', lineHeight: 1.6 }}>
            Calculate net room areas, wastage quotas (5% – 15%), and material unit pricing across Italian marble, porcelain slabs, hardwood parquet, and luxury vinyl.
          </p>
          <div style={{ display: 'inline-flex', gap: '12px' }}>
            <button
              onClick={() => setActiveTab('construction')}
              className="btn-talk"
              style={{ padding: '12px 24px', fontSize: '13px' }}
            >
              <span>Explore Turnkey Villa Estimator</span>
              <span className="arrow-circle">&rarr;</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Wall Paneling & Acoustic Cladding */}
      {activeTab === 'wall' && (
        <div className="calc-card" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏛️</div>
          <h3 className="serif" style={{ fontSize: '24px', marginBottom: '10px' }}>Wall Paneling &amp; Acoustic Cladding Estimator</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 24px', fontSize: '14px', lineHeight: 1.6 }}>
            Model architectural partitions, fluted timber acoustic slats, microcement, and sintered stone veneers with precise aperture deductions.
          </p>
          <div style={{ display: 'inline-flex', gap: '12px' }}>
            <button
              onClick={() => setActiveTab('construction')}
              className="btn-talk"
              style={{ padding: '12px 24px', fontSize: '13px' }}
            >
              <span>Explore Turnkey Villa Estimator</span>
              <span className="arrow-circle">&rarr;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
