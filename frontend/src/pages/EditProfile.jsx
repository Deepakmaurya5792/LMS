import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCamera, FiSave } from 'react-icons/fi'

function EditProfile() {
  const { userData } = useSelector(state => state.user)
  const [name, setName] = useState(userData.name || "")
  const [description, setDescription] = useState(userData.description || "")
  const [photoUrl, setPhotoUrl] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(userData?.photoUrl || null)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const formData = new FormData()
  formData.append("name", name)
  formData.append("description", description)
  formData.append("photoUrl", photoUrl)

  const updateProfile = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/user/updateprofile", formData, { withCredentials: true })
      console.log(result.data)
      dispatch(setUserData(result.data))
      navigate("/")
      setLoading(false)
      toast.success("Profile Update Successfully")
    } catch (error) {
      console.log(error)
      toast.error("Profile Update Error")
      setLoading(false)
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoUrl(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  return (
    <div style={{
      background: 'var(--color-bg)', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px 40px'
    }}>
      <div className="animate-fade-in-scale" style={{ width: '100%', maxWidth: 520 }}>
        {/* Back */}
        <button onClick={() => navigate("/profile")} className="btn btn-ghost btn-sm" style={{ marginBottom: 24, gap: 6 }}>
          <FiArrowLeft size={15} /> Back to Profile
        </button>

        <div style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)' }}>Edit Profile</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 3 }}>Update your personal information</p>
          </div>

          <div style={{ padding: 28 }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

              {/* Avatar section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {previewUrl
                    ? <img src={previewUrl} alt="avatar" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-border-strong)' }} />
                    : <div style={{
                        width: 72, height: 72, borderRadius: '50%', fontSize: '1.5rem', fontWeight: 800, color: '#fff',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '2px solid var(--color-border-strong)'
                      }}>
                        {userData?.name?.slice(0, 1).toUpperCase()}
                      </div>
                  }
                  <label htmlFor="photoInput" style={{
                    position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', border: '2px solid var(--color-surface)'
                  }}>
                    <FiCamera size={13} style={{ color: '#fff' }} />
                  </label>
                  <input id="photoInput" type="file" name="photoUrl" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 4 }}>{userData?.name}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Click the camera icon to upload a new photo</p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder={userData.name}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  readOnly
                  className="input"
                  placeholder={userData.email}
                  style={{ opacity: 0.5, cursor: 'not-allowed' }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="input-label">Bio</label>
                <textarea
                  name="description"
                  className="input"
                  rows={3}
                  placeholder="Tell us about yourself..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  style={{ resize: 'vertical', minHeight: 80 }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, paddingTop: 4, borderTop: '1px solid var(--color-border)' }}>
                <button type="button" className="btn btn-ghost" onClick={() => navigate("/profile")}>Cancel</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={updateProfile}
                  style={{ flex: 1, gap: 6 }}
                >
                  {loading ? <ClipLoader size={18} color="white" /> : <><FiSave size={16} /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
