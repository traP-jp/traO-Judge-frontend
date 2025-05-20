<script setup lang="ts">
import SideMenuBase, {
  type SideMenuProps
} from '@/components/Navigations/SideMenu/SideMenuBase.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const mainContents: SideMenuProps[] = [
  {
    text: 'アカウント',
    icon: 'person',
    href: '/settings/account'
  },
  {
    text: 'プロフィール',
    icon: 'id_card',
    href: '/settings/profile'
  }
]

const currentTab = ref<number>(0)
watch(
  () => route.path,
  (path) => {
    const index = mainContents.findIndex((content) => content.href === path)
    if (index >= 0) currentTab.value = index
  },
  { immediate: true }
)
</script>

<template>
  <SideMenuBase v-model="currentTab" :main-contents="mainContents">
    <h1 class="fontstyle-ui-subtitle">設定</h1>
  </SideMenuBase>
</template>

<style scoped></style>
