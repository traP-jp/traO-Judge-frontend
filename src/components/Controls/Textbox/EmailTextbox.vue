<script setup lang="ts">
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import isEmail from 'validator/lib/isEmail'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  errorMessage?: string
}>()
const value = defineModel<string>()
const isEmailError = computed(() => (value.value?.length ?? 0) > 0 && !isEmail(value.value ?? ''))
const shownErrorMessage = ref<string | undefined>(props.errorMessage) // 初期値を設定

watch(
  () => props.errorMessage,
  () => {
    updateError()
  }
)

const updateError = () => {
  shownErrorMessage.value = isEmailError.value
    ? 'メールアドレスの形式が正しくありません。'
    : props.errorMessage
}
</script>

<template>
  <PlainTextbox
    v-bind="$attrs"
    v-model="value"
    :error-message="shownErrorMessage"
    class="h-6.5"
    @blur="updateError"
  />
</template>

<style scoped></style>
