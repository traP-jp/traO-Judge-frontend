<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import PlainTextArea from '@/components/PlainTextArea.vue'
import AlertBox from '@/components/AlertBox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import Link from '@/components/Link.vue'
import {
  EditorialsApi,
  ResponseError,
  type PostEditorialOperationRequest,
  type PostEditorialRequest,
  type PutEditorialOperationRequest,
  type PutEditorialRequest
} from '@/api/generated'
import { useTraqAuthGuard } from '@/composables/useTraqAuthGuard'
import router from '@/router'

const { requireTraqAuth } = useTraqAuthGuard()

const title = ref<string>('')
const body = ref<string>('')

const titleError = ref<string>('')

const saveError = ref<string>('')
const saveSuccess = ref<boolean>(false)
const saveErrorShow = ref<boolean>(false)

const isLoading = ref<boolean>(false)
const inputInvalid = computed<boolean>(() => {
  return !title.value || !body.value || !!titleError.value
})

const route = useRoute()

const editorialApi = new EditorialsApi()

if (typeof route.params.id !== 'string') throw new Error('Invalid route')

const problemId = ref<string>('')
const editorialId = ref<string>('')

watch(
  () => route.params.id,
  (id) => {
    problemId.value = `${id}`
  },
  { immediate: true }
)

watch(
  () => route.params.editorialId,
  (id) => {
    editorialId.value = id as string
  },
  { immediate: true }
)

function onChangeTitle() {
  title.value = title.value.trim()
}

function onChangeBody() {
  body.value = body.value.trim()
}

async function fetchEditorial() {
  if (editorialId.value === 'new') return

  isLoading.value = true

  try {
    const response = await editorialApi.getEditorial({
      editorialId: editorialId.value
    })

    title.value = response.title
    body.value = response.statement
  } catch (error) {
    console.error('解説取得エラー:', error)

    if (error instanceof ResponseError) {
      const response = await error.response.json()
      saveError.value = `解説の取得に失敗しました: ${response.body.message} (${response.status})`
    } else {
      saveError.value = '解説の取得に失敗しました。もう一度お試しください。'
    }

    saveErrorShow.value = true
  } finally {
    isLoading.value = false
  }
}

async function saveEditorial() {
  saveError.value = ''
  saveSuccess.value = false
  saveErrorShow.value = false

  isLoading.value = true

  const editorialPayload = {
    title: title.value,
    statement: body.value,
    isPublic: true
  }

  try {
    if (editorialId.value === 'new') {
      const response = await requireTraqAuth(() =>
        editorialApi.postEditorial({
          problemId: problemId.value,
          postEditorialRequest: editorialPayload as PostEditorialRequest
        } as PostEditorialOperationRequest)
      )

      router.push(`/problems/${problemId.value}/edit/editorials/${response.id}`)
    } else {
      await requireTraqAuth(() =>
        editorialApi.putEditorial({
          editorialId: editorialId.value,
          putEditorialRequest: editorialPayload as PutEditorialRequest
        } as PutEditorialOperationRequest)
      )
    }

    saveSuccess.value = true
  } catch (error) {
    console.error('解説保存エラー:', error)

    if (error instanceof ResponseError) {
      switch (error.response.status) {
        case 400:
          saveError.value = 'リクエストが不正です。入力内容を確認してください。'
          break
        case 403:
          saveError.value = '解説を投稿または編集する権限がありません。'
          break
        case 404:
          saveError.value = '問題が存在しないか、閲覧権限がありません．'
          break
        case 500:
          saveError.value = 'サーバーエラーが発生しました。'
          break
        default:
          saveError.value = '解説の保存に失敗しました。もう一度お試しください。'
      }
    } else {
      saveError.value = '予期せぬエラーが発生しました。もう一度お試しください。'
    }
    saveErrorShow.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchEditorial()
})
</script>

<template>
  <div class="flex font-primary">
    <div class="flex w-full flex-col">
      <div class="flex w-full flex-col items-start justify-start gap-4">
        <Link href="../editorials">
          <span class="inline-flex items-center gap-1">
            <MaterialIcon icon="arrow_left_alt" class="inline-block" />
            <span class="underline underline-offset-2">解説一覧に戻る</span>
          </span>
        </Link>

        <h2 class="text-xl font-medium">解説の編集</h2>

        <div class="w-full max-w-profile-max">
          <PlainTextbox
            id="display-name"
            v-model="title"
            class="h-5.5 w-full"
            label="解説タイトル"
            required
            displays-length
            :error-message="titleError"
            @change="onChangeTitle"
          />
        </div>

        <div class="w-full">
          <PlainTextArea
            id="body"
            v-model="body"
            class="h-64 w-full"
            label="本文"
            required
            @change="onChangeBody"
          />
        </div>

        <PrimaryButton
          class="h-10 w-18 px-3 py-2"
          :disabled="isLoading || inputInvalid"
          @click="saveEditorial"
        >
          保存
        </PrimaryButton>
        <AlertBox v-model:show="saveSuccess" text="解説が保存されました。" />
        <AlertBox v-model:show="saveErrorShow" :text="saveError" type="error" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
