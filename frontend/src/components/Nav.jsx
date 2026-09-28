import React, { useState, useEffect, useRef } from 'react'
import logo from "../assets/logo.jpg"
import { IoMdPerson } from "react-icons/io"
import { HiMenuAlt3, HiX } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { FiLogOut, FiUser, FiBookOpen, FiGrid } from 'react-icons/fi'

function Nav() {
  const [showHam, setShowHam] = useState(false)
  const [showPro, setShowPro] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowPro(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (showHam) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showHam])

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      toast.success("Logged out successfully")
      setShowPro(false)
      setShowHam(false)
    } catch (error) {
      console.log(error.response?.data?.message)
      toast.error("Logout failed")
    }
  }

  const navTo = (path) => {
    navigate(path)
    setShowHam(false)
    setShowPro(false)
  }

  const Avatar = ({ size = 36 }) => (
    userData?.photoUrl
      ? <img src={userData.photoUrl} alt="avatar"
          style={{ width: size, height: size }}
          className="rounded-full object-cover ring-2 ring-white/10" />
      : <div
          style={{ width: size, height: size, background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', fontSize: size * 0.4 }}
          className="rounded-full flex items-center justify-center text-white font-bold">
          {userData?.name?.slice(0, 1).toUpperCase()}
        </div>
  )

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`nav-root nav-glass`}
        style={{
          background: scrolled ? 'rgba(10,10,15,0.92)' : 'rgba(10,10,15,0.75)',
          borderBottomColor: scrolled ? 'var(--color-border-strong)' : 'var(--color-border)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => navTo("/")}
            className="flex items-center gap-3 group"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img src={logo} alt="Virtual Courses"
              className="rounded-lg object-cover"
              style={{ width: 36, height: 36, border: '1px solid var(--color-border-strong)' }} />
            <span style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              letterSpacing: '-0.01em',
              display: 'none'
            }} className="md:block">Virtual Courses</span>
          </button>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          {userData?.role === "educator" && (
            <button className="btn btn-ghost btn-sm" onClick={() => navTo("/dashboard")}>
              <FiGrid size={15} /> Dashboard
            </button>
          )}
          {!userData ? (
            <button className="btn btn-primary btn-sm" onClick={() => navTo("/login")}>
              Sign In
            </button>
          ) : (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowPro(prev => !prev)}
                style={{
                  background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)',
                  padding: 3, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-strong)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <Avatar size={34} />
              </button>

              {/* Dropdown */}
              {showPro && (
                <div
                  className="animate-slide-down"
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    minWidth: 200,
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '8px',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 200
                  }}
                >
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--color-border)', marginBottom: 6 }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>{userData?.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{userData?.email}</p>
                  </div>
                  <DropItem icon={<FiUser size={14}/>} label="My Profile" onClick={() => navTo("/profile")} />
                  <DropItem icon={<FiBookOpen size={14}/>} label="My Courses" onClick={() => navTo("/enrolledcourses")} />
                  <div style={{ height: 1, background: 'var(--color-border)', margin: '6px 0' }} />
                  <DropItem icon={<FiLogOut size={14}/>} label="Log Out" onClick={handleLogout} danger />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setShowHam(prev => !prev)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)', padding: 8 }}
        >
          {showHam ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(10,10,15,0.96)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 80,
          paddingLeft: 24,
          paddingRight: 24,
          transform: showHam ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* User info at top */}
        {userData && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '16px 0', borderBottom: '1px solid var(--color-border)', marginBottom: 24
          }}>
            <Avatar size={48} />
            <div>
              <p style={{ fontWeight: 600, fontSize: '1rem' }}>{userData?.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{userData?.role}</p>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {userData && <MobileNavItem label="My Profile" onClick={() => navTo("/profile")} />}
          {userData && <MobileNavItem label="My Courses" onClick={() => navTo("/enrolledcourses")} />}
          {userData?.role === "educator" && <MobileNavItem label="Dashboard" onClick={() => navTo("/dashboard")} />}
          {!userData
            ? <MobileNavItem label="Sign In" onClick={() => navTo("/login")} primary />
            : <MobileNavItem label="Log Out" onClick={handleLogout} danger />
          }
        </div>
      </div>
    </>
  )
}

function DropItem({ icon, label, onClick, danger }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-sm)',
        background: hovered ? (danger ? 'rgba(239,68,68,0.1)' : 'var(--color-surface-3)') : 'transparent',
        border: 'none', cursor: 'pointer',
        color: danger ? '#ef4444' : 'var(--color-text-secondary)',
        fontSize: '0.875rem', fontWeight: 500,
        textAlign: 'left', transition: 'all 0.15s',
        fontFamily: 'inherit'
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function MobileNavItem({ label, onClick, primary, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        background: primary ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))'
          : danger ? 'rgba(239,68,68,0.1)' : 'var(--color-surface-3)',
        border: primary ? 'none' : danger ? '1px solid rgba(239,68,68,0.2)' : '1px solid var(--color-border)',
        color: primary ? '#fff' : danger ? '#ef4444' : 'var(--color-text)',
        fontSize: '1rem', fontWeight: 500, cursor: 'pointer',
        fontFamily: 'inherit', width: '100%', textAlign: 'left',
        transition: 'all 0.15s'
      }}
    >
      {label}
    </button>
  )
}

export default Nav