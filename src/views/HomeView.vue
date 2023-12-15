<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import PostsList from '@/components/Posts/PostsList.vue'

const postsStore = usePostsStore()
</script>

<template>
  <main>
    <div class="container p-4 album">
      <PostsList v-if="!postsStore.isLoadingPosts" />
      <p v-else>Loading...</p>
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
