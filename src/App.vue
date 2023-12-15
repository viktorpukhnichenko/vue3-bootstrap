<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()

onMounted(async () => {
  const { success, status } = await postsStore.dispatchGetPosts()

  if (!success) {
    alert('Ups, something happened 🙂')
    console.log('Api status ->', status)
  }
})
</script>

<template>
  <TheHeader />

  <RouterView />
</template>

<style scoped></style>
