import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import { FiArrowLeft, FiMail, FiLock, FiCheck } from 'react-icons/fi'

function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [newpassword, setNewPassword] = useState("")
  const [conPassword, setConpassword] = useState("")

  const handleStep1 = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true })
      console.log(result)
      setStep(2)
      toast.success(result.data.message)
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const handleStep2 = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
      console.log(result)
      toast.success(result.data.message)
      setLoading(false)
      setStep(3)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const handleStep3 = async () => {
    setLoading(true)
    try {
      if (newpassword !== conPassword) {
        return toast.error("password does not match")
      }
      const result = await axios.post(`${serverUrl}/api/auth/resetpassword`, { email, password: newpassword }, { withCredentials: true })
      console.log(result)
      toast.success(result.data.message)
      setLoading(false)
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const steps = [
    { label: 'Email', icon: <FiMail size={14} /> },
    { label: 'Verify OTP', icon: <FiCheck size={14} /> },
    { label: 'Reset', icon: <FiLock size={14} /> },
  ]

  return (
    <div style={{
      background: 'var(--color-bg)', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,247,0.1) 0%, transparent 70%)',
        top: '-10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none'
      }} />

      <div className="animate-fade-in-scale" style={{ width: '100%', maxWidth: 440 }}>
        {/* Back */}
        <button onClick={() => navigate("/login")} className="btn btn-ghost btn-sm" style={{ marginBottom: 20, gap: 6 }}>
          <FiArrowLeft size={15} /> Back to Sign In
        </button>

        {/* Progress Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
          {steps.map((s, i) => {
            const isCompleted = i + 1 < step
            const isActive = i + 1 === step
            return (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: isCompleted ? 'var(--color-success)' : isActive ? 'var(--color-primary)' : 'var(--color-surface-3)',
                    border: `1px solid ${isCompleted ? 'rgba(16,185,129,0.4)' : isActive ? 'rgba(124,106,247,0.4)' : 'var(--color-border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isCompleted || isActive ? '#fff' : 'var(--color-text-muted)',
                    fontSize: '0.75rem', fontWeight: 700
                  }}>
                    {isCompleted ? <FiCheck size={13} /> : s.icon}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)' }}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: i + 1 < step ? 'var(--color-success)' : 'var(--color-border)', margin: '0 10px', transition: 'background 0.4s' }} />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Step Card */}
        <div style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden'
        }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>
              {step === 1 ? 'Forgot Your Password?' : step === 2 ? 'Enter OTP' : 'Reset Password'}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {step === 1 ? "Enter your email address and we'll send you an OTP."
                : step === 2 ? "Enter the 4-digit code sent to your email address."
                : "Create a new strong password for your account."}
            </p>
          </div>

          <div style={{ padding: 28 }}>
            {step === 1 && (
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="input-label">Email Address</label>
                  <input type="email" className="input" placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading} onClick={handleStep1} style={{ height: 44 }}>
                  {loading ? <ClipLoader size={18} color="white" /> : "Send OTP"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="input-label">OTP Code</label>
                  <input type="text" className="input" placeholder="Enter 4-digit code"
                    onChange={(e) => setOtp(e.target.value)} value={otp} required
                    style={{ letterSpacing: '0.3em', fontSize: '1.1rem', fontWeight: 700, textAlign: 'center' }} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading} onClick={handleStep2} style={{ height: 44 }}>
                  {loading ? <ClipLoader size={18} color="white" /> : "Verify OTP"}
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="input-label">New Password</label>
                  <input type="text" className="input" placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)} value={newpassword} />
                </div>
                <div>
                  <label className="input-label">Confirm Password</label>
                  <input type="text" className="input" placeholder="Re-enter new password"
                    onChange={(e) => setConpassword(e.target.value)} value={conPassword} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading} onClick={handleStep3} style={{ height: 44 }}>
                  {loading ? <ClipLoader size={18} color="white" /> : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
