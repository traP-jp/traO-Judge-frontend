<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CodeBlock from '@/components/CodeBlock.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import SelectBox from '@/components/Controls/SelectBox.vue'
import { LanguageApi, ProblemsApi, SubmissionsApi } from '@/api/generated'
import type { Language, Problem } from '@/api/generated'

const route = useRoute()
const router = useRouter()

const problemId = route.params.id as string

const problem = ref<Problem | null>(null)
const languages = ref<Language[]>([])
const selectedLanguage = ref<Language>({ id: '', name: '' })
const sourceCode = ref<string | null>(null)

const isLoading = ref(true)
const isSubmitting = ref(false)

const error = ref<string>('')

onMounted(async () => {
  try {
    const [problemResponse, languagesResponse] = await Promise.all([
      new ProblemsApi().getProblem({ problemId }),
      new LanguageApi().getLanguages()
    ])

    problem.value = problemResponse
    languages.value = languagesResponse

    if (languagesResponse.length > 0) {
      selectedLanguage.value = languagesResponse[0]
    }
  } catch (err) {
    console.error('Failed to load problem data:', err)
    error.value = '問題データの読み込みに失敗しました'
  } finally {
    isLoading.value = false
  }
})

const handleSubmit = async () => {
  if (!selectedLanguage.value.id || !sourceCode.value?.trim()) {
    alert('言語とソースコードを選択/入力してください')
    return
  }

  isSubmitting.value = true
  try {
    const submission = await new SubmissionsApi().postSubmission({
      problemId: problemId,
      postSubmissionRequest: {
        languageId: selectedLanguage.value.id,
        source: sourceCode.value
      }
    })

    await router.push(`/submissions/${submission.id}`)
  } catch (err) {
    console.error('Submission failed:', err)
    alert(`提出に失敗しました: ${err instanceof Error ? err.message : 'Unknown error'}`)
  } finally {
    isSubmitting.value = false
  }
}
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
        <h2 class="fontstyle-ui-subtitle text-text-primary">
          {{ problem?.title || '問題文' }}
        </h2>
        <div class="flex w-full items-center justify-center bg-background-tertiary py-16">
          <pre class="fontstyle-ui-body-2 whitespace-pre-wrap text-text-primary">{{
            problem?.statement || '問題本文をここに'
          }}</pre>
        </div>
      </div>
      <hr class="border-t border-border-secondary" />
      <div class="flex flex-col gap-4">
        <h2 class="fontstyle-ui-subtitle text-text-primary">提出</h2>
        <div class="w-80">
          <SelectBox
            v-model="selectedLanguage"
            :options="languages"
            label="言語"
            placeholder="言語を選択"
            required
          />
        </div>
        <div class="w-full">
          <CodeBlock v-model="sourceCode" :language="selectedLanguage" class="w-full" />
        </div>
        <div class="mt-2">
          <PrimaryButton
            :disabled="isSubmitting"
            class="h-12 w-24"
            right-icon="send"
            @click="handleSubmit"
          >
            {{ isSubmitting ? '提出中...' : '提出' }}
          </PrimaryButton>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
