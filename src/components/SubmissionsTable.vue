<script setup lang="ts">
import { dateToString } from '@/utils/date'
import SimplePagination from '@/components/Controls/Pagination/SimplePagination.vue'
import Link from '@/components/Link.vue'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import JudgeResultBadge from '@/components/JudgeResultBadge.vue'
import type { SubmissionSummary } from '@/api/generated'
import { ref, watch } from 'vue'

const props = defineProps<{
  loadSubmissions: (
    page: number
  ) => Promise<{
    submissions: Map<string, SubmissionSummary>
    totalPage: number
  }>
}>()

const submissions = ref<Map<string, SubmissionSummary>>(new Map())
const page = defineModel<number>({ required: true })
const cols: (Column & { name: string })[] = [
  { id: 'submittedAt', textAlign: 'start', name: '提出日時', width: '176px' },
  { id: 'title', textAlign: 'start', name: '問題' },
  { id: 'totalScore', textAlign: 'end', name: '得点', width: '64px' },
  { id: 'judgeStatus', textAlign: 'center', name: '結果', width: '80px' },
  { id: 'maxTime', textAlign: 'end', name: '実行時間', width: '112px' },
  { id: 'maxMemory', textAlign: 'end', name: 'メモリ', width: '112px' }
] as const

const totalPage = ref<number>(0)
const isLoaded = ref(true)

const updateSubmissions = async () => {
  isLoaded.value = false
  const res = await props.loadSubmissions(page.value)
  isLoaded.value = true
  submissions.value = res.submissions
  totalPage.value = res.totalPage
  if (page.value < 1) page.value = 1
  if (page.value >= totalPage.value) page.value = totalPage.value
}

watch([page], () => updateSubmissions(), {
  immediate: true
})
</script>

<template>
  <ListingTable v-if="isLoaded" :cols="cols" :row-ids="[...submissions.keys()]">
    <template #head="{ colId }">
      {{ cols.find(({ id }) => id === colId)?.name }}
    </template>
    <template #cell="{ rowId, colId }">
      <template v-if="colId === 'submittedAt'">
        {{ dateToString(submissions.get(rowId)?.submittedAt) }}
      </template>
      <template v-else-if="colId === 'title'">
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
  <SimplePagination v-if="totalPage > 1" v-model="page" :end="totalPage" class="mt-6" />
</template>

<style scoped></style>
