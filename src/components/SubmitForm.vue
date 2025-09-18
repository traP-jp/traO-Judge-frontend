<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CodeBlock from '@/components/CodeBlock.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import { type Language, LanguageApi, SubmissionsApi } from '@/api/generated'

const router = useRouter()

const { problemId } = defineProps<{
  problemId: number
}>()

// ジャッジで使用可能な言語一覧
const languages = ref<Language[]>([])
// 現在選択されている言語
const language = ref<Language>({ id: '', name: 'none' })

onMounted(async () => {
  languages.value = await new LanguageApi().getLanguages()
  language.value = languages.value[0]
})

// 入力したコード
const source = ref<string>('')

// 提出
const submit = async () => {
  const submission = await new SubmissionsApi().postSubmission({
    problemId: problemId,
    postSubmissionRequest: {
      languageId: language.value.id,
      source: source.value
    }
  })
  // 提出ページに遷移
  await router.push(`/submissions/${submission.id}`)
}
</script>

<template>
  <div>
    <div class="fontstyle-ui-body-strong py-1">言語</div>
    <select
      class="fontstyle-ui-body rounded border border-border-primary px-4 py-2 text-text-primary"
      @change="
        (e) => {
          language = languages.find((lang) => lang.id === (e.target as HTMLInputElement).value)!
        }
      "
    >
      <option v-for="lang in languages" :key="lang.id" :value="lang.id">
        {{ lang.name }}
      </option>
    </select>
    <div class="fontstyle-ui-body-strong py-1">ソースコード</div>
    <CodeBlock v-model="source" class="size-full" :language="language" />
    <div class="py-2">
      <PrimaryButton @click="submit">提出</PrimaryButton>
    </div>
  </div>
</template>

<style scoped></style>
