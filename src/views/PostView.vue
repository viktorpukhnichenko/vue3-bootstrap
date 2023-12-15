<script lang="ts" setup>
import { usePostsStore } from '@/stores/posts'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import type { InputUpdatePost } from '@/services/posts/types'
import MyForm from '@/components/Form/MyForm.vue'
import Comments from '@/components/Comments/Comments.vue'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()

const idx = postsStore.currentPostIndex(+route.params.id)
const currentPost = ref<InputUpdatePost>(postsStore.posts[idx.value])

const isEditMode = ref<boolean>(false)

const deletePost = () => {
  postsStore.dispatchDeletePost(+route.params.id)
  router.push({ name: 'posts' })
}

const updatePost = (input: InputUpdatePost) => {
  isEditMode.value = false
  postsStore.dispatchUpdatePost(input)
}
</script>

<template>
  <div class="container">
    <div class="border mt-2 rounded p-4" v-if="currentPost && !isEditMode">
      <h1>{{ currentPost.title }}</h1>
      <p>{{ currentPost.body }}</p>
      <div class="d-flex gap-1 justify-content-end">
        <button type="button" class="btn btn-primary" @click="isEditMode = true">Edit</button>
        <button type="button" class="btn btn-danger" @click="deletePost">Delete</button>
      </div>
    </div>
    <MyForm v-else :data="currentPost" :isEdit="true" @action="updatePost">
      <template #default>
        <div class="mb-3">
          <label for="exampleTitle" class="form-label">Title</label>
          <input
            v-model="currentPost.title"
            readonly
            type="text"
            class="form-control-plaintext"
            id="exampleTitle"
          />
        </div>
        <div class="mb-3">
          <label for="exampleDesc" class="form-label">Description</label>
          <textarea
            v-model="currentPost.body"
            class="form-control"
            id="exampleDesc"
            rows="7"
          ></textarea>
        </div>
      </template>
    </MyForm>
    <Comments />
  </div>
</template>

<style scoped></style>
