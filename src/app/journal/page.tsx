'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredPosts } from '@/lib/store';

export default function JournalPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setPosts(getStoredPosts());
  }, []);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px 100px' }}>
      <div style={{ marginBottom: '40px' }}>
        <div className="section-tag" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 600 }}>
          Editorial Journal
        </div>
        <h1 className="serif" style={{ fontSize: '38px', margin: '8px 0 12px', fontFamily: 'var(--font-serif)' }}>
          Monographs, Technical Briefings &amp; Research
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '680px', lineHeight: 1.6 }}>
          In-depth technical investigations into structural engineering, material permanence, urban procurement velocity, and spatial silence.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
        {posts.map((post) => (
          <Link key={post.id} href={`/journal/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="calc-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.25s ease' }}>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}
                />
              )}
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-gold)', marginBottom: '6px' }}>
                {post.category} • {post.readTime}
              </div>
              <h3 className="serif" style={{ fontSize: '22px', margin: '0 0 12px', fontFamily: 'var(--font-serif)', flex: 1, lineHeight: 1.3 }}>
                {post.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 18px' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--border)', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{post.author}</span>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Read Monograph &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
