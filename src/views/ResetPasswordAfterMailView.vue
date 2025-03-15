<script setup lang="ts">
import type { Email } from '@/api/generated'
import { AuthenticationApi } from '@/api/generated'
import { useRouter } from 'vue-router'

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
  await router.push({ path: '/reset-password/mail-send', state: { email: email } })
}
</script>

<template>
  <div class="flex h-header-offset items-start justify-center bg-background-secondary pt-6">
    <div
      class="flex w-1/4 flex-col items-start justify-center gap-6 rounded-15 bg-background-primary px-14 py-10"
    >
      <h1 class="fontstyle-ui-title text-text-primary">メールを送信しました</h1>
      <div class="flex flex-col items-start gap-2 self-stretch">
        <p class="fontstyle-ui-body text-text-primary">
          60分以内に、メールに記載されたリンクからパスワードの再設定を行ってください。
        </p>
        <p class="fontstyle-ui-body text-text-primary">
          入力されたメールアドレスがお使いのアカウントに登録されていない場合、メールは送信されません。
        </p>
      </div>
      <div class="flex flex-col items-stretch justify-center gap-4 self-stretch">
        <PrimaryButton class="flex h-10 items-center justify-center px-5 py-2" @click="closeWindow">
          この画面を閉じる
        </PrimaryButton>
        <BorderedButton
          class="flex h-10 items-center justify-center px-5 py-2"
          @click="requestResetPassword"
        >
          メールを再送信する
        </BorderedButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
