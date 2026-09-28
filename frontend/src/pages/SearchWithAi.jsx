import React, { useState } from 'react'
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import { RiMicAiFill } from "react-icons/ri"
import axios from 'axios'
import { serverUrl } from '../App'
import { useNavigate } from 'react-router-dom'
import start from "../assets/start.mp3"
import { FiArrowLeft, FiSearch } from "react-icons/fi"
import { HiSparkles } from 'react-icons/hi2'

function SearchWithAi() {
  const [input, setInput] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [listening, setListening] = useState(false)
  const navigate = useNavigate()
  const startSound = new Audio(start)

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }

  const SpeechRecognition = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null

  const handleSearch = async () => {
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.")
      return
    }
    try {
      const recognition = new SpeechRecognition()
      setListening(true)
      startSound.play()
      recognition.start()
      recognition.onresult = async (e) => {
        const transcript = e.results[0][0].transcript.trim()
        setInput(transcript)
        await handleRecommendation(transcript)
      }
      recognition.onerror = () => setListening(false)
      recognition.onend = () => setListening(false)
    } catch (err) {
      console.log("Speech recognition error:", err)
      setListening(false)
    }
  }

  const handleRecommendation = async (query) => {
    if (!query || !query.trim()) return
    try {
      const result = await axios.post(`${serverUrl}/api/ai/search`, { input: query }, { withCredentials: true })
      setRecommendations(result.data)
      if (result.data && result.data.length > 0) {
        speak("These are the top courses I found for you")
      } else {
        speak("No courses found")
      }
      setListening(false)
    } catch (error) {
      console.log(error)
      setListening(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRecommendation(input)
    }
  }

  const categoryColors = {
    'Web Development': '#3b82f6', 'AI/ML': '#8b5cf6', 'Data Science': '#06d6a0',
    'App Development': '#f59e0b', 'Ethical Hacking': '#ef4444', 'UI UX Designing': '#ec4899',
    'Data Analytics': '#14b8a6', 'AI Tools': '#a855f7', 'Others': '#6b7280'
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)',
      display: 'flex', flexDirection: 'column', padding: '24px',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background glows */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,247,0.12) 0%, transparent 70%)',
        top: '-10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Back button */}
      <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', marginBottom: 32, gap: 6, position: 'relative', zIndex: 1 }}>
        <FiArrowLeft size={15} /> Back to Home
      </button>

      {/* Search area */}
      <div className="animate-fade-in" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
        position: 'relative', zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
            borderRadius: 'var(--radius-full)', background: 'rgba(124,106,247,0.12)',
            border: '1px solid rgba(124,106,247,0.25)', marginBottom: 20
          }}>
            <HiSparkles size={14} style={{ color: 'var(--color-primary-light)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              AI-Powered Search
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Search with <span className="gradient-text-primary">AI</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
            Describe what you want to learn and our AI will find the best courses for you.
          </p>
        </div>

        {/* Search box */}
        <div style={{
          width: '100%', maxWidth: 640,
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)', transition: 'border-color 0.2s'
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--color-border-strong)'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', padding: '4px 4px 4px 16px', gap: 8 }}>
            <img src={ai} alt="AI" style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="What do you want to learn? (e.g. AI, MERN, Cloud...)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: 'var(--color-text)', fontSize: '0.9rem', fontFamily: 'inherit',
                padding: '12px 0'
              }}
            />
            {input && (
              <button
                onClick={() => handleRecommendation(input)}
                style={{
                  padding: '10px 16px', borderRadius: 'var(--radius-md)', height: 44,
                  background: 'var(--color-surface-3)', border: '1px solid var(--color-border)',
                  color: 'var(--color-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.875rem', fontWeight: 600, transition: 'all 0.2s', fontFamily: 'inherit'
                }}
              >
                <FiSearch size={15} /> Search
              </button>
            )}
            <button
              onClick={handleSearch}
              style={{
                width: 44, height: 44, borderRadius: 'var(--radius-md)', flexShrink: 0,
                background: listening
                  ? 'rgba(239,68,68,0.15)'
                  : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                border: listening ? '1px solid rgba(239,68,68,0.3)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
                animation: listening ? 'pulseGlow 1.5s ease-in-out infinite' : 'none'
              }}
            >
              <RiMicAiFill size={18} style={{ color: listening ? '#ef4444' : '#fff' }} />
            </button>
          </div>
        </div>

        {/* Listening state */}
        {listening && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary-light)' }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  width: 4, borderRadius: 2, background: 'var(--color-primary)',
                  animation: `float ${0.6 + i * 0.1}s ease-in-out infinite alternate`,
                  height: `${8 + i * 4}px`
                }} />
              ))}
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Listening...</span>
          </div>
        )}
      </div>

      {/* Results */}
      {recommendations.length > 0 ? (
        <div style={{ maxWidth: 1100, margin: '48px auto 0', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, justifyContent: 'center' }}>
            <img src={ai1} alt="AI" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>
              AI Search Results
            </h2>
            <span className="badge badge-primary">{recommendations.length} found</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {recommendations.map((course, index) => {
              const catColor = categoryColors[course.category] || '#6b7280'
              return (
                <div
                  key={index}
                  className={`animate-fade-in stagger-${Math.min(index + 1, 6)}`}
                  onClick={() => navigate(`/viewcourse/${course._id}`)}
                  style={{
                    background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)', padding: '20px',
                    cursor: 'pointer', transition: 'all 0.25s', opacity: 0
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.borderColor = `${catColor}44`
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 10, lineHeight: 1.4 }}>
                    {course.title}
                  </h3>
                  <span style={{
                    display: 'inline-flex', padding: '3px 10px', borderRadius: 'var(--radius-full)',
                    background: `${catColor}18`, border: `1px solid ${catColor}33`,
                    color: catColor, fontSize: '0.7rem', fontWeight: 700
                  }}>
                    {course.category}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ) : !listening && input && (
        <div style={{ textAlign: 'center', marginTop: 60, position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No courses found. Try a different query.</p>
        </div>
      )}
    </div>
  )
}

export default SearchWithAi
