<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dateToString } from '@/utils/date'
import { SubmissionsApi, type SubmissionSummaries, type SubmissionSummary } from '@/api/generated'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import PageSwitcher from '@/components/PageSwitcher.vue'

const route = useRoute()
const router = useRouter()

const rowPerPage = 20

const { username } = defineProps<{ username: string }>()

const page = ref<number>(0)
watch(
  () => route.query,
  (query) => {
    page.value = Math.max(parseInt(String(query.page)) || 0, 0)
  }
)

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
    const response = await new SubmissionsApi().getSubmissionsRaw({
      orderBy: 'submittedAtDesc',
      username,
      limit: rowPerPage,
      offset: page.value * rowPerPage
    })
    const summaries: SubmissionSummaries = await response.value()

    totalSubmissions.value = summaries.total!
    totalPage.value = Math.ceil(summaries.total! / rowPerPage)
    if (page.value >= totalPage.value) page.value = totalPage.value - 1

    submissionIds.value = summaries.submissions!.map(({ id }) => id)
    submissions.value = new Map(
      summaries.submissions!.map((submission) => [submission.id, submission])
    )
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  } finally {
    isLoaded.value = true
  }
}

watch(page, () => loadSubmissions(), { immediate: true })

const switchPage = async (newPage: number) => {
  await router.push({ query: { page: newPage.toString() } })
}

const cols: (Column & { name: string })[] = [
  { id: 'submittedAt', textAlign: 'start', name: '提出日時' },
  { id: 'userName', textAlign: 'start', name: 'ユーザー名' },
  { id: 'totalScore', textAlign: 'end', name: '得点' },
  { id: 'codeLength', textAlign: 'end', name: 'コード長' },
  { id: 'judgeStatus', textAlign: 'center', name: 'ジャッジ結果' },
  { id: 'maxTime', textAlign: 'end', name: '実行時間' },
  { id: 'maxMemory', textAlign: 'end', name: 'メモリ' }
] as const

const getSubmission = (rowId: string): SubmissionSummary => submissions.value.get(rowId)!
</script>

<template>
  <div class="rounded-lg border border-solid border-border-secondary pt-28 text-center">
    <h2 class="fontstyle-ui-title-large">提出一覧<br />テーブル</h2>
    <section class="p-10">
      <PageSwitcher :begin="0" :current="page" :end="totalPage" @switch="switchPage" />
      <div class="my-6">
        <!-- TODO: add sorting and filtering features -->
        <ListingTable v-if="isLoaded" :cols="cols" :row-ids="submissionIds">
          <template #head="{ colId }">
            {{ cols.find(({ id }) => id === colId)!.name }}
          </template>
          <template #cell="{ rowId, colId }">
            <!-- 文字列のみとは限らずリンクやアイコンなどを含めるようにするため、関数に切り出してはいない -->
            <template v-if="colId === 'submittedAt'">
              {{ dateToString(getSubmission(rowId).submittedAt) }}
            </template>
            <template v-else-if="colId === 'userName'">
              {{ getSubmission(rowId).userName }}
            </template>
            <template v-else-if="colId === 'totalScore'">
              {{ getSubmission(rowId).totalScore }}
            </template>
            <template v-else-if="colId === 'codeLength'">
              {{ Math.ceil(getSubmission(rowId).codeLength) }} Byte
            </template>
            <template v-else-if="colId === 'judgeStatus'">
              {{ getSubmission(rowId).judgeStatus }}
            </template>
            <template v-else-if="colId === 'maxTime'">
              {{ getSubmission(rowId).maxTime }} ms
            </template>
            <template v-else-if="colId === 'maxMemory'">
              {{ getSubmission(rowId).maxMemory.toFixed(3) }} MiB
            </template>
            <template v-else>Unknown column: {{ colId }}</template>
          </template>
        </ListingTable>
        <div v-else>読み込み中...</div>
      </div>
      <PageSwitcher :begin="0" :current="page" :end="totalPage" @switch="switchPage" />
    </section>
  </div>
</template>

<style scoped></style>
