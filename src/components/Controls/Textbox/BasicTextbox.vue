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
const value = defineModel<string>('value')
</script>

<template>
  <input
    v-model="value"
    :class="[
      { 'border-border-secondary outline-text-primary focus:border-text-primary': !error },
      { 'border-status-error outline outline-1 outline-status-error': error },
      'fontstyle-ui-body max-w-full rounded border bg-background-primary px-4 py-1 text-text-primary placeholder:text-text-tertiary focus:outline focus:outline-1 disabled:bg-background-secondary'
    ]"
    :disabled="disabled"
    :placeholder="placeholder"
    type="text"
  />
</template>

<style scoped></style>
