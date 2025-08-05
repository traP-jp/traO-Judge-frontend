<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import PlainTextArea from '@/components/PlainTextArea.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

const route = useRoute()

const problemStatement = ref<string>('')

const problemStatementError = ref<string>('')

const saveError = ref<string>('')
const saveSuccess = ref<boolean>(false)
const saveErrorShow = ref<boolean>(false)
const isLoading = ref<boolean>(false)

if (typeof route.params.id !== 'string') throw new Error('Invalid route')
const problemId = ref<string>('')
watch(
  () => route.params.id,
  (id) => {
    problemId.value = `${id}`
  },
  { immediate: true }
)

async function saveStatement() {
  isLoading.value = true
}
</script>

<template>
  <div class="flex font-primary">
    <div class="flex w-full flex-col">
      <div class="flex max-w-profile-max flex-col items-start justify-start gap-4">
        <h2 class="text-xl font-medium">問題文</h2>

        <div class="w-full">
          <PlainTextArea
            id="problem-statement"
            v-model="problemStatement"
            class="h-64 w-full"
            required
            :error-message="problemStatementError"
          />
        </div>

        <PrimaryButton class="h-10 w-18 px-3 py-2" :disabled="isLoading">
          保存
        </PrimaryButton>

        <AlertBox
          v-model:show="saveSuccess"
          text="基本設定が保存されました。"
          @click="saveStatement"
        />
        <AlertBox v-model:show="saveErrorShow" :text="saveError" type="error" />
      </div>
    </div>
  </div>
</template>


<style scoped></style>
