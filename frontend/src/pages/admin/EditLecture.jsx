import axios from 'axios'
import React, { useState } from 'react'
import { FiArrowLeft, FiTrash2, FiSave, FiVideo } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function EditLecture() {
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const { courseId, lectureId } = useParams()
  const { lectureData } = useSelector(state => state.lecture)
  const dispatch = useDispatch()
  const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
  const [videoUrl, setVideoUrl] = useState(null)
  const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
  const [isPreviewFree, setIsPreviewFree] = useState(false)
  const navigate = useNavigate()

  const formData = new FormData()
  formData.append("lectureTitle", lectureTitle)
  formData.append("videoUrl", videoUrl)
  formData.append("isPreviewFree", isPreviewFree)

  const editLecture = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, formData, { withCredentials: true })
      console.log(result.data)
      dispatch(setLectureData([...lectureData, result.data]))
      toast.success("Lecture Updated")
      navigate("/courses")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const removeLecture = async () => {
    setLoading1(true)
    try {
      const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}`, { withCredentials: true })
      console.log(result.data)
      toast.success("Lecture Removed")
      navigate(`/createlecture/${courseId}`)
      setLoading1(false)
    } catch (error) {
      console.log(error)
      toast.error("Lecture remove error")
      setLoading1(false)
    }
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 24px' }}>

        {/* Back */}
        <button onClick={() => navigate(`/createlecture/${courseId}`)} className="btn btn-ghost btn-sm" style={{ marginBottom: 24, gap: 6 }}>
          <FiArrowLeft size={15} /> Back to Lectures
        </button>

        <div className="animate-fade-in-scale" style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>Edit Lecture</h1>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 2 }}>Update lecture details and video</p>
            </div>
            <button
              className="btn btn-danger btn-sm"
              disabled={loading1}
              onClick={removeLecture}
              style={{ gap: 6 }}
            >
              {loading1 ? <ClipLoader size={14} color="currentColor" /> : <><FiTrash2 size={14} /> Remove</>}
            </button>
          </div>

          {/* Form */}
          <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Title */}
            <div>
              <label className="input-label">Lecture Title</label>
              <input
                type="text"
                className="input"
                placeholder={selectedLecture.lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                value={lectureTitle}
              />
            </div>

            {/* Video Upload */}
            <div>
              <label className="input-label">Video File *</label>
              <div style={{
                border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)',
                padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                background: videoUrl ? 'rgba(124,106,247,0.05)' : 'var(--color-surface-3)'
              }}
                onDragOver={(e) => e.preventDefault()}
              >
                <FiVideo size={24} style={{ color: 'var(--color-text-muted)', marginBottom: 8, display: 'block', margin: '0 auto 10px' }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 10 }}>
                  {videoUrl ? videoUrl.name : 'Drop your video file here or click to browse'}
                </p>
                <input
                  type="file"
                  required
                  accept="video/*"
                  style={{ display: 'none' }}
                  id="videoUpload"
                  onChange={(e) => setVideoUrl(e.target.files[0])}
                />
                <label htmlFor="videoUpload" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                  Choose File
                </label>
              </div>
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, padding: '8px 12px', background: 'rgba(124,106,247,0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(124,106,247,0.2)' }}>
                  <ClipLoader size={14} color="var(--color-primary-light)" />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)' }}>Uploading video... Please wait.</span>
                </div>
              )}
            </div>

            {/* Free Preview Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--color-surface-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <label className="toggle-switch" style={{ position: 'relative', width: 42, height: 24, flexShrink: 0 }}>
                <input
                  type="checkbox"
                  style={{ opacity: 0, width: 0, height: 0 }}
                  onChange={() => setIsPreviewFree(prev => !prev)}
                  checked={isPreviewFree}
                />
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: 'var(--radius-full)', cursor: 'pointer',
                  background: isPreviewFree ? 'var(--color-primary)' : 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)', transition: 'all 0.2s'
                }}>
                  <span style={{
                    position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: '#fff',
                    top: 2, left: isPreviewFree ? 20 : 2, transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                  }} />
                </span>
              </label>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>Free Preview</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Allow non-enrolled students to watch this lecture</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 8, borderTop: '1px solid var(--color-border)' }}>
              <button className="btn btn-ghost" onClick={() => navigate(`/createlecture/${courseId}`)}>Cancel</button>
              <button
                className="btn btn-primary"
                disabled={loading}
                onClick={editLecture}
                style={{ flex: 1, gap: 6 }}
              >
                {loading ? <ClipLoader size={18} color="white" /> : <><FiSave size={16} /> Update Lecture</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLecture
