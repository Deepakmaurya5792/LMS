import React from 'react'
import about from "../assets/about.jpg"
import { BiSolidBadgeCheck } from "react-icons/bi"

const FEATURES = [
  { label: 'Simplified Learning', desc: 'Easy-to-follow lessons' },
  { label: 'Expert Instructors', desc: 'Industry professionals' },
  { label: 'Big Experience', desc: 'Years of expertise' },
  { label: 'Lifetime Access', desc: 'Learn at your pace' },
]

function About() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--color-surface-2)' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', flexDirection: 'column', gap: 60,
        alignItems: 'center'
      }} className="lg:flex-row">

        {/* Left - Image */}
        <div style={{ position: 'relative', flexShrink: 0 }} className="lg:w-2/5 w-full">
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(124,106,247,0.2), rgba(6,214,160,0.1))',
            transform: 'rotate(-3deg)', zIndex: 0
          }} />
          <img
            src={about}
            alt="About us"
            style={{
              width: '100%', borderRadius: 'var(--radius-xl)', objectFit: 'cover',
              position: 'relative', zIndex: 1,
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)'
            }}
          />
          {/* Floating badge */}
          <div style={{
            position: 'absolute', bottom: 20, left: -20, zIndex: 2,
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)', padding: '14px 20px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1 }}>10K+</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginTop: 3 }}>Happy Students</div>
          </div>
        </div>

        {/* Right - Content */}
        <div style={{ flex: 1 }}>
          <p style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 'var(--radius-full)',
            background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)',
            color: 'var(--color-accent-light)', fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16
          }}>
            About Us
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800,
            letterSpacing: '-0.02em', color: 'var(--color-text)', marginBottom: 16, lineHeight: 1.2
          }}>
            We Are Maximizing Your Learning Growth
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 32, fontSize: '0.95rem' }}>
            We provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently.
          </p>

          {/* Features grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {FEATURES.map((feat, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '14px 16px', borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <BiSolidBadgeCheck size={20} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: 2 }}>{feat.label}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
