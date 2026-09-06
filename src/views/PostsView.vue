<script setup>
import { ref, onMounted } from 'vue'
import { getAllPosts } from '../api/posts'
import { notifyError } from '../utils/notyf'
import PostCard from '../components/PostCard.vue'

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await getAllPosts()
    posts.value = data.posts || data
  } catch (err) {
    notifyError(err, 'Could not load posts.')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="page">
    <h1>Recent posts</h1>

    <p v-if="loading" class="skeleton">Loading posts…</p>

    <div v-else-if="posts.length" class="stack">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>

    <div v-else class="empty-state">
      Nothing's been written yet. Once someone publishes a post, it'll show up here.
    </div>
  </main>
</template>
