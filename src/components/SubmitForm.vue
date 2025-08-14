<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CodeBlock from '@/components/CodeBlock.vue'
import PrimaryButtonV2 from '@/components/Controls/ButtonV2/PrimaryButtonV2.vue'
import { type Language, LanguageApi, SubmissionsApi } from '@/api/generated'
import MaterialIcon from './MaterialIcon.vue'

const router = useRouter()

const { problemId } = defineProps<{
  problemId: number
}>()

// ジャッジで使用可能な言語一覧
const languages = ref<Language[]>([])
// 現在選択されている言語
const language = ref<Language>({ id: -1, name: 'none' })

onMounted(async () => {
  languages.value = await new LanguageApi().getLanguages()
  // language.value = languages.value[0]
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
  <div class="flex flex-col items-start gap-4 self-stretch">
    <h2 class="fontstyle-ui-subtitle">提出</h2>
    <div class="flex flex-col items-start gap-2">
      <div>
        <div class="flex items-center gap-2 self-stretch">
          <span class="fontstyle-ui-body px-2">言語</span>
          <span class="fontstyle-ui-caption-strong text-status-error">必須</span>
        </div>
        <select
          class="fontstyle-ui-body rounded border border-border-primary px-4 py-2 text-text-primary"
          :class="{ 'border-status-error': language.id == -1 }"
          required
          @change="
            (e) => {
              language = languages.find(
                (lang) => lang.id == parseInt((e.target as HTMLInputElement).value)
              )!
            }
          "
        >
          <option hidden>選択してください</option>
          <option
            v-for="lang in languages"
            :key="lang.id"
            :value="lang.id"
            class="bg-white text-text-primary checked:bg-brand-light-primary checked:text-brand-primary"
          >
            {{ lang.name }}
          </option>
        </select>
      </div>
      <div v-if="language.id == -1" class="flex items-center gap-2 self-stretch">
        <MaterialIcon icon="error" size="1rem" class="text-status-error" is-filled />
        <span class="fontstyle-ui-caption text-status-error">言語が選択されていません。</span>
      </div>
    </div>
    <CodeBlock v-model="source" class="size-full" :language="language" />
    <PrimaryButtonV2 class="justify-center" size="medium" suffix-icon="send" @click="submit">
      提出
    </PrimaryButtonV2>
  </div>
</template>

<style scoped></style>
