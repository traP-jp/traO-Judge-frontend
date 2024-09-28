<script setup lang="ts">
defineProps({
  icon: String,
  text: String
})
const emit = defineEmits(['click'])
function onClick() {
  emit('click')
}
</script>

<template>
  <button
    class="flex w-full items-center gap-1 px-2 py-1"
    @click="onClick"
  >
    <img
      src=""
      alt="icon"
      class="inline-block size-4.5"
    >
    <span class="fontstyle-ui-control-strong inline-block text-text-primary">{{ text }}</span>
  </button>
</template>

<style scoped></style>
