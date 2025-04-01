<script setup lang="ts">
import { AuthenticationApi } from '@/api/generated'
import { ResponseError } from '@/api/generated/runtime'
import OAuthButton from '@/components/Controls/OAuthButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import { useSignupStore } from '@/stores/signup'
import isEmail from 'validator/lib/isEmail'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const emailErrorMessage = ref<string | undefined>()
const router = useRouter()
const signupStore = useSignupStore()

const handleSignupRequest = async () => {
  if (!email.value) {
    emailErrorMessage.value = 'メールアドレスが入力されていません。'
    return
  }

  if (!isEmail(email.value)) {
    emailErrorMessage.value = 'メールアドレスの形式が正しくありません。'
    return
  }

  emailErrorMessage.value = undefined

  const authApi = new AuthenticationApi()
  try {
    await authApi.postSignupRequest({
      signupRequest: {
        email: email.value
      }
    })
    signupStore.setEmail(email.value)
    router.push('/signup/mail-send')
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      const status = error.response.status
      // TODO: エラーハンドリングの文章
      if (status === 400) {
        emailErrorMessage.value = 'リクエストが不正です。入力内容を確認してください。'
      } else {
        emailErrorMessage.value = 'エラーが発生しました。もう一度お試しください。'
      }
    } else {
      // TODO: エラーハンドリングの文章
      emailErrorMessage.value = '予期せぬエラーが発生しました。もう一度お試しください。'
      console.error(error)
    }
  }
}
</script>

<template>
  <div class="flex h-header-offset items-start justify-center bg-background-secondary p-6">
    <div
      class="flex w-[360px] flex-col items-start justify-center gap-6 rounded-15 bg-background-primary px-8 py-6"
    >
      <h1 class="fontstyle-ui-subtitle leading-7 text-text-primary">新規登録</h1>

      <div class="flex w-full flex-col items-start gap-2">
        <OAuthButton app="Github" class="h-10 w-full" mode="signup" />
        <OAuthButton app="Google" class="h-10 w-full" mode="signup" />
        <OAuthButton app="traQ" class="h-10 w-full" mode="signup" />
      </div>

      <hr class="h-px w-full border-t border-border-primary" />

      <div class="flex w-full flex-col gap-4">
        <EmailTextbox
          id="email"
          v-model="email"
          placeholder="メールアドレス"
          :error-message="emailErrorMessage"
        />
        <PrimaryButton
          class="h-10 w-full rounded px-6 py-2"
          :disabled="!email"
          @click="handleSignupRequest"
        >
          メールアドレスで新規登録
        </PrimaryButton>
      </div>
      <div class="flex w-full flex-col justify-start gap-2">
        <router-link to="/login" class="fontstyle-ui-caption text-text-secondary underline">
          すでにアカウントをお持ちの場合
        </router-link>
      </div>
    </div>
  </div>
</template>
