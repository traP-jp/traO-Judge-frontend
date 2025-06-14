<script setup lang="ts">
import SubmitForm from '@/components/SubmitForm.vue'
import type { Problem } from '@/api/generated'
const { problem } = defineProps<{
  problem?: Problem
}>()
const problemId = Number(problem?.id)
</script>

<template>
  <div class="flex shrink-0 grow basis-0 flex-col items-start gap-6">
    <div class="flex flex-col gap-4 self-stretch">
      <h2 class="fontstyle-ui-subtitle self-stretch">問題文</h2>
      <div
        class="flex items-center justify-center gap-2.5 self-stretch bg-background-secondary py-16"
      >
        <p class="fontstyle-ui-body">{{ problem?.statement }}</p>
      </div>
    </div>
    <hr class="w-full border-border-primary" />
    <SubmitForm v-if="problem" :problem-id="problemId" />
  </div>
</template>

<style scoped></style>
