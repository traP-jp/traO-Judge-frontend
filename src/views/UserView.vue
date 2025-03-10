<script setup lang="ts">
import { useRoute } from 'vue-router'
import SideMenuUserPage from '@/components/Navigations/SideMenu/SideMenuUserPage.vue'
import { ref, watch } from 'vue'

const route = useRoute()

if (typeof route.params.id !== 'string') throw new Error('Invalid route')
const username = ref<string>('')
watch(
  () => route.params.id,
  (id) => {
    username.value = `${id}`
  },
  { immediate: true }
)
// TODO: Fetch user data
</script>

<template>
  <div class="flex gap-[max(2rem,calc(25dvw-16rem))] px-[max(2rem,calc(25dvw-16rem))]">
    <nav class="sticky top-14 h-[calc(100dvh-3.5rem)]">
      <SideMenuUserPage :username="username" />
    </nav>
    <main class="flex-auto py-10">
      <RouterView :username="username" />
    </main>
  </div>
</template>

<style scoped></style>
