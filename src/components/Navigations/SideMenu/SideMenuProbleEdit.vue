<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import SideMenuBase, {
  type SideMenuProps
} from '@/components/Navigations/SideMenu/SideMenuBase.vue'
import { ProblemsApi } from '@/api/generated'

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

const problemTitle = ref<string>('')

const fetchProblemTitle = async () => {
  try {
    const api = new ProblemsApi()
    const response = await api.getProblem({ problemId })
    problemTitle.value = response.title ?? ''
  } catch (error) {
    console.error('問題の取得に失敗しました:', error)
  }
}

watch(
  () => route.path,
  (path) => {
    const index = mainContents.value.findIndex((content) => path.startsWith(content.href!))
    if (index >= 0) currentTab.value = index
  },
  { immediate: true }
)

watch(
  () => problemId,
  fetchProblemTitle,
  { immediate: true }
)
</script>

<template>
  <SideMenuBase v-model="currentTab" :main-contents="mainContents">
    <div class="flex w-full flex-col justify-center">
      <span class="mt-2 font-primary text-xl font-semibold text-text-primary">問題設定</span>
      <span class="mt-2 font-primary text-base font-semibold text-text-tertiary">{{ problemTitle }}</span>
    </div>
  </SideMenuBase>
</template>

<style scoped></style>
