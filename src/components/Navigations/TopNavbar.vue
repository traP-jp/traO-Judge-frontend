<script setup lang="ts">
import { ref } from 'vue'
import IconDropdownTriangle from '@/components/icons/IconDropdownTriangle.vue'
import SideMenuButton from '@/components/Navigations/SideMenuButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

defineProps({
  isLoggedIn: Boolean
})

const isMenuOpen = ref(false)
</script>

<template>
  <header
    class="fixed flex h-14 w-full items-center bg-background-tertiary px-8 font-primary text-text-primary"
  >
    <a class="flex items-center gap-3">
      <img
        src=""
        class="inline-block size-7.5"
        alt=""
      >
      <span class="text-xl font-semibold">traO Judge</span>
    </a>
    <span class="fontstyle-ui-control-strong ml-auto flex items-center gap-5">
      <button>問題一覧</button>
      <button>提出一覧</button>
      <PrimaryButton
        v-if="!isLoggedIn"
        class="px-4"
        text="ログイン"
        @click="
          () => {
            console.log('TODO: login')
          }
        "
      />
      <button
        v-if="isLoggedIn"
        class="relative flex items-center gap-1"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="inline-block">test_user</span>
        <IconDropdownTriangle
          class="inline-block h-1.625"
          :class="isMenuOpen ? [] : ['rotate-180']"
        />
        <div
          v-if="isMenuOpen"
          v-click-outside="
            () => {
              isMenuOpen = false
            }
          "
          class="absolute right-0 top-7 flex h-27 w-50 flex-col gap-y-1 rounded-lg border border-border-secondary bg-background-primary p-2"
        >
          <SideMenuButton
            icon=""
            text="プロフィール"
            @click="
              () => {
                console.log('pf')
              }
            "
          />
          <SideMenuButton
            icon=""
            text="設定"
          />
          <SideMenuButton
            icon=""
            text="ログアウト"
          />
        </div>
      </button>
    </span>
  </header>
</template>

<style scoped></style>
