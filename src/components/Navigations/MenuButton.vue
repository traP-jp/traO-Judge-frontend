<script setup lang="ts">
import MaterialIcon, { type Icon } from '@/components/MaterialIcon.vue'

defineProps<{
  icon: Icon,
  text: string,
  selected: boolean,
}>()
const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<template>
  <button
    class="flex w-full items-center gap-2 rounded px-4 py-1 hover:bg-brand-light-primary"
    :class="selected ? 'bg-brand-light-primary' : null"
    @click="onClick"
  >
    <MaterialIcon
      :icon="icon"
      size="18px"
      :class="selected ? 'text-brand-primary' : 'text-text-primary'"
      :is-filled="selected"
    />
    <span
      class="fontstyle-ui-control-strong inline-block"
      :class="selected ? 'text-brand-primary' : 'text-text-primary'"
    >{{ text }}</span>
  </button>
</template>

<style scoped></style>
