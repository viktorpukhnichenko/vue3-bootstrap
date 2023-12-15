import http from '@/services/api'
import type { APIResponse } from '@/services/types.ts'
import type { Post, InputCreatePost, InputUpdatePost } from '@/services/posts/types.ts'

async function getPosts() {
  return await http.get<APIResponse<Post[]>>('posts')
}

async function deletePost(id: number) {
  return await http.delete<APIResponse<boolean>>(`posts/${id}`)
}

async function createPost(input: InputCreatePost) {
  return await http.post<APIResponse<Post>>('posts', input)
}

async function updatePost(input: InputUpdatePost) {
  return await http.put<APIResponse<boolean>>(`posts/${input.id}`, input)
}

export default {
  getPosts,
  deletePost,
  createPost,
  updatePost
}
