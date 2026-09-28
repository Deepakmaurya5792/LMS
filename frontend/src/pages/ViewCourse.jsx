import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import img from "../assets/empty.jpg"
import Card from "../components/Card.jsx"
import { setSelectedCourseData } from '../redux/courseSlice'
import { FaLock, FaPlayCircle } from "react-icons/fa"
import { toast } from 'react-toastify'
import { FaStar } from "react-icons/fa6"
import { FiArrowLeft, FiCheck, FiClock, FiPlay } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'

function ViewCourse() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { courseData } = useSelector(state => state.course)
  const { userData } = useSelector(state => state.user)
  const [creatorData, setCreatorData] = useState(null)
  const dispatch = useDispatch()
  const [selectedLecture, setSelectedLecture] = useState(null)
  const { lectureData } = useSelector(state => state.lecture)
  const { selectedCourseData } = useSelector(state => state.course)
  const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoverRating, setHoverRating] = useState(0)

  const handleReview = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/review/givereview", { rating, comment, courseId }, { withCredentials: true })
      toast.success("Review Added")
      console.log(result.data)
      setRating(0)
      setComment("")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    return (total / reviews.length).toFixed(1)
  }

  const avgRating = calculateAverageRating(selectedCourseData?.reviews)

  const fetchCourseData = async () => {
    courseData.map((item) => {
      if (item._id === courseId) {
        dispatch(setSelectedCourseData(item))
        return null
      }
    })
  }

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(c => {
      const enrolledId = typeof c === 'string' ? c : c._id
      return enrolledId?.toString() === courseId?.toString()
    })
    console.log("Enrollment verified:", verify)
    if (verify) { setIsEnrolled(true) }
  }

  useEffect(() => {
    fetchCourseData()
    checkEnrollment()
  }, [courseId, courseData, lectureData])

  useEffect(() => {
    const getCreator = async () => {
      if (selectedCourseData?.creator) {
        try {
          const result = await axios.post(`${serverUrl}/api/course/getcreator`, { userId: selectedCourseData.creator }, { withCredentials: true })
          setCreatorData(result.data)
        } catch (error) {
          console.error("Error fetching creator:", error)
        }
      }
    }
    getCreator()
  }, [selectedCourseData])

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourses = courseData.filter(
        (course) => course.creator === creatorData._id && course._id !== courseId
      )
      setSelectedCreatorCourse(creatorCourses)
    }
  }, [creatorData, courseData])

  const handleEnroll = async (courseId, userId) => {
    try {
      const orderData = await axios.post(serverUrl + "/api/payment/create-order", { courseId, userId }, { withCredentials: true })
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "Virtual Courses",
        description: "Course Enrollment Payment",
        order_id: orderData.data.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(serverUrl + "/api/payment/verify-payment", { ...response, courseId, userId }, { withCredentials: true })
            setIsEnrolled(true)
            toast.success(verifyRes.data.message)
          } catch (verifyError) {
            toast.error("Payment verification failed.")
          }
        },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      toast.error("Something went wrong while enrolling.")
    }
  }

  const highlights = [
    { label: '10+ hours of video content' },
    { label: 'Lifetime access to course materials' },
    { label: 'Certificate on completion' },
    { label: 'Access on all devices' },
  ]

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-text)' }}>

      {/* Hero section */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(124,106,247,0.12) 0%, var(--color-bg) 100%)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 80
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
          <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm" style={{ marginBottom: 20, gap: 6 }}>
            <FiArrowLeft size={15} /> All Courses
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }} className="md:flex-row">
            {/* Thumbnail */}
            <div style={{ flex: 1, maxWidth: 520 }}>
              <img
                src={selectedCourseData?.thumbnail || img}
                alt="Course Thumbnail"
                style={{ width: '100%', borderRadius: 'var(--radius-xl)', objectFit: 'cover', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>

            {/* Course Info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Badges */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="badge badge-primary">{selectedCourseData?.category}</span>
                {selectedCourseData?.level && <span className="badge badge-neutral">{selectedCourseData.level}</span>}
              </div>

              <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                {selectedCourseData?.title}
              </h1>

              {selectedCourseData?.subTitle && (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  {selectedCourseData.subTitle}
                </p>
              )}

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <FaStar key={s} style={{ color: s <= Math.round(avgRating) ? '#f59e0b' : 'rgba(255,255,255,0.15)', fontSize: '0.9rem' }} />
                  ))}
                </div>
                <span style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.9rem' }}>{avgRating}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                  ({selectedCourseData?.reviews?.length || 0} reviews)
                </span>
              </div>

              {/* Price + Enroll */}
              <div style={{
                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)', padding: '20px 24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {selectedCourseData?.price ? `₹${selectedCourseData.price}` : <span style={{ color: 'var(--color-accent)' }}>Free</span>}
                  </span>
                  {selectedCourseData?.price && <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>₹599</span>}
                </div>

                {/* Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                  {highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                      <FiCheck size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                      {h.label}
                    </div>
                  ))}
                </div>

                {!isEnrolled ? (
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                    onClick={() => handleEnroll(courseId, userData._id)}
                  >
                    <HiSparkles size={16} /> Enroll Now
                  </button>
                ) : (
                  <button
                    className="btn btn-success btn-lg"
                    style={{ width: '100%', gap: 8 }}
                    onClick={() => navigate(`/viewlecture/${courseId}`)}
                  >
                    <FiPlay size={16} /> Watch Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* What you'll learn + Requirements */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            {
              title: "What You'll Learn",
              items: [`${selectedCourseData?.category} from scratch`, 'Real-world projects', 'Industry best practices', 'Hands-on exercises']
            },
            {
              title: "Requirements",
              items: ['Basic computer knowledge', 'No prior coding experience needed', 'Passion to learn']
            },
            {
              title: "Who This Is For",
              items: ['Beginners starting their journey', 'Professionals upgrading skills', 'Students & graduates']
            }
          ].map((section, i) => (
            <div key={i} style={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)', padding: 24
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>{section.title}</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    <FiCheck size={14} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Curriculum + Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }} className="md:flex-row">
          {/* Left - Curriculum */}
          <div style={{
            flex: '0 0 auto', width: '100%', maxWidth: 380,
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)', overflow: 'hidden'
          }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>Course Curriculum</h2>
              <span className="badge badge-neutral">{selectedCourseData?.lectures?.length} Lectures</span>
            </div>
            <div>
              {selectedCourseData?.lectures?.map((lecture, index) => {
                const isActive = selectedLecture?.lectureTitle === lecture.lectureTitle
                return (
                  <button
                    key={index}
                    disabled={!lecture.isPreviewFree}
                    onClick={() => lecture.isPreviewFree && setSelectedLecture(lecture)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)', textAlign: 'left',
                      background: isActive ? 'rgba(124,106,247,0.1)' : 'transparent',
                      border: 'none', cursor: lecture.isPreviewFree ? 'pointer' : 'not-allowed',
                      opacity: lecture.isPreviewFree ? 1 : 0.5,
                      transition: 'background 0.15s', fontFamily: 'inherit',
                      borderLeft: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                    }}
                    onMouseEnter={e => lecture.isPreviewFree && !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ color: isActive ? 'var(--color-primary-light)' : lecture.isPreviewFree ? 'var(--color-text-muted)' : 'var(--color-text-muted)' }}>
                      {lecture.isPreviewFree ? <FaPlayCircle size={16} /> : <FaLock size={14} />}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)', flex: 1 }}>
                      {lecture.lectureTitle}
                    </span>
                    {lecture.isPreviewFree && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 600, flexShrink: 0 }}>Free</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right - Preview Video */}
          <div style={{
            flex: 1, background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)', overflow: 'hidden'
          }}>
            <div style={{ aspectRatio: '16/9', background: '#000', position: 'relative' }}>
              {selectedLecture?.videoUrl ? (
                <video src={selectedLecture.videoUrl} controls style={{ width: '100%', height: '100%', display: 'block' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiPlay size={22} style={{ color: 'rgba(255,255,255,0.5)', marginLeft: 3 }} />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Select a free preview lecture to watch</p>
                </div>
              )}
            </div>
            <div style={{ padding: '16px 20px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>
                {selectedLecture?.lectureTitle || "Select a preview lecture"}
              </h3>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', padding: 28, marginBottom: 40
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>Write a Review</h2>
          <div style={{ marginBottom: 14 }}>
            <label className="input-label" style={{ marginBottom: 8, display: 'block' }}>Your Rating</label>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    fontSize: '1.5rem', cursor: 'pointer',
                    color: star <= (hoverRating || rating) ? '#f59e0b' : 'rgba(255,255,255,0.15)',
                    transition: 'color 0.1s'
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="input-label">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this course..."
              className="input"
              rows={3}
              style={{ resize: 'vertical', minHeight: 80 }}
            />
          </div>
          <button className="btn btn-primary" onClick={handleReview} disabled={!rating}>
            Submit Review
          </button>
        </div>

        {/* Instructor */}
        {creatorData && (
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)', padding: 28, marginBottom: 40
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 18 }}>Your Instructor</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {creatorData?.photoUrl
                ? <img src={creatorData.photoUrl} alt="Instructor" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-border-strong)' }} />
                : <div style={{
                    width: 64, height: 64, borderRadius: '50%', fontSize: '1.3rem', fontWeight: 800, color: '#fff',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {creatorData?.name?.slice(0, 1).toUpperCase()}
                  </div>
              }
              <div>
                <h3 style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '1rem' }}>{creatorData?.name}</h3>
                {creatorData?.description && <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4 }}>{creatorData.description}</p>}
                <p style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', marginTop: 3 }}>{creatorData?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* More by instructor */}
        {selectedCreatorCourse.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>
              More Courses by This Instructor
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              {selectedCreatorCourse.map((item, index) => (
                <Card key={index} thumbnail={item.thumbnail} title={item.title} id={item._id} price={item.price} category={item.category} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewCourse
