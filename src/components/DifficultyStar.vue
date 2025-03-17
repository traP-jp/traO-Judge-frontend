<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'

defineProps<{
  difficulty: number
}>()
</script>

<template>
  <div class="inline-flex items-center">
    <span v-for="i in 5" :key="i" class="size-5">
      <MaterialIcon
        v-if="i * 2 - 1 <= difficulty"
        :icon="i * 2 - 1 == difficulty ? 'star_half' : 'star_rate'"
        is-filled
        size="20px"
      />
    </span>
  </div>
</template>

<style scoped></style>
