<script setup>
import { ref, onMounted } from 'vue'
import { getPost } from '../api/posts'
import { notifyError } from '../utils/notyf'

const props = defineProps({
  id: { type: String, required: true },
})

const post = ref(null)
const loading = ref(true)
const notFound = ref(false)

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const { data } = await getPost(props.id)
    post.value = data.post || data
  } catch (err) {
    if (err?.response?.status === 404) {
      notFound.value = true
    } else {
      notifyError(err, 'Could not load this post.')
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="page">
    <p v-if="loading" class="skeleton">Loading…</p>

    <div v-else-if="notFound" class="empty-state">
      This post doesn't exist, or was removed.
      <br />
      <router-link to="/">Back to all posts</router-link>
    </div>

    <article v-else-if="post">
      <p><router-link to="/">← All posts</router-link></p>
      <h1>{{ post.title }}</h1>
      <p class="muted post-meta">
        <span v-if="post.author?.name">{{ post.author.name }}</span>
        <span v-if="post.author?.name && post.createdAt"> · </span>
        <span v-if="post.createdAt">{{ formatDate(post.createdAt) }}</span>
      </p>
      <div class="post-body">
        <p v-for="(paragraph, i) in post.content.split('\n').filter(Boolean)" :key="i">
          {{ paragraph }}
        </p>
      </div>
    </article>
  </main>
</template>

<style scoped>
.post-meta {
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.post-body {
  font-family: var(--serif);
  font-size: 1.15rem;
  line-height: 1.75;
}
</style>
