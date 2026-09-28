import React, { useEffect, useRef, useState } from 'react'
import img from "../../assets/empty.jpg"
import { FiArrowLeft, FiCamera, FiSave, FiTrash2, FiVideo } from "react-icons/fi"
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { setCourseData } from '../../redux/courseSlice'

function AddCourses() {
  const navigate = useNavigate()
  const { courseId } = useParams()

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const thumb = useRef()
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { courseData } = useSelector(state => state.course)

  const categories = [
    "App Development", "AI/ML", "AI Tools", "Data Science",
    "Data Analytics", "Ethical Hacking", "UI UX Designing", "Web Development", "Others"
  ]

  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, { withCredentials: true })
      setSelectedCourse(result.data)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "")
      setSubTitle(selectedCourse.subTitle || "")
      setDescription(selectedCourse.description || "")
      setCategory(selectedCourse.category || "")
      setLevel(selectedCourse.level || "")
      setPrice(selectedCourse.price || "")
      setFrontendImage(selectedCourse.thumbnail || img)
      setIsPublished(selectedCourse?.isPublished)
    }
  }, [selectedCourse])

  useEffect(() => { getCourseById() }, [])

  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const editCourseHandler = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("subTitle", subTitle)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("level", level)
    formData.append("price", price)
    formData.append("thumbnail", backendImage)
    formData.append("isPublished", isPublished)

    try {
      const result = await axios.post(`${serverUrl}/api/course/editcourse/${courseId}`, formData, { withCredentials: true })
      const updatedCourse = result.data
      if (updatedCourse.isPublished) {
        const updatedCourses = courseData.map(c => c._id === courseId ? updatedCourse : c)
        if (!courseData.some(c => c._id === courseId)) { updatedCourses.push(updatedCourse) }
        dispatch(setCourseData(updatedCourses))
      } else {
        const filteredCourses = courseData.filter(c => c._id !== courseId)
        dispatch(setCourseData(filteredCourses))
      }
      navigate("/courses")
      toast.success("Course Updated")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const removeCourse = async () => {
    setLoading(true)
    try {
      const result = await axios.delete(serverUrl + `/api/course/removecourse/${courseId}`, { withCredentials: true })
      toast.success("Course Deleted")
      const filteredCourses = courseData.filter(c => c._id !== courseId)
      dispatch(setCourseData(filteredCourses))
      console.log(result)
      navigate("/courses")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const InputField = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label className="input-label">{label}</label>
      {children}
    </div>
  )

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate("/courses")} className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
              <FiArrowLeft size={15} /> Courses
            </button>
            <div style={{ height: 20, width: 1, background: 'var(--color-border)' }} />
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)' }}>Edit Course</h1>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/createlecture/${selectedCourse?._id}`)}>
              <FiVideo size={14} /> Manage Lectures
            </button>
            <button
              className={`btn btn-sm ${isPublished ? 'btn-danger' : 'btn-success'}`}
              onClick={() => setIsPublished(prev => !prev)}
            >
              {isPublished ? '○ Unpublish' : '● Publish'}
            </button>
            <button className="btn btn-danger btn-sm" disabled={loading} onClick={removeCourse} style={{ gap: 6 }}>
              {loading ? <ClipLoader size={14} color="currentColor" /> : <><FiTrash2 size={14} /> Delete</>}
            </button>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="animate-fade-in" style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden'
        }}>
          {/* Thumbnail Section */}
          <div style={{
            background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)',
            padding: 28, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap'
          }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={frontendImage || img}
                alt="Thumbnail"
                onClick={() => thumb.current.click()}
                style={{
                  width: 200, height: 120, objectFit: 'cover', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)', cursor: 'pointer', display: 'block'
                }}
              />
              <button
                onClick={() => thumb.current.click()}
                style={{
                  position: 'absolute', bottom: 8, right: 8, width: 30, height: 30,
                  borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: '1px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  color: 'var(--color-text)'
                }}
              >
                <FiCamera size={14} />
              </button>
              <input type="file" ref={thumb} hidden onChange={handleThumbnail} accept="image/*" />
            </div>
            <div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: 4 }}>Course Thumbnail</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Click the image to upload a new thumbnail.<br />Recommended: 1280×720px, JPG or PNG.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ padding: 28 }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
                <InputField label="Course Title">
                  <input type="text" className="input" placeholder="Course Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                </InputField>

                <InputField label="Subtitle">
                  <input type="text" className="input" placeholder="A brief subtitle" onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />
                </InputField>

                <InputField label="Description">
                  <textarea
                    className="input"
                    placeholder="Describe your course..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    style={{ height: 100, resize: 'vertical' }}
                  />
                </InputField>
              </div>

              {/* Row: Category, Level, Price */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
                <InputField label="Category">
                  <select className="input" onChange={(e) => setCategory(e.target.value)} value={category} style={{ cursor: 'pointer' }}>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </InputField>

                <InputField label="Level">
                  <select className="input" onChange={(e) => setLevel(e.target.value)} value={level} style={{ cursor: 'pointer' }}>
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </InputField>

                <InputField label="Price (INR)">
                  <input type="number" className="input" placeholder="₹0" onChange={(e) => setPrice(e.target.value)} value={price} />
                </InputField>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, paddingTop: 8, borderTop: '1px solid var(--color-border)' }}>
                <button type="button" className="btn btn-ghost" onClick={() => navigate("/courses")}>Cancel</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={editCourseHandler}
                  style={{ gap: 6 }}
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

export default AddCourses
