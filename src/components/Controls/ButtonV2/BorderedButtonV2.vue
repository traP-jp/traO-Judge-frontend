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
    class="border-solid border-brand-primary bg-background-primary text-brand-primary hover:bg-brand-light-primary disabled:opacity-50"
    :size="size"
    :disabled="disabled"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    @click="onClick"
  >
    <slot />
  </ButtonBase>
</template>
