<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import CopyableTextArea from '@/components/CopyableTextArea.vue'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import { TestcasesApi } from '@/api/generated/apis/TestcasesApi'
import type {
  TestcaseSummary,
  Testcase,
  PostTestcaseRequestInner,
  PutTestcaseRequest
} from '@/api/generated/models'
import { useTraqAuthGuard } from '@/composables/useTraqAuthGuard'

const route = useRoute()
const { requireTraqAuth } = useTraqAuthGuard()

if (typeof route.params.id !== 'string') throw new Error('Invalid route')
const problemId = ref<string>('')
watch(
  () => route.params.id,
  (id) => {
    problemId.value = `${id}`
  },
  { immediate: true }
)

const testcasesApi = new TestcasesApi()

const testcases = ref<Map<string, TestcaseSummary>>(new Map())
const testcaseIds = ref<string[]>([])
const testcaseDetails = ref<Map<string, Testcase>>(new Map())
const loading = ref(true)

const cols: (Column & { name: string })[] = [
  { id: 'name', textAlign: 'start', name: '名前' },
  { id: 'updatedAt', textAlign: 'start', name: '更新日時', width: '176px' },
  { id: 'actions', textAlign: 'start', name: '操作', width: '100px' }
] as const

const dropdownOpenId = ref<string | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)
const editingTestcase = ref<Testcase | null>(null)
const formData = ref({
  name: '',
  input: '',
  output: ''
})
const showEditForm = ref(false)
const closeEditArea = () => {
  editingTestcase.value = null
  formData.value = { name: '', input: '', output: '' }
  showEditForm.value = false
}

async function fetchTestcases() {
  try {
    loading.value = true
    const response = await testcasesApi.getTestcases({ problemId: problemId.value })

    testcases.value.clear()
    response.forEach((testcase) => {
      if (testcase.id) {
        testcases.value.set(testcase.id, testcase)
      }
    })
    testcaseIds.value = Array.from(testcases.value.keys())
  } catch {
    alert('テストケースの取得に失敗しました')
  } finally {
    loading.value = false
  }
}

async function fetchTestcaseDetails(testcaseId: string): Promise<Testcase | null> {
  try {
    if (testcaseDetails.value.has(testcaseId)) {
      return testcaseDetails.value.get(testcaseId)!
    }

    const testcase = await testcasesApi.getTestcase({ testcaseId })
    testcaseDetails.value.set(testcaseId, testcase)
    return testcase
  } catch {
    return null
  }
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

async function handleEdit(id: string) {
  const testcaseDetail = await fetchTestcaseDetails(id)
  if (testcaseDetail) {
    editingTestcase.value = testcaseDetail
    formData.value = {
      name: testcaseDetail.name,
      input: testcaseDetail.testInput,
      output: testcaseDetail.testOutput
    }
    showEditForm.value = true
  }
  dropdownOpenId.value = null
}

function handleMore(event: MouseEvent, id: string) {
  event.stopPropagation()
  if (dropdownOpenId.value === id) {
    dropdownOpenId.value = null
  } else {
    dropdownOpenId.value = id
  }
}

async function handleCopy(id: string) {
  const testcaseDetail = await fetchTestcaseDetails(id)
  if (testcaseDetail) {
    editingTestcase.value = null
    formData.value = {
      name: testcaseDetail.name,
      input: testcaseDetail.testInput,
      output: testcaseDetail.testOutput
    }
    showEditForm.value = true
  }
  dropdownOpenId.value = null
}

async function handleDelete(id: string) {
  const testcase = testcases.value.get(id)
  if (testcase && confirm(`テストケース「${testcase.name}」を削除しますか？`)) {
    try {
      await requireTraqAuth(() => testcasesApi.deleteTestcase({ testcaseId: id }))

      testcases.value.delete(id)
      testcaseDetails.value.delete(id)
      testcaseIds.value = Array.from(testcases.value.keys())

      if (editingTestcase.value?.id === id) {
        closeEditArea()
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'テストケースの削除に失敗しました')
    }
  }
  dropdownOpenId.value = null
}

function handleAddTestcase() {
  editingTestcase.value = null
  formData.value = {
    name: '',
    input: '',
    output: ''
  }
  showEditForm.value = true
}

async function handleSaveTestcase() {
  try {
    if (editingTestcase.value) {
      const putRequest: PutTestcaseRequest = {
        name: formData.value.name,
        testInput: formData.value.input,
        testOutput: formData.value.output
      }

      await requireTraqAuth(() =>
        testcasesApi.putTestcase({
          testcaseId: editingTestcase.value!.id,
          putTestcaseRequest: putRequest
        })
      )

      testcaseDetails.value.set(editingTestcase.value.id, {
        ...editingTestcase.value,
        name: formData.value.name,
        testInput: formData.value.input,
        testOutput: formData.value.output,
        updatedAt: new Date()
      })
    } else {
      const postRequest: PostTestcaseRequestInner = {
        name: formData.value.name,
        testInput: formData.value.input,
        testOutput: formData.value.output
      }
      // TODO: 配列型でいいのか確認
      // 複数の一括追加を想定して作ったが，本当に必要？
      await requireTraqAuth(() =>
        testcasesApi.postTestcases({
          problemId: problemId.value,
          postTestcaseRequestInner: [postRequest]
        })
      )
    }

    await fetchTestcases()

    editingTestcase.value = null
    formData.value = { name: '', input: '', output: '' }
    showEditForm.value = false
  } catch (error) {
    alert(error instanceof Error ? error.message : 'テストケースの保存に失敗しました')
  }
}

onMounted(() => {
  fetchTestcases()

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      dropdownOpenId.value = null
    }
  }
  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

watch(problemId, () => {
  fetchTestcases()
})
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <div class="flex items-start justify-between">
      <h1 class="fontstyle-ui-subtitle text-text-primary">テストケース</h1>
      <BorderedButton icon="add" :disabled="loading" @click="handleAddTestcase">
        テストケースを追加
      </BorderedButton>
    </div>

    <div v-if="loading" class="flex justify-center p-4">
      <div class="text-text-secondary">読み込み中...</div>
    </div>

    <div class="flex flex-1 gap-6 overflow-hidden">
      <div class="flex-1 overflow-auto">
        <ListingTable :cols="cols" :row-ids="testcaseIds">
          <template #head="{ colId }">
            <span class="fontstyle-ui-control-strong text-text-secondary">
              {{ cols.find(({ id }) => id === colId)?.name }}
            </span>
          </template>
          <template #cell="{ rowId, colId }">
            <template v-if="colId === 'name'">
              <span class="fontstyle-ui-body text-text-primary">
                {{ testcases.get(rowId)?.name }}
              </span>
            </template>
            <template v-else-if="colId === 'updatedAt'">
              <span class="fontstyle-ui-body text-text-primary">
                {{
                  testcases.get(rowId)?.updatedAt
                    ? formatDate(testcases.get(rowId)!.updatedAt!)
                    : '---'
                }}
              </span>
            </template>
            <template v-else-if="colId === 'actions'">
              <div class="relative flex items-center justify-center gap-3">
                <button
                  class="rounded p-1 text-text-secondary hover:bg-background-secondary"
                  @click="handleEdit(rowId)"
                >
                  <MaterialIcon icon="edit" size="24px" />
                </button>
                <button
                  class="rounded p-1 text-text-secondary hover:bg-background-secondary"
                  :class="{ 'bg-background-secondary': dropdownOpenId === rowId }"
                  @click="handleMore($event, rowId)"
                >
                  <MaterialIcon icon="more_vert" size="24px" />
                </button>

                <div
                  v-if="dropdownOpenId === rowId"
                  ref="dropdownRef"
                  class="absolute right-0 top-8 z-10 w-40 rounded-lg border border-border-secondary bg-background-primary shadow-lg"
                  @click.stop
                >
                  <div class="p-2">
                    <button
                      class="flex w-full items-center gap-2 rounded-2xl px-4 py-1 text-left hover:bg-background-secondary"
                      @click="handleCopy(rowId)"
                    >
                      <MaterialIcon icon="content_copy" size="18px" />
                      <span class="fontstyle-ui-control-strong text-text-primary">複製</span>
                    </button>
                    <button
                      class="flex w-full items-center gap-2 rounded px-4 py-1 text-left hover:bg-background-secondary"
                      @click="handleDelete(rowId)"
                    >
                      <MaterialIcon icon="delete" size="18px" class="text-status-error" />
                      <span class="fontstyle-ui-control-strong text-status-error">削除</span>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </ListingTable>
      </div>

      <div
        class="flex flex-col gap-4 rounded border border-border-primary bg-background-primary p-4"
        style="width: 300px"
      >
        <template v-if="showEditForm">
          <div class="flex items-center justify-between gap-3">
            <h2 class="fontstyle-ui-subtitle text-text-primary">
              テストケースを{{ editingTestcase ? '編集' : '追加' }}
            </h2>
            <button
              class="rounded p-1 text-text-secondary hover:bg-background-secondary"
              @click="closeEditArea"
            >
              <MaterialIcon icon="close" size="24px" />
            </button>
          </div>

          <div class="flex flex-col gap-4">
            <PlainTextbox v-model="formData.name" label="テストケース名" :required="true" />

            <CopyableTextArea v-model="formData.input" class="h-50" label="入力" />

            <CopyableTextArea v-model="formData.output" class="h-50" label="出力" />
          </div>

          <PrimaryButton
            left-icon="save"
            class="h-12"
            :disabled="!formData.name"
            @click="handleSaveTestcase"
          >
            保存
          </PrimaryButton>
        </template>

        <p v-else class="fontstyle-ui-control-strong text-text-secondary">
          編集するテストケースが選択されていません。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
