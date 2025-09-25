<script setup lang="ts">
import SideMenuBase, {
  type SideMenuProps
} from '@/components/Navigations/SideMenu/SideMenuBase.vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { isAdmin = false, isEditorialAvailable = false } = defineProps<{
  problemName: string
  isAdmin?: boolean
  isEditorialAvailable?: boolean
}>()

const problemId = route.params.id as string

const mainContents = computed(() => {
  const contents: SideMenuProps[] = [
    {
      text: '問題',
      icon: 'assignment',
      href: `/problems/${problemId}`
    },
    {
      text: '提出',
      icon: 'edit',
      href: `/problems/${problemId}/submit`
    },
    {
      text: '提出一覧',
      icon: 'format_list_bulleted',
      href: `/problems/${problemId}/submissions`
    }
  ]
  if (isEditorialAvailable) {
    contents.push({
      text: '解説',
      icon: 'assignment_turned_in',
      href: `/problems/${problemId}/editorials`
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
        href: `/problems/${problemId}/edit`
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

const currentTab = ref<number>(0)
watch(
  () => route.path,
  (path) => {
    let index = mainContents.value.findIndex((content) => content.href === path)
    if (index >= 0) {
      currentTab.value = index
      return
    }

    index = bottomContents.value.findIndex((content) => content.href === path)
    if (index >= 0) {
      const adjustedIndex = mainContents.value.length + index
      currentTab.value = adjustedIndex
      return
    }
  },
  { immediate: true }
)
</script>

<template>
  <SideMenuBase 
    v-model="currentTab" 
    :main-contents="mainContents" 
    :bottom-contents="bottomContents"
  >
    <h1 class="fontstyle-ui-subtitle">{{ problemName }}</h1>
  </SideMenuBase>
</template>

<style scoped></style>
