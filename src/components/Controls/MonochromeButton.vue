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
    class="fontstyle-ui-control-strong rounded border border-text-primary px-6 py-1.75 text-text-primary enabled:hover:bg-background-secondary disabled:opacity-50"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
