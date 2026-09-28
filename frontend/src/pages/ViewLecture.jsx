import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiPlay, FiCheckCircle, FiList } from 'react-icons/fi'

function ViewLecture() {
  const { courseId } = useParams()
  const { courseData } = useSelector((state) => state.course)
  const { userData } = useSelector((state) => state.user)
  const selectedCourse = courseData?.find((course) => course._id === courseId)

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  )
  const navigate = useNavigate()
  const courseCreator = userData?._id === selectedCourse?.creator ? userData : null

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 64, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        height: 56, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16, flexShrink: 0
      }}>
        <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
          <FiArrowLeft size={15} />
        </button>
        <div style={{ height: 20, width: 1, background: 'var(--color-border)' }} />
        <h1 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedCourse?.title}
        </h1>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <span className="badge badge-neutral">{selectedCourse?.category}</span>
          <span className="badge badge-primary">{selectedCourse?.level}</span>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Video area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {/* Video player */}
          <div style={{ background: '#000', position: 'relative', aspectRatio: '16/9', width: '100%' }}>
            {selectedLecture?.videoUrl ? (
              <video
                src={selectedLecture.videoUrl}
                controls
                style={{ width: '100%', height: '100%', display: 'block' }}
                crossOrigin="anonymous"
              />
            ) : (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 16
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <FiPlay size={24} style={{ color: 'rgba(255,255,255,0.5)' }} />
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
                  Select a lecture to start watching
                </p>
              </div>
            )}
          </div>

          {/* Lecture info */}
          {selectedLecture && (
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>
                {selectedLecture.lectureTitle}
              </h2>
            </div>
          )}

          {/* Instructor info */}
          {courseCreator && (
            <div style={{ padding: '20px 24px' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: 14 }}>
                Instructor
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {courseCreator.photoUrl
                  ? <img src={courseCreator.photoUrl} alt="" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-border-strong)' }} />
                  : <div style={{
                      width: 52, height: 52, borderRadius: '50%', fontSize: '1.1rem', fontWeight: 700, color: '#fff',
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {courseCreator.name?.slice(0, 1).toUpperCase()}
                    </div>
                }
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.95rem' }}>{courseCreator.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 3 }}>
                    {courseCreator.description || 'Course Instructor'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Lecture list */}
        <div style={{
          width: 320, flexShrink: 0, borderLeft: '1px solid var(--color-border)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          background: 'var(--color-surface)'
        }} className="hidden md:flex">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FiList size={16} style={{ color: 'var(--color-text-muted)' }} />
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)' }}>
              Course Content
            </h2>
            <span className="badge badge-neutral" style={{ marginLeft: 'auto' }}>
              {selectedCourse?.lectures?.length || 0}
            </span>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {selectedCourse?.lectures?.length > 0 ? (
              selectedCourse.lectures.map((lecture, index) => {
                const isActive = selectedLecture?._id === lecture._id
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedLecture(lecture)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: isActive ? 'rgba(124,106,247,0.1)' : 'transparent',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.15s', fontFamily: 'inherit',
                      borderLeft: isActive ? '2px solid var(--color-primary)' : '2px solid transparent'
                    }}
                    onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: isActive ? 'var(--color-primary-glow)' : 'var(--color-surface-3)',
                      border: `1px solid ${isActive ? 'rgba(124,106,247,0.4)' : 'var(--color-border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                      fontSize: '0.72rem', fontWeight: 700
                    }}>
                      {isActive ? <FiPlay size={11} /> : index + 1}
                    </div>
                    <span style={{ flex: 1, fontSize: '0.8rem', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                      {lecture.lectureTitle}
                    </span>
                  </button>
                )
              })
            ) : (
              <div style={{ padding: 24, textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>No lectures available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewLecture
