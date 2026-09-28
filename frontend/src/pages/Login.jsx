import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { HiSparkles } from 'react-icons/hi2'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/")
      setLoading(false)
      toast.success("Login Successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email
      const role = "student"

      const result = await axios.post(serverUrl + "/api/auth/googlesignup", { name, email, role }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("Login Successfully")
    } catch (error) {
      console.log(error)
      if (error?.code === "auth/invalid-api-key") {
        toast.error("Please add a valid VITE_FIREBASE_APIKEY in frontend/.env file")
      } else {
        toast.error(error.response?.data?.message || error.message || "Google Login failed")
      }
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-bg)', padding: '24px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,247,0.12) 0%, transparent 70%)',
        top: '-20%', left: '-10%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,214,160,0.08) 0%, transparent 70%)',
        bottom: '-10%', right: '-5%', pointerEvents: 'none'
      }} />

      {/* Auth Card */}
      <div className="animate-fade-in-scale" style={{
        display: 'flex', width: '100%', maxWidth: 900, minHeight: 560,
        background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }}>
        {/* Left - Form */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(24px, 5vw, 56px)' }}>
          {/* Logo on mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
            <img src={logo} alt="logo" style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--color-border-strong)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>Virtual Courses</span>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text)', marginBottom: 6 }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="email" className="input-label">Email address</label>
              <input
                id="email"
                type="text"
                className="input"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <label htmlFor="password" className="input-label">Password</label>
              <input
                id="password"
                type={show ? "text" : "password"}
                className="input"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShow(p => !p)}
                style={{
                  position: 'absolute', right: 14, bottom: 13,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center'
                }}
              >
                {show ? <MdRemoveRedEye size={18} /> : <MdOutlineRemoveRedEye size={18} />}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate("/forgotpassword")}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary-light)', fontSize: '0.8rem', fontWeight: 500, fontFamily: 'inherit' }}
              >
                Forgot password?
              </button>
            </div>

            <button className="btn btn-primary" disabled={loading} onClick={handleLogin} style={{ width: '100%', height: 46 }}>
              {loading ? <ClipLoader size={20} color="white" /> : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
          </div>

          {/* Google Login */}
          <button
            onClick={googleLogin}
            style={{
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
            Don't have an account?{' '}
            <button
              onClick={() => navigate("/signup")}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary-light)', fontWeight: 600, fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              Sign up free
            </button>
          </p>
        </div>

        {/* Right - Decorative */}
        <div style={{
          width: 380, flexShrink: 0,
          background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, rgba(6,214,160,0.3) 100%)',
          display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 48, position: 'relative', overflow: 'hidden'
        }} className="md:flex">
          <div style={{
            position: 'absolute', width: 300, height: 300, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', top: '-50px', right: '-50px'
          }} />
          <div style={{
            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)', bottom: '-30px', left: '-30px'
          }} />
          <img src={logo} alt="logo" style={{ width: 72, height: 72, borderRadius: 16, marginBottom: 20, border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Virtual Courses
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.6 }}>
            AI-powered learning for the future. Access thousands of expert-led courses.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500
              }}>
                <HiSparkles size={12} />
                {['AI-Powered', 'Expert Led', 'Lifetime Access'][i]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
