<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SideMenuBase, {
  type SideMenuProps
} from '@/components/Navigations/SideMenu/SideMenuBase.vue'

const route = useRoute()

const { isMe = false, userId, username, iconUrl = '' } = defineProps<{
  isMe?: boolean
  userId: string
  username: string
  iconUrl?: string
}>()

const mainContents = computed<SideMenuProps[]>(() => [
  {
    text: 'プロフィール',
    icon: 'id_card',
    href: `/users/${userId}`
  },
  {
    text: '提出一覧',
    icon: 'format_list_bulleted',
    href: `/users/${userId}/submissions`
  },
  {
    text: '問題一覧',
    icon: 'library_books',
    href: `/users/${userId}/problems`
  }
])
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

const currentTab = ref<number>(0)
watch(
  () => route.path,
  (path) => {
    const index = mainContents.value.findIndex((content) => content.href === path)
    if (index >= 0) currentTab.value = index
  },
  { immediate: true }
)
</script>

<template>
  <SideMenuBase
    v-model="currentTab"
    :bottom-contents="bottomContents"
    :main-contents="mainContents"
  >
    <div class="flex w-full flex-col items-center justify-center">
      <img :src="iconUrl" alt="user-icon" class="size-40 rounded-full" />
      <span class="mt-2 font-primary text-xl font-semibold text-text-primary">{{ username }}</span>
    </div>
  </SideMenuBase>
</template>

<style scoped></style>
