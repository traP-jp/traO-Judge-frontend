<script setup lang="ts">
import { AuthenticationApi } from '@/api/generated'
import isEmail from 'validator/lib/isEmail'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import OAuthButton from '@/components/Controls/OAuthButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'

const email = ref<string>('')
const emailErrorMessage = ref<string | undefined>()
const password = ref<string>('')
const passwordErrorMessage = ref<string | undefined>()
const router = useRouter()

const handleLogin = async () => {
  if (!email.value || !password.value) {
    emailErrorMessage.value = !email.value ? 'メールアドレスが入力されていません。' : ''
    passwordErrorMessage.value = !password.value ? 'パスワードが入力されていません。' : ''
    return
  }

  if (!isEmail(email.value)) {
    emailErrorMessage.value = 'メールアドレスの形式が正しくありません。'
    passwordErrorMessage.value = ''
    return
  }

  const authApi = new AuthenticationApi()
  try {
    await authApi.postLogin({
      userEmailAndPassword: {
        email: email.value,
        password: password.value
      }
    })
    router.push('/')
  } catch (error) {
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
      class="flex w-[360px] flex-col items-start justify-center gap-6 rounded-15 bg-background-primary px-8 py-6"
    >
      <h1 class="fontstyle-ui-subtitle leading-7 text-text-primary">ログイン</h1>

      <div class="flex w-full flex-col items-start gap-2">
        <OAuthButton app="Github" class="h-10 w-full" action="login" />
        <OAuthButton app="Google" class="h-10 w-full" action="login" />
        <OAuthButton app="traQ" class="h-10 w-full" action="login" />
      </div>

      <hr class="h-px w-full border-t border-border-primary" />

      <div class="flex w-full flex-col gap-4">
        <EmailTextbox
          v-model="email"
          class="w-full"
          placeholder="メールアドレス"
          :error-message="emailErrorMessage"
        />

        <PasswordTextbox
          v-model="password"
          class="w-full"
          placeholder="パスワード"
          :error-message="passwordErrorMessage"
        />

        <PrimaryButton class="h-10 w-full rounded px-6 py-2" @click="handleLogin">
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
