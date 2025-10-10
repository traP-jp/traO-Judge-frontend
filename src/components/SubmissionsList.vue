<script lang="ts" setup>
import { ref, watch } from 'vue'
import { dateToString } from '@/utils/date'
import { SubmissionsApi, type SubmissionSummaries, type SubmissionSummary } from '@/api/generated'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import SimplePagination from '@/components/Controls/Pagination/SimplePagination.vue'
import JudgeResultBadge from '@/components/JudgeResultBadge.vue'

const { username, rowPerPage = 20 } = defineProps<{ username: string; rowPerPage?: number }>()
const page = defineModel<number>('page', { default: 0 })

const isLoaded = ref<boolean>(false)
const totalSubmissions = ref<number>(0)
const totalPage = ref<number>(0)
const submissionIds = ref<string[]>([])
const submissions = ref<Map<string, SubmissionSummary>>(new Map())

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

    submissionIds.value = summaries.submissions?.map(({ id }) => id) ?? []
    submissions.value = new Map(
      summaries.submissions?.map((submission) => [submission.id, submission])
    )

    totalSubmissions.value = summaries.total ?? submissionIds.value.length
    totalPage.value = Math.ceil(totalSubmissions.value / rowPerPage)
    if (page.value >= totalPage.value) page.value = totalPage.value - 1
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  } finally {
    isLoaded.value = true
  }
}

watch(page, () => loadSubmissions(), { immediate: true })

const cols: (Column & { name: string })[] = [
  { id: 'submittedAt', textAlign: 'start', name: '提出日時' },
  { id: 'userName', textAlign: 'start', name: 'ユーザー名' },
  { id: 'totalScore', textAlign: 'end', name: '得点' },
  { id: 'codeLength', textAlign: 'end', name: 'コード長' },
  { id: 'judgeStatus', textAlign: 'center', name: 'ジャッジ結果' },
  { id: 'maxTime', textAlign: 'end', name: '実行時間' },
  { id: 'maxMemory', textAlign: 'end', name: 'メモリ' }
] as const
</script>

<template>
  <PageSwitcher v-if="totalPage > 1" v-model="page" :begin="0" :end="totalPage" class="mb-6" />
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
      <template v-else-if="colId === 'userName'">
        {{ submissions.get(rowId)?.userName }}
      </template>
      <template v-else-if="colId === 'totalScore'">
        {{ submissions.get(rowId)?.totalScore }}
      </template>
      <template v-else-if="colId === 'codeLength'">
        {{ Math.ceil(submissions.get(rowId)?.codeLength ?? -1) }} Byte
      </template>
      <template v-else-if="colId === 'judgeStatus'">
        <JudgeResultBadge
          v-if="submissions.get(rowId)?.judgeStatus"
          :status="submissions.get(rowId)!.judgeStatus"
        />
      </template>
      <template v-else-if="colId === 'maxTime'">
        {{ submissions.get(rowId)?.maxTime }} ms
      </template>
      <template v-else-if="colId === 'maxMemory'">
        {{ submissions.get(rowId)?.maxMemory.toFixed(3) }} MiB
      </template>
      <template v-else>Unknown column: {{ colId }}</template>
    </template>
  </ListingTable>
  <div v-else>読み込み中...</div>
  <SimplePagination v-if="totalPage > 1" v-model="page" :begin="0" :end="totalPage" class="mt-6" />
</template>

<style scoped></style>
