<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import TopNavbar from '@/components/Navigations/TopNavbar.vue'
import BottomNavbar from '@/components/Navigations/BottomNavbar.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(async () => {
  if (userStore.hasSessionFlag()) {
    try {
      await userStore.fetchCurrentUser()
    } catch {
      console.error('Session expired or invalid')
    }
  }
})
</script>

<template>
  <TopNavbar :is-logged-in="userStore.isAuthenticated" :user-id="userStore.userId" :username="userStore.username" />
  <main>
    <RouterView />
  </main>
  <BottomNavbar />
</template>

<style scoped></style>
