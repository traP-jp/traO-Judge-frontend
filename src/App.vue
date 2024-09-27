<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopNavbar from '@/components/Navigations/TopNavbar.vue'
</script>

<template>
  <TopNavbar :is-logged-in="true" />
  <TopNavbar :is-logged-in="false" />
  <main class="pt-14">
    <RouterView />
  </main>
</template>

<style scoped></style>
