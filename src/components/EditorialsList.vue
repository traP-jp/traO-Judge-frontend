<script setup lang="ts">
import Link from '@/components/Link.vue'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import type { EditorialSummary } from '@/api/generated'
import { EditorialsApi } from '@/api/generated/apis/EditorialsApi.ts'
import { ResponseError } from '@/api/generated/runtime'
import { onMounted, ref } from 'vue'

const { problemId } = defineProps<{
  problemId: string
}>()

const cols: (Column & { name: string })[] = [
  { id: 'title', textAlign: 'start', name: 'タイトル' },
  { id: 'authorId', textAlign: 'start', name: '著者', width: '200px' },
  { id: 'updatedAt', textAlign: 'start', name: '最終更新', width: '150px' }
] as const

const editorialIds = ref<string[]>([])
const editorials = ref<Map<string, EditorialSummary>>(new Map())
const isLoaded = ref<boolean>(false)

onMounted(async () => {
  try {
    const editorialsApi = new EditorialsApi()
    const response = await editorialsApi.getEditorialsOnProblem({
      problemId: problemId
    })
    response.sort((a, b) => {
      if (a.updatedAt === undefined || b.updatedAt === undefined)
        throw new Error('Editorials data is inconsistent')
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
    editorialIds.value = response
      .filter((editorial) => editorial.id !== undefined)
      .map((editorial) => String(editorial.id as number))
    editorials.value = new Map(
      response
        .filter(
          (editorial) =>
            editorial.id !== undefined &&
            editorial.authorId !== undefined &&
            editorial.updatedAt !== undefined
        )
        .map((editorial) => [String(editorial.id as number), editorial])
    )
    if (
      response.length !== editorialIds.value.length ||
      response.length !== editorials.value.size
    ) {
      throw new Error('Editorials data is inconsistent')
    }
    isLoaded.value = true
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      if (error.response.status === 404) {
        console.error('Not Found 問題が存在しません. (または問題の閲覧権限がありません.)')
      } else {
        console.error('Unknown error: ' + error.response.status)
      }
    } else {
      console.error('Get Editorials On Problem Error', error)
    }
  }
})
</script>

<template>
  <ListingTable v-if="isLoaded" :cols="cols" :row-ids="editorialIds">
    <template #head="{ colId }">
      {{ cols.find(({ id }) => id === colId)?.name }}
    </template>
    <template #cell="{ rowId, colId }">
      <template v-if="colId === 'title'">
        <Link :href="'/problems/' + problemId + '/editorials/' + editorials.get(rowId)?.id" new-tab>
          解説 {{ editorials.get(rowId)?.id }}
        </Link>
      </template>
      <template v-else-if="colId === 'authorId'">
        <Link :href="'/users/' + editorials.get(rowId)?.authorId" new-tab>
          {{ editorials.get(rowId)?.authorId }}
        </Link>
      </template>
      <template v-else-if="colId === 'updatedAt'">
        {{
          editorials.get(rowId)?.updatedAt?.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        }}
      </template>
    </template>
  </ListingTable>
  <div v-else class="fontstyle-ui-body-2-strong text-text-secondary">読み込み中...</div>
</template>

<style scoped></style>
