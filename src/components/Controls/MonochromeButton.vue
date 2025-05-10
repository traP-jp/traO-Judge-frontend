<script setup lang="ts">
const { disabled = false, small = false } = defineProps<{
  disabled?: boolean
  padding?: string
  small?: boolean
}>()
const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong inline-block rounded border text-text-primary enabled:hover:bg-background-secondary disabled:opacity-50"
    :class="small ? 'h-8 px-3 border-text-secondary' : 'h-10 px-6 border-text-primary'"
    :style="{ paddingLeft: padding, paddingRight: padding }"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped></style>
