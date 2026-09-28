import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { FiUser, FiBookOpen } from 'react-icons/fi'

function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSignUp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/signup", { name, email, password, role }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("SignUp Successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      console.log(response)
      const user = response.user
      const name = user.displayName
      const email = user.email
      const result = await axios.post(serverUrl + "/api/auth/googlesignup", { name, email, role }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("SignUp Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-bg)', padding: '24px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background glows */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,247,0.12) 0%, transparent 70%)',
        top: '-20%', right: '-10%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,214,160,0.08) 0%, transparent 70%)',
        bottom: '-10%', left: '-5%', pointerEvents: 'none'
      }} />

      {/* Auth Card */}
      <div className="animate-fade-in-scale" style={{
        display: 'flex', width: '100%', maxWidth: 900,
        background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }}>
        {/* Left decorative panel */}
        <div style={{
          width: 380, flexShrink: 0,
          background: 'linear-gradient(135deg, #0f0c29 0%, var(--color-primary-dark) 50%, var(--color-primary) 100%)',
          display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 48, position: 'relative', overflow: 'hidden'
        }} className="md:flex">
          <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: '-60px', left: '-60px' }} />
          <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', bottom: '-20px', right: '-20px' }} />
          <img src={logo} alt="logo" style={{ width: 72, height: 72, borderRadius: 16, marginBottom: 20, border: '2px solid rgba(255,255,255,0.3)' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Start Learning Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Join thousands of learners mastering new skills with our AI-powered platform.
          </p>
          <div style={{ width: '100%', marginTop: 36, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Unlimited course access', 'AI-powered search', 'Expert instructors', 'Lifetime certificates'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(6,214,160,0.3)', border: '1px solid rgba(6,214,160,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: '#06d6a0' }}>✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(24px, 5vw, 52px)' }}>
          {/* Logo on mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <img src={logo} alt="logo" style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--color-border-strong)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>Virtual Courses</span>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text)', marginBottom: 6 }}>
              Create account
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Start your learning journey for free</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label htmlFor="name" className="input-label">Full Name</label>
              <input id="name" type="text" className="input" placeholder="Your name"
                onChange={(e) => setName(e.target.value)} value={name} />
            </div>

            <div>
              <label htmlFor="email" className="input-label">Email address</label>
              <input id="email" type="text" className="input" placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            <div style={{ position: 'relative' }}>
              <label htmlFor="password" className="input-label">Password</label>
              <input id="password" type={show ? "text" : "password"} className="input"
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)} value={password}
                style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShow(p => !p)} style={{
                position: 'absolute', right: 14, bottom: 13, background: 'none', border: 'none',
                cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center'
              }}>
                {show ? <MdRemoveRedEye size={18} /> : <MdOutlineRemoveRedEye size={18} />}
              </button>
            </div>

            {/* Role selector */}
            <div>
              <label className="input-label">I am a</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <RoleButton
                  active={role === 'student'}
                  icon={<FiBookOpen size={16} />}
                  label="Student"
                  onClick={() => setRole("student")}
                />
                <RoleButton
                  active={role === 'educator'}
                  icon={<FiUser size={16} />}
                  label="Educator"
                  onClick={() => setRole("educator")}
                />
              </div>
            </div>

            <button className="btn btn-primary" disabled={loading} onClick={handleSignUp} style={{ width: '100%', height: 46, marginTop: 4 }}>
              {loading ? <ClipLoader size={20} color="white" /> : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
          </div>

          <button onClick={googleSignUp} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', height: 44, borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface-3)', border: '1px solid var(--color-border)',
            cursor: 'pointer', color: 'var(--color-text)', fontSize: '0.875rem', fontWeight: 500,
            transition: 'all 0.2s', fontFamily: 'inherit'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.background = 'var(--color-surface-2)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'var(--color-surface-3)' }}
          >
            <img src={google} alt="Google" style={{ width: 18, height: 18, objectFit: 'contain' }} />
            Continue with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <button onClick={() => navigate("/login")} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary-light)',
              fontWeight: 600, fontFamily: 'inherit', fontSize: 'inherit'
            }}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function RoleButton({ active, icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '10px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
        background: active ? 'rgba(124,106,247,0.15)' : 'var(--color-surface-3)',
        border: active ? '1px solid rgba(124,106,247,0.4)' : '1px solid var(--color-border)',
        color: active ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
        fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s', fontFamily: 'inherit'
      }}
    >
      {icon} {label}
    </button>
  )
}

export default SignUp
