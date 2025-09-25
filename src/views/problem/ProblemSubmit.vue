<script setup lang="ts">
import { useRoute } from 'vue-router'
import SubmitForm from '@/components/SubmitForm.vue'

const route = useRoute()
const problemId = route.params.id as string
</script>

<template>
  <div class="flex w-full flex-col gap-6 py-6">
    <SubmitForm :problem-id="problemId" />
  </div>
</template>

<style scoped></style>
