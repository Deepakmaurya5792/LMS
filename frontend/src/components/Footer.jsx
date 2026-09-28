import React from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.jpg"
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  const navigate = useNavigate()

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Courses', path: '/allcourses' },
    { label: 'Sign In', path: '/login' },
    { label: 'My Profile', path: '/profile' },
  ]

  const categories = ['Web Development', 'AI/ML', 'Data Science', 'UI/UX Design', 'App Development', 'Ethical Hacking']

  return (
    <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      {/* Main footer */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src={logo} alt="Logo" style={{ height: 36, width: 36, borderRadius: 8, border: '1px solid var(--color-border-strong)', objectFit: 'cover' }} />
              <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>Virtual Courses</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 240 }}>
              AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {[FiGithub, FiTwitter, FiLinkedin].map((Icon, i) => (
                <button key={i} style={{
                  width: 34, height: 34, borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  background: 'var(--color-surface-3)', border: '1px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-text-muted)', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.color = 'var(--color-text)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 16 }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigate(link.path)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--color-text-secondary)', fontSize: '0.875rem',
                      fontFamily: 'inherit', padding: 0, transition: 'color 0.15s',
                      display: 'flex', alignItems: 'center', gap: 6
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 16 }}>Categories</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {categories.map((cat, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', cursor: 'pointer', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                  onClick={() => navigate('/allcourses')}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 8
      }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
          © {new Date().getFullYear()} Virtual Courses. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Service'].map((item, i) => (
            <span key={i} style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
