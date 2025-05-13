<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopNavbar from '@/components/Navigations/TopNavbar.vue'
import BottomNavbar from '@/components/Navigations/BottomNavbar.vue'
</script>

<template>
  <TopNavbar :is-logged-in="true" username="test_user" />
  <main>
    <RouterView />
  </main>
  <BottomNavbar />
</template>

<style scoped></style>
