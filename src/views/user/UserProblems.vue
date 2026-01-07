<script lang="ts" setup>
import { useQueryParamInt } from '@/composables/useQueryParam'
import { ProblemsApi, type ProblemSummaries, type ProblemSummary, type User } from '@/api/generated'
import ProblemsList from '@/components/ProblemsList.vue'

const props = defineProps<{ userId: string; user: User | null }>()
const page = useQueryParamInt('page', 1, true)

const rowPerPage = 20

/**
 * Fetch the problems with the current state and update the state
 */
const loadProblems = async (page: number, difficultyBegin: number, difficultyEnd: number) => {
  try {
    const summaries: ProblemSummaries = await new ProblemsApi().getProblems({
      orderBy: 'createdAtDesc',
      userId: props.userId,
      limit: rowPerPage,
      offset: (page - 1) * rowPerPage
      // TODO: ここで上限・下限を渡せるようにする
    })

    const problems = new Map(
      summaries.problems
        ?.filter(({ difficulty }) => difficultyBegin <= difficulty && difficulty <= difficultyEnd)
        .map((problem) => [problem.id, problem])
    )

    const totalProblems = summaries.total ?? problems.size
    const totalPage = Math.ceil(totalProblems / rowPerPage)

    return {
      problems: problems,
      totalPage: totalPage
    }
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
    return {
      problems: new Map<string, ProblemSummary>(),
      totalPage: 0
    }
  }
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <ProblemsList v-model="page" :load-problems="loadProblems">
      <span class="mr-1">{{ props.user?.name }}</span>
      <span class="grow">の問題</span>
    </ProblemsList>
  </section>
</template>

<style scoped></style>
