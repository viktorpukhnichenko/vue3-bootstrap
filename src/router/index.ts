import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/posts'
    },
    {
      path: '/posts',
      name: 'posts',
      component: HomeView
    },
    {
      path: '/posts/:id(\\d+)',
      name: 'postItem',
      component: () => import('@/views/PostView.vue')
    },
    {
      path: '/posts/create',
      name: 'postCreate',
      component: () => import('@/views/CreatePostView.vue')
    }
  ]
})

export default router
