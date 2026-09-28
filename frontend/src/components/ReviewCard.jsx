import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import img from '../assets/empty.jpg'

const ReviewCard = ({ text, name, image, rating, role }) => {
  return (
    <div style={{
      width: 300, flexShrink: 0,
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)', padding: '22px',
      transition: 'all 0.25s ease'
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
        {Array(5).fill(0).map((_, i) => (
          <span key={i} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>
            {i < rating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>

      {/* Text */}
      <p style={{
        color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 18,
        display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden'
      }}>
        "{text}"
      </p>

      {/* Reviewer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid var(--color-border)', paddingTop: 14 }}>
        {image
          ? <img src={image} alt={name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-border)' }} />
          : <div style={{
              width: 36, height: 36, borderRadius: '50%', fontSize: '0.9rem', fontWeight: 700, color: '#fff',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)'
            }}>
              {name?.slice(0, 1)?.toUpperCase()}
            </div>
        }
        <div>
          <h4 style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.85rem' }}>{name}</h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{role}</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
