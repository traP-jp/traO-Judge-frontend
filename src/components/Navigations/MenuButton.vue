<script setup lang="ts">
import MaterialIcon, { type Icon } from '@/components/MaterialIcon.vue'

const { selected = false } = defineProps<{
  icon?: Icon
  selected?: boolean
}>()
const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<template>
  <button
    class="flex w-full items-center gap-2 rounded px-4 py-1 hover:bg-brand-light-primary"
    :class="selected ? 'bg-brand-light-primary text-brand-primary' : 'text-text-primary'"
    @click="onClick"
  >
    <MaterialIcon v-if="icon" :icon="icon" :is-filled="selected" size="18px" />
    <span v-else class="w-4.5"></span>
    <span class="fontstyle-ui-control-strong inline-block">
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
