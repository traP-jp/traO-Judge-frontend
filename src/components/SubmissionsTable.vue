<script setup lang="ts">
import { dateToString } from '@/utils/date'
import SimplePagination from '@/components/Controls/Pagination/SimplePagination.vue'
import Link from '@/components/Link.vue'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import JudgeResultBadge from '@/components/JudgeResultBadge.vue'
import type { SubmissionSummary } from '@/api/generated'
import MonochromeButton from '@/components/Controls/MonochromeButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import { statusList, defaultFilterStatuses } from '@/utils/statusConfig'
import { ref, watch, type Ref } from 'vue'

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

const filterMenuShown = ref(false)
const toggleFilterMenu = () => {
  filterMenuShown.value = !filterMenuShown.value
}

const filterKeyword = ref('')
const filterStatuses: Ref<Set<string>> = ref(new Set(defaultFilterStatuses))

const toggleStatus = (status: string) => {
  if (filterStatuses.value.has(status)) {
    filterStatuses.value.delete(status)
  } else {
    filterStatuses.value.add(status)
  }
  filterStatuses.value = new Set(filterStatuses.value)
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
      <div v-if="filterMenuShown" class="absolute right-0 top-full z-10 pt-2">
        <div
          class="flex flex-col gap-4 rounded-lg border border-border-secondary bg-background-primary p-4 text-text-secondary shadow-lg"
        >
          <div class="flex flex-col gap-2">
            <span class="fontstyle-ui-control-strong">問題名</span>
            <PlainTextbox
              v-model="filterKeyword"
              left-icon="search"
              placeholder="キーワードを入力"
              right-icon="close"
              class="w-80"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="fontstyle-ui-control-strong">結果</span>
            <div class="flex max-w-sm flex-wrap gap-4">
              <button
                v-for="status in statusList"
                :key="status.value"
                class="flex items-center gap-2"
                @click="toggleStatus(status.value)"
              >
                <div
                  class="flex size-5 items-center justify-center rounded border-2"
                  :class="filterStatuses.has(status.value) ? 'border-text-primary bg-text-primary' : 'border-border-primary bg-white'"
                >
                  <MaterialIcon
                    v-if="filterStatuses.has(status.value)"
                    icon="check"
                    size="16px"
                    class="text-white"
                  />
                </div>
                <div class="flex items-center gap-1">
                  <div
                    class="size-4 rounded-full"
                    :class="status.color"
                  ></div>
                  <span class="fontstyle-ui-body-strong">{{ status.label }}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ListingTable v-if="isLoaded" :cols="cols" :row-ids="[...submissions.keys()]">
      <template #head="{ colId }">
        {{ cols.find(({ id }) => id === colId)?.name }}
      </template>
      <template #cell="{ rowId, colId }">
        <template v-if="colId === 'submittedAt'">
          {{ dateToString(submissions.get(rowId)?.submittedAt) }}
        </template>
        <template v-else-if="colId === 'title'">
          <Link :href="`/problems/${submissions.get(rowId)?.problemId}`" new-tab>
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