import React, { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux'
import { SiViaplay } from "react-icons/si"
import { useNavigate } from 'react-router-dom'

function Cardspage() {
  const [popularCourses, setPopularCourses] = useState([])
  const { courseData } = useSelector(state => state.course)
  const navigate = useNavigate()

  useEffect(() => {
    setPopularCourses(courseData.slice(0, 6))
  }, [courseData])

  if (popularCourses.length === 0) return null

  return (
    <section style={{ padding: '80px 0', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 'var(--radius-full)',
            background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)',
            color: 'var(--color-accent-light)', fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16
          }}>
            Most Popular
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800,
            letterSpacing: '-0.02em', color: 'var(--color-text)', marginBottom: 12
          }}>
            Our Popular Courses
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.
          </p>
        </div>

        {/* Course grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginBottom: 40 }}>
          {popularCourses.map((item, index) => (
            <div key={index} className={`animate-fade-in stagger-${Math.min(index + 1, 6)}`} style={{ opacity: 0 }}>
              <Card id={item._id} thumbnail={item.thumbnail} title={item.title}
                price={item.price} category={item.category} reviews={item.reviews} />
            </div>
          ))}
        </div>

        {/* View all button */}
        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate("/allcourses")}
            style={{ gap: 10 }}
          >
            View All Courses <SiViaplay />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cardspage
