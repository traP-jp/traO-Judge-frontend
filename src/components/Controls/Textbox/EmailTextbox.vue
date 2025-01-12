<script setup lang="ts">
import { computed, ref } from 'vue'
import isEmail from 'validator/lib/isEmail'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'

const props = defineProps<{
  errorMessage?: string
}>()
const value = defineModel<string>()
const isEmailError = computed(() => (value.value?.length ?? 0) > 0 && !isEmail(value.value ?? ''))
const shownErrorMessage = ref<string | undefined>()
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
    @blur="updateError"
  />
</template>

<style scoped></style>
