import React from 'react'
import home from "../assets/home1.jpg"
import Nav from '../components/Nav'
import { SiViaplay } from "react-icons/si"
import Logos from '../components/Logos'
import Cardspage from '../components/Cardspage'
import ExploreCourses from '../components/ExploreCourses'
import About from '../components/About'
import ai from '../assets/ai.png'
import ReviewPage from '../components/ReviewPage'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { HiSparkles } from 'react-icons/hi2'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text)', overflowX: 'hidden', minHeight: '100vh' }}>
      <Nav />

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background image with overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src={home}
            alt="hero"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(124,106,247,0.35) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 80% 70%, rgba(6,214,160,0.15) 0%, transparent 50%), linear-gradient(180deg, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 70%, var(--color-bg) 100%)'
          }} />
        </div>

        {/* Animated orbs */}
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,106,247,0.15) 0%, transparent 70%)',
          top: '10%', left: '5%', zIndex: 0,
          animation: 'orbFloat 12s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,214,160,0.1) 0%, transparent 70%)',
          bottom: '20%', right: '10%', zIndex: 0,
          animation: 'orbFloat 10s ease-in-out infinite reverse'
        }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto', paddingTop: 80 }}>
          {/* Badge */}
          <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 'var(--radius-full)', background: 'rgba(124,106,247,0.12)', border: '1px solid rgba(124,106,247,0.25)', marginBottom: 32 }}>
            <HiSparkles size={14} style={{ color: 'var(--color-primary-light)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary-light)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>AI-Powered Learning Platform</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in stagger-1" style={{
            fontSize: 'clamp(2.4rem, 7vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 24,
            opacity: 0
          }}>
            <span className="gradient-text">Grow Your Skills.</span>
            <br />
            <span style={{ color: 'var(--color-text)' }}>Advance Your Career.</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in stagger-2" style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--color-text-secondary)',
            maxWidth: 580,
            margin: '0 auto 40px',
            lineHeight: 1.7,
            opacity: 0
          }}>
            Learn from expert instructors, explore AI-curated courses, and accelerate your path to mastery with our premium learning experience.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in stagger-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', opacity: 0 }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/allcourses")}
              style={{ gap: 10 }}
            >
              Browse Courses <SiViaplay size={16} />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate("/searchwithai")}
              style={{ gap: 10 }}
            >
              <img src={ai} alt="AI" style={{ width: 20, height: 20, borderRadius: '50%' }} />
              Search with AI
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-in stagger-4" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40,
            marginTop: 64, flexWrap: 'wrap', opacity: 0
          }}>
            {[
              { value: '10K+', label: 'Students' },
              { value: '500+', label: 'Courses' },
              { value: '50+', label: 'Instructors' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1
        }}>
          <div style={{
            width: 24, height: 38, border: '2px solid rgba(255,255,255,0.2)', borderRadius: 12,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px 0'
          }}>
            <div style={{
              width: 4, height: 8, background: 'var(--color-primary-light)', borderRadius: 2,
              animation: 'float 2s ease-in-out infinite'
            }} />
          </div>
        </div>
      </section>

      <Logos />
      <ExploreCourses />
      <Cardspage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  )
}

export default Home
