import { reactive, readonly } from 'vue'

function decodeJwtPayload(token) {
  try {
    const base64 = token.split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    )

    return JSON.parse(json)
  } catch {
    return null
  }
}

const savedToken = localStorage.getItem('token')

const decodedUser = savedToken
  ? decodeJwtPayload(savedToken)
  : null

const state = reactive({
  token: savedToken || null,
  username:
    localStorage.getItem('username') ||
    decodedUser?.username ||
    null,
})

function setSession({ token, username }) {
  const decoded = decodeJwtPayload(token)

  state.token = token
  state.username = username || decoded?.username || null

  localStorage.setItem('token', token)

  if (state.username) {
    localStorage.setItem('username', state.username)
  } else {
    localStorage.removeItem('username')
  }
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

export {
  setSession,
  clearSession,
  isLoggedIn,
}

