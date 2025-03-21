<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'

const { href, newTab = false } = defineProps<{
  href: string
  newTab?: boolean
}>()
</script>

<template>
  <span class="inline-flex items-center gap-1">
    <a
      :href="href"
      class="inline-flex items-center gap-1"
      :target="newTab ? '_blank' : undefined"
      :rel="newTab ? 'noopener noreferrer' : undefined"
    >
      <span class="underline">
        <slot />
      </span>
      <MaterialIcon v-if="newTab" icon="open_in_new" size="20px" />
    </a>
  </span>
</template>

<style scoped></style>
