<script lang="ts" setup>
import { ref, watch } from 'vue'
import { dateToString } from '@/utils/date'
import { ProblemsApi, type ProblemSummaries, type ProblemSummary } from '@/api/generated'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import PageSwitcher from '@/components/PageSwitcher.vue'

const { username, rowPerPage = 20 } = defineProps<{ username: string; rowPerPage?: number }>()
const page = defineModel<number>('page', { default: 0 })

const isLoaded = ref<boolean>(false)
const totalProblems = ref<number>(0)
const totalPage = ref<number>(0)
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
    if (page.value >= totalPage.value) page.value = totalPage.value - 1
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  } finally {
    isLoaded.value = true
  }
}

watch(page, () => loadProblems(), { immediate: true })

const cols: (Column & { name: string })[] = [
  { id: 'createdAt', textAlign: 'start', name: '投稿日時' },
  { id: 'title', textAlign: 'start', name: '問題名' },
  { id: 'difficulty', textAlign: 'end', name: '難易度' },
  { id: 'solvedCount', textAlign: 'end', name: 'Solve 数' }
] as const
</script>

<template>
  <PageSwitcher v-if="totalPage > 1" v-model="page" :begin="0" :end="totalPage" class="mb-6" />
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
        {{ problems.get(rowId)?.title }}
      </template>
      <template v-else-if="colId === 'difficulty'">
        {{ problems.get(rowId)?.difficulty }}
      </template>
      <template v-else-if="colId === 'solvedCount'">
        {{ problems.get(rowId)?.solvedCount }}
      </template>
      <template v-else>Unknown column: {{ colId }}</template>
    </template>
  </ListingTable>
  <div v-else>読み込み中...</div>
  <PageSwitcher v-if="totalPage > 1" v-model="page" :begin="0" :end="totalPage" class="mt-6" />
</template>

<style scoped></style>
