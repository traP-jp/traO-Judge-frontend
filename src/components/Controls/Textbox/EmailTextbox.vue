<script setup lang="ts">
import { computed } from 'vue'
import isEmail from 'validator/lib/isEmail'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'

defineProps<{
  errorMessage?: string
}>()
const value = defineModel<string>()
const isEmailError = computed(() => (value.value?.length ?? 0) > 0 && !isEmail(value.value ?? ''))
</script>

<template>
  <PlainTextbox
    v-bind="$attrs"
    v-model="value"
    :error-message="isEmailError ? 'メールアドレスの形式が正しくありません。' : errorMessage"
  />
</template>

<style scoped></style>
