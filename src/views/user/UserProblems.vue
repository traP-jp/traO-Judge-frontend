<script lang="ts" setup>
import { useQueryParamInt } from '@/composables/useQueryParam'
import { computed, ref, watch } from 'vue'
import { ProblemsApi, type ProblemSummaries, type ProblemSummary } from '@/api/generated'
import { dateToString } from '@/utils/date'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import DifficultyStar from '@/components/DifficultyStar.vue'
import Link from '@/components/Link.vue'
import SimplePagination from '@/components/Controls/Pagination/SimplePagination.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import NumberTextbox from '@/components/Controls/Textbox/NumberTextbox.vue'
import MonochromeButton from '@/components/Controls/MonochromeButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'

const { username } = defineProps<{ username: string }>()
const page = useQueryParamInt('page', 1, true)

const isLoaded = ref<boolean>(false)
const totalProblems = ref<number>(1)
const totalPage = ref<number>(1)
const problemIds = ref<string[]>([])
const problems = ref<Map<string, ProblemSummary>>(new Map())
const rowPerPage = 20

/**
 * Fetch the problems with the current state and update the state
 */
const loadProblems = async () => {
  isLoaded.value = false
  try {
    const summaries: ProblemSummaries = await new ProblemsApi().getProblems({
      orderBy: 'createdAtDesc',
      username,
      limit: rowPerPage,
      offset: page.value * rowPerPage
    })

    problemIds.value = summaries.problems?.map(({ id }) => id) ?? []
    problems.value = new Map(summaries.problems?.map((problem) => [problem.id, problem]))

    totalProblems.value = summaries.total ?? problemIds.value.length
    totalPage.value = Math.ceil(totalProblems.value / rowPerPage)
    if (page.value < 1) page.value = 1
    if (page.value >= totalPage.value) page.value = totalPage.value
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  } finally {
    isLoaded.value = true
  }
}

watch(page, () => loadProblems(), { immediate: true })

const cols: (Column & { name: string })[] = [
  { id: 'createdAt', textAlign: 'start', name: '投稿日時', width: '176px' },
  { id: 'title', textAlign: 'start', name: '問題' },
  { id: 'difficulty', textAlign: 'start', name: '難易度', width: '160px' },
  { id: 'solvedCount', textAlign: 'end', name: 'Solves', width: '112px' }
] as const

const filterMenuShown = ref(false)
const toggleFilterMenu = () => {
  filterMenuShown.value = !filterMenuShown.value
}

const filterDifficultyBegin = ref(1)
const filterDifficultyEnd = ref(10)

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
  <section class="flex flex-col gap-4">
    <div class="fontstyle-ui-subtitle relative flex items-center text-text-primary">
      <span class="mr-1">{{ username }}</span>
      <span class="grow">の問題</span>
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
                    min="1"
                    max="10"
                    :error="filterDifficultyRangeError"
                  />
                </span>
                <span>以上</span>
              </span>
              <span class="flex items-center gap-2">
                <span class="w-16">
                  <NumberTextbox
                    v-model="filterDifficultyEnd"
                    min="1"
                    max="10"
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

    <!-- TODO: add sorting and filtering features -->
    <!-- Nullish になり得ない所でも型安全性のため Non-null Assertion はしない -->
    <ListingTable v-if="isLoaded" :cols="cols" :row-ids="problemIds">
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
  </section>
</template>

<style scoped></style>
