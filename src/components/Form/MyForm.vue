<script
  setup
  lang="ts"
  generic="T extends InputCreatePost | InputUpdatePost | InputCreateComment | InputUpdateComment"
>
import type { InputCreatePost, InputUpdatePost } from '@/services/posts/types.js'
import type { InputCreateComment, InputUpdateComment } from '@/services/comments/types'

withDefaults(
  defineProps<{
    data: T
    isEdit?: boolean
  }>(),
  {
    isEdit: false
  }
)

defineEmits<{
  (e: 'action', input: T): void
}>()
</script>

<template>
  <form @submit.prevent="$emit('action', data)" class="mt-2 border rounded-2 p-4">
    <slot></slot>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-success">
        {{ isEdit ? 'Edit' : 'Create' }}
      </button>
    </div>
  </form>
</template>

<style scoped></style>
