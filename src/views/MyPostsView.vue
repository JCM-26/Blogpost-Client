<script setup>
import { ref, onMounted } from 'vue'
import { getMyPosts, deletePost } from '../api/posts'
import { notifyError, notifySuccess } from '../utils/notyf'

const posts = ref([])
const loading = ref(true)
const deletingId = ref(null)

async function load() {
  loading.value = true
  try {
    const { data } = await getMyPosts()
    posts.value = data.posts || data
  } catch (err) {
    notifyError(err, 'Could not load your posts.')
  } finally {
    loading.value = false
  }
}

async function handleDelete(post) {
  if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return

  deletingId.value = post._id
  try {
    await deletePost(post._id)
    posts.value = posts.value.filter((p) => p._id !== post._id)
    notifySuccess('Post deleted.')
  } catch (err) {
    notifyError(err, 'Could not delete this post.')
  } finally {
    deletingId.value = null
  }
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(load)
</script>

<template>
  <main class="page">
    <div class="row" style="justify-content: space-between; margin-bottom: 1.5rem">
      <h1 style="margin: 0">My posts</h1>
      <router-link to="/posts/new" class="btn">Write a post</router-link>
    </div>

    <p v-if="loading" class="skeleton">Loading…</p>

    <div v-else-if="posts.length" class="stack">
      <div v-for="post in posts" :key="post._id" class="my-post">
        <div>
          <router-link :to="{ name: 'post-detail', params: { id: post._id } }">
            <h2 class="my-post__title">{{ post.title }}</h2>
          </router-link>
          <p class="muted my-post__date">{{ formatDate(post.createdAt) }}</p>
        </div>
        <div class="row">
          <router-link
            :to="{ name: 'post-edit', params: { id: post._id } }"
            class="btn btn--ghost btn--small"
          >
            Edit
          </router-link>
          <button
            class="btn btn--danger btn--small"
            :disabled="deletingId === post._id"
            @click="handleDelete(post)"
          >
            {{ deletingId === post._id ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      You haven't written anything yet.
      <br />
      <router-link to="/posts/new">Start your first post</router-link>
    </div>
  </main>
</template>

<style scoped>
.my-post {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--rule);
}

.my-post:last-child {
  border-bottom: none;
}

.my-post__title {
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
}

.my-post__date {
  font-size: 0.85rem;
}
</style>
