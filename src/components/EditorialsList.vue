<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import { EditorialsApi, type EditorialSummary, type User, UsersApi } from '@/api/generated'
import { dateToString } from '@/utils/date'
import MaterialIcon from '@/components/MaterialIcon.vue'

const { problemId } = defineProps<{
  problemId: string
}>()

const router = useRouter()

const isLoaded = ref<boolean>(false)
const editorialIds = ref<string[]>([])
const editorials = ref<Map<string, EditorialSummary>>(new Map())
const users = ref<Map<string, User>>(new Map())

const editorialsApi = new EditorialsApi()
const usersApi = new UsersApi()

async function loadEditorials() {
  isLoaded.value = false
  try {
    const summaries: EditorialSummary[] = await editorialsApi.getEditorialsOnProblem({
      problemId
    })

    editorialIds.value = summaries.map(({ id }) => id)
    editorials.value = new Map(summaries.map((editorial) => [editorial.id, editorial]))

    const userIds = [...new Set(summaries.map(e => e.authorId))]
    const userPromises = userIds.map(userId => usersApi.getUser({ userId }))
    const userProfiles = await Promise.all(userPromises)
    users.value = new Map(userProfiles.map((user: User) => [user.id, user]))
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  } finally {
    isLoaded.value = true
  }
}

onMounted(() => {
  loadEditorials()
})

const cols: (Column & { name: string })[] = [
  { id: 'title', textAlign: 'start', name: 'タイトル' },
  { id: 'owner', textAlign: 'start', name: '著者', width: '200px' },
  { id: 'updatedAt', textAlign: 'start', name: '最終更新', width: '150px' }
] as const

function handleEditorialClick(editorialId: string) {
  router.push(`/problems/${problemId}/editorials/${editorialId}`)
}

function handleUserClick(userId: string) {
  router.push(`/users/${userId}`)
}
</script>

<template>
  <ListingTable
    v-if="isLoaded"
    :cols="cols"
    :row-ids="editorialIds"
    :selected-rows="[]"
  >
    <template #head="{ colId }">
      {{ cols.find(({ id }) => id === colId)?.name }}
    </template>
    <template #cell="{ rowId, colId }">
      <template v-if="colId === 'title'">
        <button
          class="flex items-center gap-1 text-text-primary hover:underline"
          @click="handleEditorialClick(rowId)"
        >
          {{ editorials.get(rowId)?.title }}
          <MaterialIcon icon="open_in_new" size="20px" />
        </button>
      </template>
      <template v-else-if="colId === 'owner'">
        <button
          class="flex items-center gap-1 text-text-primary hover:underline"
          @click="handleUserClick(editorials.get(rowId)?.authorId || '')"
        >
          {{ users.get(editorials.get(rowId)?.authorId || '')?.name || 'Unknown' }}
          <MaterialIcon icon="open_in_new" size="20px" />
        </button>
      </template>
      <template v-else-if="colId === 'updatedAt'">
        {{ dateToString(editorials.get(rowId)?.updatedAt) }}
      </template>
      <template v-else>Unknown column: {{ colId }}</template>
    </template>
  </ListingTable>
  <div v-else>読み込み中...</div>
</template>

<style scoped></style>