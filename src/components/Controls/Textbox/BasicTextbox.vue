<script setup lang="ts">
const {
  disabled = false,
  error = false,
  placeholder = '',
  value = ''
} = defineProps<{
  disabled?: boolean
  error?: boolean
  placeholder?: string
  value?: string
}>()
const emits = defineEmits<{
  input: [event: Event]
  change: [event: Event]
}>()
</script>

<template>
  <input
    :class="[
      { 'border-border-secondary focus:border-text-primary': !error },
      { 'border-status-error outline outline-1 outline-status-error': error },
      'fontstyle-ui-body rounded border bg-background-primary px-4 py-1 text-text-primary placeholder:text-text-tertiary focus:outline focus:outline-1 disabled:bg-background-secondary'
    ]"
    :disabled="disabled"
    :placeholder="placeholder"
    type="text"
    :value
    @change="(e) => emits('change', e)"
    @input="(e) => emits('input', e)"
  />
</template>

<style scoped></style>
