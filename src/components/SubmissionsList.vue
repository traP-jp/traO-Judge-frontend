<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { dateToString } from '@/utils/date'
import {
  SubmissionsApi,
  type SubmissionSummaries,
  type SubmissionSummary
} from '@/api/generated'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import SimplePagination from '@/components/Controls/Pagination/SimplePagination.vue'
import JudgeResultBadge from '@/components/JudgeResultBadge.vue'
import Link from '@/components/Link.vue'

const { username, rowPerPage = 20 } = defineProps<{
  username: string
  rowPerPage?: number
}>()
const page = defineModel<number>('page', { default: 0 })

const isLoaded = ref<boolean>(false)
const totalPage = ref<number>(0)
const submissions = ref<Map<string, SubmissionSummary>>(new Map())

const submissionIds = computed(() => {
  return Array.from(submissions.value.keys())
})

/**
 * Fetch the submissions with the current state and update the state
 */
const loadSubmissions = async () => {
  isLoaded.value = false
  try {
    const summaries: SubmissionSummaries = await new SubmissionsApi().getSubmissions({
      orderBy: 'submittedAtDesc',
      username,
      limit: rowPerPage,
      offset: page.value * rowPerPage
    })

    submissions.value = new Map(
      summaries.submissions?.map((submission) => [submission.id, submission])
    )
    totalPage.value = Math.ceil((summaries.total ?? 0) / rowPerPage)
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  } finally {
    isLoaded.value = true
  }
}

watch(page, () => loadSubmissions())

loadSubmissions()

const cols: (Column & { name: string })[] = [
  { id: 'submittedAt', textAlign: 'start', width: '176px', name: '提出日時' },
  { id: 'problem', textAlign: 'start', name: '問題' },
  { id: 'totalScore', textAlign: 'end', width: '64px', name: '得点' },
  { id: 'judgeStatus', textAlign: 'center', width: '80px', name: '結果' },
  { id: 'maxTime', textAlign: 'end', width: '112px', name: '実行時間' },
  { id: 'maxMemory', textAlign: 'end', width: '112px', name: 'メモリ' }
] as const
</script>

<template>
  <!-- TODO: add sorting and filtering features -->
  <!-- Nullish になり得ない所でも型安全性のため Non-null Assertion はしない -->
  <ListingTable v-if="isLoaded" :cols="cols" :row-ids="submissionIds">
    <template #head="{ colId }">
      {{ cols.find(({ id }) => id === colId)?.name }}
    </template>
    <template #cell="{ rowId, colId }">
      <!-- 文字列のみとは限らずリンクやアイコンなどを含めるようにするため、関数に切り出してはいない -->
      <template v-if="colId === 'submittedAt'">
        {{ dateToString(submissions.get(rowId)?.submittedAt) }}
      </template>
      <template v-else-if="colId === 'problem'">
        <Link :href="`/problems/${submissions.get(rowId)?.problemId}`" :new-tab="true">
          {{ submissions.get(rowId)?.title }}
        </Link>
      </template>
      <template v-else-if="colId === 'totalScore'">
        {{ submissions.get(rowId)?.totalScore }}
      </template>
      <template v-else-if="colId === 'judgeStatus'">
        <JudgeResultBadge
          v-if="submissions.get(rowId)?.judgeStatus"
          :status="submissions.get(rowId)!.judgeStatus"
        />
      </template>
      <template v-else-if="colId === 'maxTime'">
        <span>{{ submissions.get(rowId)?.maxTime }}</span>
        <span class="fontstyle-ui-body-2 ml-1">ms</span>
      </template>
      <template v-else-if="colId === 'maxMemory'">
        <span>{{ Math.round((submissions.get(rowId)?.maxMemory ?? 0) * 1024) }}</span>
        <span class="fontstyle-ui-body-2 ml-1">KB</span>
      </template>
      <template v-else>Unknown column: {{ colId }}</template>
    </template>
  </ListingTable>
  <div v-else>読み込み中...</div>
  <SimplePagination v-if="totalPage > 1" v-model="page" :begin="0" :end="totalPage" class="mt-6" />
</template>

<style scoped></style>
