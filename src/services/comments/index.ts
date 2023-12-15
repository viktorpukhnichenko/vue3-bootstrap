import http from '@/services/api'
import type { APIResponse } from '@/services/types.ts'
import type { Comment, InputCreateComment, InputUpdateComment } from '@/services/comments/types.ts'

async function getPostComments(id: number) {
  return await http.get<APIResponse<Comment[]>>(`posts/${id}/comments`)
}

/*I didn't find information how to delete post comment on jsonpalceholder, but if this could be possible my code will be relevant*/
async function deletePostComment(postId: number, commentId: number) {
  return await http.delete<APIResponse<boolean>>(`posts/${postId}/comments/${commentId}`)
}

async function createPostComment(input: InputCreateComment) {
  return await http.post<APIResponse<Comment>>(`posts/${input.postId}/comments`, input)
}

async function updatePostComment(input: InputUpdateComment) {
  return await http.put<APIResponse<boolean>>(`posts/${input.postId}/comments/${input.id}`, input)
}

export default {
  getPostComments,
  deletePostComment,
  createPostComment,
  updatePostComment
}
