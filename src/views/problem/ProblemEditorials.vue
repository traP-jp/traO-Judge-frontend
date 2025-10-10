<script setup lang="ts">
import EditableEditorialsList from '@/components/EditableEditorialsList.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const problemId = route.params.id as string
</script>

<template>
  <div class="flex flex-[1_0_0] flex-col items-start py-6">
    <div class="flex flex-col items-center gap-4 self-stretch">
      <div class="fontstyle-ui-subtitle flex items-start self-stretch text-[#000000]">解説一覧</div>
      <EditableEditorialsList :problem-id="problemId"/>
    </div>
  </div>
</template>

<style scoped></style>
