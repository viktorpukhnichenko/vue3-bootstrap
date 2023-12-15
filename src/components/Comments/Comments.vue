<script setup lang="ts">
import CommentItem from '@/components/Comments/CommentItem.vue'
import MyForm from '@/components/Form/MyForm.vue'
import { useComments } from '@/composables/useComments'

const {
  comments,
  showCreateForm,
  isLoadingComment,
  commentData,
  createPostComment,
  editPostComment,
  deletePostComment
} = useComments()
</script>

<template>
  <div>
    <div class="d-flex justify-content-between mt-4">
      <h2>Comments ({{ comments.length }})</h2>
      <button v-if="!showCreateForm" class="btn btn-primary mx-3" @click="showCreateForm = true">
        Create comment
      </button>
    </div>
    <div v-if="showCreateForm">
      <MyForm v-if="!isLoadingComment" :data="commentData" @action="createPostComment">
        <template #default>
          <div class="mb-3">
            <label for="exampleDesc" class="form-label">Description</label>
            <textarea
              v-model="commentData.body"
              class="form-control"
              id="exampleDesc"
              rows="3"
            ></textarea>
          </div>
        </template>
      </MyForm>
      <p v-else>Creating comment...</p>
    </div>

    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @onDelete="deletePostComment"
      @onEdit="editPostComment"
    />
  </div>
</template>

<style scoped></style>
