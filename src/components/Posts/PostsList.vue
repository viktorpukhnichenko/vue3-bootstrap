<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import PostsItem from '@/components/Posts/PostsItem.vue'

const postsStore = usePostsStore()
</script>

<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <PostsItem v-for="post in postsStore.searchedPosts" :key="post.id" :post="post" />
  </div>
</template>

<style scoped></style>
