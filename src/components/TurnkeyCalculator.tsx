'use client';

import React, { useState, useEffect } from 'react';
import {
  HOUSE_CITY_CONFIG,
  HOUSE_PACKAGES,
  HOUSE_CURRENCY_RATES
} from '@/lib/data';
import {
  recordNewLead,
  isHouseCalcUnlocked,
  setHouseCalcUnlocked
} from '@/lib/store';

export default function TurnkeyCalculator() {
  const [cityKey, setCityKey] = useState('bengaluru');
  const [builtUpArea, setBuiltUpArea] = useState(2400);
  const [floors, setFloors] = useState(2);
  const [parkingBays, setParkingBays] = useState(1);
  const [balconyPct, setBalconyPct] = useState(8);
  const [packageTier, setPackageTier] = useState('premium');
  const [currency, setCurrency] = useState('₹');
  const [step, setStep] = useState<'config' | 'form' | 'breakdown'>('config');

  // Lead form fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [plotStatus, setPlotStatus] = useState('Plot Owned & Ready for Construction');
  const [timeline, setTimeline] = useState('Immediate (Within 1-2 months)');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = sessionStorage.getItem('hbz_lead_name') || '';
      const savedPhone = sessionStorage.getItem('hbz_lead_phone') || '';
      const savedEmail = sessionStorage.getItem('hbz_lead_email') || '';
      if (savedName) setClientName(savedName);
      if (savedPhone) setClientPhone(savedPhone);
      if (savedEmail) setClientEmail(savedEmail);
    }
  }, []);

  const city = (HOUSE_CITY_CONFIG as any)[cityKey] || (HOUSE_CITY_CONFIG as any).bengaluru;
  const pkg = (HOUSE_PACKAGES as any)[packageTier] || (HOUSE_PACKAGES as any).premium;
  const curRate = (HOUSE_CURRENCY_RATES as any)[currency] || 1;

  const builtUp = Math.max(500, builtUpArea);
  const floorFactor = floors > 2 ? 1 + (floors - 2) * 0.025 : 1.0;
  const baseRateInr = pkg.ratePerSqFt * city.baseFactor * floorFactor;
  const effectiveRate = Math.round(baseRateInr * (currency === '₹' ? 1 : curRate));

  const livingCost = Math.round(builtUp * effectiveRate);
  const balconyArea = Math.round(builtUp * (balconyPct / 100));
  const balconyCost = Math.round(balconyArea * (effectiveRate * 0.65));
  const parkingArea = parkingBays * 180;
  const parkingCost = Math.round(parkingBays * (city.parkingPerBay * (currency === '₹' ? 1 : curRate)));

  const totalBuiltUpArea = builtUp + balconyArea + parkingArea;
  const totalCost = livingCost + balconyCost + parkingCost;
  const totalCostMin = Math.round(totalCost * 0.96);
  const totalCostMax = Math.round(totalCost * 1.05);

  const boq = [
    {
      category: 'Civil & Structural Works',
      pct: 48,
      cost: Math.round(totalCost * 0.48),
      desc: 'Earth excavation, RCC footing, columns, beams, slab casting, solid block masonry, plastering & foundation waterproofing'
    },
    {
      category: 'Interior & Exterior Finishes',
      pct: 18,
      cost: Math.round(totalCost * 0.18),
      desc: 'Wall putty (2 coats), premier emulsion paint, exterior weather-shield, false ceiling framing & gypsum work'
    },
    {
      category: 'Flooring & Wall Tiling',
      pct: 12,
      cost: Math.round(totalCost * 0.12),
      desc: 'Living/dining marble or large vitrified tiles, bedroom flooring, granite staircase & anti-skid bathroom dado'
    },
    {
      category: 'Doors & Windows Joinery',
      pct: 9,
      cost: Math.round(totalCost * 0.09),
      desc: 'Teak main door, flush internal doors, 3-track sliding UPVC/aluminum windows with mosquito mesh'
    },
    {
      category: 'Electrical & Lighting Infrastructure',
      pct: 7,
      cost: Math.round(totalCost * 0.07),
      desc: 'Concealed fire-retardant wiring, modular switches, distribution board with MCB/ELCB, earthing & inverter provisions'
    },
    {
      category: 'Plumbing, Sanitation & Water Systems',
      pct: 6,
      cost: Math.round(totalCost * 0.06),
      desc: 'Concealed CPVC/PVC lines, branded CP fittings & sanitaryware, overhead tank, sump waterproofing & drainage'
    }
  ];

  const floorNames = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Fourth Floor'];
  let floorPcts = [1.0];
  if (floors === 2) floorPcts = [0.54, 0.46];
  else if (floors === 3) floorPcts = [0.40, 0.32, 0.28];
  else if (floors === 4) floorPcts = [0.32, 0.26, 0.22, 0.20];
  else if (floors >= 5) floorPcts = [0.28, 0.21, 0.19, 0.17, 0.15];

  const floorSchedule = [];
  for (let i = 0; i < floors; i++) {
    floorSchedule.push({
      floorNumber: i + 1,
      name: floorNames[i] || `Floor ${i + 1}`,
      area: Math.round(builtUp / floors),
      cost: Math.round(totalCost * (floorPcts[i] || 0.2)),
      pct: Math.round((floorPcts[i] || 0.2) * 100),
      highlights:
        i === 0
          ? 'Foundation, Plinth, Foyer, Living Lounge, Kitchen & Car Port'
          : i === floors - 1
          ? 'Master Suites, Terrace Balcony & Headroom'
          : 'Bedrooms, Family Lounge & Balconies'
    });
  }

  const milestones = [
    { phase: '01', title: 'Architectural Design & Municipal Sanctions', weeks: 'Weeks 1 – 4', desc: 'Soil testing, structural engineering drawings, 3D visualization & statutory authority approvals.' },
    { phase: '02', title: 'Substructure, Foundation & Plinth Beam', weeks: 'Weeks 5 – 8', desc: 'Earth excavation, anti-termite treatment, PCC, isolated/raft footings & plinth beam casting.' },
    { phase: '03', title: 'RCC Superstructure & Slab Casting', weeks: 'Weeks 9 – 18', desc: `RCC columns, shuttering, steel reinforcement & monolithic slab casting for all ${floors} levels.` },
    { phase: '04', title: 'Masonry & Mechanical/Electrical Rough-in', weeks: 'Weeks 19 – 24', desc: 'Solid concrete blockwork, lintel beams, concealed conduit piping & plumbing chase cutting.' },
    { phase: '05', title: 'Internal Plastering & Waterproofing', weeks: 'Weeks 25 – 28', desc: 'Double-coat sand face internal & external plastering, sunken slab waterproofing & terrace membrane.' },
    { phase: '06', title: 'Flooring, Tiling & Joinery Installation', weeks: 'Weeks 29 – 34', desc: `${pkg.flooring}, granite steps, window installation & door frame fixing.` },
    { phase: '07', title: 'Painting, Fixtures & Final Fitting', weeks: 'Weeks 35 – 38', desc: `${pkg.paint}, installation of switches, sanitaryware, CP brass fittings & glass railings.` },
    { phase: '08', title: 'Quality Audit, Deep Clean & Handover', weeks: 'Week 39', desc: `Comprehensive 430-point quality checklist, site deep cleaning & ${pkg.warranty} delivery.` }
  ];

  const handleCalculateClick = () => {
    if (isHouseCalcUnlocked()) {
      setStep('breakdown');
    } else {
      setStep('form');
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 320, behavior: 'smooth' });
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || clientPhone.trim().length < 7) {
      setFormError('Please enter your full name and a valid phone or WhatsApp number.');
      return;
    }

    const floorText = floors === 1 ? 'Ground Only' : `G+${floors - 1}`;
    const details = `Turnkey House Construction Cost Estimate:
• Location: ${city.name}
• Built-up Area: ${builtUpArea} sq.ft (${floorText})
• Package: ${pkg.name} (${currency}${effectiveRate}/sq.ft)
• Car Parking: ${parkingBays} Bay(s) | Balconies: ${balconyPct}%
• Estimated Cost: ${currency}${totalCost.toLocaleString()} (Range: ${currency}${totalCostMin.toLocaleString()} – ${currency}${totalCostMax.toLocaleString()})
• Plot Status: ${plotStatus}
• Timeline: ${timeline}
• Email: ${clientEmail || 'N/A'}`;

    recordNewLead({
      name: clientName,
      phone: clientPhone,
      source: 'Calculator: Turnkey House Construction (Brick & Bolt)',
      details
    });

    setHouseCalcUnlocked(clientName, clientPhone, clientEmail);
    setFormError('');
    setStep('breakdown');

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  const triggerDirectorConsultation = () => {
    const floorText = floors === 1 ? 'Ground Only' : `G+${floors - 1}`;
    const summary = `Turnkey Construction Consultation Request:
• City: ${city.name}
• Package: ${pkg.name} (${currency}${effectiveRate}/sq.ft)
• Area: ${builtUpArea} sq.ft (${floorText})
• Total Projected Budget: ${currency}${totalCost.toLocaleString()}
• Parking: ${parkingBays} Bay(s) | Balconies: ${balconyPct}%`;

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-contact-modal', {
          detail: { context: 'Turnkey House Construction (Brick & Bolt)', notes: summary }
        })
      );
    }
  };

  return (
    <div id="houseCalcStage">
      {/* 3-Step Indicator Bar */}
      <div className="calc-steps-nav">
        <div className={`calc-step-item ${step === 'config' ? 'active' : 'completed'}`}>
          <div className="calc-step-num">{step === 'config' ? '01' : '✓'}</div>
          <div className="calc-step-info">
            <div className="calc-step-title">01. Project Parameters</div>
            <div className="calc-step-sub">Area, City, Floors &amp; Package</div>
          </div>
        </div>
        <div className={`calc-step-line ${step === 'form' || step === 'breakdown' ? 'completed' : ''}`}></div>
        <div className={`calc-step-item ${step === 'form' ? 'active' : step === 'breakdown' ? 'completed' : ''}`}>
          <div className="calc-step-num">{step === 'breakdown' ? '✓' : '02'}</div>
          <div className="calc-step-info">
            <div className="calc-step-title">02. Project Brief &amp; Verification</div>
            <div className="calc-step-sub">Direct Lead Capture</div>
          </div>
        </div>
        <div className={`calc-step-line ${step === 'breakdown' ? 'completed' : ''}`}></div>
        <div className={`calc-step-item ${step === 'breakdown' ? 'active' : ''}`}>
          <div className="calc-step-num">03</div>
          <div className="calc-step-info">
            <div className="calc-step-title">03. Full BOQ Breakdown</div>
            <div className="calc-step-sub">Line-by-Line Cost &amp; Timeline</div>
          </div>
        </div>
      </div>

      {/* STEP 1: CONFIGURATION */}
      {step === 'config' && (
        <div className="calc-grid">
          {/* Left Column: Form Controls */}
          <div className="calc-card">
            {/* 1. City / Region */}
            <div className="calc-section-title">1. Construction City &amp; Region</div>
            <div className="pill-selector">
              {Object.keys(HOUSE_CITY_CONFIG).map((cKey) => (
                <button
                  key={cKey}
                  type="button"
                  className={`pill-btn ${cityKey === cKey ? 'active' : ''}`}
                  onClick={() => setCityKey(cKey)}
                >
                  {(HOUSE_CITY_CONFIG as any)[cKey].name}
                </button>
              ))}
            </div>

            {/* 2. Built-up Area */}
            <div className="calc-section-title">2. Total Built-up Living Area</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Living space to construct:</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                {builtUp.toLocaleString()} sq.ft
              </span>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <input
                type="range"
                min="600"
                max="10000"
                step="50"
                value={builtUp}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-gold)' }}
                onChange={(e) => setBuiltUpArea(parseFloat(e.target.value) || 600)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or Type Area:</span>
              <input
                type="number"
                min="500"
                max="30000"
                step="50"
                value={builtUp}
                style={{ width: '120px', padding: '6px 10px', fontSize: '13px' }}
                onChange={(e) => setBuiltUpArea(parseFloat(e.target.value) || 500)}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>sq.ft</span>
            </div>
            <div className="pill-selector" style={{ marginBottom: '16px' }}>
              {[1200, 1800, 2400, 3600, 5000].map((areaVal) => (
                <button
                  key={areaVal}
                  type="button"
                  className={`pill-btn ${builtUpArea === areaVal ? 'active' : ''}`}
                  onClick={() => setBuiltUpArea(areaVal)}
                >
                  {areaVal.toLocaleString()} sq.ft
                </button>
              ))}
            </div>

            {/* 3. Floors */}
            <div className="calc-section-title">3. Number of Floors</div>
            <div className="pill-selector">
              {[
                { val: 1, label: 'Ground Only (1 Floor)' },
                { val: 2, label: 'G + 1 (2 Floors)' },
                { val: 3, label: 'G + 2 (3 Floors)' },
                { val: 4, label: 'G + 3 (4 Floors)' },
                { val: 5, label: 'G + 4 (5 Floors)' }
              ].map((f) => (
                <button
                  key={f.val}
                  type="button"
                  className={`pill-btn ${floors === f.val ? 'active' : ''}`}
                  onClick={() => setFloors(f.val)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* 4. Parking & Balconies */}
            <div className="input-row" style={{ marginTop: '14px' }}>
              <div className="input-group">
                <label>Covered Car Parking</label>
                <div className="pill-selector" style={{ marginBottom: 0 }}>
                  {[
                    { bays: 0, label: '0 Cars' },
                    { bays: 1, label: '1 Car' },
                    { bays: 2, label: '2 Cars' },
                    { bays: 3, label: '3+ Cars' }
                  ].map((p) => (
                    <button
                      key={p.bays}
                      type="button"
                      className={`pill-btn ${parkingBays === p.bays ? 'active' : ''}`}
                      onClick={() => setParkingBays(p.bays)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="input-group">
                <label>Balcony &amp; Terrace Ratio</label>
                <div className="pill-selector" style={{ marginBottom: 0 }}>
                  {[
                    { pct: 0, label: '0% (None)' },
                    { pct: 8, label: '8% (Standard)' },
                    { pct: 15, label: '15% (Expansive)' }
                  ].map((b) => (
                    <button
                      key={b.pct}
                      type="button"
                      className={`pill-btn ${balconyPct === b.pct ? 'active' : ''}`}
                      onClick={() => setBalconyPct(b.pct)}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Currency */}
            <div className="calc-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>5. Currency</span>
              <div className="pill-selector" style={{ margin: 0 }}>
                {['₹', '$', '£', '€'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`pill-btn ${currency === c ? 'active' : ''}`}
                    onClick={() => setCurrency(c)}
                  >
                    {c} {c === '₹' ? 'INR' : c === '$' ? 'USD' : c === '£' ? 'GBP' : 'EUR'}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Package Tiers */}
            <div className="calc-section-title">6. Select Construction Package Tier</div>
            <div className="pkg-cards-grid">
              {Object.values(HOUSE_PACKAGES).map((p: any) => {
                const isActive = packageTier === p.key;
                const pkgRate = Math.round(p.ratePerSqFt * city.baseFactor * (currency === '₹' ? 1 : curRate));
                return (
                  <div
                    key={p.key}
                    className={`pkg-card ${isActive ? 'active' : ''}`}
                    onClick={() => setPackageTier(p.key)}
                  >
                    {p.badge && <div className="pkg-badge">{p.badge}</div>}
                    <div className="pkg-header">
                      <div className="pkg-title">{p.name}</div>
                      <div className="pkg-tagline">{p.tagline}</div>
                    </div>
                    <div className="pkg-price-capsule">
                      <div className="pkg-price-val">{currency}{pkgRate.toLocaleString()}</div>
                      <div className="pkg-price-unit">/ sq.ft</div>
                    </div>
                    <div className="pkg-warranty-pill">🛡️ {p.warranty}</div>
                    <ul className="pkg-features">
                      {p.features.map((f: string, idx: number) => (
                        <li key={idx}><span className="chk">✓</span> <span>{f}</span></li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Summary & CTA */}
          <div className="calc-card" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <div>
                <span className="pill-badge" style={{ background: '#e8eff8', color: '#284a75', border: '1px solid #cad9ee', fontSize: '11px', padding: '3px 9px' }}>
                  {city.name}
                </span>
                <span className="pill-badge" style={{ background: 'rgba(195,146,78,0.12)', color: '#8d6529', border: '1px solid rgba(195,146,78,0.3)', fontSize: '11px', padding: '3px 9px', marginLeft: '4px' }}>
                  {pkg.name}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {floors === 1 ? 'Ground Only' : `G+${floors - 1}`}
              </span>
            </div>

            {/* Total Cost Highlight */}
            <div className="total-cost-box" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px', marginBottom: '16px' }}>
              <div className="cost-label" style={{ fontSize: '11px' }}>Estimated Turnkey Construction Cost</div>
              <div className="cost-val" style={{ fontSize: '28px', margin: '6px 0' }}>{currency}{totalCost.toLocaleString()}</div>
              <div style={{ fontSize: '11px', opacity: 0.85, display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span>Projected Range:</span>
                <strong>{currency}{totalCostMin.toLocaleString()}</strong>
                <span>–</span>
                <strong>{currency}{totalCostMax.toLocaleString()}</strong>
              </div>
            </div>

            {/* Rate & Area Summary */}
            <div className="results-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '16px' }}>
              <div className="result-stat-box" style={{ padding: '10px' }}>
                <div className="result-stat-label">Effective Rate</div>
                <div className="result-stat-val" style={{ fontSize: '17px', color: 'var(--accent-gold)' }}>
                  {currency}{effectiveRate.toLocaleString()} <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'var(--text-muted)' }}>/ sq.ft</span>
                </div>
              </div>
              <div className="result-stat-box" style={{ padding: '10px' }}>
                <div className="result-stat-label">Total Built-up Area</div>
                <div className="result-stat-val" style={{ fontSize: '17px' }}>
                  {totalBuiltUpArea.toLocaleString()} <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'var(--text-muted)' }}>sq.ft</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px', padding: '12px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                What is Included:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4px' }}>
                <div>✓ Full Civil Substructure, Footings &amp; RCC Frame</div>
                <div>✓ AAC / Solid Block Masonry &amp; Internal Plastering</div>
                <div>✓ Complete Flooring ({pkg.flooring.split('(')[0]})</div>
                <div>✓ Branded Concealed Plumbing &amp; Electricals</div>
                <div>✓ Premium Doors, 3-Track Windows &amp; Weatherproof Paint</div>
                <div>✓ Dedicated Site Supervision &amp; {pkg.warranty}</div>
              </div>
            </div>

            {/* Gated Action Button */}
            <button
              type="button"
              className="btn-primary"
              onClick={handleCalculateClick}
              style={{
                width: '100%',
                padding: '18px 24px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: 'var(--accent-gold)',
                color: '#151413',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(195,146,78,0.28)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Calculate &amp; View Full Breakdown</span>
              <span style={{ fontSize: '18px' }}>&rarr;</span>
            </button>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span>🔒</span> <span>Click to unlock complete line-by-line BOQ bifurcation &amp; schedule</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: LEAD VERIFICATION FORM */}
      {step === 'form' && (
        <div className="calc-gate-card">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="section-tag">Step 02 / Project Verification</div>
            <h2 className="serif" style={{ fontSize: '26px', margin: '8px 0 10px' }}>Unlock Comprehensive BOQ Breakdown</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.55 }}>
              You are one step away from viewing the full line-by-line itemized cost bifurcation (Civil 48%, Finishes 18%, Flooring 12%, Doors/Windows 9%, Electrical 7%, Plumbing 6%), floor-wise payment milestones, and certified engineering brand matrix.
            </p>
          </div>

          <div className="gate-summary-capsule">
            <div style={{ fontWeight: 600, color: 'var(--text)' }}>Selected Project:</div>
            <div>📍 <strong>{city.name}</strong></div>
            <div>📐 <strong>{builtUp.toLocaleString()} sq.ft</strong> ({floors === 1 ? 'Ground Only' : `G+${floors - 1}`})</div>
            <div>🏛️ <strong>{pkg.name}</strong> ({currency}{effectiveRate.toLocaleString()}/sq.ft)</div>
            <div>🚗 <strong>{parkingBays} Car Bay(s)</strong></div>
            <div>💰 Est: <strong style={{ color: 'var(--accent-gold)' }}>{currency}{totalCost.toLocaleString()}</strong></div>
          </div>

          <form onSubmit={handleLeadSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label>Your Full Name <span style={{ color: '#d32f2f' }}>*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma / Sarah Jenkins"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Phone / WhatsApp Number <span style={{ color: '#d32f2f' }}>*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address (Optional)</label>
              <input
                type="email"
                placeholder="e.g. rahul@example.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Current Plot Status</label>
                <select
                  value={plotStatus}
                  onChange={(e) => setPlotStatus(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)', fontSize: '13px' }}
                >
                  <option value="Plot Owned & Ready for Construction">Plot Owned &amp; Ready for Construction</option>
                  <option value="Plot in Acquisition / Under Negotiation">Plot in Acquisition / Under Negotiation</option>
                  <option value="Existing House Demolition & Rebuild">Existing House Demolition &amp; Rebuild</option>
                  <option value="Exploring Feasibility / Yet to Buy Plot">Exploring Feasibility / Yet to Buy Plot</option>
                </select>
              </div>
              <div className="input-group">
                <label>Expected Construction Timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)', fontSize: '13px' }}
                >
                  <option value="Immediate (Within 1-2 months)">Immediate (Within 1–2 months)</option>
                  <option value="In 3 to 6 months">In 3 to 6 months</option>
                  <option value="In 6 to 12 months">In 6 to 12 months</option>
                  <option value="Planning / Architectural Stage">Planning / Architectural Stage</option>
                </select>
              </div>
            </div>

            {formError && (
              <div style={{ color: '#d32f2f', background: 'rgba(211,47,47,0.08)', border: '1px solid rgba(211,47,47,0.2)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px', margin: '12px 0' }}>
                {formError}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '18px 24px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: 'var(--accent-gold)',
                color: '#151413',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(195,146,78,0.28)',
                marginTop: '16px'
              }}
            >
              <span>Unlock &amp; View Full Breakdown</span>
              <span style={{ fontSize: '18px' }}>&rarr;</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => setStep('config')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
            >
              &larr; Back to edit project parameters
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: FULL UNLOCKED BREAKDOWN */}
      {step === 'breakdown' && (
        <div>
          {/* Verification Success Notice */}
          <div style={{ background: '#e7f2e8', border: '1px solid #c8e0ca', color: '#27592a', borderRadius: 'var(--radius-sm)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
              <span style={{ fontSize: '18px' }}>✓</span>
              <span>Turnkey Construction BOQ Breakdown Unlocked for {clientName || 'Client'}. Inquiry registered with HBZ Studio Directors.</span>
            </div>
            <button
              onClick={() => setStep('config')}
              className="pill-btn"
              style={{ background: '#ffffff', borderColor: '#c8e0ca', color: '#27592a', fontSize: '11px', fontWeight: 600 }}
            >
              ✏️ Edit Parameters
            </button>
          </div>

          {/* Hero Summary Card */}
          <div className="breakdown-hero-card">
            <div className="breakdown-hero-grid">
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 600 }}>
                  Comprehensive Architectural Cost Estimate
                </div>
                <div className="breakdown-hero-range">
                  {currency}{totalCostMin.toLocaleString()} – {currency}{totalCostMax.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                  Median Projected Budget: <strong style={{ color: '#ffffff' }}>{currency}{totalCost.toLocaleString()}</strong> for a total built-up footprint of <strong>{totalBuiltUpArea.toLocaleString()} sq.ft</strong> ({city.name}).
                </div>
              </div>
              <div className="breakdown-meta-grid">
                <div className="breakdown-meta-item">
                  <div className="label">Turnkey Rate</div>
                  <div className="val" style={{ color: '#f7e1b5' }}>
                    {currency}{effectiveRate.toLocaleString()}<span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}> / sq.ft</span>
                  </div>
                </div>
                <div className="breakdown-meta-item">
                  <div className="label">Living Area</div>
                  <div className="val">{builtUp.toLocaleString()} sq.ft</div>
                </div>
                <div className="breakdown-meta-item">
                  <div className="label">Floors</div>
                  <div className="val">{floors === 1 ? 'Ground Only' : `G+${floors - 1}`} ({floors} Levels)</div>
                </div>
                <div className="breakdown-meta-item">
                  <div className="label">Warranty</div>
                  <div className="val" style={{ color: '#a3e635' }}>{pkg.warranty.split(' ')[0]} {pkg.warranty.split(' ')[1]}</div>
                </div>
              </div>
            </div>
          </div>

          {/* BOQ Component Bifurcation */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div className="section-tag">BOQ Component Bifurcation</div>
                <h3 className="serif" style={{ fontSize: '22px', margin: '4px 0 0' }}>Line-by-Line Cost Distribution</h3>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Standardized Architectural &amp; Civil Engineering Cost Model
              </div>
            </div>

            {boq.map((item, idx) => (
              <div key={idx} className="boq-component-card">
                <div className="boq-component-header">
                  <div className="boq-component-title">
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>0{idx + 1}.</span>
                    <span>{item.category}</span>
                    <span className="pill-badge" style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', fontSize: '10px', padding: '2px 8px' }}>
                      {item.pct}%
                    </span>
                  </div>
                  <div className="boq-component-cost">{currency}{item.cost.toLocaleString()}</div>
                </div>
                <div className="boq-bar-track">
                  <div className="boq-bar-fill" style={{ width: `${item.pct * 2}%`, maxWidth: '100%' }}></div>
                </div>
                <div className="boq-component-desc">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Floor-wise Schedule Table */}
          <div className="calc-card" style={{ marginBottom: '36px' }}>
            <div className="section-tag">Spatial Schedule</div>
            <h3 className="serif" style={{ fontSize: '20px', margin: '4px 0 16px' }}>Floor-by-Floor Investment Distribution</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="floor-table">
                <thead>
                  <tr>
                    <th>Floor Level</th>
                    <th>Built-up Area</th>
                    <th>Share</th>
                    <th>Estimated Cost</th>
                    <th>Spatial Highlights &amp; Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {floorSchedule.map((fl) => (
                    <tr key={fl.floorNumber}>
                      <td><strong>{fl.name}</strong></td>
                      <td>{fl.area.toLocaleString()} sq.ft</td>
                      <td><span className="pill-badge" style={{ background: '#f4f3f0', fontSize: '11px', padding: '2px 6px' }}>{fl.pct}%</span></td>
                      <td><strong style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--accent-gold)' }}>{currency}{fl.cost.toLocaleString()}</strong></td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{fl.highlights}</td>
                    </tr>
                  ))}
                  {parkingCost > 0 && (
                    <tr style={{ background: 'var(--bg)' }}>
                      <td><strong>Covered Stilt / Ground Parking</strong></td>
                      <td>{parkingArea} sq.ft ({parkingBays} Bay(s))</td>
                      <td><span className="pill-badge" style={{ background: '#f4f3f0', fontSize: '11px', padding: '2px 6px' }}>Parking</span></td>
                      <td><strong style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--accent-gold)' }}>{currency}{parkingCost.toLocaleString()}</strong></td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PCC flooring, vehicle clearance staging, exterior drainage &amp; security gate provision</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Milestones Roadmap */}
          <div className="calc-card" style={{ marginBottom: '36px' }}>
            <div className="section-tag">Execution Roadmap</div>
            <h3 className="serif" style={{ fontSize: '20px', margin: '4px 0 6px' }}>Project Milestones &amp; Timeline</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Structured quality-controlled delivery workflow with 430+ site verification checkpoints.
            </p>
            <div className="milestones-grid">
              {milestones.map((m) => (
                <div key={m.phase} className="milestone-item">
                  <div className="milestone-phase">{m.phase}</div>
                  <div className="milestone-details">
                    <div className="milestone-time-badge">{m.weeks}</div>
                    <div className="milestone-title">{m.title}</div>
                    <div className="milestone-desc">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Specifications */}
          <div className="calc-card" style={{ marginBottom: '36px' }}>
            <div className="section-tag">Quality Assurance</div>
            <h3 className="serif" style={{ fontSize: '20px', margin: '4px 0 6px' }}>Curated Brand Specifications ({pkg.name})</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Only certified primary manufacturer materials are deployed across the turnkey build.
            </p>
            <div className="specs-brand-list">
              <div className="spec-brand-pill"><strong>Structural Steel:</strong> <span>{pkg.steel}</span></div>
              <div className="spec-brand-pill"><strong>Cement:</strong> <span>{pkg.cement}</span></div>
              <div className="spec-brand-pill"><strong>Flooring:</strong> <span>{pkg.flooring}</span></div>
              <div className="spec-brand-pill"><strong>Plumbing:</strong> <span>{pkg.plumbing}</span></div>
              <div className="spec-brand-pill"><strong>Electricals:</strong> <span>{pkg.electrical}</span></div>
              <div className="spec-brand-pill"><strong>Paints:</strong> <span>{pkg.paint}</span></div>
              <div className="spec-brand-pill" style={{ borderColor: '#2e7d32', color: '#2e7d32', background: '#e7f2e8' }}>
                <strong>Warranty:</strong> <span>{pkg.warranty}</span>
              </div>
            </div>
          </div>

          {/* Action Strip */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => typeof window !== 'undefined' && window.print()}
                className="btn-secondary"
                style={{ padding: '14px 20px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>🖨️</span> <span>Print / Save PDF Quotation</span>
              </button>
              <button
                type="button"
                onClick={() => setStep('config')}
                className="btn-secondary"
                style={{ padding: '14px 20px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>✏️</span> <span>Adjust Project Parameters</span>
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={triggerDirectorConsultation}
                className="btn-talk"
                style={{ padding: '14px 24px', fontSize: '14px' }}
              >
                <span>Schedule Consultation with Studio Director</span>
                <span className="arrow-circle">
                  <svg viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z" fill="currentColor"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
