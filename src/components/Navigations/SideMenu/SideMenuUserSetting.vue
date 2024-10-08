<script setup lang="ts">
import SideMenuBase, {
  type SideMenuProps
} from '@/components/Navigations/SideMenu/SideMenuBase.vue'

const mainContents: SideMenuProps[] = [
  {
    text: 'アカウント',
    icon: 'person',
    onClick: () => {
      console.log('TODO: アカウント')
    }
  },
  {
    text: 'プロフィール',
    icon: 'id_card',
    onClick: () => {
      console.log('TODO: プロフィール')
    }
  }
]
</script>

<template>
  <SideMenuBase :main-contents="mainContents" :bottom-contents="bottomContents">
    <h1 class="fontstyle-ui-subtitle">設定</h1>
  </SideMenuBase>
</template>

<style scoped></style>
