<script setup lang="ts">
import { computed } from 'vue'
import MaterialIcon, { type Icon } from '@/components/MaterialIcon.vue'

export type Size = 'large' | 'medium' | 'small'
const {
  disabled = false,
  size,
  prefixIcon,
  suffixIcon
} = defineProps<{
  disabled?: boolean
  size: Size
  prefixIcon?: Icon
  suffixIcon?: Icon
}>()
const emit = defineEmits(['click'])
function onClick() {
  emit('click')
}
const py = computed(() => {
  switch (size) {
    case 'large':
      return 'py-4'
    case 'medium':
      return 'py-3'
    default:
      return 'py-2'
  }
})
const px = computed(() => {
  switch (size) {
    case 'large':
      return 'px-6'
    case 'medium':
      return 'px-4'
    default:
      return 'px-3'
  }
})
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong inline-flex items-center justify-center rounded border"
    :class="[py, px]"
    @click="onClick"
  >
    <MaterialIcon v-if="prefixIcon" :icon="prefixIcon" size="size-6" />
    <span class="px-2"><slot /></span>
    <MaterialIcon v-if="suffixIcon" :icon="suffixIcon" size="size-6" />
  </button>
</template>
