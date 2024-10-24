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
</script>

<template>
  <input
    type="text"
    class="fontstyle-ui-body rounded bg-background-primary px-4 py-1 text-text-primary outline-none placeholder:text-text-tertiary focus:border-2 disabled:bg-background-secondary"
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
  />
</template>

<style scoped></style>
