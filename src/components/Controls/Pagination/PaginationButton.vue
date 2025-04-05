<script setup lang="ts">
const { disabled = false, current = false } = defineProps<{
  disabled?: boolean
  padding?: string
  current?: boolean
}>()
const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong inline-block size-8 rounded disabled:opacity-50"
    :class="
      current
        ? 'bg-brand-primary text-text-inv-primary'
        : 'border border-border-primary text-text-primary enabled:hover:bg-background-secondary'
    "
    :style="{ paddingLeft: padding, paddingRight: padding }"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped></style>
