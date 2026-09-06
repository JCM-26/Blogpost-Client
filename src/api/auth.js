import http from './http'

// NOTE ON ENDPOINTS
// blogpostAPI's routes/controllers aren't publicly browsable (GitHub blocks
// crawling directory listings on that repo), so these paths follow the same
// verb-style convention the author used on the sibling fitnessAPI project
// (POST /users/register, POST /users/login). If the real API differs,
// this file is the only place that needs to change.

export function register({ username, email, password }) {
  return http.post('/users/register', { username, email, password })
}
export function login({ email, password }) {
  return http.post('/users/login', { email, password })
}
