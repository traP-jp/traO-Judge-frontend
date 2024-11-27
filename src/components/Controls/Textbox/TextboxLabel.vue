<script setup lang="ts">
const { isRequired = false } = defineProps<{
  isRequired?: boolean
  label: string
}>()
</script>

<template>
  <span class="flex gap-1 px-1">
    <span class="fontstyle-ui-control text-text-secondary">{{ label }}</span>
    <span v-if="isRequired" class="fontstyle-ui-control text-status-error">*</span>
  </span>
</template>

<style scoped></style>
