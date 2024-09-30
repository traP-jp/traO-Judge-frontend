<script setup lang="ts">
import MaterialIcon, { type Icon } from '@/components/MaterialIcon.vue'

defineProps<{
  icon: Icon,
  text: string
}>()
const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<template>
  <button
    class="flex w-full items-center gap-2 px-4 py-1"
    @click="onClick"
  >
    <MaterialIcon
      :icon="icon"
      size="18px"
    />
    <span class="fontstyle-ui-control-strong inline-block text-text-primary">{{ text }}</span>
  </button>
</template>

<style scoped></style>
