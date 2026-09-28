import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiPlay } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'

function EnrolledCourse() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm" style={{ marginBottom: 16, gap: 6 }}>
            <FiArrowLeft size={15} /> Back to Home
          </button>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 6 }}>
            My Enrolled Courses
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            {userData?.enrolledCourses?.length || 0} course{userData?.enrolledCourses?.length !== 1 ? 's' : ''} enrolled
          </p>
        </div>

        {/* Content */}
        {userData?.enrolledCourses?.length === 0 ? (
          <div className="animate-fade-in-scale" style={{
            textAlign: 'center', padding: '80px 24px',
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 'var(--radius-xl)',
              background: 'var(--color-surface-3)', border: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <HiSparkles size={28} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)' }}>No Courses Yet</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', maxWidth: 320 }}>
              You haven't enrolled in any course yet. Browse our catalog and start learning today!
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/allcourses")} style={{ marginTop: 8 }}>
              Browse Courses
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {userData.enrolledCourses.map((course, index) => (
              <div
                key={course._id || index}
                className={`animate-fade-in stagger-${Math.min(index + 1, 6)}`}
                style={{
                  background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                  transition: 'all 0.25s ease', opacity: 0
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                  e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                <div style={{ width: '100%', height: 160, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)'
                  }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                    <span style={{
                      padding: '2px 10px', borderRadius: 'var(--radius-full)',
                      background: 'rgba(124,106,247,0.8)', backdropFilter: 'blur(8px)',
                      color: '#fff', fontSize: '0.7rem', fontWeight: 700
                    }}>
                      {course.category}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '16px 18px 20px' }}>
                  <h2 style={{
                    fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 6,
                    lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {course.title}
                  </h2>
                  {course.level && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: 14 }}>{course.level}</p>
                  )}
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', gap: 8 }}
                    onClick={() => navigate(`/viewlecture/${course._id}`)}
                  >
                    <FiPlay size={14} /> Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EnrolledCourse
