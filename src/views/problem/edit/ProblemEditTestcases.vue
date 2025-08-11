<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import CopyableTextArea from '@/components/CopyableTextArea.vue'
import ListingTable, { type Column } from '@/components/ListingTable.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'

const route = useRoute()

if (typeof route.params.id !== 'string') throw new Error('Invalid route')
const problemId = ref<string>('')
watch(
  () => route.params.id,
  (id) => {
    problemId.value = `${id}`
  },
  { immediate: true }
)

// Mock data for testcases
interface TestCase {
  id: string
  name: string
  updatedAt: Date
  input?: string
  output?: string
}

const testcases = ref<Map<string, TestCase>>(
  new Map([
    [
      '1',
      {
        id: '1',
        name: 'sample_01',
        updatedAt: new Date('2025-01-02T12:34:56'),
        input: '2',
        output: 'Hello world!\nHello world!'
      }
    ],
    [
      '2',
      {
        id: '2',
        name: 'sample_02',
        updatedAt: new Date('2025-01-02T12:34:56'),
        input: '3',
        output: 'Hello world!\nHello world!\nHello world!'
      }
    ],
    [
      '3',
      {
        id: '3',
        name: 'sample_03',
        updatedAt: new Date('2025-01-02T12:34:56'),
        input: '1',
        output: 'Hello world!'
      }
    ],
    ['4', { id: '4', name: 'sample_04', updatedAt: new Date('2025-01-02T12:34:56') }],
    ['5', { id: '5', name: 'sample_05', updatedAt: new Date('2025-01-02T12:34:56') }],
    ['6', { id: '6', name: 'sample_06', updatedAt: new Date('2025-01-02T12:34:56') }],
    ['7', { id: '7', name: 'sample_07', updatedAt: new Date('2025-01-02T12:34:56') }],
    ['8', { id: '8', name: 'sample_08', updatedAt: new Date('2025-01-02T12:34:56') }],
    ['9', { id: '9', name: 'sample_09', updatedAt: new Date('2025-01-02T12:34:56') }],
    ['10', { id: '10', name: 'sample_10', updatedAt: new Date('2025-01-02T12:34:56') }]
  ])
)

const testcaseIds = ref<string[]>(Array.from(testcases.value.keys()))

const cols: (Column & { name: string })[] = [
  { id: 'name', textAlign: 'start', name: '名前' },
  { id: 'updatedAt', textAlign: 'start', name: '更新日時', width: '176px' },
  { id: 'actions', textAlign: 'center', name: '操作', width: '100px' }
] as const

const dropdownOpenId = ref<string | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)
const editingTestcase = ref<TestCase | null>(null)
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

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function handleEdit(id: string) {
  const testcase = testcases.value.get(id)
  if (testcase) {
    editingTestcase.value = testcase
    formData.value = {
      name: testcase.name,
      input: testcase.input || '',
      output: testcase.output || ''
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

function handleCopy(id: string) {
  console.log('Copy testcase:', id)
  // TODO: Implement copy functionality
  dropdownOpenId.value = null
}

function handleDelete(id: string) {
  console.log('Delete testcase:', id)
  // TODO: Implement delete functionality with confirmation
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

function handleSaveTestcase() {
  if (editingTestcase.value) {
    testcases.value.set(editingTestcase.value.id, {
      ...editingTestcase.value,
      name: formData.value.name,
      input: formData.value.input,
      output: formData.value.output,
      updatedAt: new Date()
    })
  } else {
    const newId = String(testcases.value.size + 1)
    testcases.value.set(newId, {
      id: newId,
      name: formData.value.name,
      input: formData.value.input,
      output: formData.value.output,
      updatedAt: new Date()
    })
    testcaseIds.value = Array.from(testcases.value.keys())
  }

  editingTestcase.value = null
  formData.value = { name: '', input: '', output: '' }
  showEditForm.value = false
}

onMounted(() => {
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
</script>

<template>
  <div class="flex h-full flex-col gap-6">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <h1 class="fontstyle-ui-subtitle text-text-primary">テストケース</h1>
      <BorderedButton icon="add" @click="handleAddTestcase"> テストケースを追加 </BorderedButton>
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
                {{ formatDate(testcases.get(rowId)?.updatedAt || new Date()) }}
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
