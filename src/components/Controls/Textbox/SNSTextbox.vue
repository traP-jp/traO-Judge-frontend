<script setup lang="ts">
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import { ref, watch } from 'vue'

// モデル値
const modelValue = defineModel<string>()

// 右端のクロスアイコンの表示状態
const showClearIcon = ref<boolean>(false)

// 入力値に基づいてクリアアイコン表示を更新
watch(
  () => modelValue.value,
  (newValue) => {
    showClearIcon.value = !!newValue && newValue.length > 0
  },
  { immediate: true }
)

// クリアボタンクリック時の処理
function clearInput() {
  modelValue.value = ''
  showClearIcon.value = false
}
</script>

<template>
  <PlainTextbox
    v-model="modelValue"
    left-icon="alternate_email"
    right-icon="close"
    v-bind="$attrs"
    class="h-5.5"
    @click-right="clearInput"
  />
</template>

<style scoped></style>
