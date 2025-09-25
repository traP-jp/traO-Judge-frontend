<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SubmissionsTable from '@/components/SubmissionsTable.vue'
import { SubmissionsApi, type SubmissionSummary } from '@/api/generated'

const route = useRoute()
const problemId = route.params.id as string

const page = ref(1)
const rowPerPage = 20

const loadSubmissions = async (pageNum: number) => {
  const api = new SubmissionsApi()
  const response = await api.getSubmissions({
    problemIdInQuery: problemId,
    orderBy: 'submittedAtDesc',
    limit: rowPerPage,
    offset: (pageNum - 1) * rowPerPage
  })

  // SubmissionSummaryをMapに変換
  const submissionsMap = new Map<string, SubmissionSummary & { problemTitle?: string }>()
  if (response.submissions) {
    response.submissions.forEach((submission) => {
      // APIレスポンスには問題名が含まれないため、別途取得する必要があるかもしれません
      // 現時点では問題IDのみを表示
      submissionsMap.set(submission.id, submission)
    })
  }

  const totalPage = Math.ceil((response.total || 0) / rowPerPage)

  return {
    submissions: submissionsMap,
    totalPage: totalPage || 1
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <SubmissionsTable v-model="page" :load-submissions="loadSubmissions" />
  </div>
</template>

<style scoped></style>