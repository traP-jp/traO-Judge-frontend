<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CodeBlock from '@/components/CodeBlock.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import SelectBox from '@/components/Controls/SelectBox.vue'
import { LanguageApi, SubmissionsApi } from '@/api/generated'
import type { Language } from '@/api/generated'

const router = useRouter()

const { problemId } = defineProps<{
  problemId: string
}>()

const languages = ref<Language[]>([])
const selectedLanguage = ref<Language>({ id: '', name: '' })
const sourceCode = ref<string | null>(null)

const isLoading = ref(true)
const isSubmitting = ref(false)

const error = ref<string>('')

onMounted(async () => {
  try {
    const languagesResponse = await new LanguageApi().getLanguages()

    languages.value = languagesResponse

    if (languagesResponse.length > 0) {
      selectedLanguage.value = languagesResponse[0]
    }
  } catch (err) {
    console.error('Failed to load languages:', err)
    error.value = '言語データの読み込みに失敗しました'
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
  <div class="flex flex-col gap-4">
    <div v-if="error" class="rounded border border-status-error bg-background-tertiary p-4">
      <p class="fontstyle-ui-body text-status-error">{{ error }}</p>
    </div>
    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <p class="fontstyle-ui-body text-text-secondary">読み込み中...</p>
    </div>
    <template v-else>
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
    </template>
  </div>
</template>

<style scoped></style>
