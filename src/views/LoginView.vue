<script setup lang="ts">
import { AuthenticationApi } from '@/api/generated'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import OAuthButton from '@/components/Controls/OAuthButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'

const email = ref<string>('')
const emailErrorMessage = ref<string | undefined>('')
const password = ref<string>('')
const passwordErrorMessage = ref<string | undefined>('')
const router = useRouter()

const handleLogin = async () => {
  // バリデーション
  if (!email.value || !password.value) {
    emailErrorMessage.value = !email.value ? 'メールアドレスを入力してください' : ''
    passwordErrorMessage.value = !password.value ? 'パスワードを入力してください' : ''
    return
  }

  // エラーメッセージをリセット
  emailErrorMessage.value = ''
  passwordErrorMessage.value = ''

  const authApi = new AuthenticationApi()
  try {
    await authApi.postLogin({
      userEmailAndPassword: {
        email: email.value,
        password: password.value
      }
    })
    // router.push('/') // ログイン成功時のリダイレクト
    emailErrorMessage.value = 'メールアドレスまたはパスワードが正しくありません。'
    passwordErrorMessage.value = 'メールアドレスまたはパスワードが正しくありません。'
  } catch (error) {
    // エラー時のみメッセージを表示
    emailErrorMessage.value = 'メールアドレスまたはパスワードが正しくありません。'
    passwordErrorMessage.value = 'メールアドレスまたはパスワードが正しくありません。'
    email.value = ''
    password.value = ''
    console.error('ログインエラー:', error)
  }
}
</script>

<template>
  <div class="flex h-header-offset items-start justify-center bg-background-secondary p-6">
    <div
      class="flex w-full max-w-form-max flex-col items-start justify-center gap-6 rounded-15 bg-background-primary px-8 py-6"
    >
      <h1 class="fontstyle-ui-title leading-7 text-text-primary">ログイン</h1>

      <div class="flex w-full flex-col items-start gap-2">
        <OAuthButton app="Github" class="w-full" mode="login" />
        <OAuthButton app="Google" class="w-full" mode="login" />
        <OAuthButton app="traQ" class="w-full" mode="login" />
      </div>

      <div class="h-px w-full border-t border-border-secondary"></div>

      <div class="flex w-full flex-col gap-4">
        <EmailTextbox
          v-model="email"
          class="h-8 w-full"
          placeholder="メールアドレス"
          :error-message="emailErrorMessage"
        />

        <PasswordTextbox
          v-model="password"
          class="h-8 w-full"
          placeholder="パスワード"
          :error-message="passwordErrorMessage"
        />

        <PrimaryButton
          class="h-10 w-full rounded px-6 py-2"
          :disabled="!email || !password"
          @click="handleLogin"
        >
          ログイン
        </PrimaryButton>
      </div>

      <div class="flex w-full flex-col justify-start gap-2">
        <router-link
          to="/reset-password"
          class="fontstyle-ui-caption text-text-secondary underline"
        >
          パスワードを再設定する
        </router-link>
        <router-link to="/signup" class="fontstyle-ui-caption text-text-secondary underline">
          アカウントを新規登録する
        </router-link>
      </div>
    </div>
  </div>
</template>
