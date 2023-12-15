<script setup lang="ts">
import { ref } from 'vue'
import type { Comment, InputUpdateComment } from '@/services/comments/types'
import MyForm from '@/components/Form/MyForm.vue'

const props = defineProps<{
  comment: Comment
}>()

const emits = defineEmits<{
  (e: 'onDelete', commentId: number): void
  (e: 'onEdit', input: InputUpdateComment): void
}>()

const isEditComment = ref<boolean>(false)
const currentComment = ref<InputUpdateComment>(props.comment)

const editPostCommentHandler = () => {
  emits('onEdit', currentComment.value)
  isEditComment.value = false
}
</script>

<template>
  <div>
    <div
      v-if="!isEditComment"
      class="d-flex flex-column border border-1 rounded p-4 my-3 shadow-sm"
    >
      <div>
        <h3>
          <span>{{ comment.name }}</span> - {{ comment.email }}
        </h3>
        <p>{{ comment.body }}</p>
      </div>
      <div class="d-flex gap-1 justify-content-end">
        <button type="button" class="btn btn-primary" @click="isEditComment = true">
          Edit comment
        </button>
        <button type="button" class="btn btn-danger" @click="$emit('onDelete', comment.id)">
          Delete comment
        </button>
      </div>
    </div>
    <MyForm v-else :data="currentComment" :isEdit="true" @action="editPostCommentHandler">
      <template #default>
        <div class="mb-3">
          <label for="exampleDesc" class="form-label">Description</label>
          <textarea
            v-model="currentComment.body"
            class="form-control"
            id="exampleDesc"
            rows="5"
          ></textarea>
        </div>
      </template>
    </MyForm>
  </div>
</template>

<style scoped></style>
