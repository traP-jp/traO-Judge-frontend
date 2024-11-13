<script setup lang="ts">
const {
  disabled = false,
  error = false,
  placeholder = ''
} = defineProps<{
  disabled?: boolean
  error?: boolean
  placeholder?: string
}>()
const emits = defineEmits<{
  input: [event: Event]
  change: [event: Event]
}>()
</script>

<template>
  <input
    :class="{
      'border-2': error,
      border: !error,
      'border-status-error': error,
      'border-border-secondary': !error,
      'focus:border-status-error': error,
      'focus:border-text-primary': !error
    }"
    :disabled="disabled"
    :placeholder="placeholder"
    class="fontstyle-ui-body rounded bg-background-primary px-4 py-1 text-text-primary outline-none placeholder:text-text-tertiary focus:border-2 disabled:bg-background-secondary"
    type="text"
    @change="(e) => emits('change', e)"
    @input="(e) => emits('input', e)"
  />
</template>

<style scoped></style>
