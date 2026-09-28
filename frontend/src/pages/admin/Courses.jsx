import React, { useEffect } from 'react'
import { FiEdit, FiPlus, FiArrowLeft } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../../App'
import { toast } from 'react-toastify'
import { setCreatorCourseData } from '../../redux/courseSlice'
import img1 from "../../assets/empty.jpg"

function Courses() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { creatorCourseData } = useSelector(state => state.course)

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreatorcourses", { withCredentials: true })
        await dispatch(setCreatorCourseData(result.data))
        console.log(result.data)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    getCreatorData()
  }, [])

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate("/dashboard")} className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
              <FiArrowLeft size={15} /> Dashboard
            </button>
            <div style={{ height: 20, width: 1, background: 'var(--color-border)' }} />
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>My Courses</h1>
            {creatorCourseData?.length > 0 && (
              <span className="badge badge-neutral">{creatorCourseData.length}</span>
            )}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate("/createcourses")} style={{ gap: 6 }}>
            <FiPlus size={16} /> New Course
          </button>
        </div>

        {/* Desktop Table */}
        <div className="animate-fade-in" style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden'
        }}>
          {creatorCourseData?.length === 0 ? (
            <EmptyState onCreateClick={() => navigate("/createcourses")} />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block" style={{ overflowX: 'auto' }}>
                <table className="table-root">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Students</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creatorCourseData?.map((course, index) => (
                      <tr key={index}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img
                              src={course?.thumbnail || img1}
                              alt=""
                              style={{ width: 52, height: 36, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', flexShrink: 0 }}
                            />
                            <span style={{ fontWeight: 500, color: 'var(--color-text)', fontSize: '0.875rem', maxWidth: 220 }}>{course?.title}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-neutral" style={{ textTransform: 'none', fontSize: '0.72rem' }}>{course?.category || 'N/A'}</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                            {course?.price ? `₹${course.price}` : <span style={{ color: 'var(--color-text-muted)' }}>N/A</span>}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${course?.isPublished ? 'badge-success' : 'badge-warning'}`}>
                            {course?.isPublished ? '● Published' : '○ Draft'}
                          </span>
                        </td>
                        <td style={{ color: 'var(--color-text)' }}>
                          {course.enrolledStudents?.length || 0}
                        </td>
                        <td>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => navigate(`/addcourses/${course?._id}`)}
                            style={{ gap: 6 }}
                          >
                            <FiEdit size={14} /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Showing {creatorCourseData?.length} course{creatorCourseData?.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Mobile card list */}
              <div className="md:hidden" style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {creatorCourseData?.map((course, index) => (
                  <div key={index} style={{
                    padding: 16, borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex', gap: 14, alignItems: 'flex-start'
                  }}>
                    <img
                      src={course?.thumbnail || img1}
                      alt=""
                      style={{ width: 64, height: 44, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.875rem', marginBottom: 6 }}>{course?.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span className={`badge ${course?.isPublished ? 'badge-success' : 'badge-warning'}`}>
                          {course?.isPublished ? 'Published' : 'Draft'}
                        </span>
                        {course?.price && <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>₹{course.price}</span>}
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => navigate(`/addcourses/${course?._id}`)}
                      style={{ flexShrink: 0, padding: '6px 10px' }}
                    >
                      <FiEdit size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onCreateClick }) {
  return (
    <div style={{ padding: 64, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 'var(--radius-lg)',
        background: 'var(--color-surface-3)', border: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8
      }}>
        <FiEdit size={24} style={{ color: 'var(--color-text-muted)' }} />
      </div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>No courses yet</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', maxWidth: 300 }}>
        Create your first course to start sharing your knowledge with the world.
      </p>
      <button className="btn btn-primary btn-sm" onClick={onCreateClick} style={{ marginTop: 8, gap: 6 }}>
        <FiPlus size={16} /> Create First Course
      </button>
    </div>
  )
}

export default Courses
