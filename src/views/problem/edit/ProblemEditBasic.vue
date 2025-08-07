<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, computed, onMounted } from 'vue'
import AlertBox from '@/components/AlertBox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import NumberTextbox from '@/components/Controls/Textbox/NumberTextbox.vue'
import { ProblemsApi, type Problem } from '@/api/generated'

const problem = ref<Problem>()

const title = ref<string>('')
const difficulty = ref<number>()
const timeLimit = ref<number>()
const memoryLimit = ref<number>()

const problemTitleError = ref<string>('')
const difficultyError = ref<string>('')
const timeLimitError = ref<string>('')
const memoryLimitError = ref<string>('')

const saveError = ref<string>('')
const saveSuccess = ref<boolean>(false)
const saveErrorShow = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const inputInvalid = computed<boolean>(() => {
  if (!title.value) return true
  if (!difficulty.value) return true
  if (!timeLimit.value) return true
  if (!memoryLimit.value) return true
  if (difficultyError.value) return true
  if (difficulty.value < 1 || difficulty.value > 10) return true
  if (timeLimit.value < 1) return true
  if (memoryLimit.value < 1) return true
  return false
})

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

function onChangeTitle() {
  problemTitleError.value = ''
  if (!title.value) {
    problemTitleError.value = '必須項目です。'
  }
}

function onChangeDifficulty() {
  difficultyError.value = ''
  if (!difficulty.value) {
    difficultyError.value = '必須項目です。'
    return
  }
}

function onChangeTimeLimit() {
  timeLimitError.value = ''
  if (!timeLimit.value) {
    timeLimitError.value = '必須項目です。'
    return
  }
}

function onChangeMemoryLimit() {
  memoryLimitError.value = ''
  if (!memoryLimit.value) {
    memoryLimitError.value = '必須項目です。'
    return
  }
}

const problemsApi = new ProblemsApi()

async function fetchProblem() {
  isLoading.value = true
  try {
    problem.value = await problemsApi.getProblem({ problemId: problemId.value })
    title.value = problem.value.title
    difficulty.value = problem.value.difficulty
    timeLimit.value = problem.value.timeLimit
    memoryLimit.value = problem.value.memoryLimit
  } catch (error) {
    console.error('問題の取得に失敗しました:', error)
    saveError.value = '問題の取得に失敗しました。'
    saveErrorShow.value = true
  } finally {
    isLoading.value = false
  }
}

async function saveSetting() {
  isLoading.value = true
  try {
    problem.value!.title = title.value
    problem.value!.difficulty = difficulty.value!
    problem.value!.timeLimit = timeLimit.value!
    problem.value!.memoryLimit = memoryLimit.value!
    await problemsApi.putProblem({
      problemId: problemId.value,
      putProblemRequest: problem.value
    })
    console.log(problem.value)
    saveSuccess.value = true
  } catch (error) {
    console.error('基本設定の保存に失敗しました:', error)
    saveError.value = '基本設定の保存に失敗しました。'
    saveErrorShow.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProblem()
})
</script>

<template>
  <div class="flex w-full font-primary">
    <div class="flex w-full flex-col">
      <div class="flex max-w-profile-max flex-col items-start justify-start gap-4">
        <h2 class="text-xl font-medium">基本設定</h2>

        <div class="w-full">
          <PlainTextbox
            id="display-name"
            v-model="title"
            class="h-5.5 w-full"
            label="問題タイトル"
            required
            displays-length
            :error-message="problemTitleError"
            @change="onChangeTitle"
          />
        </div>

        <div class="w-full">
          <NumberTextbox
            id="difficulty"
            v-model="difficulty"
            class="h-5.5"
            container-class="!w-24"
            label="難易度"
            supporting-text="1以上10以下の整数で入力してください。"
            required
            :min="1"
            :max="10"
            :error-message="difficultyError"
            @change="onChangeDifficulty"
          />
        </div>

        <div class="w-full">
          <div class="flex flex-row items-start gap-2">
            <NumberTextbox
              id="time-limit"
              v-model="timeLimit"
              class="h-5.5"
              container-class="!w-36"
              label="実行時間制限"
              required
              unit="ms"
              :min="1"
              :error-message="timeLimitError"
              @change="onChangeTimeLimit"
            />
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-row items-start gap-2">
            <NumberTextbox
              id="memory-limit"
              v-model="memoryLimit"
              class="h-5.5"
              container-class="!w-36"
              label="メモリ制限"
              required
              unit="MiB"
              :min="1"
              :error-message="memoryLimitError"
              @change="onChangeMemoryLimit"
            />
          </div>
        </div>

        <PrimaryButton
          class="h-10 w-18 px-3 py-2"
          :disabled="isLoading || inputInvalid"
          @click="saveSetting"
        >
          保存
        </PrimaryButton>
        <AlertBox v-model:show="saveSuccess" text="基本設定が保存されました。" />
        <AlertBox v-model:show="saveErrorShow" :text="saveError" type="error" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
