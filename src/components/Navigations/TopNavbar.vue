<script setup lang="ts">
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import IconDropdownTriangle from '@/components/icons/IconDropdownTriangle.vue'
import MenuButton from '@/components/Navigations/MenuButton.vue'
import traOLogo from '@/assets/traO_logo.svg'
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { isLoggedIn = false, userId = '', username = '' } = defineProps<{
  isLoggedIn: boolean
  userId: string
  username: string
}>()

const isMenuOpen = ref(false)
const router = useRouter()
const userStore = useUserStore()

const isTraqAuthenticated = computed(() => !!userStore.user?.authentication?.traqAuth)

const modalHandler = (e: MouseEvent) => {
  if (!(e.target instanceof HTMLElement) || e.target.closest('#top-navbar-menu')) return
  setMenuState(false)
}

const toggleMenu = () => {
  setMenuState(!(isMenuOpen.value as boolean))
}

const setMenuState = (state: boolean) => {
  isMenuOpen.value = state
  if (state) document.addEventListener('mousedown', modalHandler)
  else document.removeEventListener('mousedown', modalHandler)
}

const handleLogout = async () => {
  try {
    await userStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('ログアウトエラー:', error)
  }
}

const handleLogin = () => {
  router.push('/login')
}

const handleProfile = () => {
  router.push(`/users/${userId}`)
}

const handleSettings = () => {
  router.push('/settings/profile')
}
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-14 w-full items-center bg-background-tertiary px-8 font-primary text-text-primary"
  >
    <RouterLink class="flex items-center gap-3" to="/">
      <img :src="traOLogo" class="inline-block size-7.5" />
      <span class="text-xl font-semibold">traO Judge</span>
    </RouterLink>
    <span class="fontstyle-ui-control-strong ml-auto flex items-center gap-5">
      <RouterLink v-if="isTraqAuthenticated" to="/problems/create" class="hover:text-text-secondary">問題作成</RouterLink>
      <RouterLink to="/problems" class="hover:text-text-secondary">問題一覧</RouterLink>
      <RouterLink v-if="isLoggedIn" :to="`/users/${userId}/submissions`" class="hover:text-text-secondary">提出一覧</RouterLink>
      <PrimaryButton
        v-if="!isLoggedIn"
        padding="1rem"
        class="h-10 px-3 py-2"
        @click="handleLogin"
      >
        ログイン
      </PrimaryButton>
      <div id="top-navbar-menu" class="relative">
        <button v-if="isLoggedIn" class="flex items-center gap-1" @click="toggleMenu">
          <span class="inline-block">{{ username }}</span>
          <IconDropdownTriangle
            class="inline-block h-1.625"
            :class="isMenuOpen ? [] : ['rotate-180']"
          />
        </button>
        <div
          v-if="isMenuOpen"
          class="absolute right-0 top-7 flex w-50 flex-col gap-y-1 rounded-lg border border-border-secondary bg-background-primary p-2"
        >
          <MenuButton
            icon="person"
            @click="handleProfile"
          >
            プロフィール
          </MenuButton>
          <MenuButton
            icon="settings"
            @click="handleSettings"
          >
            設定
          </MenuButton>
          <MenuButton
            icon="logout"
            @click="handleLogout"
          >
            ログアウト
          </MenuButton>
        </div>
      </div>
    </span>
  </header>
</template>

<style scoped></style>
