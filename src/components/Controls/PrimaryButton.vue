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
    class="fontstyle-ui-control-strong rounded bg-brand-primary px-6 py-2 text-white enabled:hover:bg-brand-secondary disabled:opacity-50"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
