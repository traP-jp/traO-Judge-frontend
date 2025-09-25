<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SubmitForm from '@/components/SubmitForm.vue'
import { ProblemsApi } from '@/api/generated'
import type { Problem } from '@/api/generated'

const route = useRoute()

const problemId = route.params.id as string

const problem = ref<Problem | null>(null)

const isLoading = ref(true)

const error = ref<string>('')

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
        <div class="flex w-full items-center justify-center bg-background-tertiary py-16">
          <pre class="fontstyle-ui-body-2 whitespace-pre-wrap text-text-primary">{{
            problem?.statement || '問題本文をここに'
          }}</pre>
        </div>
      </div>
      <hr class="border-t border-border-secondary" />
      <SubmitForm :problem-id="problemId" />
    </template>
  </div>
</template>

<style scoped></style>
