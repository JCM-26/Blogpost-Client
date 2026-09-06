<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPost, addPost, updatePost } from '../api/posts'
import { notifyError, notifySuccess } from '../utils/notyf'

const props = defineProps({
  id: { type: String, default: null },
})

const router = useRouter()
const isEditing = computed(() => Boolean(props.id))

const title = ref('')
const content = ref('')
const loading = ref(isEditing.value)
const saving = ref(false)
const error = ref('')

onMounted(async () => {
  if (!isEditing.value) return

  try {
    const { data } = await getPost(props.id)
    const post = data.post || data
    title.value = post.title
    content.value = post.content
  } catch (err) {
    notifyError(err, 'Could not load this post.')
    router.push({ name: 'my-posts' })
  } finally {
    loading.value = false
  }
})

async function handleSubmit() {
  error.value = ''

  if (!title.value.trim() || !content.value.trim()) {
    error.value = 'Give the post a title and some content first.'
    return
  }

  saving.value = true
  try {
    const payload = { title: title.value.trim(), content: content.value.trim() }

    if (isEditing.value) {
      await updatePost(props.id, payload)
      notifySuccess('Post updated.')
    } else {
      await addPost(payload)
      notifySuccess('Post published.')
    }

    router.push({ name: 'my-posts' })
  } catch (err) {
    notifyError(err, 'Could not save this post.')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <main class="page">
    <h1>{{ isEditing ? 'Edit post' : 'Write a new post' }}</h1>

    <p v-if="loading" class="skeleton">Loading…</p>

    <form v-else @submit.prevent="handleSubmit">
      <div class="field">
        <label for="title">Title</label>
        <input id="title" v-model="title" type="text" placeholder="A good title" />
      </div>

      <div class="field">
        <label for="content">Content</label>
        <textarea
          id="content"
          v-model="content"
          placeholder="Start writing…"
        ></textarea>
      </div>

      <p v-if="error" class="form-error">{{ error }}</p>

      <div class="row">
        <button type="submit" class="btn" :disabled="saving">
          {{ saving ? 'Saving…' : isEditing ? 'Save changes' : 'Publish' }}
        </button>
        <router-link to="/my-posts" class="btn btn--ghost">Cancel</router-link>
      </div>
    </form>
  </main>
</template>
