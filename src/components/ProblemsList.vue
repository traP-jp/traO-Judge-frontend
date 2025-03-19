<script lang="ts" setup>
import { ref, watch } from 'vue'
import { dateToString } from '@/utils/date'
import { ProblemsApi, type ProblemSummaries, type ProblemSummary } from '@/api/generated'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import DifficultyStar from '@/components/DifficultyStar.vue'
import Link from '@/components/Link.vue'
import SimplePagenation from '@/components/Controls/Pagenation/SimplePagenation.vue'

const { username, rowPerPage = 20 } = defineProps<{ username: string; rowPerPage?: number }>()
const page = defineModel<number>('page', { default: 1 })

const isLoaded = ref<boolean>(false)
const totalProblems = ref<number>(1)
const totalPage = ref<number>(1)
const problemIds = ref<string[]>([])
const problems = ref<Map<string, ProblemSummary>>(new Map())

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
</script>

<template>
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
        <Link :href="`/problems/${problems.get(rowId)?.id}`">
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
  <SimplePagenation v-model="page" :end="totalPage" class="mt-6" />
</template>

<style scoped></style>
