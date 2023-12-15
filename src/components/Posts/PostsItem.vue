<script setup lang="ts">
import type { Post } from '@/services/posts/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="col">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.body.slice(0, 50) }}...</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <router-link :to="{ name: 'postItem', params: { id: post.id } }" class="btn btn-primary"
              >See post</router-link
            >
          </div>
          <small class="text-muted">3 mins</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
