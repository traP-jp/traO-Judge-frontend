<script setup lang="ts">
import PlainTextArea from '@//components/PlainTextArea.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import SNSTextbox from '@/components/Controls/Textbox/SNSTextbox.vue'
import { ref } from 'vue'

const displayName = ref<string>('')
const introduction = ref<string>('')
const githubAccount = ref<string>('')
const xAccount = ref<string>('')

function saveProfile() {
  console.log('プロフィールを保存します')
  console.log('表示名:', displayName.value)
  console.log('自己紹介:', introduction.value)
  console.log('GitHubアカウント:', githubAccount.value)
  console.log('Xアカウント:', xAccount.value)
}
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
            requiredh
          />
        </div>
        <div class="w-full">
          <PlainTextArea
            id="introduction"
            v-model="introduction"
            class="h-27 w-full"
            label="自己紹介"
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
        <PrimaryButton class="h-10 w-18 px-3 py-2" @click="saveProfile">保存</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
