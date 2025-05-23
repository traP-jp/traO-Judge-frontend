<script setup lang="ts">
import PlainTextArea from '@//components/PlainTextArea.vue'
import { MeApi } from '@/api/generated/apis/MeApi'
import AlertBox from '@/components/AlertBox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import SNSTextbox from '@/components/Controls/Textbox/SNSTextbox.vue'
import { onMounted, ref } from 'vue'

const displayName = ref<string>('')
const introduction = ref<string>('')
const githubAccount = ref<string>('')
const xAccount = ref<string>('')

const displayNameError = ref<string>('')
const introductionError = ref<string>('')
const saveError = ref<string>('')
const saveSuccess = ref<boolean>(false)
const saveErrorShow = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const MAX_INTRO_LENGTH = 200

async function fetchUserData() {
  isLoading.value = true
  try {
    const meApi = new MeApi()
    const user = await meApi.getMe()

    displayName.value = user.name || ''
    introduction.value = user.selfIntroduction || ''
    githubAccount.value = user.githubId || ''
    xAccount.value = user.xId || ''
  } catch (error) {
    console.error('プロフィール情報の取得に失敗しました:', error)
    saveError.value = 'プロフィール情報の取得に失敗しました。'
    saveErrorShow.value = true
  } finally {
    isLoading.value = false
  }
}

async function saveProfile() {
  saveSuccess.value = false
  saveErrorShow.value = false
  displayNameError.value = ''
  introductionError.value = ''
  saveError.value = ''

  let hasError = false
  if (!displayName.value) {
    displayNameError.value = '表示名は必須です。'
    hasError = true
  }
  if (introduction.value.length > MAX_INTRO_LENGTH) {
    introductionError.value = `自己紹介は${MAX_INTRO_LENGTH}文字以内で入力してください。`
    hasError = true
  }
  if (hasError) return

  isLoading.value = true

  const meApi = new MeApi()
  try {
    await meApi.putMe({
      putMeRequest: {
        userName: displayName.value,
        selfIntroduction: introduction.value,
        githubId: githubAccount.value,
        xId: xAccount.value,
        icon: undefined // TODO: アイコンのアップロード機能を実装したらここを修正
      }
    })
    saveSuccess.value = true
  } catch (error) {
    console.error('プロフィールの保存に失敗しました:', error)
    saveError.value = 'プロフィールの保存に失敗しました。'
    saveErrorShow.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div class="flex font-primary">
    <div class="flex w-full flex-col">
      <div class="flex max-w-profile-max flex-col items-start justify-start gap-4">
        <h2 class="text-xl font-medium">プロフィール</h2>

        <div class="w-full">
          <PlainTextbox
            id="display-name"
            v-model="displayName"
            class="h-5.5 w-full"
            label="表示名"
            required
            :error-message="displayNameError"
          />
        </div>
        <div class="w-full">
          <PlainTextArea
            id="introduction"
            v-model="introduction"
            class="h-27 w-full"
            label="自己紹介"
            :error-message="introductionError"
            :displays-length="true"
          />
        </div>
        <div class="flex w-full max-w-profile-max flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="fontstyle-ui-control text-text-primary">SNSアカウント</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex size-6 items-center justify-center">
              <img src="@/assets/service_icons/github.svg" alt="GitHub" class="size-5" />
            </div>
            <div class="flex-1">
              <SNSTextbox v-model="githubAccount" placeholder="GitHubユーザー名" />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex size-6 items-center justify-center">
              <img src="@/assets/service_icons/x.svg" alt="X" class="size-5" />
            </div>
            <div class="flex-1">
              <SNSTextbox v-model="xAccount" placeholder="Xユーザー名" />
            </div>
          </div>
        </div>
        <PrimaryButton class="h-10 w-18 px-3 py-2" :disabled="isLoading" @click="saveProfile">
          保存
        </PrimaryButton>
        <AlertBox v-model:show="saveSuccess" text="プロフィールが保存されました。" />
        <AlertBox v-model:show="saveErrorShow" :text="saveError" type="error" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
