<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SubmissionsTable from '@/components/SubmissionsTable.vue'
import SubmissionsFilter from '@/components/SubmissionsFilter.vue'
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

  const submissionsMap = new Map<string, SubmissionSummary>()
  if (response.submissions) {
    response.submissions.forEach((submission) => {
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
  <div class="flex flex-col gap-6 py-6">
    <SubmissionsFilter>
      <template #title>提出一覧</template>
    </SubmissionsFilter>

    <SubmissionsTable v-model="page" :load-submissions="loadSubmissions" />
  </div>
</template>

<style scoped></style>
