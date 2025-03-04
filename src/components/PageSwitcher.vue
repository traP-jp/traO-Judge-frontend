<script setup lang="ts">
import { computed } from 'vue'
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

const { begin = 0, end } = defineProps<{
  begin: number
  end: number
}>()
const current = defineModel<number>({ required: true })

// previous pages (begin, ..., -32, -16, -8, -4, -3, -2, -1)
const prevPages = computed(() => {
  const pages: number[] = []

  // Add up to 3 previous pages
  for (let page = current.value - 1; page >= current.value - 3; --page) {
    if (page < begin) return pages
    pages.unshift(page)
  }

  // Add more previous pages (-4, -8, -16, -32, ...)
  for (let diff = 4; pages[0] >= begin + 1; diff *= 2) {
    pages.unshift(pages[0] - diff)
  }
  pages[0] = begin

  return pages
})

// next pages (+1, +2, +3, +4, +8, +16, +32, ..., end-1)
const nextPages = computed(() => {
  const pages: number[] = []

  // Add up to 3 next pages
  for (let page = current.value + 1; page <= current.value + 3; ++page) {
    if (page >= end) return pages
    pages.push(page)
  }

  // Add more next pages (+4, +8, +16, +32, ...)
  for (let diff = 4; pages[pages.length - 1] < end - 1; diff *= 2) {
    pages.push(pages[pages.length - 1] + diff)
  }
  pages[pages.length - 1] = end - 1

  return pages
})
</script>

<template>
  <div class="flex justify-center gap-1">
    <template v-for="page in prevPages" :key="page">
      <BorderedButton :text="`${page}`" @click="current = page" />
    </template>
    <PrimaryButton>{{ current }}</PrimaryButton>
    <template v-for="page in nextPages" :key="page">
      <BorderedButton :text="`${page}`" @click="current = page" />
    </template>
  </div>
</template>

<style scoped></style>
