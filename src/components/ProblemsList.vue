<script setup lang="ts">
import { dateToString } from '@/utils/date'
import SimplePagination from '@/components/Controls/Pagination/SimplePagination.vue'
import Link from '@/components/Link.vue'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import DifficultyStar from '@/components/DifficultyStar.vue'
import type { ProblemSummary } from '@/api/generated'
import NumberTextbox from '@/components/Controls/Textbox/NumberTextbox.vue'
import MonochromeButton from '@/components/Controls/MonochromeButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  loadProblems: (
    page: number,
    difficultyBegin: number,
    difficultyEnd: number
  ) => Promise<{
    problems: Map<string, ProblemSummary>
    totalPage: number
  }>
}>()
const problems = ref<Map<string, ProblemSummary>>(new Map())
const page = defineModel<number>({ required: true })
const cols: (Column & { name: string })[] = [
  { id: 'createdAt', textAlign: 'start', name: '投稿日時', width: '176px' },
  { id: 'title', textAlign: 'start', name: '問題' },
  { id: 'difficulty', textAlign: 'start', name: '難易度', width: '160px' },
  { id: 'solvedCount', textAlign: 'end', name: 'Solves', width: '112px' }
] as const

const totalPage = ref<number>(0)
const isLoaded = ref(true)

const updateProblems = async () => {
  isLoaded.value = false
  const res = await props.loadProblems(
    page.value,
    filterDifficultyBegin.value,
    filterDifficultyEnd.value
  )
  isLoaded.value = true
  problems.value = res.problems
  totalPage.value = res.totalPage
  if (page.value < 1) page.value = 1
  if (page.value >= totalPage.value) page.value = totalPage.value
}

const filterMenuShown = ref(false)
const toggleFilterMenu = () => {
  filterMenuShown.value = !filterMenuShown.value
}

const filterDifficultyBegin = ref(1)
const filterDifficultyEnd = ref(10)

watch([page, filterDifficultyBegin, filterDifficultyEnd], () => updateProblems(), {
  immediate: true
})

const filterDifficultyRangeError = computed(
  () =>
    filterDifficultyBegin.value > filterDifficultyEnd.value ||
    filterDifficultyBegin.value < 1 ||
    10 < filterDifficultyBegin.value ||
    filterDifficultyEnd.value < 1 ||
    10 < filterDifficultyEnd.value
)
</script>

<template>
  <div class="fontstyle-ui-subtitle relative flex items-center text-text-primary">
    <slot />
    <MonochromeButton small @click="toggleFilterMenu">
      <span class="inline-flex items-center gap-1">
        <span>フィルタ</span>
        <MaterialIcon icon="tune" size="20px" />
      </span>
    </MonochromeButton>
    <!-- フィルタ画面 -->
    <div v-if="filterMenuShown" class="absolute right-0 top-full pt-2">
      <div
        class="flex flex-col gap-4 rounded-lg border border-border-secondary bg-background-primary p-4 text-text-secondary shadow-lg"
      >
        <div class="flex flex-col gap-2">
          <span class="fontstyle-ui-control-strong">問題名</span>
          <PlainTextbox left-icon="search" placeholder="キーワードを入力" right-icon="close" />
        </div>
        <div class="flex flex-col gap-2">
          <span class="fontstyle-ui-control-strong">難易度</span>
          <div class="fontstyle-ui-control flex gap-6">
            <span class="flex items-center gap-2">
              <span class="w-16">
                <NumberTextbox
                  v-model="filterDifficultyBegin"
                  :min="1"
                  :max="10"
                  :error="filterDifficultyRangeError"
                />
              </span>
              <span>以上</span>
            </span>
            <span class="flex items-center gap-2">
              <span class="w-16">
                <NumberTextbox
                  v-model="filterDifficultyEnd"
                  :min="1"
                  :max="10"
                  :error="filterDifficultyRangeError"
                />
              </span>
              <span>以下</span>
            </span>
          </div>
          <div v-if="filterDifficultyRangeError" class="flex items-start gap-2 text-status-error">
            <MaterialIcon icon="error" size="1.25rem" is-filled />
            <span class="fontstyle-ui-control min-w-0 break-words">範囲が正しくありません</span>
          </div>
          <span class="fontstyle-ui-caption">難易度は1~10で表されます。</span>
        </div>
      </div>
    </div>
  </div>

  <!-- TODO: add sorting features -->
  <!-- Nullish になり得ない所でも型安全性のため Non-null Assertion はしない -->
  <ListingTable v-if="isLoaded" :cols="cols" :row-ids="[...problems.keys()]">
    <template #head="{ colId }">
      {{ cols.find(({ id }) => id === colId)?.name }}
    </template>
    <template #cell="{ rowId, colId }">
      <!-- 文字列のみとは限らずリンクやアイコンなどを含めるようにするため、関数に切り出してはいない -->
      <template v-if="colId === 'createdAt'">
        {{ dateToString(problems.get(rowId)?.createdAt) }}
      </template>
      <template v-else-if="colId === 'title'">
        <Link :href="`/problems/${problems.get(rowId)?.id}`" new-tab>
          {{ problems.get(rowId)?.title }}
        </Link>
      </template>
      <template v-else-if="colId === 'difficulty'">
        <div class="flex">
          <DifficultyStar class="grow" :difficulty="problems.get(rowId)?.difficulty ?? 1" />
          <div>{{ problems.get(rowId)?.difficulty }}</div>
        </div>
      </template>
      <template v-else-if="colId === 'solvedCount'">
        {{ problems.get(rowId)?.solvedCount }}
      </template>
      <template v-else>Unknown column: {{ colId }}</template>
    </template>
  </ListingTable>
  <div v-else>読み込み中...</div>
  <SimplePagination v-model="page" :end="totalPage" class="mt-6" />
</template>

<style scoped></style>
