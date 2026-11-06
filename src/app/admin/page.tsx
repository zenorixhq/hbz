'use client';

import React, { useState, useEffect } from 'react';
import {
  getStoredLeads,
  updateLeadStatus,
  updateLeadNote,
  deleteLead,
  getStoredProjects,
  saveStoredProjects,
  getStoredPosts,
  saveStoredPosts,
  Lead
} from '@/lib/store';

export default function AdminPage() {
  const [adminTab, setAdminTab] = useState<'leads' | 'projects' | 'posts' | 'raw'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  // Leads filters
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected project for scheme plates
  const [activeProjectForPlates, setActiveProjectForPlates] = useState<any | null>(null);
  const [newPlateUrl, setNewPlateUrl] = useState('');
  const [newPlateTitle, setNewPlateTitle] = useState('');

  useEffect(() => {
    setLeads(getStoredLeads());
    setProjects(getStoredProjects());
    setPosts(getStoredPosts());
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => (l.status || 'New') === 'New').length;
  const activeLeads = leads.filter((l) => ['Contacted', 'Meeting Booked', 'Proposal Sent'].includes(l.status || '')).length;
  const archivedLeads = leads.filter((l) => l.status === 'Archived').length;

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = filterStatus === 'All' ? true : l.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;
    const nameMatch = (l.name || '').toLowerCase().includes(q);
    const phoneMatch = (l.phone || '').toLowerCase().includes(q);
    const sourceMatch = (l.source || '').toLowerCase().includes(q);
    const detailsMatch = (l.details || '').toLowerCase().includes(q);
    return matchesStatus && (nameMatch || phoneMatch || sourceMatch || detailsMatch);
  });

  const getLeadOrigin = (lead: Lead) => {
    const src = String(lead.source || '').toLowerCase();
    const details = String(lead.details || '').toLowerCase();
    const combined = `${src} ${details}`;

    if (combined.includes('journal') || combined.includes('monograph')) {
      return { type: 'Journal Unlock', badge: 'background:#f2ece1;color:#6d5635;border:1px solid #dfd3c0;', icon: '📖' };
    }
    if (combined.includes('calculator') || combined.includes('turnkey') || combined.includes('estimator') || combined.includes('brick & bolt')) {
      return { type: 'Calculator Estimator', badge: 'background:#e7f2e8;color:#27592a;border:1px solid #c8e0ca;', icon: '🧮' };
    }
    if (combined.includes('project') || combined.includes('scheme') || (lead.post_id && String(lead.post_id).startsWith('p'))) {
      return { type: 'Project Scheme', badge: 'background:#e8eff8;color:#284a75;border:1px solid #cad9ee;', icon: '🏛️' };
    }
    return { type: 'Direct Consultation', badge: 'background:#f4f3f0;color:#55524d;border:1px solid #e0ded9;', icon: '✉️' };
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const handleNoteEdit = (id: string, currentNote: string) => {
    const promptVal = prompt('Edit partner consultation note:', currentNote || '');
    if (promptVal !== null) {
      const updated = updateLeadNote(id, promptVal);
      setLeads(updated);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this client inquiry permanently?')) {
      const updated = deleteLead(id);
      setLeads(updated);
    }
  };

  const exportCSV = () => {
    if (!leads.length) {
      alert('No leads to export.');
      return;
    }
    const headers = ['ID', 'Name', 'Phone/Contact', 'Source', 'Status', 'Details', 'Notes', 'Created At'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${(l.status || 'New').replace(/"/g, '""')}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.created_at || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hbz_client_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Scheme Plate to project
  const handleAddPlate = () => {
    if (!activeProjectForPlates || !newPlateUrl.trim()) return;
    const updatedProjects = projects.map((p) => {
      if (p.id === activeProjectForPlates.id) {
        const plates = p.plates || [];
        return {
          ...p,
          plates: [
            ...plates,
            {
              url: newPlateUrl.trim(),
              title: newPlateTitle.trim() || `Scheme Plate ${plates.length + 1}`,
              ratio: '16/9',
              orientation: 'landscape',
              dims: '1920 × 1080 px'
            }
          ]
        };
      }
      return p;
    });
    setProjects(updatedProjects);
    saveStoredProjects(updatedProjects);
    const current = updatedProjects.find((p) => p.id === activeProjectForPlates.id);
    setActiveProjectForPlates(current);
    setNewPlateUrl('');
    setNewPlateTitle('');
  };

  const handleRemovePlate = (plateIdx: number) => {
    if (!activeProjectForPlates) return;
    const updatedProjects = projects.map((p) => {
      if (p.id === activeProjectForPlates.id) {
        const plates = [...(p.plates || [])];
        plates.splice(plateIdx, 1);
        return { ...p, plates };
      }
      return p;
    });
    setProjects(updatedProjects);
    saveStoredProjects(updatedProjects);
    const current = updatedProjects.find((p) => p.id === activeProjectForPlates.id);
    setActiveProjectForPlates(current);
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div className="section-tag" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 600 }}>
            Executive Atelier Portal
          </div>
          <h1 className="serif" style={{ margin: '6px 0 0', fontSize: '32px', fontFamily: 'var(--font-serif)' }}>
            HBZ Studio Director CMS
          </h1>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`pill-btn ${adminTab === 'leads' ? 'active' : ''}`}
            onClick={() => setAdminTab('leads')}
            style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600 }}
          >
            📋 Client Leads ({totalLeads})
          </button>
          <button
            className={`pill-btn ${adminTab === 'projects' ? 'active' : ''}`}
            onClick={() => setAdminTab('projects')}
            style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600 }}
          >
            🏛️ Architectural Projects ({projects.length})
          </button>
          <button
            className={`pill-btn ${adminTab === 'posts' ? 'active' : ''}`}
            onClick={() => setAdminTab('posts')}
            style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600 }}
          >
            📖 Journal Monographs ({posts.length})
          </button>
        </div>
      </div>

      {/* ── LEADS VIEW ── */}
      {adminTab === 'leads' && (
        <div>
          {/* Pipeline Metric Counters */}
          <div className="pipeline-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div className="pipeline-stat-box" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '18px 20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Inquiries</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700 }}>{totalLeads}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Active database inquiries</div>
            </div>
            <div className="pipeline-stat-box" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '18px 20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '4px' }}>🟢 New Uncontacted</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: '#2e7d32' }}>{newLeads}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Awaiting partner follow-up</div>
            </div>
            <div className="pipeline-stat-box" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '18px 20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '4px' }}>🔵 Active Dialogue</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--accent-gold)' }}>{activeLeads}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Contacted, booked or proposal</div>
            </div>
            <div className="pipeline-stat-box" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '18px 20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '4px' }}>⚪ Archived / Concluded</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700 }}>{archivedLeads}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Completed or closed files</div>
            </div>
          </div>

          {/* Action & Filter Strip */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Filter:</span>
              {['All', 'New', 'Contacted', 'Meeting Booked', 'Proposal Sent', 'Archived'].map((status) => (
                <button
                  key={status}
                  className={`pill-btn ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                  style={{ padding: '4px 12px', fontSize: '12px' }}
                >
                  {status}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search by client, phone, details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '8px 14px', fontSize: '13px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', width: '260px' }}
              />
              <button
                onClick={exportCSV}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>📥</span> <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <table className="floor-table" style={{ width: '100%', margin: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: '180px' }}>Client &amp; Contact</th>
                  <th style={{ width: '150px' }}>Inquiry Origin</th>
                  <th style={{ width: '150px' }}>Pipeline Status</th>
                  <th>Brief Details &amp; Estimator Specifications</th>
                  <th style={{ width: '180px' }}>Partner Notes</th>
                  <th style={{ width: '100px', textAlign: 'right' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((l) => {
                  const origin = getLeadOrigin(l);
                  return (
                    <tr key={l.id}>
                      <td>
                        <strong>{l.name}</strong>
                        <div style={{ fontSize: '12px', color: 'var(--accent-gold)', marginTop: '2px' }}>{l.phone}</div>
                      </td>
                      <td>
                        <span className="pill-badge" style={{ ...origin, fontSize: '11px', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                          <span>{origin.icon}</span> <span>{origin.type}</span>
                        </span>
                      </td>
                      <td>
                        <select
                          value={l.status || 'New'}
                          onChange={(e) => handleStatusChange(l.id, e.target.value)}
                          style={{ padding: '6px 8px', fontSize: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}
                        >
                          <option value="New">🟢 New</option>
                          <option value="Contacted">🔵 Contacted</option>
                          <option value="Meeting Booked">🟡 Meeting Booked</option>
                          <option value="Proposal Sent">🟣 Proposal Sent</option>
                          <option value="Archived">⚪ Archived</option>
                        </select>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, whiteSpace: 'pre-line', maxWidth: '340px' }}>
                        {l.details}
                      </td>
                      <td style={{ fontSize: '12px' }}>
                        <span
                          onClick={() => handleNoteEdit(l.id, l.notes || '')}
                          style={{ cursor: 'pointer', color: l.notes ? 'var(--text)' : '#999', borderBottom: '1px dashed var(--border-strong)', display: 'inline-block' }}
                          title="Click to edit notes"
                        >
                          {l.notes ? `📝 ${l.notes}` : '<em>+ Add note</em>'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--text-muted)' }}>
                        <div>{l.created_at ? new Date(l.created_at).toLocaleDateString() : 'Recent'}</div>
                        <button
                          onClick={() => handleDelete(l.id)}
                          style={{ background: 'none', border: 'none', color: '#e53e3e', fontSize: '11px', cursor: 'pointer', marginTop: '4px', textDecoration: 'underline' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PROJECTS CMS VIEW ── */}
      {adminTab === 'projects' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {projects.map((p) => (
              <div key={p.id} className="calc-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <img
                  src={p.image_url}
                  alt={p.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}
                />
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-gold)' }}>
                  Scheme {p.scheme_num || p.id} • {p.location}
                </div>
                <h3 className="serif" style={{ fontSize: '18px', margin: '4px 0 6px' }}>{p.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', flex: 1, lineHeight: 1.5 }}>{p.brief}</p>
                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    📷 {(p.plates || []).length} Scheme Plate(s)
                  </span>
                  <button
                    onClick={() => setActiveProjectForPlates(p)}
                    className="pill-btn active"
                    style={{ fontSize: '12px', padding: '6px 14px' }}
                  >
                    Manage Scheme Plates
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Scheme Plates Manager Modal */}
          {activeProjectForPlates && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(21,20,19,0.75)', backdropFilter: 'blur(6px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px', maxWidth: '780px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div>
                    <h3 className="serif" style={{ margin: 0, fontSize: '20px' }}>
                      Photography Plates Manager: {activeProjectForPlates.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                      Add or remove multi-image gallery plates displayed on the individual project page.
                    </p>
                  </div>
                  <button onClick={() => setActiveProjectForPlates(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
                    &times;
                  </button>
                </div>

                {/* Plates Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                  {(activeProjectForPlates.plates || []).map((pl: any, idx: number) => (
                    <div key={idx} style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                      <img src={pl.url} alt={pl.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      <div style={{ padding: '8px', fontSize: '11px' }}>
                        <div style={{ fontWeight: 600 }}>{pl.title}</div>
                        <button
                          onClick={() => handleRemovePlate(idx)}
                          style={{ color: '#d32f2f', background: 'none', border: 'none', padding: 0, fontSize: '11px', cursor: 'pointer', marginTop: '4px' }}
                        >
                          Remove Plate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Plate Input */}
                <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Add New Photography Plate</div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input
                      type="url"
                      placeholder="Image URL (e.g. https://images.unsplash.com/...)"
                      value={newPlateUrl}
                      onChange={(e) => setNewPlateUrl(e.target.value)}
                      style={{ flex: 1, minWidth: '240px', padding: '8px 12px', fontSize: '13px' }}
                    />
                    <input
                      type="text"
                      placeholder="Plate Title / Caption"
                      value={newPlateTitle}
                      onChange={(e) => setNewPlateTitle(e.target.value)}
                      style={{ width: '220px', padding: '8px 12px', fontSize: '13px' }}
                    />
                    <button
                      onClick={handleAddPlate}
                      className="btn-talk"
                      style={{ padding: '8px 18px', fontSize: '13px' }}
                    >
                      + Add Plate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── JOURNAL POSTS VIEW ── */}
      {adminTab === 'posts' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {posts.map((post) => (
            <div key={post.id} className="calc-card">
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-gold)' }}>
                {post.category} • {post.readTime}
              </div>
              <h3 className="serif" style={{ fontSize: '18px', margin: '4px 0 8px' }}>{post.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{post.excerpt}</p>
              <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>By {post.author}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
