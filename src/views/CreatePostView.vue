<script setup lang="ts">
import { reactive } from 'vue'
import { InputCreatePost } from '@/services/posts/types'
import { usePostsStore } from '@/stores/posts'
import router from '@/router'
import MyForm from '@/components/Form/MyForm.vue'
const postsStore = usePostsStore()
const postData = reactive<InputCreatePost>({
  title: '',
  body: '',
  userId: 123
})

const createPostHandler = (input: InputCreatePost) => {
  postsStore.dispatchCreatePost(input)
  router.push({ name: 'posts' })
}
</script>

<template>
  <div class="container p-4">
    <MyForm :data="postData" @action="createPostHandler">
      <template #default>
        <div class="mb-3">
          <label for="exampleTitle" class="form-label">Title</label>
          <input v-model="postData.title" type="text" class="form-control" id="exampleTitle" />
        </div>
        <div class="mb-3">
          <label for="exampleDesc" class="form-label">Description</label>
          <textarea
            v-model="postData.body"
            class="form-control"
            id="exampleDesc"
            rows="3"
          ></textarea>
        </div>
      </template>
    </MyForm>
  </div>
</template>

<style scoped></style>
