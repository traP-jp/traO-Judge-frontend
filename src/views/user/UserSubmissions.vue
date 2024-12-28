<script setup lang="ts">
import PagedTable, { type Column } from '@/components/PagedTable.vue'
import { type GetSubmissionsRequest, SubmissionsApi, type SubmissionSummary } from '@/api/generated'
import { onMounted, ref } from 'vue'

const { username } = defineProps<{ username: string }>()

// submissions data

const submissionIds = ref<string[] | null>(null)
const submissions = ref<Map<string, SubmissionSummary>>(new Map())

/**
 * Fetch submissions from the API and store them in the `submissionsIds` and `submissions` refs
 * @param filter filter for the submissions
 */
const fetchSubmissions = async (filter: GetSubmissionsRequest) => {
  try {
    const response = await new SubmissionsApi().getSubmissionsRaw({
      orderBy: 'submittedAtDesc',
      ...filter,
      username
    })

    submissionIds.value = []
    submissions.value = new Map()
    for (const submission of (await response.value()).submissions!) {
      submissionIds.value.push(submission.id)
      submissions.value.set(submission.id, submission)
    }
  } catch (error) {
    submissionIds.value = null

    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  }
}

onMounted(fetchSubmissions)

// submissions table

const cols: Column[] = [
  { id: 'submittedAt', textAlign: 'start' },
  { id: 'userName', textAlign: 'start' },
  { id: 'totalScore', textAlign: 'end' },
  { id: 'codeLength', textAlign: 'end' },
  { id: 'judgeStatus', textAlign: 'center' },
  { id: 'maxTime', textAlign: 'end' },
  { id: 'maxMemory', textAlign: 'end' }
] as const

const columnLabels: Record<string, string> = {
  submittedAt: '提出日時',
  userName: 'ユーザー名',
  totalScore: '得点',
  codeLength: 'コード長',
  judgeStatus: 'ジャッジ結果',
  maxTime: '実行時間',
  maxMemory: 'メモリ'
}

/**
 * Format a submission value for display in the table
 * @param submission submission data
 * @param colId column ID
 * @returns formatted value
 */
const formatSubmission = (submission: SubmissionSummary, colId: string): string => {
  switch (colId) {
    case 'submittedAt':
      return submission.submittedAt.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    case 'userName':
      return submission.userName
    case 'totalScore':
      return `${submission.totalScore}`
    case 'codeLength':
      return `${Math.ceil(submission.codeLength)} Byte`
    case 'judgeStatus':
      return submission.judgeStatus
    case 'maxTime':
      return `${submission.maxTime} ms`
    case 'maxMemory':
      return `${submission.maxMemory.toFixed(3)} MiB`
    default:
      console.error('Unknown column:', colId)
      return `Unknown column: ${colId}`
  }
}
</script>

<template>
  <div class="rounded-lg border border-solid border-border-secondary pt-28 text-center">
    <h2 class="fontstyle-ui-title-large">提出一覧<br />テーブル</h2>
    <section class="p-10">
      <!-- TODO: add pagination, sorting and filtering features -->
      <PagedTable v-if="submissionIds" :cols="cols" :row-ids="submissionIds">
        <template #head="{ colId }">
          {{ columnLabels[colId] }}
        </template>
        <template #cell="{ rowId, colId }">
          {{ formatSubmission(submissions.get(rowId)!, colId) }}
        </template>
      </PagedTable>
      <div v-else>読み込み中...</div>
    </section>
  </div>
</template>

<style scoped></style>
