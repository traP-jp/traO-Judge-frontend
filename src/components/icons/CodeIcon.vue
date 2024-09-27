<script setup lang="ts">
const {size = "1.5rem"} = defineProps<{
  size?: string,
}>()
</script>

<template>
  <span
    class="material-symbols-rounded"
    :style="{fontVariationSettings: '\'FILL\' 0', fontSize: size}"
  >
    code
  </span>
</template>