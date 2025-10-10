<script setup lang="ts">
import { useRoute } from 'vue-router'
import SideMenuUserPage from '@/components/Navigations/SideMenu/SideMenuUserPage.vue'
import { ref, watch, onMounted } from 'vue'
import { UsersApi, type User, ResponseError } from '@/api/generated'

const route = useRoute()

if (typeof route.params.id !== 'string') throw new Error('Invalid route')
const username = ref<string>('')
const user = ref<User | null>(null)

const loadUser = async () => {
  try {
    user.value = await new UsersApi().getUser({ userId: username.value })
  } catch (error) {
    if (error instanceof ResponseError) {
      switch (error.response.status) {
        case 400:
          alert('ユーザーが見つかりませんでした。')
          break
        default:
          alert('エラーが発生しました。')
          break
      }
    } else {
      console.error('API Error:', error)
      alert('不明なエラーが発生しました。')
    }
  }
}

watch(
  () => route.params.id,
  (id) => {
    username.value = `${id}`
    loadUser()
  },
  { immediate: true }
)

onMounted(() => {
  loadUser()
})
</script>

<template>
  <div class="flex gap-8 px-container-x">
    <nav class="sticky top-14 h-header-offset">
      <SideMenuUserPage :username="username" :icon-url="user?.iconUrl ?? ''" />
    </nav>
    <main class="flex-auto py-6">
      <RouterView :username="username" :user="user" />
    </main>
  </div>
</template>

<style scoped></style>
