import React from 'react'
import { useSelector } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import img from "../../assets/empty.jpg"
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiBook, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'

function Dashboard() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const { creatorCourseData } = useSelector((state) => state.course)

  const courseProgressData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures.length || 0
  })) || []

  const enrollData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0
  })) || []

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0
    const courseRevenue = course.price ? course.price * studentCount : 0
    return sum + courseRevenue
  }, 0) || 0

  const totalStudents = creatorCourseData?.reduce((sum, course) => sum + (course.enrolledStudents?.length || 0), 0) || 0
  const totalLectures = creatorCourseData?.reduce((sum, course) => sum + (course.lectures?.length || 0), 0) || 0

  const stats = [
    { label: 'Total Courses', value: creatorCourseData?.length || 0, icon: <FiBook size={20} />, color: '#7c6af7' },
    { label: 'Total Students', value: totalStudents, icon: <FiUsers size={20} />, color: '#06d6a0' },
    { label: 'Total Lectures', value: totalLectures, icon: <FiTrendingUp size={20} />, color: '#f59e0b' },
    { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, icon: <FiDollarSign size={20} />, color: '#3b82f6' },
  ]

  const customTooltipStyle = {
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    fontSize: '0.8rem'
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: 24, gap: 8 }}
        >
          <FiArrowLeft size={16} /> Back to Home
        </button>

        {/* Welcome section */}
        <div className="animate-fade-in" style={{
          background: 'linear-gradient(135deg, var(--color-surface) 0%, rgba(124,106,247,0.08) 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 32px',
          marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {userData?.photoUrl
              ? <img src={userData.photoUrl} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-border-strong)' }} />
              : <div style={{
                  width: 64, height: 64, borderRadius: '50%', fontSize: '1.5rem', fontWeight: 700, color: '#fff',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
            }
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <HiSparkles size={16} style={{ color: 'var(--color-primary-light)' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Educator Dashboard</span>
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                Welcome back, {userData?.name || "Educator"} 👋
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                {userData?.description || "Start creating amazing courses for your students!"}
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/courses")}>
            <FiBook size={16} /> Manage Courses
          </button>
        </div>

        {/* Stats Grid */}
        <div className="animate-fade-in stagger-1" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--radius-md)', flexShrink: 0,
                background: `${stat.color}1a`, border: `1px solid ${stat.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color
              }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{stat.label}</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="animate-fade-in stagger-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {/* Course Progress */}
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)', padding: 24
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>Course Progress</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 20 }}>Lectures per course</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={courseProgressData} margin={{ left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'rgba(241,241,245,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(241,241,245,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: 'rgba(124,106,247,0.06)' }} />
                <Bar dataKey="lectures" fill="url(#lectureGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="lectureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c6af7" stopOpacity={1} />
                    <stop offset="100%" stopColor="#7c6af7" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student Enrollment */}
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)', padding: 24
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>Student Enrollment</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 20 }}>Students per course</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={enrollData} margin={{ left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'rgba(241,241,245,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(241,241,245,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: 'rgba(6,214,160,0.06)' }} />
                <Bar dataKey="enrolled" fill="url(#enrollGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06d6a0" stopOpacity={1} />
                    <stop offset="100%" stopColor="#06d6a0" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
