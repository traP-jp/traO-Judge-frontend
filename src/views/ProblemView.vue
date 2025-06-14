<script setup lang="ts">
import { useRoute } from 'vue-router'
import SideMenuProblem from '@/components/Navigations/SideMenu/SideMenuProblem.vue'
import { ref, watch } from 'vue'
import { ProblemsApi, type Problem } from '@/api/generated'

const route = useRoute()
if (typeof route.params.id !== 'string') throw new Error('Invalid route')
const problemID = ref<string>('')
const problem = ref<Problem | null>()
const loadProblem = async () => {
  try {
    const responce: Problem = await new ProblemsApi().getProblem({ problemId: problemID.value })
    problem.value = responce
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  }
}
watch(
  () => route.params.id,
  (id) => {
    problemID.value = `${id}`
    loadProblem()
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex gap-8 px-[120px]">
    <nav class="sticky top-14 h-header-offset">
      <SideMenuProblem :problem-name="problem?.title ?? ''" />
    </nav>
    <main class="flex-auto py-6">
      <RouterView :problem="problem" />
    </main>
  </div>
</template>

<style scoped></style>
