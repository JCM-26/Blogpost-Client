<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/auth'
import { setSession } from '../store/auth'
import { notifyError, notifySuccess } from '../utils/notyf'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const submitting = ref(false)

async function handleSubmit() {
  submitting.value = true
  try {
    const { data } = await register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    // If the API logs the user in on registration (returns a token),
    // carry them straight into the app. Otherwise send them to log in.
    if (data.token) {
      setSession({ token: data.token, name: name.value })
      notifySuccess(`Welcome, ${name.value}.`)
      router.push({ name: 'posts' })
    } else {
      notifySuccess('Account created — log in to continue.')
      router.push({ name: 'login' })
    }
  } catch (err) {
    notifyError(err, 'Could not create an account.')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="page" style="max-width: 420px">
    <h1>Create an account</h1>

    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" required autocomplete="name" />
      </div>

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
          autocomplete="new-password"
        />
      </div>

      <button type="submit" class="btn" style="width: 100%" :disabled="submitting">
        {{ submitting ? 'Creating account…' : 'Sign up' }}
      </button>
    </form>

    <p class="muted" style="margin-top: 1.25rem">
      Already have an account? <router-link to="/login">Log in</router-link>
    </p>
  </main>
</template>
