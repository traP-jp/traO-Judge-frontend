<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import AlertBox from '@/components/AlertBox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import NumberTextbox from '@/components/Controls/Textbox/NumberTextbox.vue'

const problemTitle = ref<string>('')
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
  if (!problemTitle.value) return true
  if (!difficulty.value) return true
  if (!timeLimit.value) return true
  if (!memoryLimit.value) return true
  if (difficultyError.value) return true
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
  if (!problemTitle.value) {
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

async function saveSetting() {
  isLoading.value = true
}
</script>

<template>
  <div class="flex w-full font-primary">
    <div class="flex w-full flex-col">
      <div class="flex max-w-profile-max flex-col items-start justify-start gap-4">
        <h2 class="text-xl font-medium">基本設定</h2>

        <div class="w-full">
          <PlainTextbox
            id="display-name"
            v-model="problemTitle"
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

        <PrimaryButton class="h-10 w-18 px-3 py-2" :disabled="isLoading || inputInvalid">
          保存
        </PrimaryButton>
        <AlertBox
          v-model:show="saveSuccess"
          text="基本設定が保存されました。"
          @click="saveSetting"
        />
        <AlertBox v-model:show="saveErrorShow" :text="saveError" type="error" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
