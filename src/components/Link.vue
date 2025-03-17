<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'

defineProps<{
  href: string
}>()
</script>

<template>
  <span class="inline-flex items-center gap-1">
    <a :href="href" class="inline-flex items-center gap-1">
      <span class="underline">
        <slot />
      </span>
      <MaterialIcon icon="open_in_new" size="20px" />
    </a>
  </span>
</template>

<style scoped></style>
