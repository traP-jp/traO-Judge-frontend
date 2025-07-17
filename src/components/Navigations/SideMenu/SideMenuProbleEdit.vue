<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import SideMenuBase, {
  type SideMenuProps
} from '@/components/Navigations/SideMenu/SideMenuBase.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'

const route = useRoute()

const { problemId } = defineProps<{
  problemId: string
}>()

const mainContents = computed((): SideMenuProps[] => [
  {
    text: '一般',
    icon: 'info',
    href: `/problems/${problemId}/edit/basic`
  },
  {
    text: '問題文',
    icon: 'library_books',
    href: `/problems/${problemId}/edit/statement`
  },
  {
    text: 'テストケース',
    icon: 'labs',
    href: `/problems/${problemId}/edit/testcases`
  },
  {
    text: '解説',
    icon: 'assignment_turned_in',
    href: `/problems/${problemId}/edit/editorials`
  }
])

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
  <SideMenuBase v-model="currentTab" :main-contents="mainContents">
    <div class="flex w-full flex-col items-center justify-center">
      <div class="flex size-40 items-center justify-center rounded-full bg-background-tertiary">
        <MaterialIcon icon="edit" size="4rem" />
      </div>
      <span class="mt-2 font-primary text-xl font-semibold text-text-primary">問題設定</span>
    </div>
  </SideMenuBase>
</template>

<style scoped></style>
