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
    class="border-solid border-border-secondary bg-background-primary text-text-primary hover:bg-background-secondary disabled:border-border-primary disabled:bg-background-tertiary disabled:text-text-tertiary"
    :disabled="disabled"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    @click="onClick"
  >
    <slot />
  </ButtonBase>
</template>
