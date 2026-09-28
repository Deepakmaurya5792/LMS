import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import defaultImg from "../assets/htmlThumb.webp"

const CourseCard = ({ thumbnail, title, category, price, id, reviews }) => {
  const navigate = useNavigate()
  const [imgSrc, setImgSrc] = useState(thumbnail || defaultImg)

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0
    const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0)
    return (total / reviews.length).toFixed(1)
  }

  const avgRating = calculateAverageRating(reviews)

  const categoryColors = {
    'Web Development': '#3b82f6',
    'AI/ML': '#8b5cf6',
    'Data Science': '#06d6a0',
    'App Development': '#f59e0b',
    'Ethical Hacking': '#ef4444',
    'UI UX Designing': '#ec4899',
    'Data Analytics': '#14b8a6',
    'AI Tools': '#a855f7',
    'Others': '#6b7280'
  }
  const catColor = categoryColors[category] || '#7c6af7'

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      style={{
        width: '100%',
        maxWidth: 320,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4), 0 0 20px rgba(124,106,247,0.15)'
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      {/* Thumbnail Container */}
      <div style={{
        width: '100%',
        height: 165,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-surface-3) 100%)'
      }}>
        <img
          src={imgSrc}
          alt={title || "Course thumbnail"}
          onError={() => setImgSrc(defaultImg)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Category Badge Overlay */}
        {category && (
          <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
            <span style={{
              display: 'inline-flex',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(17, 17, 24, 0.85)',
              border: `1px solid ${catColor}66`,
              color: catColor,
              fontSize: '0.7rem',
              fontWeight: 700,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <h2 style={{
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          lineHeight: 1.4,
          marginBottom: 14,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.8em'
        }}>
          {title}
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Price */}
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
            {price ? `₹${price}` : <span style={{ color: 'var(--color-accent-light)', fontSize: '0.85rem', fontWeight: 700 }}>Free</span>}
          </span>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(245,158,11,0.1)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <FaStar style={{ color: '#f59e0b', fontSize: '0.75rem' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>{avgRating > 0 ? avgRating : "New"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard

