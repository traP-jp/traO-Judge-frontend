<script setup lang="ts">
import SideMenuBase, {
  type SideMenuProps
} from '@/components/Navigations/SideMenu/SideMenuBase.vue'
import { computed } from 'vue'

const { isMe = false } = defineProps<{
  isMe?: boolean
  username: string
}>()
console.log(isMe)

const mainContents: SideMenuProps[] = [
  {
    text: 'プロフィール',
    icon: 'id_card',
    onClick: () => {
      console.log('TODO: プロフィール')
    }
  },
  {
    text: '提出一覧',
    icon: 'format_list_bulleted',
    onClick: () => {
      console.log('TODO: 提出一覧')
    }
  },
  {
    text: '問題一覧',
    icon: 'library_books',
    onClick: () => {
      console.log('TODO: 問題一覧')
    }
  }
]
const bottomContents = computed((): SideMenuProps[] => {
  if (!isMe) return []
  return [
    {
      text: 'プロフィールを編集',
      icon: 'edit_note',
      onClick: () => {
        console.log('TODO: プロフィールを編集')
      }
    }
  ]
})
</script>

<template>
  <SideMenuBase :main-contents="mainContents" :bottom-contents="bottomContents">
    <div class="flex w-full flex-col items-center justify-center">
      <img src="" alt="user-icon" class="size-40 rounded-full" />
      <span class="mt-2 font-primary text-xl font-semibold text-text-primary">{{ username }}</span>
    </div>
  </SideMenuBase>
</template>

<style scoped></style>
