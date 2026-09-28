import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiMail, FiBook, FiEdit2, FiUser } from 'react-icons/fi'

function Profile() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  const roleColor = userData?.role === 'educator' ? '#7c6af7' : '#06d6a0'
  const roleBg = userData?.role === 'educator' ? 'rgba(124,106,247,0.12)' : 'rgba(6,214,160,0.12)'
  const roleBorder = userData?.role === 'educator' ? 'rgba(124,106,247,0.3)' : 'rgba(6,214,160,0.3)'

  return (
    <div style={{
      background: 'var(--color-bg)', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px 40px'
    }}>
      <div className="animate-fade-in-scale" style={{ width: '100%', maxWidth: 480 }}>
        {/* Back button */}
        <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm" style={{ marginBottom: 24, gap: 6 }}>
          <FiArrowLeft size={15} /> Back
        </button>

        {/* Profile Card */}
        <div style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden'
        }}>
          {/* Header gradient */}
          <div style={{
            height: 100,
            background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, rgba(6,214,160,0.4) 100%)',
            position: 'relative'
          }} />

          {/* Avatar */}
          <div style={{ position: 'relative', padding: '0 28px', marginTop: -48 }}>
            {userData?.photoUrl
              ? <img src={userData.photoUrl} alt="avatar" style={{
                  width: 80, height: 80, borderRadius: '50%', objectFit: 'cover',
                  border: '3px solid var(--color-surface)', boxShadow: 'var(--shadow-md)'
                }} />
              : <div style={{
                  width: 80, height: 80, borderRadius: '50%', fontSize: '1.75rem', fontWeight: 800, color: '#fff',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '3px solid var(--color-surface)', boxShadow: 'var(--shadow-md)'
                }}>
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
            }
          </div>

          {/* Info */}
          <div style={{ padding: '16px 28px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{userData?.name}</h1>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 10px', borderRadius: 'var(--radius-full)',
                  background: roleBg, border: `1px solid ${roleBorder}`,
                  color: roleColor, fontSize: '0.72rem', fontWeight: 700,
                  textTransform: 'capitalize', marginTop: 6
                }}>
                  <FiUser size={11} /> {userData?.role}
                </span>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => navigate("/editprofile")} style={{ gap: 6 }}>
                <FiEdit2 size={13} /> Edit Profile
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 20 }} />

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ProfileRow icon={<FiMail size={15} />} label="Email" value={userData?.email} />
              {userData?.description && (
                <ProfileRow icon={<FiUser size={15} />} label="Bio" value={userData.description} />
              )}
              <ProfileRow
                icon={<FiBook size={15} />}
                label="Enrolled Courses"
                value={
                  <span style={{
                    display: 'inline-flex', padding: '2px 10px', borderRadius: 'var(--radius-full)',
                    background: 'rgba(124,106,247,0.1)', color: 'var(--color-primary-light)',
                    fontSize: '0.8rem', fontWeight: 700, border: '1px solid rgba(124,106,247,0.2)'
                  }}>
                    {userData?.enrolledCourses?.length || 0}
                  </span>
                }
              />
            </div>

            {/* My Courses CTA */}
            {userData?.enrolledCourses?.length > 0 && (
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/enrolledcourses")}
                style={{ width: '100%', marginTop: 24, gap: 8 }}
              >
                <FiBook size={15} /> View My Courses
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 'var(--radius-sm)', flexShrink: 0, marginTop: 1,
        background: 'var(--color-surface-3)', border: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-text-muted)'
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: 3 }}>{label}</p>
        {typeof value === 'string'
          ? <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{value}</p>
          : value
        }
      </div>
    </div>
  )
}

export default Profile
