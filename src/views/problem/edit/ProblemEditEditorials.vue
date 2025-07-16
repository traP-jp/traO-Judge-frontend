<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

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
  <div>
    <h1>This is a Editorial Page for {{ problemId }}</h1>
  </div>
</template>

<style scoped></style>
