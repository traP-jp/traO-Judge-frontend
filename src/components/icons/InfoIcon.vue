<script setup lang="ts">
const {size = "1.5rem", isFilled = false} = defineProps<{
  size?: string,
  isFilled?: boolean,
}>()
</script>

<template>
  <span
    class="material-symbols-rounded"
    :style="{fontVariationSettings: '\'FILL\' ' + (isFilled ? 1 : 0), fontSize: size}"
  >
    info
  </span>
</template>