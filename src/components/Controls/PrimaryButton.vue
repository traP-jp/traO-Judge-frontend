<script setup lang="ts">
const { disabled = false, padding } = defineProps<{
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
    class="fontstyle-ui-control-strong inline-block rounded border border-brand-primary bg-brand-primary px-6 text-white enabled:hover:border-brand-secondary enabled:hover:bg-brand-secondary disabled:opacity-50"
    :style="{ paddingLeft: padding, paddingRight: padding }"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped></style>
