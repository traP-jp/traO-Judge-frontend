<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Email } from '@/api/generated'
import { AuthenticationApi } from '@/api/generated'
import isEmail from 'validator/lib/isEmail'

import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

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
      class="flex w-[800px] flex-col items-start justify-center gap-4 rounded-[15px] bg-background-primary px-14 py-10"
    >
      <h1 class="fontstyle-ui-title text-[#1E1E1E]">パスワードの再設定</h1>
      <div class="flex items-start gap-4 self-stretch">
        <div class="flex shrink-0 grow basis-0 flex-col items-start gap-2 p-2">
          <p class="fontstyle-ui-body text-[#3A3A3A]">再設定用のリンクをメールで送信します。</p>
          <p class="fontstyle-ui-body text-[#3A3A3A]">
            60分以内に、メールに記載されたリンクから再設定を行ってください。
          </p>
        </div>
        <div class="h-[100px] w-px bg-border-secondary"></div>
        <form class="flex shrink-0 grow basis-0 flex-col items-start gap-3 p-2">
          <EmailTextbox
            v-model="emailAddress.email"
            placeholder="メールアドレス"
            class="flex items-center gap-2.5 self-stretch"
          />
          <PrimaryButton
            text="送信"
            :disabled="!isEmail(emailAddress.email)"
            class="flex items-center justify-center gap-2.5 self-stretch px-5 py-2"
            @click="requestResetPassword"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
