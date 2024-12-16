<script setup lang="ts">
import { onMounted, onUpdated, useTemplateRef, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { shikiToMonaco } from '@shikijs/monaco'
import {
  type BundledLanguage,
  type BundledTheme,
  createHighlighter,
  type HighlighterGeneric
} from 'shiki'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const { lang } = defineProps<{
  lang?: BundledLanguage
}>()

const model = defineModel<string>()

const codeBlock = useTemplateRef('codeBlock')

let editor: monaco.editor.IStandaloneCodeEditor | undefined

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | undefined

const setLanguage = async (lang: BundledLanguage) => {
  if (lang != undefined && editor != undefined) {
    highlighter?.loadLanguage(lang)
    monaco.languages.register({ id: lang })
    monaco.editor.setModelLanguage(editor!.getModel()!, lang)
  }
}

onMounted(async () => {
  if (import.meta.env.SSR) return

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

  editor = monaco.editor.create(codeBlock.value!, {
    value: model.value!,
    automaticLayout: true
  })
  highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: []
  })
  shikiToMonaco(highlighter, monaco)

  if (lang !== undefined) await setLanguage(lang!)
  editor.getModel()?.onDidChangeContent(() => {
    model.value = editor!.getValue()
  })
})

onUpdated(async () => {
  await setLanguage(lang!)
})
watch(model, () => {
  if (model.value != editor?.getValue()) editor!.setValue(model.value!)
})
</script>

<template>
  <div class="rounded border border-border-primary p-1">
    <div ref="codeBlock" class="size-full"></div>
  </div>
</template>
