<script setup lang="ts">
import ButtonBase, { type Size } from '@/components/Controls/ButtonV2/ButtonBase.vue'
import type { Icon } from '@/components/MaterialIcon.vue'
const { size, disabled, prefixIcon, suffixIcon } = defineProps<{
  size: Size
  disabled?: boolean
  prefixIcon?: Icon
  suffixIcon?: Icon
}>()
const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<template>
  <ButtonBase
    :size="size"
    color-text="text-text-primary"
    color-border="border-border-secondary"
    color-enabled="bg-background-primary"
    color-hover="bg-background-secondary"
    color-disabled="opacity-50"
    :disabled="disabled"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    @click="onClick"
  >
    <slot />
  </ButtonBase>
</template>
