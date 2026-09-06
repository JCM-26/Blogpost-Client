<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../api/auth'
import { setSession } from '../store/auth'
import { notifyError, notifySuccess } from '../utils/notyf'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const submitting = ref(false)

async function handleSubmit() {
  submitting.value = true
  try {
    const { data } = await login({ email: email.value, password: password.value })
    setSession({ token: data.token, name: data.name || data.user?.name })
    notifySuccess('Welcome back.')
    router.push(route.query.redirect || { name: 'posts' })
  } catch (err) {
    notifyError(err, 'Could not log in. Check your email and password.')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="page" style="max-width: 420px">
    <h1>Log in</h1>

    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required autocomplete="email" />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="btn" style="width: 100%" :disabled="submitting">
        {{ submitting ? 'Signing in…' : 'Log in' }}
      </button>
    </form>

    <p class="muted" style="margin-top: 1.25rem">
      New here? <router-link to="/register">Create an account</router-link>
    </p>
  </main>
</template>
