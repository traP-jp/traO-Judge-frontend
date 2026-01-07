<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import AlertBox from '@/components/AlertBox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import NumberTextbox from '@/components/Controls/Textbox/NumberTextbox.vue'
import PlainTextArea from '@/components/PlainTextArea.vue'
import { ProblemsApi } from '@/api/generated'
import { type Ref } from 'vue'

const router = useRouter()

const title = ref<string>('')
const difficulty = ref<number>()
const timeLimit = ref<number>(2000)
const memoryLimit = ref<number>(256)
const statement = ref<string>('')

const problemTitleError = ref<string>('')
const difficultyError = ref<string>('')
const timeLimitError = ref<string>('')
const memoryLimitError = ref<string>('')

const saveError = ref<string>('')
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

function validateRequiredField<Value>(valueRef: Ref<Value>, errorRef: Ref<string>) {
  if (!valueRef.value) {
    errorRef.value = '必須項目です。'
  } else {
    errorRef.value = ''
  }
}

const onChangeTitle = validateRequiredField.bind(null, title, problemTitleError)
const onChangeDifficulty = validateRequiredField.bind(null, difficulty, difficultyError)
const onChangeTimeLimit = validateRequiredField.bind(null, timeLimit, timeLimitError)
const onChangeMemoryLimit = validateRequiredField.bind(null, memoryLimit, memoryLimitError)

const problemsApi = new ProblemsApi()

async function createProblem() {
  isLoading.value = true
  try {
    const createdProblem = await problemsApi.postProblem({
      postProblemRequest: {
        title: title.value,
        difficulty: difficulty.value!,
        timeLimit: timeLimit.value!,
        memoryLimit: memoryLimit.value! * 1024, // MiB to KiB
        statement: statement.value
      }
    })
    router.push(`/problems/${createdProblem.id}/edit`)
  } catch (error) {
    console.error('問題の作成に失敗しました:', error)
    saveError.value = '問題の作成に失敗しました。'
    saveErrorShow.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen w-full justify-center px-container-x py-6 font-primary">
    <div class="flex w-full max-w-profile-max flex-col">
      <div class="flex flex-col items-start justify-start gap-4">
        <h2 class="text-xl font-medium">問題の新規作成</h2>

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

        <div class="w-full">
          <label class="fontstyle-ui-control mb-1 block text-text-primary" for="problem-statement">
            問題文
          </label>
          <PlainTextArea id="problem-statement" v-model="statement" class="h-64 w-full" />
        </div>

        <PrimaryButton
          class="h-10 w-18 px-3 py-2"
          :disabled="isLoading || inputInvalid"
          @click="createProblem"
        >
          作成
        </PrimaryButton>
        <AlertBox v-model:show="saveErrorShow" :text="saveError" type="error" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
