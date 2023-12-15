import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { InputCreatePost, InputUpdatePost, Post } from '@/services/posts/types'
import type { APIResponse } from '@/services/types'
import { API } from '@/services'
import { AxiosError } from 'axios'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const isLoadingPosts = ref<boolean>(false)
  const searchWord = ref<string>('')

  function initPosts(data: Post[]) {
    posts.value = data
  }

  function addNewPost(post: Post) {
    posts.value.push(post)
  }

  function removePost(id: number) {
    const idx = posts.value.findIndex((s) => s.id === id)
    if (idx === -1) return
    posts.value.splice(idx, 1)
  }

  const currentPostIndex = (id: number) =>
    computed(() => posts.value.findIndex((post) => post.id === id))
  const searchedPosts = computed(() =>
    posts.value.filter((post) => post.title.includes(searchWord.value))
  )

  async function dispatchGetPosts(): Promise<APIResponse<null>> {
    try {
      isLoadingPosts.value = true
      const { status, data } = await API.posts.getPosts()
      if (status === 200) {
        initPosts(data)
        return {
          success: true,
          content: null
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      return {
        success: false,
        status: _error.response?.status,
        content: null
      }
    } finally {
      isLoadingPosts.value = false
    }
    return {
      success: false,
      content: null,
      status: 400
    }
  }

  async function dispatchCreatePost(input: InputCreatePost): Promise<APIResponse<Post>> {
    try {
      const { status, data } = await API.posts.createPost(input)
      console.log(data, status)
      if (status === 201) {
        addNewPost(data)
        return {
          success: true,
          content: null
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      return {
        success: false,
        status: _error.response?.status,
        content: null
      }
    }
    return {
      success: false,
      content: null,
      status: 400
    }
  }

  async function dispatchDeletePost(id: number): Promise<APIResponse<null>> {
    try {
      const { status } = await API.posts.deletePost(id)
      if (status === 200) {
        removePost(id)
        return {
          success: true,
          content: null
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      return {
        success: false,
        status: _error.response?.status,
        content: null
      }
    }
    return {
      success: false,
      content: null,
      status: 400
    }
  }

  async function dispatchUpdatePost(input: InputUpdatePost): Promise<APIResponse<null>> {
    try {
      const { status } = await API.posts.updatePost(input)
      if (status === 200) {
        return {
          success: true,
          content: null
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      return {
        success: false,
        status: _error.response?.status,
        content: null
      }
    }
    return {
      success: false,
      content: null,
      status: 400
    }
  }

  return {
    posts,
    dispatchGetPosts,
    dispatchUpdatePost,
    dispatchDeletePost,
    dispatchCreatePost,
    isLoadingPosts,
    currentPostIndex,
    searchedPosts,
    searchWord
  }
})
