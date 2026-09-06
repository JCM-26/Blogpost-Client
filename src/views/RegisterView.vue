<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/auth'
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
      username: name.value,
      email: email.value,
      password: password.value,
    })

    notifySuccess(`Account created${data.user?.username ? `, ${data.user.username}` : ''} — log in to continue.`)
    router.push({ name: 'login' })
  } catch (err) {
    notifyError(err, 'Could not create an account.')
  } finally {
    submitting.value = false
  }
}
</script>