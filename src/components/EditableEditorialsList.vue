<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import { EditorialsApi, type EditorialSummary } from '@/api/generated'
import { useTraqAuthGuard } from '@/composables/useTraqAuthGuard'
import { dateToString } from '@/utils/date'
import MenuButton from '@/components/Navigations/MenuButton.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import BorderedButton from './Controls/BorderedButton.vue'
import router from '@/router'

const { requireTraqAuth } = useTraqAuthGuard()

const { problemId } = defineProps<{
  problemId: string
}>()

const isLoaded = ref<boolean>(false)
const editorialIds = ref<string[]>([])
const editorials = ref<Map<string, EditorialSummary>>(new Map())

const editorialsApi = new EditorialsApi()

async function loadSubmissions() {
  isLoaded.value = false
  try {
    const summaries: EditorialSummary[] = await editorialsApi.getEditorialsOnProblem({
      problemId
    })

    editorialIds.value = summaries.map(({ id }) => id)
    editorials.value = new Map(summaries.map((editorial) => [editorial.id, editorial]))
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  } finally {
    isLoaded.value = true
  }
}

onMounted(() => {
  loadSubmissions()
})

const cols: (Column & { name: string })[] = [
  { id: 'title', textAlign: 'start', name: 'タイトル' },
  { id: 'updatedAt', textAlign: 'start', name: '更新日時', width: '176px' },
  { id: 'actions', textAlign: 'start', name: '操作', width: '100px' }
] as const

function handleAddEditorial() {
  router.push({ path: `${router.currentRoute.value.fullPath.replace(/\/$/, '')}/new` })
}

async function deleteEditorial() {
  if (focused.value === null) return
  if (!confirm('本当に削除しますか？')) return

  const editorial = editorials.value.get(focused.value)
  if (!editorial) return

  try {
    await requireTraqAuth(() => editorialsApi.deleteEditorial({ editorialId: editorial.id }))
    editorials.value.delete(focused.value)
    editorialIds.value = editorialIds.value.filter((id) => id !== editorial.id)
  } catch (error) {
    console.error('API Error:', error)
    alert(error instanceof Error ? error.message : `API Error: ${error}`)
  } finally {
    closeActionMenu()
  }
}

const focused = ref<string | null>(null)

function toggleActionMenu(id: string) {
  if (focused.value === id) {
    closeActionMenu()
  } else {
    focused.value = id
  }
}

function closeActionMenu() {
  focused.value = null
}
</script>

<template>
  <div class="fontstyle-ui-subtitle flex items-center justify-end self-stretch text-text-primary">
    <slot />
    <BorderedButton class="h-8 !px-2" @click="handleAddEditorial">
      <span class="mx-0 inline-flex items-center gap-2">
        <span class="ml-2">解説を追加</span>
        <MaterialIcon icon="add" size="20px" />
      </span>
    </BorderedButton>
  </div>

  <ListingTable
    v-if="isLoaded"
    :cols="cols"
    :row-ids="editorialIds"
    :selected-rows="focused === null ? [] : [focused]"
  >
    <template #head="{ colId }">
      {{ cols.find(({ id }) => id === colId)?.name }}
    </template>
    <template #cell="{ rowId, colId }">
      <template v-if="colId === 'title'">
        {{ editorials.get(rowId)?.title }}
      </template>
      <template v-else-if="colId === 'updatedAt'">
        {{ dateToString(editorials.get(rowId)?.updatedAt) }}
      </template>
      <template v-else-if="colId === 'isPublic'">
        {{ editorials.get(rowId)?.isPublic ? 'はい' : 'いいえ' }}
      </template>
      <template v-else-if="colId === 'actions'">
        <div class="relative flex flex-row justify-end gap-4 px-2">
          <a :href="`editorials/${editorials.get(rowId)?.id}`" class="hover:scale-110" small>
            <span class="inline-flex items-center gap-1">
              <MaterialIcon icon="edit" size="20px" class="py-2" />
            </span>
          </a>

          <button class="hover:scale-110" small @click="toggleActionMenu(rowId)">
            <span class="inline-flex items-center gap-1">
              <MaterialIcon icon="more_vert" size="24px" class="py-2" />
            </span>
          </button>

          <div v-if="focused === rowId" class="absolute right-0 top-full">
            <div
              class="flex w-36 flex-col gap-4 rounded-lg border border-border-secondary bg-background-primary py-2 text-text-secondary shadow-lg"
            >
              <MenuButton
                icon="delete"
                class="rounded-none pl-2 !text-status-error hover:bg-status-error/10"
                @click="deleteEditorial()"
              >
                <span class="inline-flex items-start gap-1">削除</span>
              </MenuButton>
            </div>
          </div>
        </div>
      </template>
      <template v-else>Unknown column: {{ colId }}</template>
    </template>
  </ListingTable>
  <div v-else>読み込み中...</div>
</template>

<style scoped></style>
