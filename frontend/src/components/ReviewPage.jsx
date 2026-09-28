import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { useSelector } from 'react-redux'

function ReviewPage() {
  const [latestReview, setLatestReview] = useState([])
  const { allReview } = useSelector(state => state.review)

  useEffect(() => {
    setLatestReview(allReview.slice(0, 6))
  }, [allReview])

  if (latestReview.length === 0) return null

  return (
    <section style={{ padding: '80px 0', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 'var(--radius-full)',
            background: 'rgba(124,106,247,0.1)', border: '1px solid rgba(124,106,247,0.2)',
            color: 'var(--color-primary-light)', fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16
          }}>
            Student Reviews
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800,
            letterSpacing: '-0.02em', color: 'var(--color-text)', marginBottom: 12
          }}>
            Real Reviews from Real Learners
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Discover how Virtual Courses is transforming learning experiences through real feedback from students worldwide.
          </p>
        </div>

        {/* Reviews grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
          {latestReview.map((item, index) => (
            <div key={index} className={`animate-fade-in stagger-${Math.min(index + 1, 6)}`} style={{ opacity: 0 }}>
              <ReviewCard
                rating={item.rating}
                image={item.user?.photoUrl}
                text={item.comment}
                name={item.user?.name}
                role={item.user?.role}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewPage
