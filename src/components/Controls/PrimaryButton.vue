<script setup lang="ts">
import MaterialIcon, { type Icon } from '@/components/MaterialIcon.vue'

const { disabled = false, padding, leftIcon, rightIcon } = defineProps<{
  disabled?: boolean
  padding?: string
  leftIcon?: Icon
  rightIcon?: Icon
}>()
const emit = defineEmits(['click'])
function onClick() {
  emit('click')
}
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong inline-flex items-center justify-center gap-2 rounded border border-brand-primary bg-brand-primary text-white enabled:hover:border-brand-secondary enabled:hover:bg-brand-secondary disabled:opacity-50"
    :style="{ paddingLeft: padding, paddingRight: padding }"
    @click="onClick"
  >
    <MaterialIcon v-if="leftIcon" :icon="leftIcon" size="20px" />
    <slot />
    <MaterialIcon v-if="rightIcon" :icon="rightIcon" size="20px" />
  </button>
</template>

<style scoped></style>
