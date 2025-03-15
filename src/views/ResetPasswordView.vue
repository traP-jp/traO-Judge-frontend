<script setup lang="ts">
import type { Email } from '@/api/generated'
import { AuthenticationApi } from '@/api/generated'
import isEmail from 'validator/lib/isEmail'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'

const router = useRouter()

const emailAddress = ref<Email>({
  email: ''
})

const requestResetPassword = async () => {
  if (!isEmail(emailAddress.value.email)) return
  const authApi = new AuthenticationApi()
  await authApi.postRequestResetPassword({ email: emailAddress.value })
  await router.push({
    path: '/reset-password/after-mail',
    state: { email: emailAddress.value.email }
  })
}
</script>

<template>
  <div class="flex h-[calc(100vh-56px)] items-center justify-center bg-background-secondary">
    <div
      class="flex w-1/4 max-w-md flex-col items-start justify-center gap-6 rounded-15 bg-white px-8 py-6"
    >
      <div class="flex w-full items-start gap-2.5">
        <h1 class="text-xl font-medium leading-7 text-text-primary">パスワードの再設定</h1>
      </div>
      <div class="flex w-full flex-col items-start justify-center gap-2">
        <p class="w-full max-w-xs text-base font-normal leading-6 text-text-primary">
          再設定用のリンクをメールで送信します。
        </p>
        <p class="w-full max-w-sm text-base font-normal leading-6 text-text-primary">
          60分以内に、メールに記載されたリンクから再設定を行ってください。
        </p>
      </div>
      <div class="flex w-full flex-col items-start gap-4">
        <div class="w-full">
          <EmailTextbox
            v-model="emailAddress.email"
            label="メールアドレス"
            required
            placeholder="メールアドレス"
            class="h-6.5 w-full"
          />
        </div>
        <PrimaryButton
          :disabled="!isEmail(emailAddress.email)"
          class="h-10 w-full rounded bg-brand-primary px-6 py-2 text-center font-medium"
          @click="requestResetPassword"
        >
          リセット用のメールを送信
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
