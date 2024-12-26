<script setup lang="ts">
import PagedTable from '@/components/PagedTable.vue'
import type { JudgeStatus } from '@/api/generated'

const cols: Column[] = [
  { id: 'submittedAt', textAlign: 'start' },
  { id: 'userName', textAlign: 'start' },
  { id: 'totalScore', textAlign: 'end' },
  { id: 'codeLength', textAlign: 'end' },
  { id: 'judgeStatus', textAlign: 'center' },
  { id: 'maxTime', textAlign: 'end' },
  { id: 'maxMemory', textAlign: 'end' }
]

const submissions: {
  id: string
  submittedAt: string
  userName: string
  totalScore: number
  codeLength: number
  judgeStatus: JudgeStatus
  maxTime: number
  maxMemory: number
}[] = [
  {
    id: '000011',
    submittedAt: '1234/56/78 90:56:78',
    userName: 'test_user',
    totalScore: 400,
    codeLength: 2048,
    judgeStatus: 'AC',
    maxTime: 123,
    maxMemory: 12345
  },
  {
    id: '000007',
    submittedAt: '1234/56/78 90:45:67',
    userName: 'test_user',
    totalScore: 0,
    codeLength: 2048,
    judgeStatus: 'WA',
    maxTime: 123,
    maxMemory: 12345
  },
  {
    id: '000005',
    submittedAt: '1234/56/78 90:34:56',
    userName: 'test_user',
    totalScore: 300,
    codeLength: 1024,
    judgeStatus: 'AC',
    maxTime: 12,
    maxMemory: 12345
  },
  {
    id: '000003',
    submittedAt: '1234/56/78 90:23:45',
    userName: 'test_user',
    totalScore: 200,
    codeLength: 512,
    judgeStatus: 'AC',
    maxTime: 12,
    maxMemory: 12345
  },
  {
    id: '000002',
    submittedAt: '1234/56/78 90:12:34',
    userName: 'test_user',
    totalScore: 100,
    codeLength: 256,
    judgeStatus: 'AC',
    maxTime: 1,
    maxMemory: 1234
  }
]
</script>

<template>
  <div class="rounded-lg border border-solid border-border-secondary pt-28 text-center">
    <h2 class="fontstyle-ui-title-large">提出一覧<br />テーブル</h2>
    <section class="p-10">
      <PagedTable :cols="cols" :row-ids="submissions.map(({ id }) => id)">
        <template #head="{ colId }">
          {{
            {
              submittedAt: '提出日時',
              userName: 'ユーザー名',
              totalScore: '得点',
              codeLength: 'コード長',
              judgeStatus: 'ジャッジ結果',
              maxTime: '実行時間',
              maxMemory: 'メモリ'
            }[colId]
          }}
        </template>
        <template #cell="{ rowId, colId }">
          {{
            {
              submittedAt: submissions.find(({ id }) => id === rowId)?.submittedAt,
              userName: submissions.find(({ id }) => id === rowId)?.userName,
              totalScore: submissions.find(({ id }) => id === rowId)?.totalScore,
              codeLength: `${submissions.find(({ id }) => id === rowId)?.codeLength} Byte`,
              judgeStatus: submissions.find(({ id }) => id === rowId)?.judgeStatus,
              maxTime: `${submissions.find(({ id }) => id === rowId)?.maxTime} ms`,
              maxMemory: `${submissions.find(({ id }) => id === rowId)?.maxMemory} KB`
            }[colId]
          }}
        </template>
      </PagedTable>
    </section>
  </div>
</template>

<style scoped></style>
