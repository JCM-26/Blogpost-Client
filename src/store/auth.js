import { reactive, readonly } from 'vue'

const state = reactive({
  token: localStorage.getItem('token') || null,
  name: localStorage.getItem('name') || null,
})

function setSession({ token, name }) {
  state.token = token
  state.name = name || null

  localStorage.setItem('token', token)
  if (name) localStorage.setItem('name', name)
}

function clearSession() {
  state.token = null
  state.name = null
  localStorage.removeItem('token')
  localStorage.removeItem('name')
}

function isLoggedIn() {
  return Boolean(state.token)
}

export const authStore = readonly(state)
export { setSession, clearSession, isLoggedIn }
