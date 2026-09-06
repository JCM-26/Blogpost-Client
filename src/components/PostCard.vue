<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})

function excerpt(text, length = 220) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length).trim() + '…' : text
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <article class="post-card">
    <router-link :to="{ name: 'post-detail', params: { id: post._id } }">
      <h2 class="post-card__title">{{ post.title }}</h2>
    </router-link>
    <p class="post-card__meta muted">
      <span v-if="post.author?.username">{{ post.author.username }}</span>
      <span v-if="post.author?.username && post.createdAt"> · </span>
      <span v-if="post.createdAt">{{ formatDate(post.createdAt) }}</span>
    </p>
    <p v-if="post.information" class="post-card__info">{{ post.information }}</p>
    <p class="post-card__excerpt">{{ excerpt(post.content) }}</p>
    <router-link
      :to="{ name: 'post-detail', params: { id: post._id } }"
      class="post-card__link"
    >
      Continue reading →
    </router-link>
  </article>
</template>

<style scoped>
.post-card {
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--rule);
}

.post-card:last-child {
  border-bottom: none;
}

.post-card__title {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

.post-card__meta {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.post-card__info {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--ink-soft);
  margin-bottom: 0.5rem;
}

.post-card__excerpt {
  font-family: var(--serif);
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--ink);
}

.post-card__link {
  font-size: 0.9rem;
}
</style>