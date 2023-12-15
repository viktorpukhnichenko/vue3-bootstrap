<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref } from 'vue'
import { usePostsStore } from '@/stores/posts'
const route = useRoute()
const search = ref<string>('')

const postsStore = usePostsStore()

const searchHandler = () => {
  postsStore.searchWord = search.value
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <RouterLink class="navbar-brand" to="/posts">My App</RouterLink>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/posts">Home</RouterLink>
              </li>
            </ul>
            <router-link
              v-if="route.name === 'posts'"
              :to="{ name: 'postCreate' }"
              class="btn btn-primary mx-3"
              >Create post</router-link
            >
            <form
              @submit.prevent="searchHandler"
              @keyup.enter="searchHandler"
              class="d-flex"
              v-if="route.name === 'posts'"
            >
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="search"
              />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
