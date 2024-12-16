<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import { type Language, LanguageApi, SubmissionsApi } from '@/api/generated'
import { ref } from 'vue'
import type { BundledLanguage } from 'shiki/langs'
import router from '@/router'

const { problemId } = defineProps<{
  problemId: number
}>()

// ジャッジで使用可能な言語一覧
const languages = ref<Language[]>([])
new LanguageApi().getLanguages().then((res: Language[]) => (languages.value = res))

// 現在選択されている言語のid (デフォルトは1)
const languageId = ref(1)

// シンタックスハイライトのスタイル (非対応の言語の場合undefined)
const syntax = ref<BundledLanguage | undefined>(undefined)

// APIより得られる言語名と、それに対応したフォーマットの対応
const syntaxMapping: Map<string, BundledLanguage> = new Map(
  Object.entries({
    C: 'c',
    'C++': 'cpp',
    Java: 'java',
    Python: 'python',
    JavaScript: 'javascript',
    Ruby: 'ruby',
    Swift: 'swift',
    Go: 'go',
    Rust: 'rust',
    Kotlin: 'kotlin'
  })
)
// APIより得られるlanguage idから、それに対応したフォーマットを返す
const getSyntax = (id: number): BundledLanguage | undefined => {
  const language = languages.value.find((language) => language.id === id)
  if (language != undefined && syntaxMapping.has(language!.name))
    return syntaxMapping.get(language!.name)
  return undefined
}

// 入力したコード
const source = ref<string>('')

// 提出
const submit = async () => {
  const submission = await new SubmissionsApi().postSubmission({
    problemId: problemId,
    postSubmissionRequest: {
      languageId: languageId.value,
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
          languageId = parseInt((e.target as HTMLInputElement).value)
          syntax = getSyntax(languageId)
        }
      "
    >
      <option v-for="language in languages" :key="language.id" :value="language.id">
        {{ language.name }}
      </option>
    </select>
    <div class="fontstyle-ui-body-strong py-1">ソースコード</div>
    <CodeBlock v-model="source" class="size-full" :lang="syntax" />
    <div class="py-2">
      <PrimaryButton text="提出" @click="submit" />
    </div>
  </div>
</template>

<style scoped></style>
