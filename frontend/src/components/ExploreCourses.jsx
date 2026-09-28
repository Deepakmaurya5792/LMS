import React from 'react'
import { SiViaplay } from "react-icons/si"
import { TbDeviceDesktopAnalytics, TbBrandOpenai } from "react-icons/tb"
import { LiaUikit } from "react-icons/lia"
import { MdAppShortcut } from "react-icons/md"
import { FaHackerrank } from "react-icons/fa"
import { SiGoogledataproc, SiOpenaigym } from "react-icons/si"
import { BsClipboardDataFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { icon: <TbDeviceDesktopAnalytics size={28} />, label: 'Web Dev', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { icon: <LiaUikit size={28} />, label: 'UI UX', color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
  { icon: <MdAppShortcut size={26} />, label: 'App Dev', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { icon: <FaHackerrank size={26} />, label: 'Hacking', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  { icon: <TbBrandOpenai size={28} />, label: 'AI / ML', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { icon: <SiGoogledataproc size={24} />, label: 'Data Sci', color: '#06d6a0', bg: 'rgba(6,214,160,0.1)' },
  { icon: <BsClipboardDataFill size={24} />, label: 'Analytics', color: '#14b8a6', bg: 'rgba(20,184,166,0.1)' },
  { icon: <SiOpenaigym size={24} />, label: 'AI Tools', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
]

function ExploreCourses() {
  const navigate = useNavigate()

  return (
    <section style={{ padding: '80px 0', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 64,
          alignItems: 'center'
        }} className="lg:flex-row">

          {/* Left text */}
          <div style={{ maxWidth: 360 }}>
            <p style={{
              display: 'inline-block', padding: '4px 14px', borderRadius: 'var(--radius-full)',
              background: 'rgba(124,106,247,0.1)', border: '1px solid rgba(124,106,247,0.2)',
              color: 'var(--color-primary-light)', fontSize: '0.75rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16
            }}>
              Categories
            </p>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800,
              letterSpacing: '-0.02em', color: 'var(--color-text)', marginBottom: 14, lineHeight: 1.2
            }}>
              Explore Our Courses
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
              From Web Development to AI and Machine Learning, we cover the most in-demand skills to future-proof your career.
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/allcourses")}
              style={{ gap: 10 }}
            >
              Explore All <SiViaplay size={14} />
            </button>
          </div>

          {/* Right grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, minmax(100px, 120px))',
            gap: 14, flex: 1, justifyContent: 'center'
          }}>
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className={`category-item animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                onClick={() => navigate("/allcourses")}
                style={{ opacity: 0 }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 'var(--radius-md)',
                  background: cat.bg, border: `1px solid ${cat.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cat.color
                }}>
                  {cat.icon}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreCourses
