<script setup lang="ts">
const {
  current,
  begin = 0,
  end
} = defineProps<{
  current: number
  begin: number
  end: number
}>()
const emit = defineEmits<{ switch: [page: number] }>()
</script>

<template>あけおめ</template>

<style scoped></style>
