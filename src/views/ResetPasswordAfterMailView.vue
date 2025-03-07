<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Email } from '@/api/generated'
import { AuthenticationApi } from '@/api/generated'

import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

const router = useRouter()

const email: string = history.state.email ?? ''
const emailAddress: Email = { email: email }

const closeWindow = () => {
  router.push('/')
}

const requestResetPassword = async () => {
  console.log(email)
  const authApi = new AuthenticationApi()
  await authApi.postRequestResetPassword({ email: emailAddress })
  await router.push({ path: '/reset-password/after-mail', state: { email: email } })
}
</script>

<template>
  <div class="flex h-[calc(100vh-56px)] items-center justify-center bg-background-secondary">
    <div
      class="flex w-[600px] flex-col items-start justify-center gap-6 rounded-[15px] bg-background-primary px-14 py-10"
    >
      <h1 class="fontstyle-ui-title text-[#1E1E1E]">メールを送信しました</h1>
      <div class="flex flex-col items-start gap-2 self-stretch">
        <p class="fontstyle-ui-body text-[#3A3A3A]">
          60分以内に、メールに記載されたリンクからパスワードの再設定を行ってください。
        </p>
        <p class="fontstyle-ui-body text-[#3A3A3A]">
          入力されたメールアドレスがお使いのアカウントに登録されていない場合、メールは送信されません。
        </p>
      </div>
      <div class="flex items-center justify-center gap-3 self-stretch">
        <PrimaryButton
          text="この画面を閉じる"
          class="flex shrink-0 grow basis-0 items-center justify-center gap-2.5 px-5 py-2"
          @click="closeWindow"
        />
        <BorderedButton
          text="メールを再送信する"
          class="flex shrink-0 grow basis-0 items-end justify-center gap-2.5 px-5 py-2"
          @click="requestResetPassword"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
