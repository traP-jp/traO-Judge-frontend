<script setup lang="ts">
const { disabled = false } = defineProps<{
  disabled?: boolean
  text: string
  padding?: string
}>()
const emit = defineEmits(['click'])
function onClick() {
  emit('click')
}
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong inline-block h-9 rounded border border-text-primary px-6 text-text-primary enabled:hover:bg-background-secondary disabled:opacity-50"
    :style="{ paddingLeft: padding, paddingRight: padding }"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
