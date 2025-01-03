<script setup lang="ts">
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import { type GetSubmissionsRequest, SubmissionsApi, type SubmissionSummary } from '@/api/generated'
import { onMounted, ref } from 'vue'
import { dateToString } from '@/utils/date'
import { useRoute } from 'vue-router'

const route = useRoute()

const rowPerPage = 20

const { username } = defineProps<{ username: string }>()
const page = Math.max(parseInt(String(route.query.page)) || 0, 0)

const submissionIds = ref<string[] | null>(null)
const submissions = ref<Map<string, SubmissionSummary>>(new Map())

/**
 * Fetch submissions from the API and store them in the `submissionsIds` and `submissions` refs
 * @param filter filter for the submissions
 */
const fetchSubmissions = async (filter: GetSubmissionsRequest) => {
  try {
    const response = await new SubmissionsApi().getSubmissionsRaw({
      orderBy: 'submittedAtDesc',
      ...filter,
      username
    })

    submissionIds.value = []
    submissions.value = new Map()
    for (const submission of (await response.value()).submissions!) {
      submissionIds.value.push(submission.id)
      submissions.value.set(submission.id, submission)
    }
  } catch (error) {
    submissionIds.value = null

    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  }
}

onMounted(() => fetchSubmissions({ offset: page * rowPerPage, limit: rowPerPage }))

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
      <!-- TODO: add sorting and filtering features -->
      <ListingTable v-if="submissionIds" :cols="cols" :row-ids="submissionIds">
        <template #head="{ colId }">
          {{ cols.find(({ id }) => id === colId)!.name }}
        </template>
        <template #cell="{ rowId, colId }">
          <template v-if="colId === 'submittedAt'">
            {{ dateToString(submissions.get(rowId)!.submittedAt) }}
          </template>
          <template v-else-if="colId === 'userName'">
            {{ submissions.get(rowId)!.userName }}
          </template>
          <template v-else-if="colId === 'totalScore'">
            {{ submissions.get(rowId)!.totalScore }}
          </template>
          <template v-else-if="colId === 'codeLength'">
            {{ Math.ceil(submissions.get(rowId)!.codeLength) }} Byte
          </template>
          <template v-else-if="colId === 'judgeStatus'">
            {{ submissions.get(rowId)!.judgeStatus }}
          </template>
          <template v-else-if="colId === 'maxTime'">
            {{ submissions.get(rowId)!.maxTime }} ms
          </template>
          <template v-else-if="colId === 'maxMemory'">
            {{ submissions.get(rowId)!.maxMemory.toFixed(3) }} MiB
          </template>
          <template v-else>Unknown column: {{ colId }}</template>
        </template>
      </ListingTable>
      <div v-else>読み込み中...</div>
    </section>
  </div>
</template>

<style scoped></style>
