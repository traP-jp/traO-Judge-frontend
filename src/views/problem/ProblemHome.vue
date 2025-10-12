<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import SubmitForm from '@/components/SubmitForm.vue'
import { ProblemsApi } from '@/api/generated'
import type { Problem } from '@/api/generated'
import MarkdownIt from 'markdown-it'

const route = useRoute()

const problemId = route.params.id as string

const problem = ref<Problem | null>(null)

const isLoading = ref(true)

const error = ref<string>('')

// TODO: markdwonの中での数式やコードハイライト，サニタイズの対応
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
})

const renderedStatement = computed(() => {
  if (!problem.value?.statement) return '問題文が取得できませんでした'
  return md.render(problem.value.statement)
})

onMounted(async () => {
  try {
    const problemResponse = await new ProblemsApi().getProblem({ problemId })

    problem.value = problemResponse
  } catch (err) {
    console.error('Failed to load problem data:', err)
    error.value = '問題データの読み込みに失敗しました'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex w-full flex-col gap-6 py-6">
    <div v-if="error" class="rounded border border-status-error bg-background-tertiary p-4">
      <p class="fontstyle-ui-body text-status-error">{{ error }}</p>
    </div>
    <div v-if="isLoading" class="flex items-center justify-center py-16">
      <p class="fontstyle-ui-body text-text-secondary">読み込み中...</p>
    </div>
    <template v-else>
      <div class="flex flex-col gap-4">
        <h2 class="fontstyle-ui-subtitle text-text-primary">問題文</h2>
        <div
          class="prose prose-sm max-w-none text-text-primary [&>h1]:text-2xl [&>h1]:font-bold [&>h2]:text-xl [&>h2]:font-semibold"
          v-html="renderedStatement"
        ></div>
      </div>
      <hr class="border-t border-border-secondary" />
      <SubmitForm :problem-id="problemId" />
    </template>
  </div>
</template>

<style scoped></style>
