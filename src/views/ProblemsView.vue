<!-- TODO: v0ではデザインが設定されていないので仮のページ -->
<script lang="ts" setup>
import { useQueryParamInt } from '@/composables/useQueryParam'
import { ProblemsApi, type ProblemSummaries, type ProblemSummary } from '@/api/generated'
import ProblemsList from '@/components/ProblemsList.vue'

const page = useQueryParamInt('page', 1, true)

const rowPerPage = 20

const loadProblems = async (page: number, difficultyBegin: number, difficultyEnd: number) => {
  try {
    const summaries: ProblemSummaries = await new ProblemsApi().getProblems({
      orderBy: 'createdAtDesc',
      limit: rowPerPage,
      offset: (page - 1) * rowPerPage
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
  <section class="flex flex-col gap-4 px-container-x py-6">
    <ProblemsList v-model="page" :load-problems="loadProblems">
      <span class="grow">問題一覧</span>
    </ProblemsList>
  </section>
</template>

<style scoped></style>
