<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import EditorialsList from '@/components/EditorialsList.vue'

const route = useRoute()

if (typeof route.params.id !== 'string') throw new Error('Invalid route')
const problemId = ref<string>('')
watch(
  () => route.params.id,
  (id) => {
    problemId.value = `${id}`
  },
  { immediate: true }
)
</script>

<template>
  <section class="flex flex-col gap-4">
    <EditorialsList :problem-id="problemId">
      <span class="grow">解説</span>
    </EditorialsList>
  </section>
</template>

<style scoped></style>
