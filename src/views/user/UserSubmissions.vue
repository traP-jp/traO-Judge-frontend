<script setup lang="ts">
import { useQueryParamInt } from '@/composables/useQueryParam'
import SubmissionsTable from '@/components/SubmissionsTable.vue'
import SubmissionsFilter from '@/components/SubmissionsFilter.vue'
import { SubmissionsApi, type SubmissionSummary, type User } from '@/api/generated'

const props = defineProps<{ userId: string; user: User | null }>()
const page = useQueryParamInt('page', 0, true)

const rowPerPage = 20

const loadSubmissions = async (
  currentPage: number
): Promise<{ submissions: Map<string, SubmissionSummary>; totalPage: number }> => {
  const summaries = await new SubmissionsApi().getSubmissions({
    orderBy: 'submittedAtDesc',
    userId: props.userId,
    limit: rowPerPage,
    offset: currentPage * rowPerPage
  })

  const submissions = new Map(
    summaries.submissions?.map((submission) => [submission.id, submission])
  )
  const totalPage = Math.ceil((summaries.total ?? 0) / rowPerPage)

  return { submissions, totalPage }
}
</script>

<template>
  <div class="flex flex-col gap-6 py-6">
    <SubmissionsFilter>
      <template #title>
        <span>{{ props.user?.name }}</span>
        <span>の提出</span>
      </template>
    </SubmissionsFilter>

    <SubmissionsTable v-model="page" :load-submissions="loadSubmissions" />
  </div>
</template>

<style scoped></style>
