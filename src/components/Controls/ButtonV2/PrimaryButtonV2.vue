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
    class="border-brand-primary bg-brand-primary text-text-inv-primary hover:bg-brand-secondary disabled:opacity-50"
    :size="size"
    :disabled="disabled"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    @click="onClick"
  >
    <slot />
  </ButtonBase>
</template>
