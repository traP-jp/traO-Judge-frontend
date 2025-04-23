<script setup lang="ts">
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import IconDropdownTriangle from '@/components/icons/IconDropdownTriangle.vue'
import MenuButton from '@/components/Navigations/MenuButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { isLoggedIn = false, username = '' } = defineProps<{
  isLoggedIn: boolean
  username: string
}>()

const router = useRouter()
const isMenuOpen = ref(false)

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

const handleLogin = () => {
  router.push('/login')
}
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-14 w-full items-center bg-background-tertiary px-8 font-primary text-text-primary"
  >
    <router-link to="/" class="flex items-center gap-3">
      <img src="" class="inline-block size-7.5" />
      <span class="text-xl font-semibold">traO Judge</span>
    </router-link>
    <span class="fontstyle-ui-control-strong ml-auto flex items-center gap-5">
      <router-link to="/problems">問題一覧</router-link>
      <router-link to="/submissions">提出一覧</router-link
      ><!-- TODO: どこに飛ぶのか確認 -->
      <PrimaryButton v-if="isLoggedIn" padding="0.5rem" class="h-10 w-22" @click="handleLogin">
        ログイン
      </PrimaryButton>
      <div v-else id="top-navbar-menu" class="relative">
        <button class="flex items-center gap-1" @click="toggleMenu">
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
          <MenuButton icon="person" @click="() => router.push(`/users/${username}`)">
            プロフィール
          </MenuButton>
          <MenuButton icon="settings" @click="() => router.push('/settings')"> 設定 </MenuButton>
          <MenuButton
            icon="logout"
            @click="
              () => {
                console.log('TODO: ログアウト')
              }
            "
          >
            ログアウト
          </MenuButton>
        </div>
      </div>
    </span>
  </header>
</template>

<style scoped></style>
