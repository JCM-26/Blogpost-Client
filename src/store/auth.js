import { reactive, readonly } from 'vue'

const state = reactive({
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
})

function setSession({ token, username }) {
  state.token = token
  state.username = username || null

  localStorage.setItem('token', token)
  if (state.username) localStorage.setItem('username', state.username)
}

function clearSession() {
  state.token = null
  state.username = null
  localStorage.removeItem('token')
  localStorage.removeItem('username')
}

function isLoggedIn() {
  return Boolean(state.token)
}

export const authStore = readonly(state)
export { setSession, clearSession, isLoggedIn }
