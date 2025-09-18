<script setup lang="ts">
import MaterialIcon, { type Icon } from '@/components/MaterialIcon.vue'

const { disabled = false } = defineProps<{
  disabled?: boolean
  padding?: string
  icon?: Icon
}>()
const emit = defineEmits(['click'])
function onClick() {
  emit('click')
}
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong inline-flex h-10 items-center rounded border border-brand-primary px-6 text-brand-primary enabled:hover:bg-brand-light-primary disabled:opacity-50"
    :style="{ paddingLeft: padding, paddingRight: padding }"
    @click="onClick"
  >
    <slot />
    <MaterialIcon v-if="icon" :icon="icon" size="24px" class="ml-2" />
  </button>
</template>

<style scoped></style>
