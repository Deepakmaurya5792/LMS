import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiEdit, FiPlus } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { serverUrl } from '../../App'
import { ClipLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { setLectureData } from '../../redux/lectureSlice'

function CreateLecture() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [lectureTitle, setLectureTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { lectureData } = useSelector(state => state.lecture)

  const createLectureHandler = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}`, { lectureTitle }, { withCredentials: true })
      console.log(result.data)
      dispatch(setLectureData([...lectureData, result.data.lecture]))
      toast.success("Lecture Created")
      setLoading(false)
      setLectureTitle("")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    const getLecture = async () => {
      try {
        const result = await axios.get(serverUrl + `/api/course/getcourselecture/${courseId}`, { withCredentials: true })
        console.log(result.data)
        dispatch(setLectureData(result.data.lectures))
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    getLecture()
  }, [])

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>

        {/* Back button */}
        <button onClick={() => navigate(`/addcourses/${courseId}`)} className="btn btn-ghost btn-sm" style={{ marginBottom: 24, gap: 6 }}>
          <FiArrowLeft size={15} /> Back to Course
        </button>

        {/* Header card */}
        <div className="animate-fade-in" style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 16
        }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>Add Lecture</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Enter the title and create new video lectures for your course.
            </p>
          </div>
          <div style={{ padding: 28, display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="input"
              placeholder="e.g. Introduction to the Course"
              onChange={(e) => setLectureTitle(e.target.value)}
              value={lectureTitle}
              style={{ flex: 1 }}
              onKeyDown={(e) => e.key === 'Enter' && lectureTitle && createLectureHandler()}
            />
            <button
              className="btn btn-primary"
              disabled={loading || !lectureTitle}
              onClick={createLectureHandler}
              style={{ gap: 6, flexShrink: 0 }}
            >
              {loading ? <ClipLoader size={16} color="white" /> : <><FiPlus size={16} /> Add</>}
            </button>
          </div>
        </div>

        {/* Lecture List */}
        {lectureData.length > 0 && (
          <div className="animate-fade-in stagger-1" style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)', overflow: 'hidden'
          }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)' }}>Lectures</h2>
              <span className="badge badge-neutral">{lectureData.length}</span>
            </div>
            <div>
              {lectureData.map((lecture, index) => (
                <div
                  key={index}
                  style={{
                    padding: '14px 24px',
                    borderBottom: index < lectureData.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    display: 'flex', alignItems: 'center', gap: 14
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                    background: 'var(--color-surface-3)', border: '1px solid var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)'
                  }}>
                    {index + 1}
                  </div>
                  <span style={{ flex: 1, fontSize: '0.875rem', color: 'var(--color-text)', fontWeight: 500 }}>
                    {lecture.lectureTitle}
                  </span>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
                    style={{ gap: 4, padding: '6px 10px', flexShrink: 0 }}
                  >
                    <FiEdit size={14} /> Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {lectureData.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '40px 24px',
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)'
          }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              No lectures yet. Add your first lecture above.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateLecture
