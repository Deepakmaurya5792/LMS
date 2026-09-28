import express from "express"
import dotenv from "dotenv"
import connectDb from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 8000
const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL
].filter(Boolean)

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            allowedOrigins.some(
                o => origin && origin.startsWith(o)
            )
        ) {
            callback(null, true)
        } else {
            callback(null, true)
        }
    },
    credentials: true
}))

// API Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "LMS Server is running"
    })
})

// Frontend
const frontendDist = path.join(__dirname, "../frontend/dist")

app.use(express.static(frontendDist))

// Express 5 compatible wildcard route
app.get("/{*splat}", (req, res, next) => {
    if (req.path.startsWith("/api")) {
        return next()
    }

    res.sendFile(
        path.join(frontendDist, "index.html"),
        (err) => {
            if (err) {
                res.send("Hello From Server")
            }
        }
    )
})

// Start Server
app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
    connectDb()
})