'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getStoredPosts } from '@/lib/store';

export default function SingleJournalPage() {
  const params = useParams();
  const postId = params?.id as string;
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    const all = getStoredPosts();
    const found = all.find((p) => p.id === postId) || all[0];
    setPost(found);
  }, [postId]);

  if (!post) {
    return (
      <div style={{ padding: '160px 24px', textAlign: 'center' }}>
        <p>Loading monograph dossier...</p>
      </div>
    );
  }

  const openContact = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-contact-modal', {
          detail: { context: `Monograph Consultation: ${post.title}` }
        })
      );
    }
  };

  return (
    <article style={{ maxWidth: '880px', margin: '0 auto', padding: '130px 24px 100px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '28px' }}>
        <Link href="/journal" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>
          &larr; Back to Editorial Journal
        </Link>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <div className="section-tag" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', marginBottom: '8px', fontWeight: 600 }}>
          {post.category} • {post.readTime}
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', lineHeight: 1.2, margin: '0 0 16px', fontFamily: 'var(--font-serif)' }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date || 'October 2026'}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.image_url && (
        <div style={{ marginBottom: '40px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <img src={post.image_url} alt={post.title} style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }} />
        </div>
      )}

      {/* Body */}
      <div
        className="monograph-body"
        style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-line' }}
      >
        {post.body}
      </div>

      {/* Bottom Consultation Box */}
      <div style={{ marginTop: '64px', padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '18px' }}>
        <div>
          <h4 className="serif" style={{ fontSize: '20px', margin: '0 0 6px', fontFamily: 'var(--font-serif)' }}>
            Commission Studio Research or Consultation
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Connect with our engineering and spatial planning partners regarding this monograph.
          </p>
        </div>
        <button onClick={openContact} className="btn-talk" style={{ padding: '12px 24px', fontSize: '13px' }}>
          <span>Consult Practice Partner</span>
          <span className="arrow-circle">&rarr;</span>
        </button>
      </div>
    </article>
  );
}
