<script setup>
import { useRouter } from 'vue-router'
import { authStore, clearSession, isLoggedIn } from './store/auth'
import { notifySuccess } from './utils/notyf'

const router = useRouter()

function logout() {
  clearSession()
  notifySuccess('Signed out.')
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="nav">
    <div class="nav__inner">
      <router-link to="/" class="nav__brand">JCM - blogpost</router-link>

      <nav class="nav__links">
        <router-link to="/" exact-active-class="is-active">Read</router-link>
        <router-link
          v-if="isLoggedIn()"
          to="/my-posts"
          exact-active-class="is-active"
        >
          My posts
        </router-link>
        <router-link
          v-if="isLoggedIn()"
          to="/posts/new"
          class="btn btn--small"
        >
          Write
        </router-link>

        <template v-if="!isLoggedIn()">
          <router-link to="/login">Log in</router-link>
          <router-link to="/register" class="btn btn--small">Sign up</router-link>
        </template>
        <span v-else class="nav__user">
          <span class="muted">{{ authStore.name || 'you' }}</span>
          <button class="link-button" @click="logout">Sign out</button>
        </span>
      </nav>
    </div>
  </header>

  <router-view />
</template>

<style scoped>
.nav {
  border-bottom: 1px solid var(--rule);
  background: var(--paper);
}

.nav__inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 1.1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.nav__brand {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.35rem;
  color: var(--ink);
}

.nav__brand:hover {
  text-decoration: none;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  font-size: 0.92rem;
}

.nav__links a {
  color: var(--ink-soft);
}

.nav__links a.is-active {
  color: var(--ink);
  font-weight: 600;
}

.nav__user {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-left: 0.5rem;
  border-left: 1px solid var(--rule);
}

.link-button {
  background: none;
  border: none;
  padding: 0;
  color: var(--accent);
  cursor: pointer;
  font-size: 0.92rem;
}

.link-button:hover {
  text-decoration: underline;
}
</style>
