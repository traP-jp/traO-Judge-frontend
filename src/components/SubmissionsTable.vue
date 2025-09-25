<script setup lang="ts">
import { dateToString } from '@/utils/date'
import SimplePagination from '@/components/Controls/Pagination/SimplePagination.vue'
import Link from '@/components/Link.vue'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import JudgeResultBadge from '@/components/JudgeResultBadge.vue'
import type { SubmissionSummary } from '@/api/generated'
import MonochromeButton from '@/components/Controls/MonochromeButton.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import { ref, watch } from 'vue'

const props = defineProps<{
  loadSubmissions: (
    page: number
  ) => Promise<{
    submissions: Map<string, SubmissionSummary & { problemTitle?: string }>
    totalPage: number
  }>
}>()

const submissions = ref<Map<string, SubmissionSummary & { problemTitle?: string }>>(new Map())
const page = defineModel<number>({ required: true })
const cols: (Column & { name: string })[] = [
  { id: 'submittedAt', textAlign: 'start', name: '提出日時', width: '176px' },
  { id: 'problemTitle', textAlign: 'start', name: '問題' },
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

const filterMenuShown = ref(false)
const toggleFilterMenu = () => {
  filterMenuShown.value = !filterMenuShown.value
}

watch([page], () => updateSubmissions(), {
  immediate: true
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="fontstyle-ui-subtitle relative flex items-center justify-between text-text-primary">
      <h2>提出一覧</h2>
      <MonochromeButton small @click="toggleFilterMenu">
        <span class="inline-flex items-center gap-1">
          <span>フィルタ</span>
          <MaterialIcon icon="tune" size="20px" />
        </span>
      </MonochromeButton>
      <!-- TODO: フィルタ機能の実装 -->
    </div>

    <ListingTable v-if="isLoaded" :cols="cols" :row-ids="[...submissions.keys()]">
      <template #head="{ colId }">
        {{ cols.find(({ id }) => id === colId)?.name }}
      </template>
      <template #cell="{ rowId, colId }">
        <template v-if="colId === 'submittedAt'">
          {{ dateToString(submissions.get(rowId)?.submittedAt) }}
        </template>
        <template v-else-if="colId === 'problemTitle'">
          <Link :href="`/problems/${submissions.get(rowId)?.problemId}`" new-tab>
            {{ submissions.get(rowId)?.problemTitle || submissions.get(rowId)?.problemId }}
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
          <span v-if="submissions.get(rowId)?.maxTime !== undefined">
            {{ submissions.get(rowId)?.maxTime }}
            <span class="fontstyle-ui-body-2 text-text-secondary">ms</span>
          </span>
          <span v-else>-</span>
        </template>
        <template v-else-if="colId === 'maxMemory'">
          <span v-if="submissions.get(rowId)?.maxMemory !== undefined">
            {{ Math.floor(submissions.get(rowId)!.maxMemory * 1024) }}
            <span class="fontstyle-ui-body-2 text-text-secondary">KB</span>
          </span>
          <span v-else>-</span>
        </template>
        <template v-else>Unknown column: {{ colId }}</template>
      </template>
    </ListingTable>
    <div v-else>読み込み中...</div>
    <SimplePagination v-model="page" :end="totalPage" />
  </div>
</template>

<style scoped></style>