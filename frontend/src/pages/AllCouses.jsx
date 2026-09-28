import React, { useEffect, useState } from 'react'
import Card from "../components/Card.jsx"
import { FiArrowLeft, FiFilter, FiX } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import ai from '../assets/SearchAi.png'
import { useSelector } from 'react-redux'
import { HiSparkles } from 'react-icons/hi2'

const ALL_CATEGORIES = [
  'App Development', 'AI/ML', 'AI Tools', 'Data Science',
  'Data Analytics', 'Ethical Hacking', 'UI UX Designing', 'Web Development', 'Others'
]

function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [filterCourses, setFilterCourses] = useState([])
  const { courseData } = useSelector(state => state.course)

  const toggleCategory = (catValue) => {
    if (category.includes(catValue)) {
      setCategory(prev => prev.filter(item => item !== catValue))
    } else {
      setCategory(prev => [...prev, catValue])
    }
  }

  const applyFilter = () => {
    let courseCopy = Array.isArray(courseData) ? courseData.slice() : []
    if (category.length > 0) {
      courseCopy = courseCopy.filter(item => category.includes(item.category))
    }
    setFilterCourses(courseCopy)
  }

  useEffect(() => { setFilterCourses(courseData || []) }, [courseData])
  useEffect(() => { applyFilter() }, [category])

  const clearFilters = () => setCategory([])

  return (
    <div className="all-courses-wrapper">
      <Nav />

      {/* Mobile filter toggle */}
      <button
        onClick={() => setIsSidebarVisible(prev => !prev)}
        className="btn btn-secondary btn-sm mobile-filter-toggle"
        style={{ gap: 6 }}
      >
        <FiFilter size={14} /> {isSidebarVisible ? 'Close' : 'Filters'}
        {category.length > 0 && (
          <span style={{
            width: 18, height: 18, borderRadius: '50%', background: 'var(--color-primary)',
            color: '#fff', fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{category.length}</span>
        )}
      </button>

      {/* Sidebar */}
      <aside className={`all-courses-sidebar ${isSidebarVisible ? 'sidebar-open' : ''}`}>
        <div style={{ padding: '20px 16px' }}>
          {/* Back */}
          <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'flex-start', gap: 6, marginBottom: 20 }}>
            <FiArrowLeft size={14} /> Home
          </button>

          {/* AI Search */}
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/searchwithai")}
            style={{ width: '100%', justifyContent: 'flex-start', gap: 10, marginBottom: 20, border: '1px solid rgba(124,106,247,0.3)', background: 'rgba(124,106,247,0.08)', color: 'var(--color-primary-light)' }}
          >
            <img src={ai} style={{ width: 20, height: 20, borderRadius: '50%' }} alt="AI" />
            Search with AI
          </button>

          {/* Filter header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
              Categories
            </h2>
            {category.length > 0 && (
              <button
                onClick={clearFilters}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary-light)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}
              >
                <FiX size={12} /> Clear
              </button>
            )}
          </div>

          {/* Category checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {ALL_CATEGORIES.map((cat) => {
              const isChecked = category.includes(cat)
              return (
                <div
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    background: isChecked ? 'rgba(124,106,247,0.1)' : 'transparent',
                    border: isChecked ? '1px solid rgba(124,106,247,0.25)' : '1px solid transparent',
                    transition: 'all 0.15s', fontSize: '0.875rem',
                    color: isChecked ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                    userSelect: 'none'
                  }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                    border: isChecked ? '2px solid var(--color-primary)' : '2px solid var(--color-border-strong)',
                    background: isChecked ? 'var(--color-primary)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}>
                    {isChecked && <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>✓</span>}
                  </div>
                  {cat}
                </div>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="all-courses-main">
        <div style={{ padding: '32px 24px' }}>
          {/* Page header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                All Courses
              </h1>
              {filterCourses.length > 0 && (
                <span className="badge badge-neutral">{filterCourses.length}</span>
              )}
            </div>
            {category.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                {category.map(cat => (
                  <span key={cat} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
                    borderRadius: 'var(--radius-full)', background: 'rgba(124,106,247,0.12)',
                    border: '1px solid rgba(124,106,247,0.25)', color: 'var(--color-primary-light)',
                    fontSize: '0.75rem', fontWeight: 600
                  }}>
                    {cat}
                    <FiX size={11} style={{ cursor: 'pointer' }} onClick={() => toggleCategory(cat)} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Course Grid */}
          {filterCourses.length > 0 ? (
            <div className="courses-grid-container">
              {filterCourses.map((item, index) => (
                <Card key={item._id || index} thumbnail={item.thumbnail} title={item.title} price={item.price}
                  category={item.category} id={item._id} reviews={item.reviews} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '80px 24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <HiSparkles size={24} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>No courses found</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Try adjusting your filters or browse all categories.</p>
              {category.length > 0 && (
                <button className="btn btn-secondary btn-sm" onClick={clearFilters}>Clear Filters</button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Mobile overlay */}
      {isSidebarVisible && (
        <div
          onClick={() => setIsSidebarVisible(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 70,
            backdropFilter: 'blur(4px)'
          }}
          className="md:hidden"
        />
      )}
    </div>
  )
}

export default AllCourses

