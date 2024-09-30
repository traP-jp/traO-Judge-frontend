<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopNavbar from '@/components/Navigations/TopNavbar.vue'
</script>

<template>
  <TopNavbar
    :is-logged-in="true"
    username="test_user"
  />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
