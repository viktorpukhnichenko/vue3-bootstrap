import { onMounted, ref } from 'vue'
import type { Comment, InputCreateComment, InputUpdateComment } from '@/services/comments/types'
import { useRoute } from 'vue-router'
import { API } from '@/services'

export function useComments() {
  const comments = ref<Comment[]>([])
  const route = useRoute()
  const showCreateForm = ref<boolean>(false)
  const isLoadingComment = ref<boolean>(false)

  const commentData = ref<InputCreateComment>({
    postId: +route.params.id,
    name: 'Victor',
    email: 'victor@test.com',
    body: ''
  })

  onMounted(async () => {
    try {
      const { status, data } = await API.postsComments.getPostComments(+route.params.id)
      if (status === 200) {
        comments.value = data
      }
    } catch (err) {
      console.log(err)
    }
  })

  const deletePostComment = async (commentId: number) => {
    try {
      /*not final solution, there should be error handler logic for better UX*/
      const { data, status } = await API.postsComments.deletePostComment(
        +route.params.id,
        commentId
      )
    } catch (err) {
      console.log(err)
    }
    comments.value = comments.value.filter((comment) => comment.id !== commentId)
  }

  const createPostComment = async () => {
    try {
      if (commentData.value.body.length === 0) return
      isLoadingComment.value = true
      const { data, status } = await API.postsComments.createPostComment(commentData.value)
      if (status === 201) {
        comments.value.push(data)
        commentData.value.body = ''
        showCreateForm.value = false
        isLoadingComment.value = false
      }
    } catch (err) {
      console.log(err)
    }
  }

  const editPostComment = async (input: InputUpdateComment) => {
    try {
      /*not final solution, there should be error handler logic for better UX*/
      const { data, status } = await API.postsComments.updatePostComment(input)
    } catch (err) {
      console.log(err)
    }

    const idx = comments.value.findIndex((comment) => comment.id === input.id)
    comments.value[idx] = input
  }

  return {
    comments,
    showCreateForm,
    isLoadingComment,
    commentData,
    createPostComment,
    editPostComment,
    deletePostComment
  }
}
