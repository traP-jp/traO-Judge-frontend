<script setup lang="ts">
import SideMenuBase, {
  type SideMenuProps
} from '@/components/Navigations/SideMenu/SideMenuBase.vue'
import { computed } from 'vue'

const { isAdmin = false, isEditorialAvailable = false } = defineProps<{
  problemId: number
  problemName: string
  isAdmin?: boolean
  isEditorialAvailable?: boolean
}>()

const mainContents = computed((): SideMenuProps[] => {
  const contents = [
    {
      text: '問題',
      icon: 'assignment',
      onClick: () => {
        console.log('TODO: 問題')
      }
    },
    {
      text: '提出',
      icon: 'edit',
      onClick: () => {
        console.log('TODO: 提出')
      }
    },
    {
      text: '提出一覧',
      icon: 'format_list_bulleted',
      onClick: () => {
        console.log('TODO: 提出一覧')
      }
    }
  ]
  if (isEditorialAvailable) {
    contents.push({
      text: '解説',
      icon: 'assignment_turned_in',
      onClick: () => {
        console.log('TODO: 解説')
      }
    })
  }
  return contents
})
const bottomContents = computed((): SideMenuProps[] => {
  if (isAdmin) {
    return [
      {
        text: '問題設定',
        icon: 'edit_note',
        onClick: () => {
          console.log('TODO: 問題設定')
        }
      },
      {
        text: 'ジャッジ設定',
        icon: 'code',
        onClick: () => {
          console.log('TODO: ジャッジ設定')
        }
      }
    ]
  } else {
    return []
  }
})
</script>

<template>
  <SideMenuBase :main-contents="mainContents" :bottom-contents="bottomContents">
    <h2 class="font-primary text-sm font-semibold text-text-secondary">{{ problemId }}</h2>
    <h1 class="fontstyle-ui-subtitle">{{ problemName }}</h1>
  </SideMenuBase>
</template>

<style scoped></style>
