import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app"

const apiKey = (import.meta.env.VITE_FIREBASE_APIKEY || "AIzaSyD2pOSM08c0FLmfjt1pbYO7-CgCXgbSmgA").trim()

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "project-0e8b11fb-7fce-4752-ac6.firebaseapp.com",
  projectId: "project-0e8b11fb-7fce-4752-ac6",
  storageBucket: "project-0e8b11fb-7fce-4752-ac6.firebasestorage.app",
  messagingSenderId: "899316443312",
  appId: "1:899316443312:web:dc144a0aa41e31d97bb375"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }

