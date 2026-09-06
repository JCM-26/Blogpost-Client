import axios from 'axios'

// Base URL comes from .env (VITE_API_URL). Falls back to a local
// blogpostAPI instance running on the default Express port.
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

// Attach the JWT (if we have one) to every request. blogpostAPI, like
// the author's other APIs, expects `Authorization: Bearer <token>`.
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default http
