<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopNavbar from '@/components/Navigations/TopNavbar.vue'
import BottomNavbar from '@/components/Navigations/BottomNavbar.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <template v-if="userStore.isInitialized">
    <TopNavbar :is-logged-in="userStore.isAuthenticated" :user-id="userStore.userId" :username="userStore.username" />
    <main>
      <RouterView />
    </main>
    <BottomNavbar />
  </template>
</template>

<style scoped></style>
