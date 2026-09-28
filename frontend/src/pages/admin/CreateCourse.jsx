import axios from "axios"
import React, { useState } from "react"
import { FiArrowLeft, FiPlus } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { serverUrl } from "../../App"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"

const CreateCourse = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")

  const CreateCourseHandler = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/course/create", { title, category }, { withCredentials: true })
      console.log(result.data)
      toast.success("Course Created")
      navigate("/courses")
      setTitle("")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const categories = [
    "App Development", "AI/ML", "AI Tools", "Data Science",
    "Data Analytics", "Ethical Hacking", "UI UX Designing", "Web Development", "Others"
  ]

  return (
    <div style={{
      background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 80,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 40px'
    }}>
      <div className="animate-fade-in-scale" style={{
        width: '100%', maxWidth: 560,
        background: 'var(--color-surface)', border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => navigate("/courses")} className="btn btn-ghost btn-sm" style={{ padding: '6px 10px' }}>
            <FiArrowLeft size={16} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)' }}>Create New Course</h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 2 }}>Start building your course</p>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '28px' }}>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Title */}
            <div>
              <label className="input-label">Course Title</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Complete Web Development Bootcamp"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            {/* Category */}
            <div>
              <label className="input-label">Category</label>
              <select
                className="input"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                style={{ cursor: 'pointer' }}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/courses")}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !title || !category}
                onClick={CreateCourseHandler}
                style={{ flex: 1, gap: 6 }}
              >
                {loading ? <ClipLoader size={18} color="white" /> : <><FiPlus size={16} /> Create Course</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse
