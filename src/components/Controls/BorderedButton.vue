<script setup lang="ts">
const { disabled = false } = defineProps<{
  disabled?: boolean
  text: string
}>()
const emit = defineEmits(['click'])
function onClick() {
  emit('click')
}
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong rounded border border-brand-primary px-6 py-1.75 text-brand-primary enabled:hover:bg-brand-light-primary disabled:opacity-50"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
