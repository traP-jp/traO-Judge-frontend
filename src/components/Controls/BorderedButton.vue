<script setup lang="ts">
const { disabled = false } = defineProps<{
  disabled?: boolean
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
    class="fontstyle-ui-control-strong inline-block rounded border border-brand-primary px-6 text-brand-primary enabled:hover:bg-brand-light-primary disabled:opacity-50"
    :style="{ paddingLeft: padding, paddingRight: padding }"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped></style>
