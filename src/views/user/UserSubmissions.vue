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
  },
  { immediate: true }
)
watch(page, () => router.push({ query: { page: page.value.toString() } }))

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
    totalPage.value = Math.ceil(totalSubmissions.value / rowPerPage) + 100
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
  <div class="rounded-lg border border-solid border-border-secondary pt-28 text-center">
    <h2 class="fontstyle-ui-title-large">提出一覧<br />テーブル</h2>
    <section class="p-10">
      <PageSwitcher v-model="page" :begin="0" :end="totalPage" />
      <div class="my-6">
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
              {{ submissions.get(rowId)?.judgeStatus }}
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
      </div>
      <PageSwitcher v-model="page" :begin="0" :end="totalPage" />
    </section>
  </div>
</template>

<style scoped></style>
