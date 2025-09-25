<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, useTemplateRef, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { shikiToMonaco } from '@shikijs/monaco'
import { type BundledLanguage, createHighlighter, type Highlighter } from 'shiki'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { type Language } from '@/api/generated'

const { language } = defineProps<{
  language: Language
}>()

const model = defineModel<string | null>({ required: false })

let editor: monaco.editor.IStandaloneCodeEditor | undefined
const element = useTemplateRef<HTMLElement>('codeBlock')

let highlighter: Highlighter

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

const setLanguage = async (language?: Language) => {
  if (editor == undefined) return
  let syntaxName: BundledLanguage | undefined
  if (language != undefined && syntaxMapping.has(language.name)) {
    syntaxName = syntaxMapping.get(language.name)!
    await highlighter.loadLanguage(syntaxName)
    monaco.languages.register({ id: syntaxName })
  }
  // 対応していない言語の場合、textフォーマッタを使用
  monaco.editor.setModelLanguage(editor!.getModel()!, syntaxName || 'text')
}

const configureMonacoEditor = () => {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') {
        return new jsonWorker()
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker()
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker()
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker()
      }
      return new editorWorker()
    }
  }
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
}

let initialized: boolean = false
onMounted(async () => {
  if (import.meta.env.SSR) return

  configureMonacoEditor()

  editor = monaco.editor.create(element.value!, {
    value: model.value ?? '',
    automaticLayout: true
  })

  highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: []
  })

  shikiToMonaco(highlighter, monaco)

  await setLanguage(language)
  editor.getModel()?.onDidChangeContent(() => {
    model.value = editor!.getValue()
  })
  initialized = true
})

onUpdated(async () => {
  if (!initialized) return
  await setLanguage(language)
})

onBeforeUnmount(() => {
  editor?.dispose()
})

watch(model, () => {
  const value = model.value ?? ''
  if (value != editor?.getValue()) editor?.setValue(value)
})
</script>

<template>
  <div class="rounded border border-border-primary p-1">
    <div ref="codeBlock" class="size-full min-h-80"></div>
  </div>
</template>
