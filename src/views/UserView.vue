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
  <div class="flex gap-8 px-container-x">
    <nav class="sticky top-14 h-header-offset">
      <SideMenuUserPage :username="username" />
    </nav>
    <main class="flex-auto py-6">
      <RouterView :username="username" />
    </main>
  </div>
</template>

<style scoped></style>
